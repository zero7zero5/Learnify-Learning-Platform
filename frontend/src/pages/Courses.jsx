import React from "react";
import AppInput from "../components/AppInput";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CourseCard from "../components/CourseCard";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Courses = () => {
  let { id } = useParams();
  //console.log("ID exists", id);

  const navigate = useNavigate();
  const [coursesData, setCoursesData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle search
  const handleSearch = async () => {
    try {
      console.log(searchQuery);
      const response = await axios.get(
        `http://localhost:3000/courses/search?query=${searchQuery}`
      );
      console.log(response.data);
      setCoursesData(response.data.courses);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCourses = () => {
    getAllCourses()
      .then((res) => {
        console.log("before", res.courses);
        setCoursesData(res.courses);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchCategories = () => {
    getAllCategories()
      .then((res) => {
        setCategoriesData(res.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, []);

  // axios function for getting all courses
  const getAllCourses = () => {
    return axios
      .get("http://localhost:3000/courses")
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        //console.log(error);
        throw error;
      });
  };

  // axios function for getting all categories
  const getAllCategories = () => {
    return axios
      .get("http://localhost:3000/all-categories")
      .then((res) => {
        // console.log(res);
        return res.data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };

  const handleCategoryClick = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/courses-by-category/${id}`
      );
      console.log("after", response.data.courses);
      setActiveCategory(id);
      setCoursesData(response.data.courses);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleCategoryClick(id);
  }, [id]);
  return (
    <div className="pt-20 pb-20">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between">
        <h1 className="text-3xl font-bold mb-3">
          Our
          <span className="text-blue-500"> Courses</span>
        </h1>
        <AppInput
          className="w-full md:w-1/3 md:h-11"
          placeholder="Search Courses here..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state on input change
        />
        <Button type="solid" onClick={handleSearch}>
          Search
        </Button>
      </div>
      {/* <div className="flex flex-col-reverse md:flex-row items-center justify-between">
        <h1 className=" text-center text-4xl font-bold my-3 md:text-left">
          All Courses of Learnify
        </h1>
        
      </div> */}
      <p className="text-gray-500 my-5">
        We have the best courses for you. Curated thousands of courses and all
        courses are divided by subjects and the subjects are divided by topics.
        In one place you can find many courses
      </p>
      <div className="mt-10 grid">
        <div className="flex gap-x-2 justify-between col-span-6 overflow-x-scroll md:col-span-5">
          {categoriesData.map((category) => (
            <CategoryCard
              key={category._id}
              id={category._id}
              title={category.categoryName}
              active={activeCategory === category._id} // Pass whether the category is active as a prop
              handleCategoryClick={handleCategoryClick}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 my-2">
        {coursesData.length > 0 ? (
          coursesData.map((course) => (
            <CourseCard
              onClick={() => navigate(`/course-preview/${course._id}`)}
              title={course.title}
              description={course.description}
              price={course.price}
              thumbnailUrl={`http://localhost:3000${course.thumbnailUrl}`}
              rating={course.averageRating}
              instructorId={course.instructorId}
            />
          ))
        ) : (
          <h2 className="mt-10 text-blue-500 font-bold">
            OOPS! No Related Courses Available !
          </h2>
        )}
      </div>
    </div>
  );
};

const CategoryCard = ({ title, active, id, handleCategoryClick }) => {
  return (
    <span
      onClick={() => handleCategoryClick(id)}
      className={`text-nowrap cursor-pointer py-3 px-8 rounded-md hover:bg-blue-500 hover:text-white ${
        active == true ? "bg-blue-500 text-white" : "bg-[#dde1ec]"
      }`}
    >
      {title}
    </span>
  );
};

export default Courses;
