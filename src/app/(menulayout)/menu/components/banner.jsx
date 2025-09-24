import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div>
      <img
        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Restaurant"
        width={500}
        height={500}
        className="mx-auto"
      />

      <Image
       src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Restaurant"
        width={500}
        height={500}
        className="mx-auto"
      />
    </div>
  );
};

export default Banner;
