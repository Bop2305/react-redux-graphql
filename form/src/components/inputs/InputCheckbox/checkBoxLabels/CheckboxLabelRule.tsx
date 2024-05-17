import React, { useMemo } from "react";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
  return {
    link: {
      color: theme.palette.secondary.main,
      fontWeight: theme.typography.fontWeightBold,
    },
  };
});

const CheckboxLabelRule = ({
  regulationsUrl,
  termAndConditionUrl,
  regulationsAndTermAndConditionUrl,
  sub,
}: {
  regulationsUrl?: string;
  termAndConditionUrl?: string;
  regulationsAndTermAndConditionUrl?: string;
  sub?: any;
}) => {
  const classes = useStyles();

  const link = useMemo(() => {
    if (regulationsUrl && termAndConditionUrl) {
      return (
        <span>
          <a href={regulationsUrl} className={classes.link} target="_blank">
            Quy định
          </a>{" "}
          và{" "}
          <a
            href={termAndConditionUrl}
            className={classes.link}
            target="_blank"
          >
            Quy tắc điều khoản
          </a>
        </span>
      );
    } else if (regulationsUrl) {
      return (
        <span>
          <a href={regulationsUrl} className={classes.link} target="_blank">
            Quy định
          </a>
        </span>
      );
    } else if (termAndConditionUrl) {
      return (
        <span>
          <a
            href={termAndConditionUrl}
            className={classes.link}
            target="_blank"
          >
            Quy tắc điều khoản
          </a>
        </span>
      );
    } else if (regulationsAndTermAndConditionUrl) {
      return (
        <span>
          <a
            href={regulationsAndTermAndConditionUrl}
            className={classes.link}
            target="_blank"
          >
            Quy định và Quy tắc điều khoản
          </a>
        </span>
      );
    }
  }, [regulationsUrl, termAndConditionUrl, regulationsAndTermAndConditionUrl]);

  return (
    <>
      <Typography>
        Tôi cam kết các thông tin trên đều trung thực và chính xác, đồng thời
        tôi cam kết đã đọc, hiểu và đồng ý với {link} của OPES cho chương trình
        Bảo hiểm này.
      </Typography>
      {sub}
    </>
  );
};

export default CheckboxLabelRule;
