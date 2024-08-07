import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { authorizedApi } from "../services/apis/authorizedApi";

// const courseData = {
//   title: "Complete Bootcamp of HTML and CSS",
//   description:
//     "Welcome to the Complete Web Development Bootcamp, the only course you need to learn to code and become a full-stack web developer. With 150,000+ ratings and a 4.8 average, thiis Web Development course is one of the HIGHEST RATED courses in the history of Learnify! At 62+ hours, this Web Development course is without a doubt the most comprehensive web development course available online. Even if you have zero programming experience, this course will take you from beginner to mastery.  ",
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
//         videoUrl:
//           "https://player.vimeo.com/video/862451607?h=0c42376219&color=ffffff&title=0&byline=0&portrait=0",
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

export const CourseVideoPlayer = () => {
  let courseId = useParams().courseId;

  const [courseData, setCourseData] = useState([]);
  const [sectionsData, setSectionsData] = useState([]);

  const authToken = useSelector((state) => state.userReducer.accessToken);
  const axiosInstance = authorizedApi(authToken);

  const getCourseData = async () => {
    return await axiosInstance
      .get(`http://localhost:3000/courses/${courseId}`)
      .then((res) => {
        // console.log(res.data);
        return res.data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };

  const fetchCourse = () => {
    getCourseData()
      .then((res) => {
        setCourseData(res.course);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSectionsData = async () => {
    return await axiosInstance
      .get(`http://localhost:3000/section/${courseId}`)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };

  const fetchSections = () => {
    getSectionsData()
      .then((res) => {
        setSectionsData(res.sections);
        console.log(res.sections);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCourse();
    fetchSections();
  }, []);

  const selectedLessonUrl = useSelector(
    (state) => state.userReducer.selectedLessonUrl
  );

  const lessonIndex = useSelector((state) => state.userReducer.lessonIndex);
  const sectionIndex = useSelector((state) => state.userReducer.sectionIndex);
  console.log("sectionsDA", sectionIndex);
  return (
    <div className="flex flex-col max-w-4xl mx-auto pb-20">
      <div className="font-bold text-center text-xl mt-8">
        {/* {console.log(sectionsData)} */}
        {/* {sectionsData[sectionIndex]?.lessons[lessonIndex].title} */}
        Explore
      </div>
      <div className="p-4 ">
        <div className="relative aspect-video">
          <ReactPlayer
            url={`http://localhost:3000${selectedLessonUrl}`}
            width="90%"
            height="90%"
            controls={true}
          />
        </div>
      </div>
      <div>
        <p className="p-4 m-4">
          <p className="font-bold">Description:</p>
          {sectionsData[sectionIndex]?.lessons[lessonIndex]?.lessonDescription}
        </p>
      </div>
    </div>
  );
};

{
  /*<iframe
        src="https://player.vimeo.com/video/862451607?h=0c42376219&color=ffffff&title=0&byline=0&portrait=0"
        width="640"
        height="360"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
      ></iframe>
      <p>
        <a href="https://vimeo.com/862451607">BOOMERTOPIA</a> from{" "}
        <a href="https://vimeo.com/thedeadringer">Eddie Ringer</a> on{" "}
        <a href="https://vimeo.com">Vimeo</a>.
      </p> */
}
