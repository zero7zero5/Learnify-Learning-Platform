import React from "react";
import { MdLogout } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const UDSideNav = () => {
  const userLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);
  return (
    <div
      className="bg-blue-500 text-white md:w-[22%] rounded-lg h-screen flex flex-col justify-between 
    max-md:flex-row max-md:w-[100%] max-md:h-[40px]"
    >
      <div className="p-4 mt-12 max-md:p-0 max-md:mt-0 max-md:overflow-x-auto max-md:max-w-screen-lg hover:overflow-scroll">
        <ul className="space-y-2 max-md:space-y-0 max-md:flex max-md:flex-row max-md:items-center max-md:justify-center max-md:min-w-max">
          {userLoggedIn === true ? <UserLinks /> : <InstructorLinks />}
        </ul>
      </div>
    </div>
  );
};

const UserLinks = () => {
  return (
    <>
      <Link
        className="block p-2 hover:bg-blue-600 rounded-md "
        to="/dashboard/user-profile"
      >
        My Profile
      </Link>

      <Link
        to="/dashboard/purchased-courses"
        className="block p-2 hover:bg-blue-600 rounded-md "
      >
        Purchased Courses
      </Link>

      <Link
        to="/dashboard/completed-courses"
        className="block p-2 hover:bg-blue-600 rounded-md"
      >
        Completed Courses
      </Link>

      <Link
        to="/dashboard/cart"
        className="block p-2 hover:bg-blue-600 rounded-md"
      >
        Cart
      </Link>

      <a className="p-2 hover:bg-blue-600 rounded flex items-center w-[93%] max-md:border-l-2 max-md:rounded-lg">
        <MdLogout className="mr-2" />
        Logout
      </a>
    </>
  );
};

const InstructorLinks = () => {
  return (
    <>
      <Link
        className="block p-2 hover:bg-blue-600 rounded-md "
        to="/instructor-dashboard/instructor-profile"
      >
        My Profile
      </Link>

      <Link
        to="/create-course"
        className="block p-2 hover:bg-blue-600 rounded-md "
      >
        Create Course
      </Link>

      <Link
        to="/instructor-dashboard/created-courses"
        className="block p-2 hover:bg-blue-600 rounded-md"
      >
        Created Course
      </Link>
      <a className="p-2 hover:bg-blue-600 rounded flex items-center w-[93%] max-md:border-l-2 max-md:rounded-lg">
        <MdLogout className="mr-2" />
        Logout
      </a>
    </>
  );
};
export default UDSideNav;
