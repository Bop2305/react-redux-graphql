import React from "react";
import {CountdownTimeDelta} from "react-countdown";

type CountDownRendererProps = CountdownTimeDelta & {
  completedComponent?: JSX.Element;
  label?: any;
};
const CountDownRenderer = ({ hours, minutes, seconds, completed, completedComponent, label }: CountDownRendererProps) => {
  if (completed) {
    // Render a completed state
    return completedComponent || <></>;
  } else {
    // Render a countdown
    return <span>{label} {hours}:{minutes}:{seconds}</span>;
  }
}

export default CountDownRenderer;
