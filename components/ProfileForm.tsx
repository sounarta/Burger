"use client";

import React, { useState } from "react";
import Image from "next/image";
import { updateUser } from "@/lib/actions/user.action";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";


interface Props {
  mongoUser: string;
  clerkId: string;
}

const ProfileForm = ({ mongoUser, clerkId }: Props) => {
   
    const pathname = usePathname();
    const parsedMongoUser = JSON.parse(mongoUser);
  const [submit, setSubmit] = useState(false);
  const [userName, setUserName] = useState(parsedMongoUser.username || "");
  const [phone, setPhone] = useState(parsedMongoUser.phone || "");
  const [streetAddress, setStreetAddress] = useState( parsedMongoUser.streetaddress || "");
  const [postalCode, setPostalCode] = useState( parsedMongoUser.postalcode || "");
  const [city, setCity] = useState(parsedMongoUser.city || "");
  const [country, setCountry] = useState(parsedMongoUser.country || "");
  const [profilePicture, setProfilePicture] = useState(parsedMongoUser.picture || '');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const convertFileToBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        if (event.target?.result) {
          resolve(event.target.result as string);
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('Failed to convert file to Base64');
        }
      };
  
      reader.onerror = () => {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('Failed to read file');
      };
  
      reader.readAsDataURL(file);
    });
  };
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];
    
    if (file) {
      try {
        const base64String = await convertFileToBase64(file);
        setProfilePicture(base64String);
        setSelectedFile(file);
      } catch (error) {
        console.error('Error converting file to Base64:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmit(true);

    try {
     
      await updateUser({
        clerkId,
         updateData:{
           username:userName,
           picture: selectedFile ? await convertFileToBase64(selectedFile) : profilePicture,
           phone,
           streetaddress:streetAddress,
           postalcode:postalCode,
           city,
           country,

         },
        path: pathname,
      });

      // Handle success, e.g., show a success toast
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle error, e.g., show an error toast
      toast.error("Error updating profile. Please try again.");
    } finally {
      setSubmit(false);
    }
  };
  return (
    <form
      className=" flex max-w-[800px] flex-col gap-5"
      onSubmit={handleSubmit}
    >
      <div className=" flex gap-2">
        <div className=" flex h-fit w-[200px] flex-col items-center justify-center gap-3  ">
          {profilePicture ? (
            <Image
            src={profilePicture}
              alt="Selected Avatar"
              width={80}
              height={55}
              className="h-full w-full rounded-lg object-fill"
            />
          ) : (
            <Image
              src={parsedMongoUser.picture}
              alt=""
              width={80}
              height={55}
              className=" h-full w-full rounded-lg object-fill"
            />
          )}
          <label>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <span className="block cursor-pointer whitespace-nowrap rounded-lg border border-gray-300 p-2 text-center">
              Edit Avatar
            </span>
          </label>
        </div>
        <div className=" flex min-w-full flex-col gap-4">
          <input
            type="text"
            placeholder="UserName.."
            className=" min-h-[45px]  rounded-lg bg-slate-100 px-3 font-serif text-lg outline-none
            placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 "
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="email"
            placeholder="ex@hotmail.com.."
            className=" min-h-[45px]  rounded-lg bg-slate-100 px-3 text-lg text-slate-400 outline-none
            placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
            value={parsedMongoUser.email}
            readOnly
          />
          <input
            type="text"
            placeholder="Phone Number..."
            className=" min-h-[45px]  rounded-lg bg-slate-100 px-3 font-serif text-lg outline-none
            placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 "
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Street Address.."
            className=" min-h-[45px]  rounded-lg bg-slate-100 px-3 font-serif text-lg outline-none
            placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 "
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Postal Code.."
            className=" min-h-[45px]  rounded-lg bg-slate-100 px-3 font-serif text-lg outline-none
            placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 "
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <input
            type="text"
            placeholder="City.."
            className=" min-h-[45px]  rounded-lg bg-slate-100 px-3 font-serif text-lg outline-none
            placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 "
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Country.."
            className=" min-h-[45px]  rounded-lg bg-slate-100 px-3 font-serif text-lg outline-none
            placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 "
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />

          <button
            type="submit"
            disabled={submit}
            className=" w-full  rounded-lg bg-primary py-2 text-lg text-white"
          >
            {submit ? "Updating" : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
