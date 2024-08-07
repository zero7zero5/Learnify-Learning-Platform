import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="mt-5 ">
      <div className="grid grid-rows-3 md:grid-cols-3 md:grid-rows-1">
        <div className="flex flex-col items-center px-10 justify-center md:justify-start">
          <h1 className="text-4xl mb-4 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-800">
            Learnify
          </h1>
          <p className="text-center">
            We are the best e-learning platform in the world. We have more than
            40,000+ courses and have more than 180+ course subject
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div>
            <h1 className="font-semibold text-2xl text-left">Courses</h1>

            <p className="my-3">Web Design</p>
            <p className="my-3">UI-UX Design</p>
            <p className="my-3">Business</p>
            <p className="my-3">Market Analysis</p>
            <p className="my-3">Digital Marketing</p>
          </div>
        </div>

        <div className="px-3">
          <h1 className="text-center font-semibold text-2xl text-left mb-4">
            Follow Us
          </h1>
          <div className="flex gap-x-2 justify-evenly mb-4">
            <FaFacebook size={30} />
            <FaTwitter size={30} />
            <FaInstagram size={30} />
            <FaLinkedin size={30} />
          </div>
          <div className="flex flex-col items-center">
            <h1 className="font-semibold text-2xl text-left">Download</h1>
            <img className="w-28" src="../../public/assets/playStore.png" />
            <img className="w-28" src="../../public/assets/appStore.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
