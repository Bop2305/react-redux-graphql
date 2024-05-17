import React from "react";
import clsx from "clsx";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import VNDMoneyFormat from "components/VNDMoneyFormat";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "5px",
      alignItems: "center",
    },
    leftTitle: {
      color: theme.palette.common.purple,
      fontWeight: `${theme.typography.fontWeightBold} !important`,
    },
    rightTitle: {
      color: "#F7971D",
      textDecoration: "underline",
      fontWeight: `${theme.typography.fontWeightBold} !important`,
    },
    label: {
      color: theme.palette.text.primary,
    },
    value: {
      color: theme.palette.text.primary,
      fontWeight: `${theme.typography.fontWeightBold} !important`,
      textAlign: "end",
      whiteSpace: "pre-line",
    },
    rowContainer: {
      display: "flex",
      justifyContent: "space-between",
      lineHeight: "25px",
    },
  };
});

const SummaryInfo = ({
  rightTitle,
  rowsData,
  title,
  classInfoLineWrapper,
  classInfoLine,
  onClickRightTitle,
}: any) => {
  const classes = useStyles();

  return (
    <>
      <div>
        <div className={classes.container}>
          <Typography component="p" className={classes.leftTitle}>
            {title}
          </Typography>
          <Typography
            component="p"
            sx={{ cursor: onClickRightTitle ? "pointer" : undefined }}
            className={classes.rightTitle}
            onClick={onClickRightTitle}
          >
            {rightTitle}
          </Typography>
        </div>
        <div className={classInfoLineWrapper}>
          {rowsData?.map((item: any, index: any) => {
            return (
              !!item?.value && (
                <div
                  key={index}
                  className={clsx({
                    [classes.rowContainer]: true,
                    [classInfoLine]: classInfoLine ? true : false,
                  })}
                >
                  <Typography component="span" className={classes.label}>
                    {item.label ? `${item.label}:` : <p />}
                  </Typography>
                  <Typography component="span" className={classes.value}>
                    {item.isMoney ? (
                      <VNDMoneyFormat
                        className={classes.value}
                        boldSuffix={false}
                        boldPriceText={true}
                        value={item.value}
                      />
                    ) : (
                      item.value || <p />
                    )}
                  </Typography>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SummaryInfo;
