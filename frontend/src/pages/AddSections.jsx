import React, { useEffect, useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// import { ToastContainer,toast } from "react-toastify";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/accordion";
import { Box } from "@chakra-ui/layout";
import SectionForm from "../components/SectionForm";
import {
  setSectionName,
  setSectionNumber,
} from "../redux/slices/sectionDataSlice";

const schema = yup.object({
  sectionTitle: yup.string().required(),
  lessonTitle: yup.string().required(),

  videoURL: yup.mixed().required(),
  lessonNumber: yup.string().required(),
  lessonDescription: yup.string().required(),
});

export default function AddSections() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  let { courseId } = useParams();
  // console.log(courseId);

  const [sections, setSections] = useState([]);

  const [currentSection, setCurrentSection] = useState();
  const [currentLesson, setCurrentLesson] = useState();
  const [editSectionName, setEditSectionName] = useState(true);

  const access = sections[currentSection]?.lessons[currentLesson];

  const addSection = () => {
    // console.log(sections);
    setSections([
      ...sections,
      {
        sectionName: "",
        sectionNumber: "",
        lessons: [
          {
            title: "",
            videoUrl: "",
            lessonNumber: "",
            lessonDescription: "",
          },
        ],
        courseId: courseId,
      },
    ]);
    console.log(sections);
    // setCurrentSection(sections.length);
  };

  const updateSectionName = (e) => {
    console.log("updating");
    console.log(currentSection);
    const updatedSections = [...sections];
    updatedSections[currentSection].sectionName = e.target.value;
    setSections(updatedSections);
  };

  const addLesson = () => {
    if (currentSection === undefined) {
      toast.error("First add or select sections");
      return;
    }

    toast.success(`Lesson added to section number ${currentSection + 1}`);
    const updatedSections = [...sections];
    updatedSections[currentSection].lessons.push({
      title: "",
      videoUrl: null,
      lessonNumber: "",
      lessonDescription: "",
    });
    setSections(updatedSections);
    // dispatch(setSection(updatedSections));
  };

  const handleChange = (e) => {
    const updatedSections = [...sections];

    const { name, values, files } = e.target;
    console.log(files[0]);
    updatedSections[currentSection].lessons[currentLesson][field] = files[0];
    setSections(updatedSections);
  };
  const updateLesson = (e, field) => {
    const updatedSections = [...sections];

    if (field === "videoUrl") {
      console.log("file updated");
      const { name, values, files } = e.target;
      console.log(files[0]);
      updatedSections[currentSection].lessons[currentLesson][field] = files[0];
      setSections(updatedSections);
    } else {
      updatedSections[currentSection].lessons[currentLesson][field] =
        e.target.value;
      setSections(updatedSections);
    }
  };

  const createCourse = async () =>{
    let sectionCheck;
    try {
      if (courseId != undefined) {
        await axios
          .get(`http://localhost:3000/section/${courseId}`)
          .then((res) => {
            sectionCheck = res.data;
          });

      }
    } catch (err) {
      console.log(err);
    }


    if(sections.length==0 || sectionCheck.sections.length===0){
    toast.error("Add sections or lessons");
    return;
    }

    navigate("/instructor-dashboard/created-courses");
  }

  const onSubmit = async (data) => {
    console.log(data);

    const {
      sectionTitle,
      lessonTitle,
      videoURL,
      // lessonNumber,
      lessonDescription,
    } = data;

    const sectionNumber = currentSection;
    const sectionName = sectionTitle;
    const title = lessonTitle;
    const lessonLength = 0;
    const lessonNumber = currentLesson;

    const fileURL = videoURL[0];
    // console.log(file);
    console.log(fileURL);
    const formData = new FormData();

    formData.append("sectionNumber", currentSection);
    formData.append("sectionName", sectionTitle);
    formData.append("title", lessonTitle);
    formData.append("lessonNumber", lessonNumber);
    formData.append("lessonLength", 1);
    formData.append("lessonDescription", lessonDescription);
    formData.append("file", fileURL);
    formData.append("courseId", courseId);

    console.log(formData);

    let sectionCheck;

    try {
      if (courseId && sectionNumber != undefined) {
        console.log("yes");
        await axios
          .get(`http://localhost:3000/get-section/${courseId}/${sectionNumber}`)
          // .post("http://localhost:3000/get-section", {
          // sectionNumber,
          // courseId,
          // })
          .then((res) => {
            // console.log(res.data);
            sectionCheck = res.data;
            // sectionCheck = res.data;
          });

        console.log(sectionCheck.length);
      }
    } catch (err) {
      console.log(err);
    }

    if (sectionCheck?.length > 0) {
      console.log("yes");
      try {
        const response = await axios
          .put(
            `http://localhost:3000/section/${sectionCheck[0]?._id}`,
            formData,
            {
              // title,
              // lessonNumber,
              // lessonLength,
              // lessonDescription,
              // fileURL,
              headers: {
                "Content-Type": "multipart/form-data", // content type to multipart/form-data for file upload
              },
            }
          )
          .then((response) => {});

        toast.success("section created succesfully");
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await axios
          .post("http://localhost:3000/section", formData, {
            // sectionNumber,
            // sectionName,
            // title,
            // lessonNumber,
            // lessonLength,
            // lessonDescription,
            // file,
            // courseId,
            headers: {
              "Content-Type": "multipart/form-data", // content type to multipart/form-data for file upload
            },
          })
          .then((response) => {});

        toast.success("section created succesfully");
      } catch (err) {
        console.log(err);
      }
    }
  };

  // const updateSectionName

  return (
    <div className="h-screen pt-10">
      <div className="flex flex-col justify-center items-center w-[100%] h-[100%]">
        <div className="text-3xl font-semibold">
          <span>Add course</span>
          &nbsp;
          <span className="text-blue-500">Contents</span>
        </div>
        <div className="mt-4 text-center text-2xl font-semibold">
          Mastering Web Development
        </div>
        <div className="mt-14 flex flex-row max-sm:flex-col justify-evenly w-[100%] h-[60%]">
          {" "}
          <div className="flex flex-col justify-center items-center w-[30%] max-sm:w-[100%]">
            <button
              className="flex justify-center items-center text-base  rounded-md min-w-28 h-[10%] text-white bg-blue-500 "
              onClick={addSection}
            >
              Add Section
            </button>
            <div className="mt-8 w-[100%] h-[80%] rounded-xl bg-[#F2F6FF] shadow-blue-300/50 shadow-md ">
              <div className="mt-8 flex flex-col items-center w-[100%] h-[80%] overflow-y-scroll scroll-smooth">
                <Accordion
                  allowToggle
                  className="flex flex-col gap-1 justify-start items-center w-[100%] h-[100%]  overflow-y-scroll scroll-smooth "
                >
                  {sections.map((section, index) => (
                    <SectionForm
                      key={index}
                      section={section}
                      sections={sections}
                      setSections={setSections}
                      setCurrentSection={setCurrentSection}
                      setCurrentLesson={setCurrentLesson}
                      currentSection={currentSection}
                      index={index}
                    />
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
          <div className="flex  flex-col justify-center items-center w-[40%]">
            <button
              onClick={addLesson}
              className="flex justify-center items-center text-base  rounded-md min-w-28 h-[10%] text-center text-white bg-blue-500"
            >
              Add Lesson
            </button>
            <div className="mt-8 flex flex-col justify-around items-center w-[100%] h-[80%] rounded-xl bg-[#F2F6FF] shadow-blue-300/50 shadow-md">
              {currentLesson !== undefined && sections.length !== 0 ? (
                <>
                  <div className="mt-6 flex flex-row items-center justify-center gap-4 w-[100%] h-[10%] font-bold text-2xl">
                    {sections[currentSection]?.sectionName?.length === 0 ||
                    editSectionName === true ? (
                      <>
                        <form className="flex flex-row justify-center items-center w-[100%] h-[100%] gap-2 ">
                          <input
                            {...register("sectionTitle")}
                            type="text"
                            value={sections[currentSection]?.sectionName}
                            onChange={updateSectionName}
                            placeholder="Section title"
                            className=" px-2 w-[60%] h-[100%] rounded-md placeholder-gray-500 border text-xs font-normal border-blue-300"
                          />
                          <button
                            className="bg-blue-300 py-1 rounded-md hover:bg-blue-400"
                            onClick={(e) => {
                              setEditSectionName(false);
                              e.preventDefault();
                              // updateSection();
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m4.5 12.75 6 6 9-13.5"
                              />
                            </svg>
                          </button>
                        </form>
                      </>
                    ) : (
                      <>
                        {sections[currentSection].sectionName}
                        <button
                          onClick={(e) => {
                            setEditSectionName(true);
                            e.preventDefault();
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#6b7280"
                            class="mt-1 w-5 h-5"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                            />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                  <div className="flex flex-col justify-start items-center gap-2 text-xs w-[100%] h-[90%]">
                    <form
                      className="w-[100%] h-[85%] gap-2 flex flex-col justify-start items-center"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <input
                        {...register("lessonTitle")}
                        type="text"
                        value={access?.title}
                        onChange={(e) => updateLesson(e, "title")}
                        placeholder="Lesson title"
                        className="mt-6 px-2 w-[68%] h-[20%] rounded-md placeholder-gray-500 border-blue-300 border"
                      />

                      <input
                        {...register("videoURL")}
                        type="file"
                        // value={access?.videoUrl}
                        accept="video/*"
                        // onChange={(e) => updateLesson(e, "videoUrl")}
                        // onChange={(e) => setValue('videoURL', e.target.files[0] )}
                        placeholder="Video URL"
                        className=" w-[68%] h-[20%] px-1 bg-white rounded-md placeholder-gray-500 border border-blue-300"
                      />
                      <input
                        {...register("lessonNumber")}
                        type="number"
                        value={access?.lessonNumber}
                        onChange={(e) => updateLesson(e, "lessonNumber")}
                        placeholder="Lesson number"
                        className="px-2 w-[68%] h-[20%] rounded-md placeholder-gray-500 border border-blue-300"
                      />
                      <input
                        {...register("lessonDescription")}
                        type="text"
                        value={access?.lessonDescription}
                        onChange={(e) => updateLesson(e, "lessonDescription")}
                        placeholder="Lesson Description"
                        className="px-2 w-[68%] h-[20%] rounded-md placeholder-gray-500 border border-blue-300"
                      />

                      <button className="mt-4 flex justify-center items-center text-base  rounded-md min-w-32 h-[30%] text-center text-white bg-blue-500">
                        Make Changes
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            <button 
            onClick={createCourse}
            className="mt-4 flex justify-center items-center text-base  rounded-md min-w-32 h-[10%] text-center text-white bg-blue-500">
              Create course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
