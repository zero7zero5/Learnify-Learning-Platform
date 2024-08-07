import React from "react";
import { useSelector } from "react-redux";

const UDMainContent = ({ className }) => {
  const user = useSelector((state) => state.userReducer);
  const instructor = useSelector((state) => state.instructorReducer);
  let currentUser;
  user.isLoggedIn
    ? (currentUser = user.userDetails)
    : (currentUser = instructor.instructorDetails);
  console.log(currentUser);
  const dateString = currentUser.date;
  const dateTime = new Date(dateString);
  const date = dateTime.toDateString();
  const time = dateTime.toTimeString().split(' ')[0];
  return (
    <div className={`w-[80%] p-4 ${className}`}>
      <div className="my-10 max-md:mt-0">
        <h2 className="text-2xl font-bold">
          My <span className="text-blue-500">Profile</span>
        </h2>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-2 max-sm:grid-cols-1">
          <div>
            <p className="flex flex-col gap-2 mb-4">
              <span className="font-semibold">Name</span> {currentUser.name}
            </p>
            <p className="flex flex-col gap-2 mb-4">
              <span className="font-semibold">Email</span> {currentUser.email}
            </p>
          </div>
          <div className="ml-4 max-sm:ml-0">
            <p className="flex flex-col gap-2 mb-4">
              {/* date is in the form of yyyy-mm-dd  */}
              <span className="font-semibold">Joined</span> {date}, {time} (Locale - 24hr)
            </p>
            <p className="flex flex-col gap-2 mb-4">
              <span className="font-semibold">Role</span> {currentUser.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UDMainContent;
