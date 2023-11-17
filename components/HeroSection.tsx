import React from "react";
import Image from "next/image";
import Click from "./Click";
const HeroSection = () => {
  return (
    <div className=" my-10 flex flex-col  justify-between md:flex-row">
      <div className=" flex flex-1 flex-col gap-10">
        <h1 className=" text-[52px] font-extrabold">
          Everything <br />
          is better
          <br />
          with a <span className=" text-primary">Pizza</span>
        </h1>
        <p className=" max-w-sm text-[15px]  text-secondary">
          Pizza is the missing piece that makes everyday complete ,a simple yet
          delicious joy in life
        </p>

        <div className=" flex items-center gap-5">
          <Click
            title="ORDER NOW"
            icon="/arrowright.svg"
            otherClasses="text-white "
            imageCLass="invert"
          />

          <Click
            title="Learn more"
            icon="/arrowright.svg"
            otherClasses="text-secondary bg-transparent"
          />
        </div>
      </div>

      <div className=" relative mt-5 md:mt-0">
        <Image
          src={"/pizza.png"}
          alt=""
          width={500}
          height={400}
          className=" object-contain"
        />
      </div>
    </div>
  );
};

export default HeroSection;
