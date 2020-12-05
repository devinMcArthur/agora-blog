import React from "react";

const FinalValue = (props: { finalValue: number | string }) => {
  return (
    <span>
      {props.finalValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
    </span>
  );
};

export default FinalValue;
