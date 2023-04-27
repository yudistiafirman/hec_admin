import React from "react";

const HSpacer = ({ size }) => {
  const makeStyle = () => {
    if (size === "extraSmall") {
      return {
        margin: "4px",
      };
    } else if (size === "small") {
      return {
        margin: "8px",
      };
    } else if (size === "medium") {
      return {
        margin: "12px",
      };
    } else if (size === "large") {
      return {
        margin: "16px",
      };
    } else if (size === "large") {
      return {
        margin: "20px",
      };
    } else if (size === "extraLarge") {
      return {
        margin: "24px",
      };
    }
  };
  return <div style={makeStyle()} />;
};

export default HSpacer;
