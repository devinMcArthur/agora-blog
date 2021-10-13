import React from "react";

const DefaultElement: React.FC = ({ children, ...props }) => {
  return <p {...props}>{children}</p>;
};

export default DefaultElement;
