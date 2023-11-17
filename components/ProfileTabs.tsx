"use client";

import React from "react";
import Link from "next/link";
import { adminLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const ProfileTabs = () => {
  const pathname = usePathname();
  const {userId} = useAuth()

  return (
    <div className=" flexcenter mb-10 gap-5 text-[15px] font-bold capitalize ">
      {adminLinks.map((item) => {
        const Active =
          (pathname.includes(item.path) && item.path.length > 0) ||
          pathname === item.path;
         
          if(item.path === '/profile'){
            if(userId){

             item.path = `${item.path}/${userId}`

            }
         else{
           return null
         }
       }

        return (
          <Link
            href={item.path}
            key={item.name}
            className={` rounded-lg px-3 py-1 ${
              Active ? "bg-primary text-white" : "bg-gray-200 text-slate-500 "
            }`}
          >
            {item.name}
          </Link>
        )
      })}
    </div>
  );
};

export default ProfileTabs;
