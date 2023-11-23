import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page

/*

import PizzaCard from "@/components/PizzaCard";
import { getCategories } from "@/lib/actions/category.action";
import { getMenuItems } from "@/lib/actions/pizza.action";
import React from "react";

const Page = async () => {
  const resultCategory = await getCategories({});

  const resultMenu = await getMenuItems({});


  return (
    <div className="flexcenter mx-auto max-w-2xl flex-col">
      {resultCategory.categories.length > 0 &&
        resultCategory.categories.map((cat) => (
          <div key={cat._id} className="mt-10 flex  flex-col">
            {" "}
           
           <h1 className="text-[65px] capitalize italic text-primary">
              {cat.name}
            </h1>
            <div className=" mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
              {resultMenu.menuItems.filter((item) => String(item.category) === String(cat._id))
              .map((item) => {
                console.log("PizzaCard Properties:", {
                  key: item._id,
                  _id: item._id,
                  title: item.title,
                  description: item.description,
                  image: item.image,
                  price: item.price,
                });
                return (
                  <PizzaCard
                    key={item._id}
                    _id={item._id}
                    title={item.title}
                    description={item.description}
                    image={item.image}
                    price={item.price}
                    addsize={item.addsize}
                    extraIngredients={item.extraIngredients}
  
                  />
                );
              })}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Page;




*/