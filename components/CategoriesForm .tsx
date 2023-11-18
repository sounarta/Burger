"use client";
import { createCategory, editCategory } from "@/lib/actions/category.action";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
interface Props {
  mongoUserId: string;
  Categories: {
    _id: string;
    name: string;
  }[];
}

const CategoriesForm = ({ mongoUserId, Categories }: Props) => {
  const pathname = usePathname();
  const [isSubmit, setIsSubmit] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<{ _id: string;name: string} | null>(null);

 // console.log(selectedCategory);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmit(true);
    try {
      if (selectedCategory) {
        // ... (other code)
        await editCategory({
          categoryId: selectedCategory._id,
          name: categoryName,
          path: pathname,
        });
        toast.success("Category edited successfully!");
      } else {
        // ... (other code)
        await createCategory({
          name: categoryName,
          author: JSON.parse(mongoUserId),
          path: pathname,
        });
        toast.success("Category Created successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmit(false);
      setCategoryName("");
      setSelectedCategory(null);
    }
  };

  const handleSelectedCategory = (category: { _id: string; name: string }) => {
    setSelectedCategory(category);
    setCategoryName(category.name);
  };

  return (
    <form
      className=" my-10 flex max-w-[5xl] flex-col gap-1"
      onSubmit={handleSubmit}
    >
      <h1 className=" text-[18px]  font-semibold text-slate-500">
        {selectedCategory ? "Edit Your Category" : "Add new Category"}:
      </h1>
      <div className=" flex items-center gap-3">
        <input
          type="text"
          placeholder="Pizza..."
          className=" min-h-[36px] w-[300px] rounded-lg 
          bg-slate-200 px-4 text-secondary outline-none 
          focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button
          type="submit"
          className=" min-h-[36px] rounded-lg bg-primary px-4 py-1 font-serif text-white"
          disabled={isSubmit}
        >
          {selectedCategory ? "Edit" : "Create"}
        </button>
      </div>

      <div className=" mt-5 flex flex-col">
        <h1 className=" text-[18px] font-semibold text-slate-500">CategoryList:</h1>

        {Categories && (
          <div className="mt-3 flex flex-col gap-3">
            {Categories.map((category) => (
              <div
                key={category._id}
                className="flex items-center gap-1 rounded-lg bg-slate-200 p-2 capitalize text-secondary"
                onClick={() => handleSelectedCategory(category)}
              >
                <span>{category.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </form>
  );
};

export default CategoriesForm;
