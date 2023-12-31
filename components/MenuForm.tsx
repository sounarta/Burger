"use client";

import {
  createMenu,
  editMenu,
  removeMenuItem,
} from "@/lib/actions/pizza.action";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import ExtraSize from "./ExtraSize";
interface Props {
  mongoUserId: string;
  menuItemId?: string;
  type?: string;
  categories: {
    _id: string;
    name: string;
  }[];
}

const MenuForm = ({ mongoUserId, menuItemId, type, categories }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const ParsedMenuItemId = menuItemId && JSON.parse(menuItemId || "");

  const [submit, setSubmit] = useState(false);
  const [title, setTitle] = useState(ParsedMenuItemId?.title || "");
  const [description, setDescription] = useState(
    ParsedMenuItemId?.description || ""
  );
  const [price, setPrice] = useState(ParsedMenuItemId?.price || "");
  const [picture, setPicture] = useState(ParsedMenuItemId?.image || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [addSize, setAddSize] = useState<{ name: string; price: number }[]>(
    ParsedMenuItemId?.addsize || []
  );
  const [extraIngredients, setExtraIngredients] = useState<{ name: string; price: number }[]>(ParsedMenuItemId?.extraIngredients || []);
  const [category, setCategory] = useState(ParsedMenuItemId?.category || '');
  console.log('category',category);
  // console.log(addSize);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmit(true);

    try {
      if (type === "edit") {
        await editMenu({
          menuItemId: ParsedMenuItemId._id,
          title,
          description,
          price: parseFloat(price),
          image: selectedFile
            ? await convertFileToBase64(selectedFile)
            : ParsedMenuItemId?.image,
          addsize: addSize,
          extraIngredients,
          category,
          path: pathname,
        });
        router.back();
      } else {
        await createMenu({
          title,
          description,
          author: JSON.parse(mongoUserId),
          price: parseFloat(price),
          image: selectedFile && (await convertFileToBase64(selectedFile)),
          addsize: addSize,
          extraIngredients,
          category,
          path: pathname,
        });
        router.back();
      }
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setSubmit(false);
    }
  };

  const convertFileToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result) {
          resolve(event.target.result as string);
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject("Failed to convert file to Base64");
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      try {
        const base64Image = await convertFileToBase64(file);
        setPicture(base64Image);
        setSelectedFile(file);
      } catch (error) {
        console.error("Error converting file to Base64:", error);
      }
    }
  };

  const removeMenu = async (menuItemId: string | undefined) => {
    if (menuItemId !== undefined) {
      await removeMenuItem({
        menuId: JSON.parse(menuItemId),
        path: pathname,
      });

      router.push("/menu-items");
    }
  };

  return (
    <form className="mb-10 flex min-h-fit gap-3" onSubmit={handleSubmit}>
      {menuItemId ? (
        <div className="flex h-[150px] w-[200px] flex-col justify-between gap-2 space-y-2 bg-slate-100">
          {picture ? (
            <Image
              src={picture}
              alt=""
              height={100}
              width={150}
              className="object-contain"
            />
          ) : (
            <Image
              src={ParsedMenuItemId.image}
              alt=""
              height={100}
              width={150}
              className="object-contain"
            />
          )}

          <label>
            <input
              type="file"
              accept="images/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <span className="block cursor-pointer whitespace-nowrap rounded-lg border border-gray-300 p-2 text-center text-sm">
              EditImage
            </span>
          </label>
        </div>
      ) : (
        <div className="flex h-[150px] w-[200px] flex-col justify-between gap-2 space-y-2 bg-slate-100">
          {picture ? (
            <Image
              src={picture}
              alt=""
              height={100}
              width={150}
              className="object-contain"
            />
          ) : (
            <div className="flexcenter mx-auto h-full w-full cursor-pointer p-3">
              No Image
            </div>
          )}

          <label>
            <input
              type="file"
              accept="images/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <span className="block cursor-pointer whitespace-nowrap rounded-lg border border-gray-300 p-2 text-center text-sm">
              Add Image
            </span>
          </label>
        </div>
      )}

      <div className="flex flex-col">
        <div>
          <label className="font-serif">Item Name:</label>
          <input
            type="text"
            className="w-full rounded-lg bg-slate-100 px-3 py-2 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="font-serif">Description:</label>
          <input
            type="text"
            className="w-full rounded-lg bg-slate-100 px-3 py-2 outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="font-serif">Base Price:</label>
          <input
            type="number"
            className="w-full rounded-lg bg-slate-100 px-3 py-2 outline-none"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="my-2 rounded-lg bg-slate-100 px-2 py-1 font-serif capitalize outline-none"
>
  <option value="">Select a category</option>
  {categories?.length > 0 &&
    categories.map((c) => (
      <option key={c._id} value={c._id}>
        {c.name}
      </option>
    ))}
</select>


        <div className=" mt-3 flex flex-col gap-4">
          <ExtraSize type="Size" prop={addSize} setProp={setAddSize} />
          <ExtraSize
            type="extra Ingredients"
            prop={extraIngredients}
            setProp={setExtraIngredients}
          />
        </div>

        <button
          type="submit"
          className="mt-5 w-full rounded-lg bg-primary px-4 py-2 font-sans text-white"
        >
          {submit ? (
            <>{type === "edit" ? "Editing..." : "Saving..."}</>
          ) : (
            <>{type === "edit" ? "Edit Menu" : "Save Menu"}</>
          )}
        </button>
        <button
          type="button"
          className=" mt-5 rounded-lg bg-primary px-3 py-2 font-serif text-white"
          onClick={() => removeMenu(menuItemId)}
        >
          {" "}
          Delete this Menu
        </button>
      </div>
    </form>
  );
};

export default MenuForm;
