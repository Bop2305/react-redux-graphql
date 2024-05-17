import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Breakpoint,
  Dialog as DialogMaterial,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import Button from "components/Button";
import withTheme from "hoc/withTheme";

const useStyles = makeStyles((theme) => ({
  wrapper: {},
  dialogTitleRoot: {
    display: "flex",
    gap: theme.spacing(5),
    justifyContent: "space-between",
    alignItems: "center",
  },
  paperScrollPaper: {
    overflowY: "unset !important" as any,
  },
}));

type DialogProps = {
  title: string;
  open: boolean;
  onClose: () => void;
  maxWidth?: Breakpoint | false;
  children: any;
  fullScreen: boolean;
};
//
const Dialog = (props: DialogProps) => {
  const classes = useStyles();

  return (
    <DialogMaterial
      open={props.open}
      classes={{ paperScrollPaper: classes.paperScrollPaper }}
      onClose={(e, r) => {
        if (r !== "backdropClick") {
          props.onClose();
        }
      }}
      fullScreen={props.fullScreen}
      maxWidth={props.maxWidth}
      fullWidth={true}
    >
      <DialogTitle classes={{ root: classes.dialogTitleRoot }}>
        {props.title}
        <IconButton onClick={props.onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{props.children}</DialogContent>
    </DialogMaterial>
  );
};

export default withTheme<DialogProps>(Dialog);
