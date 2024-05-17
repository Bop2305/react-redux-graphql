import React from "react";

const Line = ({
  height = "1px",
  color = "#E5E5E5",
  marginVertical = "15px",
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: height,
        backgroundColor: color,
        marginTop: marginVertical,
        marginBottom: marginVertical,
      }}
    />
  );
};
export default Line;
