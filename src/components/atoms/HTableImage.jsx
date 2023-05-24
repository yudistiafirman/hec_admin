import React from "react";

const HTableImage = ({ image }) => {
  return (
    <img
      style={{
        borderRadius: "5px",
        border: "1px solid var(--light-grey)",
      }}
      width={100}
      height={100}
      src={image}
      loading="lazy"
      alt="#"
    />
  );
};

export default HTableImage;
