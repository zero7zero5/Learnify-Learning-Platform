import React from "react";

const Testimonials = ({ src, name,review }) => {
  return (
    <div className="flex flex-col w-[350px] h-[175px] rounded-xl bg-gradient-to-bl from-violet-100 from-1%  via-white to-white to-95% shadow-md cursor-pointer">
      <div className="flex ml-6 gap-4 items-center mt-4">
        <img src={src} className="w-[40px]" />
        <p className="font-semibold text-lg">{name}</p>
      </div>
      <p className="mt-4  w-[300px] text-left ml-6">
        {review}
      </p>
    </div>
  );
};

export default Testimonials;
