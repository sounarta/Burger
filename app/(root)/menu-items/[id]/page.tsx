import ProfileTabs from "@/components/ProfileTabs";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import React from "react";
import MenuForm from "@/components/MenuForm";
import { getMenuItemById } from "@/lib/actions/pizza.action";


interface Props {
    params:{id:string}
}

const page = async ({params}:Props) => {
  const { userId } = auth();

  if (!userId) return null;

  const mongoUser = await getUserById({ userId });

  const isAdmin = mongoUser.roles.includes("admin");

  const menuItemId = await getMenuItemById({menuItemId:params.id})


  return (
    <div className=" flexcenter mx-auto  my-10 max-w-[450px] flex-col">
      {isAdmin && <ProfileTabs />}
      <div className=" max-w-[450px]">
      <MenuForm  type="edit" mongoUserId={JSON.stringify(mongoUser._id)} menuItemId ={JSON.stringify(menuItemId)}/>

      </div>
     
      
    </div>
  );
};

export default page;
