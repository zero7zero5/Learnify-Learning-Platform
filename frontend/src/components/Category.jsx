import { useNavigate } from "react-router-dom";
import axios from "axios";
const Category = ({ image, name, id }) => {
  const navigate = useNavigate();

  const redirect = (id) => {
    navigate(`/courses/${id}`);
    // handleCategoryClick(id);
  };
  // const handleCategoryClick = async (id) => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:3000/courses-by-category/${id}`
  //     );
  //     console.log("after", response.data.courses);
  //     setActiveCategory(id);
  //     setCoursesData(response.data.courses);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <section
      className="mx-3 my-4 border-1 flex items-center flex-col border-1 shadow-md rounded-md w-[200px] h-[150px] hover:scale-110 transition duration-300 ease-out hover:ease-in hover:cursor-pointer "
      onClick={() => redirect(id)}
    >
      <img src={image} className="mt-1 w-[120px] h-[120px]" />
      <p className="mt-[2px] font-comfortaa text-[14px]">{name}</p>
    </section>
  );
};

export default Category;
