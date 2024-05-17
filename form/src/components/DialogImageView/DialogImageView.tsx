import React from "react";
import { Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";

import withTheme from "hoc/withTheme";

const useStyles = makeStyles((theme) => ({
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  image: {
    width: "90%",
    height: "auto",
    objectFit: "contain",
    maxHeight: "95vh",
  },
}));

type DialogImageViewerProps = {
  src: string;
  isOpen: boolean;
  onClose: any;
};

const DialogImageView = (props: DialogImageViewerProps) => {
  const classes = useStyles();

  return (
    <>
      <Dialog
        PaperProps={{
          style: {
            backgroundColor: "#80808061",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
        open={props.isOpen}
        fullScreen
      >
        <div>
          <IconButton
            style={{ position: "fixed" }}
            onClick={props.onClose}
            className={classes.closeIcon}
          >
            <CloseIcon style={{ color: "#fff" }} />
          </IconButton>
        </div>
        <img className={classes.image} src={props.src} />
      </Dialog>
    </>
  );
};

export default withTheme<DialogImageViewerProps>(DialogImageView);
