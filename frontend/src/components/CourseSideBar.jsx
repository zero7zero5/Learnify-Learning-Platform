import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/accordion";
import { Box } from "@chakra-ui/layout";
import { selectLessonUrl,selectlessonIndex,selectsectionIndex } from "../redux/slices/userDataSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { authorizedApi } from "../services/apis/authorizedApi";


export const CourseSideBar = () => {
  let courseId = useParams().courseId;
  const authToken = useSelector((state) => state.userReducer.accessToken);
  console.log(authToken);
  const selectedLessonUrl = useSelector(
    (state) => state.userReducer.selectedLessonUrl
  );
  const userId = useSelector((state) => state.userReducer.userDetails._id);
  console.log(userId)

  const dispatch = useDispatch();

  const axiosInstance = authorizedApi(authToken);

  const [courseData, setCourseData] = useState([]);
  const [sectionsData, setSectionsData] = useState([]);
  const [progressData, setProgressData] = useState([]);

  const handleClick = (lessonUrl,lessonIndex,index) => {
    dispatch(selectLessonUrl(lessonUrl));
    dispatch(selectlessonIndex(lessonIndex));
    dispatch(selectsectionIndex(index));


  };

  const handleCheckboxClick = async (sectionNumber, lessonNumber) => {
    try {
      const response = await axiosInstance.put(`/progress-lesson`, {
        userId: userId,
        courseId: courseId,
        sectionNumber: sectionNumber,
        lessonNumber: lessonNumber,
      });
      // Assuming the backend responds with updated progressData
      console.log(response.data)
      setProgressData(response.data.progressObjects);
    } catch (error) {
      console.log(error);
    }
  };

  const getCourseData = async () => {
    return await axiosInstance
      .get(`http://localhost:3000/courses/${courseId}`)
      .then((res) => {
        // console.log(res.data)
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProgressData = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("courseId", courseId);

      const response = await axiosInstance.post(
        `http://localhost:3000/progress-lesson`,
        {
          userId: userId,
          courseId: courseId,
        }
      );
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const fetchProgress = () => {
    getProgressData()
      .then((res) => {
        // console.log(res.progressObjects);
        setProgressData(res.progressObjects);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCourse();
    fetchSections();
    fetchProgress();
  }, []);

  return (
    <div className="relative z-50 w-full">
    <div className=" h-[540px] border-r flex flex-col shadow-sm">
      <div className="p-4 font-bold flex flex-col border-b text-xl bg-blue-500 text-white">
        <h1>{courseData.title}</h1>
      </div>
      <div className="flex flex-col w-full overflow-y-scroll">
     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea magni, beatae aliquam laudantium voluptatum quam veritatis sint perferendis laborum impedit! Iusto temporibus autem atque inventore quos exercitationem neque fugiat expedita?
     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea magni, beatae aliquam laudantium voluptatum quam veritatis sint perferendis laborum impedit! Iusto temporibus autem atque inventore quos exercitationem neque fugiat expedita?
     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea magni, beatae aliquam laudantium voluptatum quam veritatis sint perferendis laborum impedit! Iusto temporibus autem atque inventore quos exercitationem neque fugiat expedita?
     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea magni, beatae aliquam laudantium voluptatum quam veritatis sint perferendis laborum impedit! Iusto temporibus autem atque inventore quos exercitationem neque fugiat expedita?
     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea magni, beatae aliquam laudantium voluptatum quam veritatis sint perferendis laborum impedit! Iusto temporibus autem atque inventore quos exercitationem neque fugiat expedita?
     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea magni, beatae aliquam laudantium voluptatum quam veritatis sint perferendis laborum impedit! Iusto temporibus autem atque inventore quos exercitationem neque fugiat expedita?
     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea magni, beatae aliquam laudantium voluptatum quam veritatis sint perferendis laborum impedit! Iusto temporibus autem atque inventore quos exercitationem neque fugiat expedita?
     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea magni, beatae aliquam laudantium voluptatum quam veritatis sint perferendis laborum impedit! Iusto temporibus autem atque inventore quos exercitationem neque fugiat expedita?
     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea magni, beatae aliquam laudantium voluptatum quam veritatis sint perferendis laborum impedit! Iusto temporibus autem atque inventore quos exercitationem neque fugiat expedita?
     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea magni, beatae aliquam laudantium voluptatum quam veritatis sint perferendis laborum impedit! Iusto temporibus autem atque inventore quos exercitationem neque fugiat expedita?
     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea magni, beatae aliquam laudantium voluptatum quam veritatis sint perferendis laborum impedit! Iusto temporibus autem atque inventore quos exercitationem neque fugiat expedita?
        <Accordion allowMultiple>
          {sectionsData.map((section, index) => (
            <AccordionItem key={index} className="p-4 bg-gray-100">
              <h2 className="">
                <AccordionButton className="">
                  <Box as="span" flex="1" textAlign="left" className="text-lg">
                    {section.sectionNumber+1}. {section.sectionName}
                    <Box className="text-sm text-gray-500 pl-4">
                      {section.lessons.length} lessons
                    </Box>
                  </Box>

                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel p={4}>  
                {section.lessons.map((lesson,lessonIndex) => (
                  <div
                    className="flex items-center p-2"
                    onClick={() => {
                      // console.log(lesson.videoUrl);
                      handleClick(lesson.videoUrl,lessonIndex,index);
                    }}
                  >
                    <input
                      id={`lesson-checkbox-${lesson._id}`}
                      type="checkbox"
                      value=""
                      className="w-8 h-4 text-blue-600 bg-gray-900 border-gray-300 rounded"
                      checked={progressData.some(
                        (p) =>
                          p.sectionNumber === section.sectionNumber &&
                          p.lessons.some(
                            (l) =>
                              l.lessonNumber === lesson.lessonNumber && l.status
                          )
                      )}
                      onClick={() => {
                        handleCheckboxClick(
                          section.sectionNumber,
                          lesson.lessonNumber
                        );
                      }}
                    />

                    <label
                      htmlFor={`lesson-checkbox-${lesson._id}`}
                      className="ms-2 font-medium text-gray-900 dark:text-gray-300 text-lg"
                    >
                      {lesson.lessonNumber + 1}. {lesson.title}
                    </label>
                  </div>
                ))}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
    </div>
  );
};
