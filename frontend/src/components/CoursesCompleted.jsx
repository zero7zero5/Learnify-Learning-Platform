import React, { useEffect, useState } from "react";
import { authorizedApi } from "../services/apis/authorizedApi";
import { useSelector } from "react-redux";
import CourseCard from "./CourseCard";

const CoursesCompleted = ({ details }) => {
    const accessToken = useSelector((state) => state.userReducer.accessToken);
    const axiosInstance = authorizedApi(accessToken);
  const [coursesCompleted, setCoursesCompleted] = useState([]);
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const promises = details.map(async (course) => {
          const res = await axiosInstance.get(`/courses/${course}`);
          console.log(res.data);
          return res.data.course;
        });
        const coursesData = await Promise.all(promises);
        setCoursesCompleted(coursesData);
        console.log("COURSES DA!!", coursesCompleted);
      } catch (error) {
        console.error("Error fetching course items:", error);
      }
    };
    fetchCourseDetails();
  }, [details]);
  console.log(coursesCompleted);
  return (
    <div className="max-sm:overflow-x-auto max-sm:max-w-screen-lg max-md:h-[320px]">
      <div className="grid max-md:flex sm:grid-cols-2 lg:grid-cols-3 gap-12 max-md:gap-4 max-sm:min-w-max">
        {coursesCompleted.map((course, index) => (
          <CourseCard
            key={index}
            thumbnailUrl={`http://localhost:3000${course.thumbnailUrl}`}
            title={course.title}
            rating={course.averageRating}
            type="completed"
            imageClass="h-[45%] w-full object-cover"
            textClass="ml-1 font-semibold text-[12px] w-[120px] max-md:text-[14px]"
            buttonClass="w-[150px] mt-2 text-[10px]"
            className="w-[200px] h-[250px] max-md:h-[270px]"
          />
        ))}
      </div>
    </div>
  );
};

export default CoursesCompleted;
