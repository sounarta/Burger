import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  icon: string ;
  otherClasses?: string;
  imageCLass?: string;
  price?:number
}

const Click = ({ title, icon, otherClasses, imageCLass,price }: Props) => {
  return (
    
      <Button className={`${otherClasses}flex items-center gap-1 text-lg`}>
        
        {title} {price && (`$${price}`)}


      {icon &&(

<Image
          src={icon}
          height={15}
          width={15}
          alt=""
          className={`${imageCLass}`}
        />
      )}  
      </Button>
  
  );
};

export default Click;
