import React from "react";
import { makeStyles, useTheme } from "@mui/styles";
import { CircularProgress, Typography } from "@mui/material";

import convertCurrency from "helper/converts/convertCurrency";
import AccordionsCoverage from "components/Accordions/AccordionsCoverage";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
    borderRadius: theme.spacing(1),
  },
  white: {
    backgroundColor: theme.palette.common.white,
  },
  active: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  titleWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
  unit: {
    fontWeight: "normal",
    fontSize: "1rem",
    color: theme.palette.grey[500],
    marginLeft: theme.spacing(1),
  },
  title: {
    fontSize: "1.4rem !important",
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    fontWeight: theme.typography.fontWeightBold,
  },
  priceOld: {
    textAlign: "right",
    textDecoration: "line-through",
    lineHeight: 1,
  },
  price: {
    fontSize: "1.4rem !important",
    fontWeight: `${theme.typography.fontWeightBold} !important`,
    lineHeight: 1,
  },
}));

type accordionType = {
  title: React.ReactNode;
  content: React.ReactNode;
  expanded?: boolean;
};

type RadioLabelPackageProps = {
  icon: React.ReactNode;
  title: string;
  selected?: boolean;
  coverages: accordionType[];
  price: number;
  discountAmount: number;
  color?: "white";
  loading?: boolean;
};

const RadioLabelPackage = (props: RadioLabelPackageProps) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div
      className={`${classes.wrapper} ${
        props.color === "white" ? classes.white : ""
      } ${props.selected ? classes.active : ""}`}
    >
      <div className={classes.titleWrapper}>
        <div className={classes.title}>
          {props.icon}
          <span>{props.title}</span>
        </div>

        <span>
          {!props.loading && (
            <div>
              {!!props.discountAmount && (
                <Typography className={classes.priceOld}>
                  {convertCurrency(props.price)}
                  <span
                    className={classes.unit}
                    style={{
                      color: props.selected
                        ? theme.palette.common.white
                        : undefined,
                    }}
                  >
                    đ
                  </span>
                </Typography>
              )}
              <Typography className={classes.price}>
                {convertCurrency(props.price - (props.discountAmount || 0))}
                <span
                  className={classes.unit}
                  style={{
                    color: props.selected
                      ? theme.palette.common.white
                      : undefined,
                  }}
                >
                  đ
                </span>
              </Typography>
            </div>
          )}
          {props.loading && (
            <CircularProgress
              style={{ color: theme.palette.common.white }}
              size={20}
            />
          )}
        </span>
      </div>
      <AccordionsCoverage
        selected={props.selected}
        coverages={props.coverages?.map((it) => ({
          title: it?.title,
          content: it?.content,
          expanded: it?.expanded,
        }))}
      />
    </div>
  );
};

export default RadioLabelPackage;
