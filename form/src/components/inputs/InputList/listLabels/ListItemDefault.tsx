import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import convertByType from "helper/converts/convertByType";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: theme.spacing(3, 2),
    backgroundColor: theme.palette.grey[100],
    borderRadius: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
  },
  labelsWrapper: {
    display: "grid",
    alignItems: "center",
  },
  label: {
    "& span": {
      fontWeight: theme.typography.fontWeightBold,
    },
  },
  btnClose: {
    height: "fit-content",
  },
}));

type ListItemDefaultProps = {
  inputsConfig: any;
  item: any;
  onClose: () => void;
};

const ListItemDefault = (props: ListItemDefaultProps) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.labelsWrapper}>
        {props.inputsConfig?.map((ipc: any) => (
          <Typography className={classes.label} key={ipc?.id}>
            {ipc?.label}:{" "}
            <span>
              {convertByType(
                props.item?.[ipc?.id],
                ipc?.type,
                ipc?.mappingOptions || ipc?.options
              )}
            </span>
          </Typography>
        ))}
      </div>

      {!props.item?.fixed && (
        <IconButton
          className={classes.btnClose}
          size="small"
          onClick={props.onClose}
        >
          <CloseIcon />
        </IconButton>
      )}
    </div>
  );
};

export default ListItemDefault;
