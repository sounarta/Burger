"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAppContext } from "@/context/AppProvider";

interface Props {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  addsize?: { name: string; price: number }[];
  extraIngredients?: { name: string; price: number }[];
}

const PizzaCard = ({
  _id,
  title,
  description,
  image,
  price,
  addsize,
  extraIngredients,
}: Props) => {
  const { addToCart } = useAppContext();


  const [open, setOpen] = useState(false);

  const handleClick = () => {
    const product = { _id, title, description, image, price };

    console.log("addsize:", addsize);
    console.log("extraIngredients:", extraIngredients);
  
    if (addsize && addsize.length > 0) {
      // If sizes are present, set open to true
      setOpen((prevOpen) => !prevOpen);
    } else {
      // If no sizes, add the item to the store
      addToCart(product, addsize || [], extraIngredients || []);
      
    }
  };
  return (
    <>
      {open && (
        <div className=" flexcenter fixed inset-0  min-h-full bg-black/70">
          <div className=" flex h-[500px]  w-[500px] flex-col items-center gap-2 rounded-lg bg-white p-5">
            <Image
              src={"/pizza.png"}
              width={250}
              height={200}
              alt=""
              className=" object-contain"
            />
            <h1 className=" font-serif text-xl font-bold underline">{title}</h1>
            <p className=" line-clamp-3 text-[15px] text-secondary">
              {description}
            </p>

            {addsize && addsize?.length > 0 && (
              <div className=" rounded-lg bg-gray-200 p-2">
                <h3 className=" text-lg">Pick Your Size:</h3>
              </div>
            )}

            {extraIngredients && extraIngredients?.length > 0 && (
              <div className=" rounded-lg bg-gray-200 p-2">
                <h3 className=" text-lg">Pick Your Extras:</h3>
              </div>
            )}
          </div>
        </div>
      )}

      <div className=" max-h-[350px] max-w-[250px] rounded-lg bg-slate-200 p-3 hover:bg-slate-100">
        <div className=" flexcenter my-2 flex-col gap-4">
          <Image
            src={image}
            alt=""
            width={125}
            height={125}
            className=" bg-transparent object-contain"
          />

          <h1 className=" text-[25px] font-bold leading-10">{title}</h1>
          <p className=" line-clamp-3 text-center text-[15px] text-secondary">
            {description}
          </p>

          <button
            className=" rounded-lg bg-primary px-4 py-2 text-[15px] text-white"
            onClick={handleClick}
          >
            Add to Cart ${price}
          </button>
        </div>
      </div>
    </>
  );
};

export default PizzaCard;
