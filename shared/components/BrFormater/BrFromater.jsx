import React from "react";

const BrFromater = ({ text }) => {
  return (
    <>
      {text.split("&").map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index !== text.split("&").length - 1 && <br />}
        </React.Fragment>
      ))}
    </>
  );
};

export default BrFromater;
