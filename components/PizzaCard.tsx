import React from "react";
import Click from "./Click";
import Image from "next/image";
interface Props {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
}

const PizzaCard = ({ _id, title, description, image, price }: Props) => {
  return (
    <div className=" max-h-[350px] max-w-[250px] rounded-lg bg-slate-200 p-3">
      <div className=" flexcenter my-2 flex-col gap-4">
        <Image
          src={image}
          alt=""
          width={125}
          height={125}
          className=" bg-transparent object-contain"
        />

        <h1 className=" text-[25px] font-bold leading-10">{title}</h1>
        <p className=" line-clamp-2 text-center text-[15px] text-secondary">
          {description}
        </p>

        <Click
          title="Add to Cart"
          icon=""
          otherClasses=" text-white font-bold rounded-lg"
          price={price}
        />
      </div>
    </div>
  );
};

export default PizzaCard;
