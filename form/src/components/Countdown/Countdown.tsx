import React, { useEffect, useRef, useState, cloneElement } from "react";
import ReactCountdown from "react-countdown";
import { makeStyles } from "@mui/styles";

import withTheme from "hoc/withTheme";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    gap: theme.spacing(1),
    alignItems: "center",
  },
  countDown: {
    fontSize: "0.8rem",
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.text.disabled,
  },
}));

type CountdownProps = {
  children: React.ReactElement;
  seconds: number;
  start?: boolean;
  onClick?: any;
  onTick?: any;
  onComplete?: any;
};

const Countdown = (props: CountdownProps) => {
  const classes = useStyles();
  const ref = useRef() as any;
  const [seconds, setSeconds] = useState(Date.now());

  useEffect(() => {
    ref?.current?.api?.start();
  }, [seconds]);

  useEffect(() => {
    if (!!props.start) {
      setSeconds(Date.now() + props.seconds * 1000);
    }
  }, [props.start]);

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }: any) => {
    if (completed) {
      // Render a completed state
      return (
        <div
          className={classes.wrapper}
          onClick={() => {
            setSeconds(Date.now() + props.seconds * 1000);
            if (typeof props.onClick === "function") props.onClick();
          }}
        >
          {props.children}
        </div>
      );
    } else {
      // Render a countdown
      return (
        <div className={classes.wrapper}>
          {cloneElement(props.children, {
            disabled: true,
          })}
          <span className={classes.countDown}>
            ({hours ? `${hours}:` : ""}
            {minutes}:{seconds})
          </span>
        </div>
      );
    }
  };

  return (
    <ReactCountdown
      key={seconds}
      onTick={props.onTick}
      ref={ref}
      date={seconds}
      renderer={renderer}
      autoStart={!!props.start}
      onComplete={props.onComplete}
    />
  );
};

export default withTheme<CountdownProps>(Countdown);
