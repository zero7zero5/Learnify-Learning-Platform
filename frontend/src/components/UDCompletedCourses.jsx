import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { authorizedApi } from "../services/apis/authorizedApi";
import CoursesCompleted from "./CoursesCompleted";

// const courseData = {
//   title: "Complete Bootcamp of HTML and CSS",
//   description: "Complete Bootcam of HTML and CSS",
//   averageRating: "0",
//   price: 500,
//   categoryId: "6603c83e6b751a3162fb0ce9",
//   instructorId: "6603acc9f96050f58e64a19b",
//   thumbnailUrl: "skefhkjh",
// };

// const sectionData = [
//   {
//     courseId: "6603eef9a1d14fdf1878b779",
//     sectionNumber: 1,
//     sectionName: "HTML   Course 1",
//     lessons: [
//       {
//         videoUrl: "kshjf",
//         title: "HTML   basics",
//         lessonNumber: 1,
//       },
//       {
//         videoUrl: "kshjf",
//         title: "HTML   intermediate",
//         lessonNumber: 2,
//       },
//       {
//         videoUrl: "kshjf",
//         title: "HTML   advanced",
//         lessonNumber: 3,
//       },
//     ],
//   },
//   {
//     courseId: "6603eef9a1d14fdf1878b779",
//     sectionNumber: 2,
//     sectionName: "HTML   Course 2",
//     lessons: [
//       {
//         videoUrl: "kshjf",
//         title: "HTML   basics",
//         lessonNumber: 1,
//       },
//       {
//         videoUrl: "kshjf",
//         title: "HTML   intermediate",
//         lessonNumber: 2,
//       },
//       {
//         videoUrl: "kshjf",
//         title: "HTML   advanced",
//         lessonNumber: 3,
//       },
//     ],
//   },
//   {
//     courseId: "6603eef9a1d14fdf1878b779",
//     sectionNumber: 3,
//     sectionName: "HTML   Course 3",
//     lessons: [
//       {
//         videoUrl: "kshjf",
//         title: "HTML   basics",
//         lessonNumber: 1,
//       },
//       {
//         videoUrl: "kshjf",
//         title: "HTML   intermediate",
//         lessonNumber: 2,
//       },
//       {
//         videoUrl: "kshjf",
//         title: "HTML   advanced",
//         lessonNumber: 3,
//       },
//     ],
//   },
// ];

export const UDCompletedCourses = ({ className }) => {
  const accessToken = useSelector((state) => state.userReducer.accessToken);
  const userId = useSelector((state) => state.userReducer.userDetails._id);
  const axiosInstance = authorizedApi(accessToken);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [progressObj, setProgressObj] = useState([]);
  const courseCompleted = [];
  useEffect(() => {
    const getPurchasedCourses = async () => {
      const courses = await axiosInstance.get(
        `user/purchased-courses/${userId}`
      );
      setPurchasedCourses(courses.data.purchasedCourses);
    };
    getPurchasedCourses();
  }, []);
  useEffect(() => {
    const getProgressObjects = async () => {
      try {
        const progressObjects = await Promise.all(
          purchasedCourses.map(async (courseId) => {
            const res = await axios.request({
              headers: {
                Authorization: `JWT ${accessToken}`,
              },
              method: "POST",
              url: `http://localhost:3000/progress-lesson`,
              data: {
                userId: userId,
                courseId: courseId,
              },
            });
            return res.data;
          })
        ); 
        progressObjects.map((obj) => {
          if(obj.progressObjects.length > 0)
          {
            // console.log(obj.progressObjects);
            setProgressObj((prevObj) => 
            ([...prevObj, obj.progressObjects]));
          }
        })
      } catch (err) {
        console.log("ERROR: ", err);
      }
    };
    getProgressObjects();
  }, [purchasedCourses]);
  let lessonCount = 0;
  let sectionsCompleted = 0;
  for(let i = 0; i < progressObj.length/2; i++)
  {
    progressObj[i].map((obj) => {
      obj.lessons.map((lesson) => {
        if(lesson.status === true)
         lessonCount++;
      })
      console.log(lessonCount);
      if(lessonCount === obj.lessons.length)
        sectionsCompleted++;
      lessonCount = 0;
    })
    if(sectionsCompleted === progressObj[i].length)
    {
      courseCompleted.push(progressObj[i][0].courseId);
      sectionsCompleted = 0;
    }
  }
  // console.log(courseCompleted);
 
  return (
    <div className={`w-[80%] max-md:w-[100%] p-4 ${className}`}>
      <div className="my-10 max-md:mt-0">
        <h2 className="text-2xl font-bold">
          <span className="text-blue-500">Completed</span> Courses
        </h2>
      </div>
      <CoursesCompleted details={courseCompleted}/>
    </div>
  );
};
