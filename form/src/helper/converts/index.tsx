import React from "react";
import convertCurrency from "./convertCurrency";
import convertDateToString from "./convertDateToString";
// import Markdown from "components/Markdown";

const converts = (
  value: any,
  type:
    | "text"
    | "date"
    | "currency"
    | "map"
    | "image"
    | "link"
    | "datetime"
    | "markdown",
  options?: any[],
  label?: string
) => {
  if (value === undefined || value === null) {
    return "";
  }

  switch (type) {
    case "date":
      return convertDateToString(value);
    case "datetime":
      return convertDateToString(value, "DD/MM/YYYY HH:mm");
    case "currency":
      return convertCurrency(value);
    case "map":
      return options?.find((op) => op?.value === value)?.label;
    case "image":
      return (
        <img style={{ maxWidth: 50, width: "100%" }} src={value} alt={value} />
      );
    case "link":
      return (
        <a href={value} target="_blank">
          {label}
        </a>
      );
    // case "markdown":
    //   return <Markdown value={value} />;

    default:
      return value;
  }
};

export default converts;
