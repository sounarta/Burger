import ProfileForm from "@/components/ProfileForm";
import { auth } from "@clerk/nextjs";
import React from "react";
import { getUserById } from "@/lib/actions/user.action";
import ProfileTabs from "@/components/ProfileTabs";



interface Props {
  params: { id: string };
}

const admin:boolean =true

const Page = async ({ params }: Props) => {
  const { userId } = auth();

  if (!userId) return console.log("User not Found");

  const mongoUser = await getUserById({ userId: params.id });

  return (
    <div className=" flexcenter flex-col  pt-10">
      {admin ? (
       
         <ProfileTabs/>
      
       
      ):
      (
         <h1 className=" h1 mb-10 text-primary">Profile</h1>
      )}
      
      <ProfileForm clerkId={userId} mongoUser={JSON.stringify(mongoUser)} />
    </div>
  );
};

export default Page;
