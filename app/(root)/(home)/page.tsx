import React from "react";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";
import PizzaCard from "@/components/PizzaCard";
import { getMenuItems } from "@/lib/actions/pizza.action";

/* const Pizza = [
  {
    _id: "1",
    title: "Pepperoni",
    description: "Made of pizza crust, pizza sauce, cheese, and pepperoni.",
    image: "/pizza.png",
    price: 12,
    author: { _id: "1", name: "hassan" },
    createdAt: new Date(),
  },

  {
    _id: "2",
    title: "Margherita Pizza",
    description:
      "Pizza Margherita is a typical Neapolitan pizza, made with San Marzano tomatoes",
    image: "/pizza.png",
    price: 12,
    author: { _id: "1", name: "kamal" },
    createdAt: new Date(),
  },
];
*/
const Home = async() => {


 const result = await getMenuItems({})

 // console.log(result.menuItems)

  return (
    <div className=" flex flex-col gap-3">
      <HeroSection />

      <div className=" flexcenter relative mb-10 ">
        <div className=" flex-col gap-2">
          <h1 className=" text-center text-[20px] text-secondary">Check Out</h1>
          <h1 className="text-center font-serif text-[30px] leading-10 text-primary">
            Our Best Sellers
          </h1>
        </div>

        <Image
          src={"/sallad1.png"}
          alt=""
          width={125}
          height={125}
          className=" absolute left-0 mt-10 bg-transparent object-contain "
        />
        <Image
          src={"/sallad2.png"}
          alt=""
          width={125}
          height={125}
          className=" absolute right-0 mt-10 bg-transparent  object-contain"
        />
      </div>

      <div className=" mt-10 flex flex-wrap items-center justify-center gap-5">
        {result.menuItems.map((item) => (
          <PizzaCard
            key={item._id}
            _id={item._id}
            title={item.title}
            description={item.description}
            image={item.image}
            price={item.price}
            addsize={item.addsize}  // Make sure you are passing addsize correctly
            extraIngredients={item.extraIngredients}
          />
        ))}
      </div>

      <div className=" flexcenter mt-10 flex-col " id="about">
        <h1 className=" text-[20px] text-secondary">OUR STORY</h1>
        <h1 className="font-serif text-[30px] leading-10 text-primary">
          About Us
        </h1>

        <p className=" mt-5 max-w-lg text-center text-[20px] leading-7 text-secondary">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum ea,
          doloribus facere dolores provident at inventore fugiat hic quaerat et
          fuga dicta, maiores voluptas sequi autem facilis iure eius eum!
        </p>
      </div>
      <div className=" flexcenter h-[300px] w-full flex-col bg-white/60" id="contact">
          <h1 className=" text-center text-[20px] text-secondary">
            Dont Hesitate
          </h1>
          <h1 className="text-center font-serif text-[30px] text-primary">
            Contact Us
          </h1>
          <p className=" text-[35px]  text-secondary underline">
            +431678901
          </p>
        </div>
      
    </div>
  );
};

export default Home;
