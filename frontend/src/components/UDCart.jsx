import React from "react";
import Button from "./Button";
import { useRef, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import RemoveCart from "./RemoveCart";
import { useSelector } from "react-redux";
import { authorizedApi } from "../services/apis/authorizedApi";
import { IoReload } from "react-icons/io5";
import { toast } from "react-toastify";
import axios from "axios";

const UDCart = ({ className }) => {
  const authToken = useSelector((state) => state.userReducer.accessToken);
  // console.log(authToken);
  const userId = useSelector((state) => state.userReducer.userDetails._id);
  // const courseId = "6610b62254e91f7f46dc0890";
  const axiosInstance = authorizedApi(authToken);
  const navigate = useNavigate();
  const [carts, setCarts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axiosInstance.get(`/user/cart/${userId}`); // Assuming userId is available
        setCarts(response.data.cart);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, []);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const promises = carts.map(async (cartItem) => {
          // console.log("cartitem", cartItem);
          const res = await axiosInstance.get(`/courses/${cartItem}`);
          console.log(res.data);
          return res.data.course;
        });
        const coursesData = await Promise.all(promises);
        setCourses(coursesData);
        console.log("COURSES DA!!", courses);
      } catch (error) {
        console.error("Error fetching course items:", error);
      }
    };
    fetchCourseDetails();
  }, [carts]);
  // console.log(courses);
  const handleRemove = async (indexToRemove) => {
    // console.log(userId);
    console.log(indexToRemove);
    try {
      const courseId = carts[indexToRemove]; // Assuming _id is the identifier for the course
      await axiosInstance.delete("/user/delete-from-cart", {
        data: { userId, courseId },
      });
      setCarts((prevItems) => {
        // Filter out the item at the specified index
        return prevItems.filter((item, index) => index !== indexToRemove);
      });
    } catch (error) {
      console.error("Error removing course from cart:", error);
      // Handle error
    }
  };
  const onSubmit = async () => {
    navigate(`/payment/${calculateSum() - discount}`);
  };

  const calculateSum = () => {
    return courses.reduce((total, item) => total + item.price, 0);
  };
  const discount = 97;
  return (
    <div className={`w-[80%] max-md:w-[100%] p-4 ${className}`}>
      <div className="mt-10 mb-5 max-md:mt-0">
        <h2 className="text-2xl font-bold">
          My <span className="text-blue-500">Cart</span>
        </h2>
      </div>

      <div className="flex max-md:flex-col gap-4 ">
        <div
          className={`${
            carts.length > 0
              ? "w-[100%] -ml-20 max-md:ml-0"
              : "w-[85%] max-md:w-[90%]"
          }  bg-[#F2F6FF] shadow-md rounded-lg shadow-blue-300/50 p-6`}
        >
          {carts.length > 0 ? (
            <RemoveCart
              carts={carts}
              courses={courses}
              handleClick={handleRemove}
            />
          ) : (
            <div className="flex flex-col gap-10 font-bold text-blue-500 text-2xl">
              {" "}
              {loader && <IoReload className="animate-spin" />}
              Your cart is empty!
              <div className="flex flex-col gap-4">
                <span className="text-sm text-black font-semibold">
                  What are you waiting for? Click below to add courses
                </span>
                <Button
                  type="solid"
                  className="text-sm"
                  onClick={() => navigate("/courses")}
                >
                  Add Courses
                </Button>
              </div>
            </div>
          )}
        </div>
        {carts.length > 0 && (
          <div className="flex flex-col w-[30%] max-md:w-[100%] gap-4 bg-[#F2F6FF] h-[200px] shadow-md shadow-blue-300/50 rounded-lg p-6">
            <div className="flex justify-between">
              <span className="font-semibold">Subtotal</span>
              <span className="">{calculateSum()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Discount</span>
              <span className="">{discount}</span>
            </div>
            <hr className="border-blue-500" />
            <div className="flex justify-between">
              <span className="font-semibold text-blue-700">Total</span>
              <span className="text-blue-700">{calculateSum() - discount}</span>
            </div>
            <div className="max-md:flex max-md:justify-center">
              <Button
                type="solid"
                className="ml-4 -mt-2 w-[100px] text-[12px]"
                src="/assets/cart.png"
                onClick={onSubmit}
              >
                Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UDCart;
