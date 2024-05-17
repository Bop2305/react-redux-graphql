import React, { useCallback, useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import {
  Accordion as AccordionMaterial,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(45deg)",
    },
  },
  accordionRoot: {
    boxShadow: "none !important",
    minHeight: "auto",
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    padding: theme.spacing(3, 0),
    borderRadius: "0 !important",
    "&:first-child": {
      paddingTop: 0,
    },
  },
  title: {
    fontWeight: theme.typography.fontWeightBold,
  },
  content: {},
  imgIcon: {
    width: 32,
  },
}));

type accordionType = {
  title: React.ReactNode;
  content: React.ReactNode;
  expanded?: boolean;
};

type AccordionProps = {
  accordion: accordionType;
  onChange?: (accordion: accordionType) => void;
  classAccordion?: string;
  classAccordionExpanded?: string;
  classIcon?: string;
  classIconExpaned?: string;
};

const Accordion = (props: AccordionProps) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(!!props.accordion?.expanded);

  const handleChange = useCallback(
    (accordion) => {
      setExpanded((prev) => !prev);
      if (typeof props.onChange === "function") {
        props.onChange(accordion);
      }
    },
    [setExpanded]
  );

  useEffect(() => {
    setExpanded(!!props.accordion?.expanded);
  }, [setExpanded, props.accordion?.expanded]);

  return (
    <AccordionMaterial
      classes={{
        root: `${classes.accordionRoot} ${props.classAccordion} ${
          expanded ? props.classAccordionExpanded : ""
        }`,
      }}
      disableGutters={true}
      onChange={() => handleChange(props.accordion)}
      expanded={expanded}
    >
      <AccordionSummary
        expandIcon={
          <img
            className={`${classes.imgIcon} ${props.classIcon} ${
              expanded ? props.classIconExpaned : ""
            }`}
            src="https://opes.com.vn/images/plus_ac_ic.png"
            alt="plus_ac_ic"
          />
        }
      >
        <Typography className={classes.title} component="div">
          {props.accordion?.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography className={classes.content} component="div">
          {props.accordion?.content}
        </Typography>
      </AccordionDetails>
    </AccordionMaterial>
  );
};

type AccordionsProps = {
  accordions: accordionType[];
  onChange?: (accordion: accordionType) => void;
  classAccordion?: string;
  classAccordionExpanded?: string;
  classIcon?: string;
  classIconExpaned?: string;
};

const Accordions = (props: AccordionsProps) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      {props.accordions?.map((accor: accordionType, i: number) => (
        <Accordion
          key={`${accor?.title}${i}`}
          accordion={accor}
          onChange={props.onChange}
          classAccordion={props.classAccordion}
          classAccordionExpanded={props.classAccordionExpanded}
          classIcon={props.classIcon}
          classIconExpaned={props.classIconExpaned}
        />
      ))}
    </div>
  );
};

export default Accordions;
