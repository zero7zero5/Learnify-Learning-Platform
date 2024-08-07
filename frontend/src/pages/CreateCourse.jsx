import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authorizedApi } from "../services/apis/authorizedApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const instructorId = useSelector(
    (state) => state.instructorReducer?.instructorDetails?.id
  );

  const [categoriesData, setCategoriesData] = useState([]);

  const authToken = useSelector((state) => state.instructorReducer.accessToken);
  const axiosInstance = authorizedApi(authToken);

  const fetchCategories = () => {
    getAllCategories()
      .then((res) => {
        setCategoriesData(res.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // axios function for getting all categories
  const getAllCategories = () => {
    return axiosInstance
      .get("http://localhost:3000/all-categories")
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  {
    /* Update once the routing has been done */
  }
  const [returnedCourseData, setCourseData] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    price: "",
    thumbnailUrl: null, // State to hold the selected thumbnail file
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnail") {
      setFormData((prevData) => ({
        ...prevData,
        thumbnailUrl: files[0], // Update thumbnail with the selected file
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("categoryId", formData.categoryId);
      formDataToSend.append("averageRating", 0);
      formDataToSend.append("instructorId", instructorId);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("file", formData.thumbnailUrl); // Append thumbnail file
      console.log(formDataToSend);
      const res = await axiosInstance.post("/courses", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data", // content type to multipart/form-data for file upload
        },
      });
      // redirect the user to another page after successful course creation
      toast.success("Course Created Successfully...");
      navigate(`/add-sections/${res.data.course._id}`);
    } catch (error) {
      console.error("Error creating course:", error);
    }
    // console.log(res.data);
    // navigate(`/ad-section/${}`)
  };

  return (
    <div className="container mx-auto pt-14">
      <h1 className="text-3xl font-semibold mb-4 text-center">
        Create a New Course
      </h1>
      <form onSubmit={handleSubmit} className="ml-[10%] mr-[10%]">
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="title">
            Course Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className=" border border-gray-300 rounded-md px-4 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="description"
          >
            Course Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            rows="4"
            required
          ></textarea>
        </div>
        {/* Dropdown for selecting category */}
        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="categoryId"
          >
            Category
          </label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-[50%] border border-gray-300 rounded-md px-4 py-2"
            required
          >
            <option value="">Select Category</option>
            <option value="web">WEB DEV</option>
            {/* Populate options dynamically based on categories fetched from backend */}
            {/* Example: <option value="categoryId">Category Name</option> */}
            {categoriesData.map((category) => (
              <option value={category._id}>{category.categoryName}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="price">
            Price ($)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-[50%] border border-gray-300 rounded-md px-4 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="thumbnail"
          >
            Thumbnail Image
          </label>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            accept="image/*"
            onChange={handleChange}
            className="w-[50%] border border-gray-300 rounded-md px-4 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
