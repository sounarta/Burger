import ProfileTabs from "@/components/ProfileTabs";
import CategoriesForm from "@/components/CategoriesForm ";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.action";
import { getCategories } from "@/lib/actions/category.action";


const Page = async() => {
     const {userId} = auth()

     if(!userId) return null

     const mongoUser = await getUserById({userId})


    const result = await getCategories({})

  

  return (
    <div className=" flexcenter mt-10 flex-col gap-4 ">
      <ProfileTabs />
      <CategoriesForm  mongoUserId={JSON.stringify(mongoUser._id)} Categories={result.categories} />
    </div>
  );
};

export default Page;
