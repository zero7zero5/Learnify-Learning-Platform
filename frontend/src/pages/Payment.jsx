import React from "react";
import { useRef, useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { authorizedApi } from "../services/apis/authorizedApi";
import { toast } from "react-toastify";
import axios from "axios";

const Payment = () => {
  const { total } = useParams();
  const navigate = useNavigate();
  const authToken = useSelector((state) => state.userReducer.accessToken);
  const userId = useSelector((state) => state.userReducer.userDetails._id);
  const axiosInstance = authorizedApi(authToken);
  const [carts, setCarts] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axiosInstance.get(`/user/cart/${userId}`); // Assuming userId is available
        setCarts(response.data.cart);
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
  const onPurchase = async () => {
    try {
      await Promise.all(
        courses.map(async (course) => {
          await axios.request({
            headers: {
              Authorization: `JWT ${authToken}`,
            },
            method: "POST",
            url: `http://localhost:3000/purchase-course`,
            data: {
              userId: userId,
              courseId: course._id,
            },
            // formData
          });
        })
      );
      toast.success("Course bought successfully");
      carts.map((cart, index) => handleRemove(index));
      setCarts([]);
      navigate("/dashboard/purchased-courses");
    } catch (err) {
      console.log("Error: ");
      console.log(err);
      toast.error("Failed to purchase courses. Please try again later.");
    }
  };
  return (
    <div className="">
      <div className="flex justify-center min-h-screen items-center">
        <div className="flex items-center w-full flex-row justify-around">
          <img src="/assets/payment.png" className="w-[30%] max-md:hidden"></img>
          <hr className="border-[1px] h-[450px] border-blue-400 max-md:hidden"></hr>
          <div className="w-[35%] max-md:min-w-[50%] max-sm:min-w-[80%] flex flex-col justify-center items-center">
            <span className="font-bold text-2xl">
              Buy <span className="text-blue-500"> Course</span>
            </span>
            <div className="mt-4 flex flex-col gap-2 items-center w-full bg-[#F2F6FF] shadow-lg shadow-blue-300/50 rounded-md">
              <span className="mt-4 mb-4">Card Payment</span>
              <input
                type="text"
                placeholder="Name"
                className="p-1 border-black border-[1px] rounded-sm w-[75%]"
              ></input>
              <div className="relative w-[75%]">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="p-1 border-black border-[1px] rounded-sm w-full"
                ></input>
                <img
                  src="/assets/mastercard.png"
                  className="w-[20px] absolute top-3 right-3"
                />
              </div>

              <div className="flex flex-col gap-2 justify-center">
                <span className="ml-11">Expiry</span>
                <div className="flex w-full justify-center gap-4 ">
                  <input
                    type="text"
                    placeholder="Month"
                    className="p-1 border-black border-[1px] rounded-sm w-[25%]"
                  ></input>
                  <input
                    type="text"
                    placeholder="Year"
                    className="p-1 border-black border-[1px] rounded-sm w-[25%]"
                  ></input>
                  <input
                    type="text"
                    placeholder="CVV"
                    className="p-1 border-black border-[1px] rounded-sm w-[15%]"
                  ></input>
                </div>
              </div>
              <div className="flex gap-20 mt-4">
                <span>No of Courses: {carts.length}</span>
                <span className="text-blue-700 font-semibold"> ₹{total} </span>
              </div>
              <button
                className="bg-white border-blue-500 border-[1px] hover:bg-blue-500 hover:text-white text-blue-500 p-1 rounded-md mt-4 mb-8"
                onClick={onPurchase}
              >
                {" "}
                Complete Purchase{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
