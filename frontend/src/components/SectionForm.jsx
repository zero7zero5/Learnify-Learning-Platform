import react, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/accordion";
import { Box } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function DemoSectionForm({
  section,
  sections,
  setSections,
  currentSection,
  setCurrentSection,
  setCurrentLesson,
  index,
}) {
  let { courseId } = useParams();
  // const sections = useSelector((state) => state.sectionReducer.sections);
  const dispatch = useDispatch();

  const changeSection = () => {
    //if we press the section again
    console.log("changing section");
    console.log(index);
    if (currentSection != undefined && currentSection === index)
      setCurrentSection(undefined);
    else setCurrentSection(index);
    console.log(currentSection);
  };

  const changeLesson = (lessonIndex) => {
    setCurrentSection(index);
    setCurrentLesson(lessonIndex);
    // console.log(lessonIndex);
  };

  const updateSectionName = (e) => {
    const updatedSections = [...sections];
    updatedSections[index].sectionName = e.target.value;
    setSections(updatedSections);
  };

  const updateSectionNumber = (e) => {
    const updatedSections = [...sections];
    updatedSections[index].sectionNumber = e.target.value;
    setSections(updatedSections);
  };

  const addLesson = () => {
    const updatedSections = [...sections];
    updatedSections[index].lessons.push({
      title: "",
      videoUrl: "",
      lessonNumber: "",
      lessonDescription: "",
    });
    setSections(updatedSections);
  };

  const deleteLesson = async (lessonIndex) => {
    try {
      let sectionCheck;
      await axios
        .get(`http://localhost:3000/get-section/${courseId}/${index}`)
        // .post("http://localhost:3000/get-section", {
        // sectionNumber,
        // courseId,
        // })
        .then((res) => {
          // sectionCheck = res.data;
          sectionCheck = res.data;
          // console.log(section[0]);
        });

      const indexDelete = section[0]?.lessons?.findIndex(
        (ele) => ele.lessonNumber == lessonIndex
      );
      console.log(indexDelete);

      if (indexDelete != -1) {
        try {
          await axios.delete(
            `http://localhost:3000/section/${sectionCheck[0]?._id}/${lessonIndex}`
          );
          toast.success("lesson deleted successfully");
        } catch (err) {
          console.log(err);
        }
      }

      console.log("deleting");
    } catch (err) {
      console.log(err);
    }

    const updatedSections = [...sections];
    updatedSections[index].lessons.splice(lessonIndex, 1);
    setSections(updatedSections);
    // dispatch(setSection(updatedSections));
  };

  const deleteSection = async() => {
    try {
      let sectionCheck;
      await axios
        .get(`http://localhost:3000/get-section/${courseId}/${index}`)
        .then((res) => {
          sectionCheck = res.data;
        });

      // const indexDelete = section[0]?.lessons?.findIndex(
      //   (ele) => ele.lessonNumber == lessonIndex
      // );
      // console.log(indexDelete);

      if (sectionCheck?.length>0) {
        try {
          await axios.delete(
            `http://localhost:3000/section/${sectionCheck[0]?._id}`
          );
          toast.success("Section deleted successfully");
        } catch (err) {
          console.log(err);
        }
      }
    }catch(err){
      console.log(err);
    }
    const updatedSections = [...sections];
    updatedSections.splice(index, 1);
    setSections(updatedSections);
    // dispatch(setSection(updatedSections));
  };

  return (
    <AccordionItem
      //   onClick={changeSection}
      className="flex flex-col justify-center w-[80%] gap-1"
    
    >
      <h2 className="flex gap-2">
        <AccordionButton>
          <Box
            className=" px-2 flex flex-row justify-between items-center text-xs w-[100%] h-7 bg-blue-100 rounded-md"
            flex="1"
            textAlign="left"
            // onClose={() => console.log("close")}
            onClick={() => setCurrentSection(index)}
          >
            <h2 className="text-ellipsis overflow-hidden">
              {section.sectionName !== "" ? (
                <>{section.sectionName}</>
              ) : (
                <>Enter the section title</>
              )}
            </h2>

            <AccordionIcon
            // onClick={() => changeSection(index)}
            />
          </Box>
        </AccordionButton>
        <button onClick={() => deleteSection(index)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-3 h-3"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </h2>
      {section.lessons.map((lesson, lessonIndex) => (
        // <div className="flex flex-row justify-around items-center w-[100%]">
        <AccordionPanel
          key={lessonIndex}
          onClick={()=>changeLesson(lessonIndex)}
          className="cursor-pointer flex flex-row justify-evenly w-[100%] text-xs hover:bg-blue-100"
        >
          <h2 className="text-xs text-ellipsis overflow-hidden">
            {lesson.title.length !== 0 ? <>{lesson.title}</> : <>Enter</>}
          </h2>
          <button onClick={() => deleteLesson(lessonIndex)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-3 h-3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </AccordionPanel>
        // </div>
      ))}
    </AccordionItem>
  );
}
