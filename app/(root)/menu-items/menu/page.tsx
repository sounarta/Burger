import ProfileTabs from "@/components/ProfileTabs";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import React from "react";
import MenuForm from "@/components/MenuForm";

const page = async () => {
  const { userId } = auth();

  if (!userId) return null;

  const mongoUser = await getUserById({ userId });

  const isAdmin = mongoUser.roles.includes("admin");

  return (
    <div className=" flexcenter mx-auto  my-10 max-w-[450px] flex-col">
      {isAdmin && <ProfileTabs />}
      <div className=" max-w-[450px]">
      <MenuForm mongoUserId={JSON.stringify(mongoUser._id)}/>

      </div>
     
      
    </div>
  );
};

export default page;
