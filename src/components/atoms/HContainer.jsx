import React from "react";

const HecContainer = ({ children }) => {
  return (
    <div className="container">
      <div className="content">{children}</div>
    </div>
  );
};

export default HecContainer;
