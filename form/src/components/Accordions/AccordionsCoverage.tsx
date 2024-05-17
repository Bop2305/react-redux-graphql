import React, { useMemo } from "react";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

import Accordions from "./Accordions";

const useStyles = makeStyles((theme) => ({
  wrapper: {},
  title: {
    fontWeight: `${theme.typography.fontWeightBold} !important`,
  },
  content: {
    whiteSpace: "pre-line",
  },
  accordion: {
    backgroundColor: "unset !important",
    paddingBottom: `0 !important`,
    "&:last-child": {
      border: "none !important",
    },
  },
  accordionSelected: {
    backgroundColor: "unset !important",
    paddingBottom: `0 !important`,
    "&:last-child": {
      border: "none !important",
    },
    color: `${theme.palette.common.white} !important`,
  },
  accordionExpanded: {
    color: `${theme.palette.common.white} !important`,
    borderBottom: `1px solid ${theme.palette.common.white} !important`,
  },
  icon: {
    width: 16,
  },
  iconExpanded: {
    filter: theme.palette.common.whiteFilter,
  },
}));

type coveragesType = {
  title: React.ReactNode;
  content: React.ReactNode;
  expanded?: boolean;
};

type AccordionsCoverageProps = {
  coverages: coveragesType[];
  selected?: boolean;
};

const AccordionsCoverage = (props: AccordionsCoverageProps) => {
  const classes = useStyles();

  const accordions = useMemo(
    () =>
      props.coverages?.map((c: coveragesType) => ({
        ...c,
        title: (
          <Typography className={classes.title} component="div">
            {c?.title}
          </Typography>
        ),
        content: (
          <Typography component="div" className={classes.content}>
            {c?.content}
          </Typography>
        ),
      })),
    [props.coverages]
  );

  return (
    <div className={classes.wrapper}>
      <Accordions
        accordions={accordions}
        classAccordion={
          props.selected ? classes.accordionSelected : classes.accordion
        }
        classAccordionExpanded={classes.accordionExpanded}
        classIcon={classes.icon}
        classIconExpaned={classes.iconExpanded}
      />
    </div>
  );
};

export default AccordionsCoverage;
