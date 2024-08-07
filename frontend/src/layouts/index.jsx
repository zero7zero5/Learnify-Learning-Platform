import React from "react";

const Layout = ({children }) => {
  return <div className={`max-w-screen-lg mx-auto px-2`}>{children}</div>;
};

export default Layout;
