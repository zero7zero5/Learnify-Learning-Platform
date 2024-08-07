import React, { useState, useRef,useEffect } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import Certificate from "./Certificate";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";

const CourseCard = ({
  onClick,
  courseId,
  type,
  className,
  textClass,
  title,
  description,
  price,
  thumbnailUrl,
  rating,
  instructorId,
  buttonClass,
  imageClass
}) => {
  const navigate = useNavigate();
  const [lessonCount,setLessonCount] = useState(1);

  const redirection = () => {
    {
      console.log("yes", courseId);
      if (type === "purchased" && courseId !== undefined)
        navigate(`/course-content/${courseId}`);
    }
  };
// console.log(courseId)
  const getLessonCount = async () => {
    if(courseId!=undefined){
    await axios
     .get(`http://localhost:3000/lesson-count/${courseId}`)
     .then((res) => {
       setLessonCount(res.data.lessons);
      
     })
     .catch((error) => {
       //console.log(error);
       throw error;
     });
    }
 };
 

  const certificateRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const generatePDF = () => {
    const pdf = new jsPDF();

    // Get the element containing the CertificateComponent
    const element = certificateRef.current;

    // Use html2canvas to render the CertificateComponent to a canvas
    html2canvas(element).then((canvas) => {
      // Convert canvas to an image and add it to the PDF
      const imageData = canvas.toDataURL("image/png");
      pdf.addImage(
        imageData,
        "PNG",
        0,
        0,
        pdf.internal.pageSize.getWidth(),
        pdf.internal.pageSize.getHeight()
      );

      // Save the PDF
      pdf.save("certificate.pdf");
    });
  };

  useEffect(() => {
    getLessonCount();
  }, []);
 
  // const handleDownload = () => {
  //   const certificateRef = useRef(null);

  //   // using JavaScript method to get PDF file
  //   fetch("http://localhost:5173/SamplePDF.pdf")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.blob();
  //     })
  //     .then((blob) => {
  //       // Creating new object of PDF file
  //       const fileURL = window.URL.createObjectURL(blob);

  //       // Setting various property values
  //       let alink = document.createElement("a");
  //       alink.href = fileURL;
  //       alink.setAttribute("download", "Certificate_of_Completion");
  //       alink.click();
  //       alink.remove();
  //     })
  //     .catch((error) => {
  //       console.error("Error downloading PDF:", error);
  //     });
  // };

  return (
    <div
      onClick={onClick}
      className={`mt-4 ${
        type
          ? className
          : "w-[250px] h-[300px] max-md:w-[350px] max-md:h-[550px]"
      } border-1 shadow-md shadow-blue-300/50 rounded-md  bg-[#F2F6FF] flex flex-col items-center `}
    >
      <img
        src={thumbnailUrl}
        className={` ${
          type ? imageClass : "h-[150px] w-[100%] object-cover "
        } rounded-t-md `}
      />
      <div className="flex items-center mt-2 w-[85%] justify-between md:ml-[6px]">
        <div className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#3b82f6 "
            class="w-4 h-4 max-md:w-[22px]"
          >
            <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
          </svg>

          <span className="text-[10px] max-md:text-[14px]">{lessonCount} Lessons</span>
        </div>
        <div className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#3b82f6"
            class="w-4 h-4 max-md:w-[22px]"
          >
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
              clip-rule="evenodd"
            />
          </svg>

          <span className="text-[10px] max-md:text-[14px]">{Math.max(1,Math.ceil(lessonCount/4))} Week</span>
        </div>
      </div>
      <div className="mt-2 max-md:mt-4 flex flex-row w-[100%] justify-around items-center">
        <p
          className={`${
            type
              ? textClass
              : "w-[60%] truncate max-md:w-[250px] font-bold text-sm max-md:text-xl "
          } `}
        >
          {title}
        </p>
        <div className="flex flex-row gap-1 justify-center items-center">
          <img src="/assets/star.png" className="w-[14px] max-md:w-[22px]" />
          <span className="text-[12px] max-md:text-[20px]">{rating}</span>
        </div>
      </div>
      {!type && (
        <div className="flex items-center overflow-y-scroll ">
          <p className="w-[250px] max-md:w-[400px] max-md:text-[16px] p-[15px] text-[12px] truncate">
            {description}
          </p>
        </div>
      )}
      <div className="flex gap-8 flex-row justify-around items-center mb-2">
        {!type && <span className="font-bold max-md:text-2xl">₹{price}</span>}

        {type === "purchased" ? (
          <Button
            type="solid"
            className={`${
              type
                ? buttonClass
                : "text-sm w-[110px] max-md:w-[150px] max-md:text-lg"
            } `}
            onClick={redirection}
          >
            Go to course
          </Button>
        ) : type === "completed" ? (
          <>
            <Button
              type="solid"
              className={`${
                type
                  ? buttonClass
                  : "text-sm w-[110px] max-md:w-[150px] max-md:text-lg"
              } `}
              onClick={handleOpen}
            >
              Download Certificate
            </Button>
            <div
              ref={certificateRef}
              className={`${
                open ? "" : "hidden"
              } fixed left-20 bottom-0 w-[90%] bg-blue-100 h-[90%] flex flex-col justify-center items-center`}
            >
              <div className="absolute top-0 right-0">
                <button
                  className="bg-red-500 text-white px-2"
                  onClick={handleOpen}
                >
                  {" "}
                  X{" "}
                </button>
              </div>
              <Certificate courseName = {title}/>
              <button
                className="bg-blue-400 rounded-md p-1 text-white "
                onClick={generatePDF}
              >
                Download
              </button>
            </div>
          </>
        ) : (
          <Button
            type="solid"
            className={`${
              type
                ? buttonClass
                : "text-sm w-[110px] max-md:w-[150px] max-md:text-lg"
            } `}
            onClick={redirection}
          >
            Enroll Now
          </Button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
