import React, { useState } from "react";
import Button from "./Button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedOut } from "../redux/slices/userDataSlice";
import { setInstructorLoggedOut } from "../redux/slices/instructorDataSlice";
import { toast } from "react-toastify";
const AppNavbar = () => {
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);
  const instructorLoggedIn = useSelector(
    (state) => state.instructorReducer.isLoggedIn
  );

  const [open, setOpen] = useState(false);
  const scrollToAboutUs = () => {
    const aboutUsSection = document.getElementById('about-us');
    if (aboutUsSection) {
      aboutUsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed w-full max-w-screen-lg bg-white py-2 z-10 px-2 border-b border-gray-100">
      <nav className="flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-800">
            Learnify
          </h1>
        </Link>
        <div className="md:flex hidden">
          {!isLoggedIn && !instructorLoggedIn && (
            <>
              <NavLink className="mr-3" onClick={scrollToAboutUs}>About Us</NavLink>
              <NavLink className="mx-3" to="/instructor-login">
                Instructor Login
              </NavLink>
              <NavLink className="ml-3" to="/courses">
                Courses
              </NavLink>
            </>
          )}

          {isLoggedIn && <UserLinks />}
          {instructorLoggedIn && <InstructorLink />}
        </div>
        <div className="hidden md:flex">
          <ConditionalButton
            isLoggedIn={isLoggedIn}
            instructorLoggedIn={instructorLoggedIn}
            id={name}
          />
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="hover:cursor-pointer md:hidden"
        >
          <CiMenuFries size={30} color="blue" />
        </div>
      </nav>
    </div>
  );
};

const UserLinks = () => {
  return (
    <>
      <NavLink className="mr-3" to="/">
        Home
      </NavLink>
      <NavLink className="mx-3" to="/courses">
        Courses
      </NavLink>
      <NavLink to="/dashboard/purchased-courses" className="mx-3">
        Purchased Courses
      </NavLink>
      <NavLink to="/dashboard/completed-courses" className="mx-3">
        Completed Course
      </NavLink>
      <NavLink className="mx-3" to="/dashboard/cart">
        Cart
      </NavLink>
    </>
  );
};

const InstructorLink = () => {
  return (
    <>
      <NavLink className="mx-3" to="/">
        Home
      </NavLink>
      <NavLink className="mx-3" to="/courses">
        Courses
      </NavLink>
      <NavLink to="/instructor-dashboard/created-courses" className="mx-3">
        Created Course
      </NavLink>
      <NavLink to="/create-course" className="mx-3">
        Create Course
      </NavLink>
    </>
  );
};
const ConditionalButton = ({ isLoggedIn, instructorLoggedIn, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return isLoggedIn || instructorLoggedIn ? (
    <div>
      <Button
        onClick={() => {
          isLoggedIn
            ? dispatch(setLoggedOut())
            : dispatch(setInstructorLoggedOut());
          navigate("/");

          toast.success("Logout Success...");
        }}
        className="mx-2 bg-white"
      >
        Logout
      </Button>

      <Link
        to={
          isLoggedIn
            ? "/dashboard/user-profile"
            : "/instructor-dashboard/instructor-profile"
        }
      >
        <Button className="ml-2 bg-white  md:bg-blue-500 md:text-white">
          Profile
        </Button>
      </Link>
    </div>
  ) : (
    <div>
      <Link to="/login">
        <Button className="mx-2 bg-white">Login</Button>
      </Link>
      <Link to="/register">
        <Button className="ml-2 bg-white  md:bg-blue-500 md:text-white">
          Register
        </Button>
      </Link>
    </div>
  );
};
export default AppNavbar;

/*
{open && (
        <div className="w-full bg-blue-500 text-white py-3 md:hidden">
          <div className="flex flex-col items-center gap-y-3">
            <NavLink className="mx-2" to="/">
              Home
            </NavLink>
            <NavLink className="mx-2">About Us</NavLink>
            <NavLink className="mx-2">Mentors</NavLink>
            <NavLink to="/instructor-login" className="mx-2">
              Become Instructor
            </NavLink>
            <NavLink className="mx-2" to="/courses">
              Courses
            </NavLink>
          </div>
          <div className="flex justify-center my-2">
            <ConditionalButton isLoggedIn={isLoggedIn} id={name} />
          </div>
        </div>
      )}
*/
