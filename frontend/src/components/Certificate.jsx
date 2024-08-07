import React from "react";
import { useSelector } from "react-redux";

const Certificate = ({ className, courseName }) => {
  const user = useSelector((state) => state.userReducer);
  return (
    <div
      className={`w-[900px] h-[500px] bg-black border-2 flex justify-center items-center rounded-xl ${className}`}
    >
      <div className="bg-[url('/assets/certificate-bg.jpg')] w-[870px] h-[470px] flex flex-col items-center justify-evenly rounded-lg">
        <p className="font-bold text-blue-500 text-4xl font-mono">
          Certificate of Completion
        </p>
        <p className="text-black font-bold flex gap-4 items-center">
          Certified that{" "}
          <span className="font-semibold font-serif text-2xl text-blue-500">
            {user.userDetails.name}
          </span>
        </p>
        <p className="text-black font-bold">has successfully completed</p>
        <p className="text-blue-500 font-bold text-2xl">
          {courseName}
        </p>
        <div className="ml-80 mt-8">
          <h1 className="text-2xl mb-4 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-800">
            Learnify
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
