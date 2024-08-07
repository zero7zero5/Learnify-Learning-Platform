import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { useSelector } from "react-redux";
import { authorizedApi } from "../services/apis/authorizedApi";

// http://localhost:3000/purchased-course/662d0c958b0856c649863428

export const UDPurchasedCourses = ({ className }) => {
  let [sectionData, setsectionData] = useState();
  const [courses, setCourses] = useState([]);

  const accessToken = useSelector((state) => state.userReducer.accessToken);
  const userId = useSelector((state) => state.userReducer.userDetails._id);

  const axiosInstance = authorizedApi(accessToken);

  const getDetails = async () => {
    try {
      await axiosInstance
        .get(`http://localhost:3000/purchased-course/${userId}`)
        .then((res) => {
          console.log("section", res.data);
          setCourses(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);
  return (
    <div className={`w-[80%] max-md:w-[100%] p-4 ${className}`}>
      <div className="my-10 max-md:mt-0">
        <h2 className="text-2xl font-bold">
          <span className="text-blue-500">Purchased</span> Courses
        </h2>
      </div>
      <div className="max-sm:overflow-x-auto max-sm:max-w-screen-lg max-md:h-[320px]">
        <div className="grid max-md:flex sm:grid-cols-2 lg:grid-cols-3 gap-2 max-md:gap-4 max-sm:min-w-max">
          {courses.length > 0 ? (
            courses?.map((course, index) => (
              <CourseCard
                key={index}
                title={course.courseId.title}
                courseId={course.courseId._id}
                type="purchased"
                thumbnailUrl={`http://localhost:3000${course.courseId.thumbnailUrl}`}
                rating={course.courseId.averageRating}
                imageClass="h-[45%] w-full object-cover"
                textClass="ml-1 font-semibold text-[12px] w-[120px] max-md:text-[14px]"
                buttonClass="absolute bottom-4 left-[25%] w-[100px] mt-2 text-[10px]"
                className="relative w-[200px] h-[250px] max-md:h-[270px]"
              />
            ))
          ) : (
            <div>No Courses Purchased</div>
          )}
        </div>
      </div>
    </div>
  );
};
