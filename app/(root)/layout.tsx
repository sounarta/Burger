import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" relative  mx-auto  max-w-6xl">
      <Navbar />
      {children}
      <Footer />
      <Toaster position="bottom-center" reverseOrder={true} />
    </div>
  );
};

export default Layout;
