"use client";

import { navLinks } from "@/constants";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/nextjs";
import { useAppContext } from "@/context/AppProvider";
const Navbar = () => {
  const { userId } = useAuth();

  const { cartProducts } = useAppContext();

  return (
    <nav className=" flex w-full items-center  justify-between gap-5 py-8">
      <div className=" flex flex-1 items-center  gap-10">
        <h1 className="h1 text-primary">ST Pizza</h1>

        {navLinks.map((item) => (
          <Link
            href={item.path}
            key={item.name}
            className=" group hidden items-center gap-5 scroll-smooth font-roboto text-lg capitalize text-secondary md:flex "
          >
            <p className=" group-hover:border-b group-hover:border-primary">
              {item.name}
            </p>
          </Link>
        ))}
        {userId && (
          <Link href={`/profile/${userId}`} className=" relative">
            <Image
              src="/profile.svg"
              alt=""
              width={18}
              height={18}
              className=" relative -bottom-0 right-4 hidden object-contain md:flex"
            />
          </Link>
        )}
      </div>

      <SignedIn>
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-10 w-10",
            },
            variables: {
              colorPrimary: "#ff7000",
            },
          }}
        />
      </SignedIn>
      <SignedOut>
        <Link
          href={"/sign-in"}
          className=" cursor-pointer rounded-lg bg-primary px-3 py-1 text-lg text-white"
        >
          Login
        </Link>
      </SignedOut>
      <div className="relative h-[25px] w-[25px]">
        {cartProducts.length >= 0 && (
          <Link
            href={""}
            className=" absolute -top-1 left-5 flex h-full w-full flex-col"
          >
            <Image
              src={"/shopcart.svg"}
              alt=""
              width={25}
              height={25}
              className=" object-contain"
            />
            <h1 className=" text-center">({cartProducts.length})</h1>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
