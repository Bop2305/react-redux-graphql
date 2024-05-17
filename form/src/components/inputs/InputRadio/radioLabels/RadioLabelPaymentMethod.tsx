import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import clsx from "clsx";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      height: "100%",
      backgroundColor: "#F2F2F2",
      borderRadius: "2px",
      color: "#434345",
      // width: "fit-content",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingLeft: "3px",
      paddingRight: "3px",
      paddingTop: "20px",
      paddingBottom: "10px",
    },
    active: {
      backgroundColor: "#00BABC",
      color: "#fff",
    },
    label: {
      textAlign: "center",
    },
  };
});
const RadioLabelPaymentMethod = ({ selected = false, icon, label }: any) => {
  const classes = useStyles();
  return (
    <>
      <div
        className={clsx({
          [classes.container]: true,
          [classes.active]: selected,
        })}
      >
        <div
          style={{
            height: "50%",
          }}
        >
          {icon}
        </div>
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography component="p" className={classes.label}>
            {label}
          </Typography>
        </div>
      </div>
    </>
  );
};

export default RadioLabelPaymentMethod;
