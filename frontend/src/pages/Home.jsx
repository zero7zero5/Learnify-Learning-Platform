import React from "react";
import Layout from "../layouts";
import Button from "../components/Button";
import AppInput from "../components/AppInput";
import CourseCard from "../components/CourseCard";
import Category from "../components/Category";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
  const [coursesData, setCoursesData] = useState([]);

  const getAllCourses = async () => {
    await axios
      .get("http://localhost:3000/featured-courses")
      .then((res) => {
        setCoursesData(res.data.courses);
      })
      .catch((error) => {
        throw error;
      });
  };

  useEffect(() => {
    getAllCourses();
  }, []);
  const navigate = useNavigate();
  return (
    <Layout className="">
      <div className=" grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 pt-28">
        <div className=" text-center md:text-left">
          <h1 className="text-5xl font-bold">
            The <span className="text-blue-500">Best</span>
          </h1>
          <h1 className="text-5xl font-bold">
            Way for <span className="text-blue-500">Learning</span>
          </h1>
          <p className="my-10">
            Explore our diverse range of course designed to empower your
            learning journey and fuel your personal and professional growth
          </p>
          <div>
            <Link to="/courses">
              <Button className="mx-2" type="solid">
                Explore Courses
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex relative justify-center">
          <div className="-z-10 absolute top-0 left-12 bg-blue-500 rounded-full w-72 h-72 filter blur-2xl opacity-40 mix-blend-multiply animate-blob"></div>
          <div className="-z-10 absolute top-12 right-0 bg-blue-700 rounded-full w-72 h-72 filter blur-2xl opacity-30 mix-blend-multiply animate-blob animation-delay-2s"></div>
          <img src="/assets/Hero.png" className="w-96 h-96" />
        </div>
      </div>

      <div className="mt-24">
        <div className="text-center my-10 ">
          <h2 className="text-4xl font-bold">
            <span className="text-blue-500">Featured</span> Courses
          </h2>
          <p className="mt-2">
            Explore our top courses on the cutting edge techonologies created
            carefully by our highly experienced and certified{" "}
            <span className="text-blue-500">instructors</span>.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center md:flex-row md:justify-around">
          {coursesData && coursesData.length > 0 ? (
            coursesData?.map((course, index) => (
              <CourseCard
                key={index}
                onClick={() => navigate(`/course-preview/${course._id}`)}
                courseId={course._id}
                title={course.title}
                description={course.description}
                price={course.price}
                thumbnailUrl={`http://localhost:3000${course.thumbnailUrl}`}
                rating={course.averageRating}
                instructorId={course.instructorId}
              />
            ))
          ) : (
            <></>
          )}
        </div>
        <div className="py-8  flex justify-center" id="about-us">
          <NavLink to="/courses">
            <Button>See More Courses</Button>
          </NavLink>
        </div>
      </div>
      <div className="flex flex-col items-center my-5">
        <h2 className="text-4xl font-bold">
          <span className="text-blue-500">Trending</span> Categories
        </h2>
        <div className="grid grid-rows-4 md:grid-cols-2 md:grid-rows-2 lg:grid-rows-1 lg:grid-cols-4">
          <Category
            image={"/assets/WebDevelopment.png"}
            name="Web Development"
            id="6603c83e6b751a3162fb0ce9"
          />
          <Category
            image={"/assets/Business.png"}
            name="Business Development"
            id="662f57928169be44b279df8c"
          />
          <Category
            image={"/assets/Communication.png"}
            name="Communication"
            id="662f57ad8169be44b279df8d"
          />
          <Category
            image={"/assets/photography.png"}
            name="Photography"
            id="662f57bf8169be44b279df8e"
          />
        </div>
      </div>
      <div className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-1">
        <div className="flex justify-center">
          <img src="/assets/education.png" alt="" className="h-[250px]" />
        </div>
        <div className="flex flex-col justify-center items-center">
          <div>
            <h2 className="text-3xl font-bold">
              <span className="text-blue-500">Premium</span> Experience
            </h2>
            <ul className="flex flex-col justify-between">
              <li className="text-xl my-2">Easily Accessible</li>
              <li className="text-xl my-2">Fun Learning Experience</li>
              <li className="text-xl my-2">Daily Assignments</li>
              <li className="text-xl my-2">International standards</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center my-10">
        <h2 className="text-4xl font-bold">
          See what others are <span className="text-blue-500">Achieving </span>
          through <span className="text-blue-500">Learnify</span>
        </h2>
        <div className="mt-10 flex overflow-x-auto gap-8 h-[200px]">
          <Testimonials
            src={"/assets/Testimonial-male.png"}
            name="Jake"
            review="Learnify helped me get a career in Bounteous x Accolite as a Software
        Analyst"
          />
          <Testimonials
            src={"/assets/Testimonial-female.png"}
            name="Jane"
            review="Learnify offers an engaging and comprehensive learning experience, with practical insights"
          />
          <Testimonials
            src={"/assets/Testimonial-female.png"}
            name="Julie"
            review="Highly recommend Learnify for anyone seeking to acquire new knowledge"
          />
          <Testimonials
            src={"/assets/Testimonial-male.png"}
            name="John"
            review="Learnify's structured approach and interactive content make learning enjoyable"
          />
        </div>
      </div>

      <div className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-1">
        <div className="flex flex-col items-center justify-center">
          <h2 className=" text-3xl font-bold text-center my-3">
            Become an <span className="text-blue-500">Instructor</span>
          </h2>
          <p className="text-center">
            Wanna start career as an instructor? It's a rewarding path where you
            can share your knowledge and inspire others to learn. If you're
            passionate about teaching, it might be the perfect fit for you.
          </p>
          <Button
            onClick={() => navigate("/instructor-register")}
            type="solid"
            className="my-3"
          >
            Know More
          </Button>
        </div>
        <div className="flex justify-center">
          <img className="h-[250px]" src="../../public/assets/Instructor.png" />
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default Home;
