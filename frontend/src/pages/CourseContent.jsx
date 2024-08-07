import React from "react";
import { useState } from "react";
import { CourseSideBar } from "../components/CourseSideBar";
import { CourseVideoPlayer } from "../components/CourseVideoPlayer";
import { IoIosClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";

export const CourseContent = ({ props }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <div className="h-full pt-10">
      {/* Hamburger icon for mobile */}
      <div className="md:hidden top-0 left-0 p-4">
        <button onClick={toggleSidebar}>
          <GiHamburgerMenu />
        </button>
      </div>

      {/* Close icon for mobile */}

      {/* Sidebar */}
      <div className="flex gap-12">
        <div classname="relative">
          <div
            className={`md:flex sm:left-0  bg-white w-80 flex-col ${
              showSidebar ? "" : "hidden"
            } z-50` }
          >
            <div className="mt-[18px] fixed z-50 w-[25%]">
              <CourseSideBar />
            </div>
            <div className="md:hidden absolute top-8 right-0 p-4 z-60">
              <button onClick={toggleSidebar}>
                <IoIosClose color="white" size={40} />
              </button>
            </div>
          </div>
        </div>
        <div className="">
          <CourseVideoPlayer />
        </div>
      </div>
    </div>
  );
};
