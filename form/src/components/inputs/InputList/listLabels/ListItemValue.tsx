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
    fontWeight: `${theme.typography.fontWeightBold} !important`,
  },
  btnClose: {
    height: "fit-content",
  },
  "@media (max-width: 520px)": {
    label: {
      fontSize: 14,
    },
  },
}));

type ListItemValueProps = {
  inputsConfig?: any;
  item?: any;
  onClose?: () => void;
};

const ListItemValue = (props: ListItemValueProps) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.labelsWrapper}>
        {props.inputsConfig?.map((ipc: any) => (
          <Typography
            className={
              ipc?.fontWeight === "bold" || props.inputsConfig?.length == 1
                ? classes.label
                : undefined
            }
            key={ipc?.id}
          >
            {convertByType(
              props.item?.[ipc?.id],
              ipc?.type,
              ipc?.mappingOptions || ipc?.options
            )}
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

export default ListItemValue;
