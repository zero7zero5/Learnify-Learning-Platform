import React from "react";

const Button = ({ type, children, onClick, className, src }) => {
  const btnClassName = `px-4 py-2 rounded-lg border-[1.5px] border-blue-500 hover:bg-blue-600 hover:border-blue-600 hover:text-white ${
    type === "solid" ? "text-white bg-blue-500" : "text-black"
  } ${className}`;

  return (
    // { src ? () : ()}
    <>
      <div className={`${src ? "" : "hidden"}`}>
        <button onClick={onClick} className={btnClassName}>
          <div className="flex gap-1">
            <img src={src} className="w-4" />
            {children}
          </div>
        </button>
      </div>
      <div className={`inline-block ${!src ? "" : "hidden"}`}>
        <button onClick={onClick} className={btnClassName}>
          {children}
        </button>
      </div>
    </>
  );
};

export default Button;
