import React, { useState } from "react";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import withTheme from "hoc/withTheme";

import Dialog from "./Dialog";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    cursor: "pointer",
  },
  readMoreBtn: {
    color: theme.palette.secondary.main,
    textDecoration: "underline",
  },
}));

type ReadMoreProps = {
  description: any;
  detail: any;
};

const ReadMore = (props: ReadMoreProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={classes.wrapper} onClick={() => setOpen(true)}>
        <Typography>
          {props.description}...{" "}
          <span className={classes.readMoreBtn}>Xem thêm</span>
        </Typography>
      </div>
      <Dialog
        title="Cam kết"
        open={open}
        onClose={() => setOpen(false)}
        fullScreen={false}
      >
        {props.detail}
      </Dialog>
    </>
  );
};

export default withTheme<ReadMoreProps>(ReadMore);
