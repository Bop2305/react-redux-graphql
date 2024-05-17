import React, { ReactNode } from "react";
import { makeStyles } from "@mui/styles";
import {
  Breakpoint,
  Dialog as DialogMaterial, DialogActions,
  DialogContent, DialogContentText,
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

type DialogConfirmProps = {
  title?: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  maxWidth?: Breakpoint | false;
  children?: any;
  fullScreen?: boolean;
  contentText?: ReactNode;
  isLoading?: boolean;
  hideCancel?: boolean;
  isDisableConfirm?: boolean;
  confirmText?: string;
  cancelText?: string;
  closeWhenConfirm?: boolean;
};
//
const DialogConfirm = ({
                         cancelText = "Huỷ",
                         confirmText = "Xác nhận",
                         isDisableConfirm = false,
                         hideCancel = false,
                         isLoading = false,
                         title = "Xác nhận",
                         open,
                         contentText,
                         onConfirm,
                         onClose,
                         children,
                         fullScreen,
                         maxWidth,
                         closeWhenConfirm = true
                       }: DialogConfirmProps) => {
  const classes = useStyles();

  return (
    <DialogMaterial
      open={open}
      classes={{paperScrollPaper: classes.paperScrollPaper}}
      onClose={(e, r) => {
        if (r !== "backdropClick") {
          onClose();
        }
      }}
      fullScreen={fullScreen}
      maxWidth={maxWidth}
      fullWidth={true}
    >
      <DialogTitle classes={{root: classes.dialogTitleRoot}}>
        {title}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {
          children && children
        }
        {
          contentText && <DialogContentText>{contentText}</DialogContentText>
        }
      </DialogContent>
      <DialogActions>
        {
          !hideCancel && <Button
            color={"inherit"}
            variant="outlined"
            onClick={() => onClose()}
            style={{
              border: "1px solid #C4C4C4",
            }}
          >
            {cancelText}
          </Button>
        }
        <Button
          disabled={isDisableConfirm}
          loading={isLoading}
          variant="contained"
          color={"secondary"}
          onClick={() => {
            if (closeWhenConfirm) {
              onClose();
            }
            onConfirm();
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </DialogMaterial>
  );
};

export default withTheme<DialogConfirmProps>(DialogConfirm);
