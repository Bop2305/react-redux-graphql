import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { IconButton } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import withTheme from "hoc/withTheme";

import Dialog from "components/Dialog";

const useStyles = makeStyles((theme) => ({
  wrapper: {},
}));

type DialogInfoProps = {
  title: string;
  content: any;
};
//
const DialogInfo = (props: DialogInfoProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.wrapper}>
      <IconButton size="small" onClick={() => setOpen(true)}>
        <InfoOutlinedIcon fontSize="small" />
      </IconButton>

      <Dialog
        title={props.title}
        open={open}
        onClose={() => setOpen(false)}
        fullScreen={false}
      >
        {props.content}
      </Dialog>
    </div>
  );
};

export default withTheme<DialogInfoProps>(DialogInfo);
