import React from "react";
import { makeStyles, useTheme } from "@mui/styles";
import { Typography, Radio } from "@mui/material";
import clsx from "clsx";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      height: "100%",
      borderRadius: theme.spacing(1),
      color: "#434345",
      border: `1px solid ${theme.palette.grey[300]}`,
      // width: "fit-content",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: theme.spacing(2),
      gap: theme.spacing(1),
    },
    active: {
      borderColor: "#00BABC",
    },
    labelWrapper: {
      display: "flex",
      alignItems: "center",
    },
    label: {
      lineHeight: 1,
      marginBottom: -2,
    },
    radio: {
      margin: 0,
      pointerEvents: "none",
    },
  };
});
const RadioLabelPaymentMethodLong = ({
  selected = false,
  icon,
  label,
}: any) => {
  const classes = useStyles();

  return (
    <>
      <div
        className={clsx({
          [classes.container]: true,
          [classes.active]: selected,
        })}
      >
        <div className={classes.labelWrapper}>
          <Radio className={classes.radio} checked={selected} size="small" />
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

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {icon}
        </div>
      </div>
    </>
  );
};

export default RadioLabelPaymentMethodLong;
