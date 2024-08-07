import React from "react";
import CourseCard from "./CourseCard";
import {useState,useEffect} from "react";
import { useSelector } from "react-redux";
import axios from "axios"


const courseData = {
  title: "Complete Bootcamp of HTML and CSS",
  description: "Complete Bootcam of HTML and CSS",
  averageRating: "0",
  price: 500,
  categoryId: "6603c83e6b751a3162fb0ce9",
  instructorId: "6603acc9f96050f58e64a19b",
  thumbnailUrl: "skefhkjh",
};

const sectionData = [
  {
    courseId: "6603eef9a1d14fdf1878b779",
    sectionNumber: 1,
    sectionName: "HTML   Course 1",
    lessons: [
      {
        videoUrl: "kshjf",
        title: "HTML   basics",
        lessonNumber: 1,
      },
      {
        videoUrl: "kshjf",
        title: "HTML   intermediate",
        lessonNumber: 2,
      },
      {
        videoUrl: "kshjf",
        title: "HTML   advanced",
        lessonNumber: 3,
      },
    ],
  },
  {
    courseId: "6603eef9a1d14fdf1878b779",
    sectionNumber: 2,
    sectionName: "HTML   Course 2",
    lessons: [
      {
        videoUrl: "kshjf",
        title: "HTML   basics",
        lessonNumber: 1,
      },
      {
        videoUrl: "kshjf",
        title: "HTML   intermediate",
        lessonNumber: 2,
      },
      {
        videoUrl: "kshjf",
        title: "HTML   advanced",
        lessonNumber: 3,
      },
    ],
  },
  {
    courseId: "6603eef9a1d14fdf1878b779",
    sectionNumber: 3,
    sectionName: "HTML   Course 3",
    lessons: [
      {
        videoUrl: "kshjf",
        title: "HTML   basics",
        lessonNumber: 1,
      },
      {
        videoUrl: "kshjf",
        title: "HTML   intermediate",
        lessonNumber: 2,
      },
      {
        videoUrl: "kshjf",
        title: "HTML   advanced",
        lessonNumber: 3,
      },
    ],
  },
];

const IDCreatedCourse = ({ className }) => {

  
   
  let [courses, setCourses] = useState();
  const InstrcutorId = useSelector((state) => state.instructorReducer.instructorDetails.id);


  useEffect(() => {

    const getDetails = async () => {
      try {
        await axios.get(`http://localhost:3000/created-courses/${InstrcutorId}`).then((res) => {
          setCourses(res.data);
          console.log(res.data);
        });
      } catch (err) {
        console.log(err);
      }
    };

    getDetails();
    console.log(courses);
  }, []);


  

  return (
    <div className={`w-[80%] max-md:w-[100%] p-4 ${className}`}>
      <div className="my-10 max-md:mt-0">
        <h2 className="text-2xl font-bold">
          <span className="text-blue-500">Created</span> Courses
        </h2>
      </div>
      <div className="max-sm:overflow-x-auto max-sm:max-w-screen-lg max-md:h-[320px]">
        <div className="grid max-md:flex sm:grid-cols-2 lg:grid-cols-3 gap-12 max-md:gap-4 max-sm:min-w-max">
          {courses?.courses.length>0?
          (courses?.courses.map((course, index) => (
            <CourseCard
              key={index}
              courseId={course._id}
              title={course.title}
              rating={course.averageRating}
              thumbnailUrl={`http://localhost:3000${course.thumbnailUrl}`}
              type="purchased"
              imageClass="h-[45%] w-full object-cover"
              textClass="ml-1 font-semibold text-[12px] w-[120px] max-md:text-[14px]"
              buttonClass="w-[150px] mt-2 text-[10px]"
              className="w-[200px] h-[250px] max-md:h-[270px]"
            />
          ))):<></>}
        </div>
      </div>
    </div>
  );
};
export default IDCreatedCourse;
