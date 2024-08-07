import React from "react";

const AppInput = ({ type, placeholder, className, onChange, value }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className={`px-4 py-2 rounded-lg border-[1.5px] border-black focus:border-none  ${className}`}
    />
  );
};

export default AppInput;
