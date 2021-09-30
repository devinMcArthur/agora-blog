import React from "react";

const BoldElement: React.FC = ({ children, ...props }) => {
  return <strong {...props}>{children}</strong>;
};

export default BoldElement;
