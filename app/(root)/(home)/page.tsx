import React from "react";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";
import PizzaCard from "@/components/PizzaCard";

const Pizza = [
  {
    _id: "1",
    title: "Pepperoni",
    description:
      "Made of pizza crust, pizza sauce, cheese, and pepperoni.",
    image: "/images.png",
    price: 12,
    author: { _id: "1", name: "hassan" },
    createdAt: new Date(),
  },

  {
    _id:'2',
    title: "Margherita Pizza",
    description:
      "Pizza Margherita is a typical Neapolitan pizza, made with San Marzano tomatoes",
    image: "/images.png",
    price: 12,
    author: { _id: "1", name: "kamal" },
    createdAt: new Date(),
  },
];

const Home = () => {




  return (
    <div className=" flex flex-col gap-5">
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
        {Pizza.map((item) => (
          <PizzaCard
            key={item._id}
            _id={item._id}
            title={item.title}
            description={item.description}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
