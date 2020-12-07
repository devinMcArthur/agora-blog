import React from "react";

const FinalValue = (props: { finalValue: number | string }) => {
  let finalValue = props.finalValue;
  if (typeof finalValue === "string") finalValue = parseFloat(finalValue);
  const number = Math.round((finalValue + Number.EPSILON) * 100) / 100;

  return <span>{number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>;
};

export default FinalValue;
