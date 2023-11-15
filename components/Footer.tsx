import React from "react";

const Footer = () => {
  return (
    <footer className="  mt-10 ">
      <div className=" flexcenter flex-col ">
        <h1 className=" text-[20px] text-secondary">OUR STORY</h1>
        <h1 className="font-serif text-[30px] leading-10 text-primary">
          About Us
        </h1>

        <p className=" mt-5 max-w-lg text-center text-[20px] leading-7 text-secondary">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum ea,
          doloribus facere dolores provident at inventore fugiat hic quaerat et
          fuga dicta, maiores voluptas sequi autem facilis iure eius eum!
        </p>

        <div className=" flexcenter h-[300px] w-full flex-col bg-white/60">
          <h1 className=" text-center text-[20px] text-secondary">
            Dont Hesitate
          </h1>
          <h1 className="text-center font-serif text-[30px] leading-10 text-primary">
            Contact Us
          </h1>
          <p className="mt-10 text-[45px] leading-[20px] text-secondary underline">
            +431678901
          </p>
        </div>
        <div className=" mt-10 h-1 w-full border-t border-slate-500 text-center">
          @ALl Right reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
