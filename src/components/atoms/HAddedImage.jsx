import React from "react";

const HAddedImage = ({ image }) => {
  return (
    <img
      style={{
        borderRadius: "5px",
        border: "1px solid var(--light-grey)",
        width: 300,
        height: 300,
      }}
      src={image}
      loading="lazy"
      alt="#"
    />
  );
};

export default HAddedImage;
