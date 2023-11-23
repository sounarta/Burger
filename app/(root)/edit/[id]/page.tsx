import ProfileForm from "@/components/ProfileForm";
import { auth } from "@clerk/nextjs";
import React from "react";
import { getUserInfo } from "@/lib/actions/user.action";
import ProfileTabs from "@/components/ProfileTabs";

interface Props {
  params: { id: string };
}

const Page = async ({ params }: Props) => {
  const {userId:clerkId} = auth();
  let userInfo

  if(clerkId){
   userInfo = await getUserInfo({ userId: params.id});

  }


  const isAdmin = userInfo.roles.includes("admin");

  return (
    <div className=" flexcenter flex-col  pt-10">
      {isAdmin ? (
        <ProfileTabs />
      ) : (
        <h1 className=" h1 mb-10 text-primary">Profile</h1>
      )}
    
      <ProfileForm clerkId={userInfo.clerkId} mongoUser={JSON.stringify(userInfo)}  />
    </div>
  );
};

export default Page;
