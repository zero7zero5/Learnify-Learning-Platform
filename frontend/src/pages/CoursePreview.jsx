import Button from "../components/Button";
import Accordion from "../components/Accordion";
import Layout from "../layouts";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { authorizedApi } from "../services/apis/authorizedApi";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CoursePreview = () => {
  const navigate = useNavigate();
  const authToken = useSelector((state) => state.userReducer.accessToken);

  const userId = useSelector((state) => state.userReducer.userDetails._id);
  const axiosInstance = authorizedApi(authToken);

  const userRole = useSelector((state) => state.userReducer.userDetails.role);
  console.log("role", userRole);
  let { id } = useParams();
  const [course, setCourse] = useState({
    title: "",
    description: "",
    averageRating: 5,
    instructorId: {
      name: "",
    },
    price: 0,
    thumbnailUrl: "",
    categoryId: [],
  });
  const [popup, setPopup] = useState(false);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [cart, setCart] = useState([]);
  const [name, setName] = useState([]);

  const handleClick = () => {
    setPopup(!popup);
  };

  const handleGoToCourse = () => {
    console.log("yes");
    navigate(`/course-content/${id}`);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/courses/${id}`)
      .then((res) => {
        setCourse(res.data.course);
        fetchCategoryName();
        console.log("test", res.data.course);
      })
      .catch((error) => {
        // console.log(error);
        throw error;
      });
  }, []);

  const fetchCategoryName = async () => {
    console.log("course", course);
    try {
      const promises = course.categoryId.map(async (c_id) => {
        console.log("id", c_id);
        const response = await axios.get(
          `http://localhost:3000/category-name/${c_id}`
        );
        return response.data.categories;
      });
      const categoryNames = await Promise.all(promises);
      console.log("CCCCC", categoryNames);
      // Update state with category names
      setName(categoryNames);
      console.log("categoryNames", name);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axiosInstance.get(`/user/cart/${userId}`); // Assuming userId is available
        setCart(response.data.cart);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, []);

  useEffect(() => {
    axiosInstance
      .get(`/user/purchased-courses/${userId}`)
      .then((res) => {
        setPurchasedCourses(res.data.purchasedCourses);
        // console.log("t", res.data);
      })
      .catch((error) => {
        console.error("Error fetching purchased courses:", error);
      });
  }, []);

  const handleAddToCart = async () => {
    const courseId = id;
    await axiosInstance
      .post("/user/add-to-cart", {
        userId,
        courseId,
      })
      .then((res) => {
        toast.success("Added to Cart Successfully!");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const handleGoToCart = () => {
    navigate("/dashboard/cart");
  };

  return (
    <div className="relative pb-10">
      <div
        id="overlay"
        className={` ${
          popup ? "" : "hidden"
        } fixed inset-0 bg-black opacity-50 z-40`}
      ></div>
      <div
        className={` ${
          popup ? "" : "hidden"
        } z-40  xl:left-[25%] 2xl:left-[30%] left-[20%] top-[5%] max-lg:left-[8%] max-md:left-[4%] max-sm:left-[0%] max-md:top-[10%] items-center h-screen fixed`}
      >
        <div className="relative bg-[#2D2F31] rounded-sm max-sm:w-[640px] w-[700px] h-[550px]">
          <div className="ml-5 flex flex-col gap-2 justify-start">
            <span className="text-gray-300 text-2xl font-bold">
              {course.title}
            </span>
          </div>
          <div className="mt-5 flex justify-center items-center h-[400px]">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
              controls={true}
              config={{
                youtube: {
                  playerVars: {
                    fs: 1, // Enable fullscreen mode
                  },
                },
              }}
              width={"90%"}
              height={"80%"}
            />
          </div>
          <span
            className="absolute cursor-pointer top-8 right-5 text-white text-xl"
            onClick={handleClick}
          >
            &#10005;
          </span>
        </div>
      </div>
      <Layout>
        <div className="relative max-container flex pt-20 justify-start max-lg:flex-col-reverse">
          <div className="flex flex-col max-lg:ml-[20px] max-lg:mt-[110px] max-md:mt-[0px] w-[600px] max-sm:w-[600px] max-lg:w-[700px]">
            <h1 className="w-full max-sm:mt-[-60px] font-bold text-3xl max-sm:text-4xl max-sm:w-[600px]">
              {course.title}
            </h1>
            <p className="mt-8 text-xl max-sm:w-[500px] max-sm:text-2xl">
              {course.description}
            </p>
            <span className="font-bold text-yellow-500 mt-2 max-sm:text-2xl max-sm:mt-5">
              Rating: {course.averageRating}
            </span>
            <span className="text-lg mt-2  max-sm:mt-5 max-sm:text-2xl">
              Created by{" "}
              <a className="text-blue-500 max-sm:text-2xl">
                {course && course.instructorId.name}
              </a>
            </span>
            <span className="flex gap-2 items-center">
              <img
                src="/assets/web.svg"
                width={16}
                height={16}
                className="mt-2 inline-block"
              />
              <span className="mt-[7px]">English</span>
            </span>
            <div className=" lg:hidden flex flex-row items-center justify-center mt-24 gap-14 ">
              <span className=" font-bold text-3xl">Price: ₹799</span>
              {purchasedCourses.includes(id) && userRole === "user" ? (
                <Button
                  type="solid"
                  className={"w-[180px] h-[70px] text-2xl"}
                  onClick={handleGoToCourse}
                >
                  Go to Course
                </Button>
              ) : cart.includes(id) ? (
                <Button
                  type="solid"
                  className={"w-[180px] h-[70px] text-2xl"}
                  onClick={handleGoToCart}
                >
                  Go to Cart
                </Button>
              ) : (
                <Button
                  type="solid"
                  className={"w-[180px] h-[70px] text-2xl"}
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              )}
            </div>
          </div>
          <div className="lg:fixed lg:top-20 lg:right-24  ">
            <div className="lg:border-1 sticky lg:shadow-blue-300/50 lg:rounded-md lg:bg-[#F2F6FF] lg:shadow-md h-[480px] max-sm:w-[610px] max-md:w-[730px]">
              <div className="relative flex flex-col cursor-pointer">
                <img
                  src={`http://localhost:3000${course.thumbnailUrl}`}
                  className="w-[100%] lg:w-[340px] lg:h-[200px] object-cover cursor-pointer shadow-inner max-lg:w-full rounded-t-md"
                />
                <div
                  className="opacity-0 hover:opacity-100 transition-opacity duration-300"
                  onClick={handleClick}
                >
                  <div className="absolute top-0 rounded-md opacity-50 bg-black w-full h-full cursor-pointer"></div>
                  <div className="absolute  cursor-pointer top-0 left-0 w-full h-full flex justify-center items-end">
                    <p className="text-gray-200 text-lg max-lg:text-2xl font-bold">
                      Preview This Course
                    </p>
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                    <img
                      src="/assets/play.svg"
                      className="max-lg:w-[90px]"
                      width={52}
                      height={52}
                    />
                  </div>
                </div>
              </div>
              {/* <div className="absolute blur-3xl bg-purple-300:hidden rounded-b-full top-[250px] right-[125px] w-52 h-28"></div> */}
              <div className="max-lg:hidden absolute my-4 w-full">
                <ul className="flex flex-row gap-1 justify-center items-center">
                  {name.map((category, index) =>
                    category.map((categoryitem) => {
                      return (
                        <li className="text-[14px] border-1 border-[#DCDCDC] bg-blue-200 rounded-sm text-center px-2">
                          {categoryitem.categoryName}
                        </li>
                      );
                    })
                  )}
                </ul>
              </div>
              <div classname="flex flex-col">
                <span className="max-lg:hidden absolute mt-20 ml-[120px] font-bold text-xl">
                  Price: {"₹"}
                  {course.price}
                </span>
                <div className="max-lg:hidden absolute ml-28 mt-32">
                  {purchasedCourses.includes(id) && userRole === "user" ? (
                    <Button type="solid" onClick={handleGoToCourse}>
                      Go to Course
                    </Button>
                  ) : cart.includes(id) ? (
                    <Button type="solid" onClick={handleGoToCart}>
                      Go to Cart
                    </Button>
                  ) : (
                    <Button type="solid" onClick={handleAddToCart}>
                      Add to Cart
                    </Button>
                  )}
                  {/* <ToastContainer
                  toastStyle={{ zIndex: 9999 }}
                  position="top-center"
                /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 max-lg:hidden flex justify-start items-center mb-20 w-[60%]">
          <div className="relative border-1 shadow-lg rounded-md pb-24 py-4 px-4">
            <span className="absolute top-10 ml-5 font-bold text-3xl">
              What you&apos;ll <span className="text-blue-500">learn</span>
            </span>
            <img
              src="/assets/Course-Content.png"
              className="mt-32 ml-44 mb-24"
              width={340}
              height={340}
            />
            <ul className="ml-5">
              {/* using slice since the first and last characters are quotes */}
              {course.description.split(".", 4).map((content) => (
                <li>
                  <span className="font-bold text-xl mr-2">&#x2713;</span>{" "}
                  {content}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default CoursePreview;
