import ProfileTabs from "@/components/ProfileTabs";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getMenuItems } from "@/lib/actions/pizza.action";
import PizzaCard from "@/components/PizzaCard";
const page = async () => {
  const { userId } = auth();

  if (!userId) return null;

  const mongoUser = await getUserById({ userId });

  const isAdmin = mongoUser.roles.includes("admin");

  const result = await getMenuItems({});


  return (
    <>
    <div className=" flexcenter mx-auto  my-10 max-w-[450px] flex-col">
      {isAdmin && <ProfileTabs />}
      <div className=" group w-full rounded-lg bg-slate-100 hover:bg-primary hover:text-white">
        <Link href={"/menu-items/menu"} className=" flexcenter gap-4 py-3">
          <h1 className=" text-lg capitalize">Create your Menu</h1>
          <Image
            src={"/arrowright.svg"}
            alt=""
            width={25}
            height={25}
            className="group-hover:invert"
          />
        </Link>
      </div>
  </div>
      {result.menuItems.length > 0 && (
  <div className="mt-10 flex flex-wrap items-start justify-start gap-5">
    {result.menuItems.map((item) => (
      <Link key={item._id} href={`/menu-items/${item._id}`}>
        
          <PizzaCard
            _id={item._id}
            title={item.title}
            description={item.description}
            image={item.image}
            price={item.price}
          />
        
      </Link>
    ))}
  </div>
 
)}
 </>
  )}

export default page;
