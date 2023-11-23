import Image from "next/image";
import Link from "next/link";
import ProfileTabs from "@/components/ProfileTabs";
import { getUserById, getUsers } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import React from "react";

const Page = async () => {
  const { userId } = auth();

  if (!userId) return console.log('User not Found');

  const mongoUser = await getUserById({userId});

  console.log(mongoUser)

  const isAdmin = mongoUser.roles.includes('admin');



  const result = await getUsers({});
console.log(result.users)
  return (
    <div className=" flexcenter flex-col">
      {isAdmin && <ProfileTabs />}

      {result.users.length > 1 &&
        result.users.filter((item) => !item.roles.includes('admin'))
        .map((item) =>{ 
          
           
    return( <div key={item._id} className=" mx-auto  mb-5 w-full max-w-xl ">
            <div className=" grid w-full grid-cols-3 rounded-lg  bg-slate-100 px-3 py-2 font-serif italic text-secondary">
              <h1>{item.name}</h1>
              <h1>{item.email}</h1>

           
 <Link href={`edit/${item.clerkId}`} className=" flex justify-end">
 <Image
   src={"/edit.svg"}
   alt=""
   width={20}
   height={20}
   className=" object-contain"
 />
</Link>

    
            </div>
          </div>
        )})}
    </div>
  );
};

export default Page;
