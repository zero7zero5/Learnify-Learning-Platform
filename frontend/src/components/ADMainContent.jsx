import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../components/CourseCard";

export default function ADMainContent({ details }) {
//   console.log(`${details}`);

  let [result, setResult] = useState();

  const getDetails = async () => {
    try {
      await axios.get(`http://localhost:3000/${details}s`).then((res) => {
        setResult(res.data);
        // console.log(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDetails();
  }, [details]);

    // console.log(result);

  // console.log(result?.details.replace(/"/g, ""));

  return (
    <div className="w-[60%] mt-20">
      {/* {details} */}
      {details === "user" ? (
        <>
          {result?.user?.map((ele, index) => (
            <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left rtl:text-right ">
                <thead class="text-xs text-gray-700 uppercase bg-blue-100 ">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      User Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                      User Email
                    </th>

                    <th scope="col" class="px-6 py-3">
                      Courses Enrolled
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Courses Completed
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class=" border-b bg-blue-500 text-white">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium whitespace-nowrap text-white"
                    >
                      {ele.name}
                    </th>
                    <td class="px-6 py-4 ">{ele.email}</td>
                    <td class="px-6 py-4">
                      {ele.purchaseCourse != undefined
                        ? ele.purchaseCourse.length
                        : 0}
                    </td>
                    <td class="px-6 py-4">
                      {ele.completedCourse != undefined
                        ? ele.completedCourse.length
                        : 0}
                    </td>

                    {/* <td class="px-6 py-4">$2999</td> */}
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </>
      ) : details === "instructor" ? (
        <>
          {result?.instructor?.map((ele, index) => (
            <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left rtl:text-right ">
                <thead class="text-xs text-gray-700 uppercase bg-blue-100 ">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      User Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                      User Email
                    </th>

                    <th scope="col" class="px-6 py-3">
                      Courses Published
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class=" border-b bg-blue-500 text-white">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium whitespace-nowrap text-white"
                    >
                      {ele.name}
                    </th>
                    <td class="px-6 py-4 ">{ele.email}</td>
                    <td class="px-6 py-4">
                      {ele.courseCreated != undefined
                        ? ele.courseCreated.length
                        : 0}
                    </td>

                    {/* <td class="px-6 py-4">$2999</td> */}
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </>
      ) : (
        <div className=" grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 my-2">
          {result?.courses?.map((course) => (
            <CourseCard
              title={course.title}
              description={course.description}
              price={course.price}
              thumbnailUrl={course.thumbnailUrl}
              rating={course.averageRating}
              instructorId={course.instructorId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
