import { navLinks } from "@/constants";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className=" flex w-full items-center  justify-between gap-5 py-8">
      <div className=" flex flex-1  gap-10">
        <h1 className="h1 text-primary">ST Pizza</h1>

        {navLinks.map((item) => (
          <Link
            href={item.path}
            key={item.name}
            className=" group hidden items-center gap-5 font-roboto text-lg capitalize text-secondary md:flex "
          >
            <p className=" group-hover:border-b group-hover:border-primary">
              {item.name}
            </p>
          </Link>
        ))}
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

      <Link href={"/"}>
        <Image
          src={"/shopcart.svg"}
          alt=""
          width={25}
          height={25}
          className=" object-contain"
        />
        </Link>
     
    </nav>
  );
};

export default Navbar;
