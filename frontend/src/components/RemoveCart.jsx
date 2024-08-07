import React from "react";
import Button from "./Button";

const RemoveCart = ({ carts, courses, handleClick }) => {
  return (
    <div className="flex sm:flex-col max-sm:flex-row max-sm:grid-cols-2 gap-4 max-sm:overflow-x-auto max-sm:max-w-screen-lg p-2">
      {courses.map((course, index) => {
        return (
          <div
            key={course._id}
            // ref={cartRef}
            className={`flex max-sm:flex-col ${
              carts.length == 1 ? "max-sm:ml-auto max-sm:mr-auto" : ""
            } gap-4 bg-white shadow-md max-sm:min-w-[200px] max-sm:w-[200px] shadow-blue-300/50 rounded-lg`}
          >
            <img
              src={`http://localhost:3000${course.thumbnailUrl}`}
              alt={course.title}
              className="w-[200px] h-[115px] object-cover sm:rounded-l-md max-sm:rounded-t-md"
            />
            <div className="flex flex-col mt-4 gap-2 max-md:gap-12 max-md:mb-4 max-sm:text-center max-sm:mt-0">
              <p>{course.title}</p>
              <div className="flex max-sm:flex-col justify-center items-center mt-4 gap-4 max-sm:items-center max-sm:gap-2 max-sm:justify-center sm:justify-between w-[270px]">
                <span className="text-blue-800 font-semibold">
                  Price: ₹{course.price}
                </span>
                <div onClick={() => handleClick(index)}>
                  <Button
                    type="solid"
                    src="/assets/delete.png"
                    className="mr-2 text-[12px]"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RemoveCart;
