import { makeStyles } from "@mui/styles";
import React, { useMemo } from "react";
// import remixiconUrl from "remixicon/fonts/remixicon.symbol.svg";
import "remixicon/fonts/remixicon.css";
import clsx from "clsx";

import withTheme from "hoc/withTheme";

const useStyles = makeStyles((theme) => ({
  menuItem: {
    backgroundColor: "transparent",
    border: "none",
    borderRadius: theme.spacing(1),
    color: theme.palette.text.primary,
    height: "1.75rem",
    padding: theme.spacing(1),
    width: "1.75rem",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.grey[300],
    },
    "& svg": {
      fill: "currentColor",
      height: "100%",
      width: "100%",
    },
  },
  isActive: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  disabled: {
    color: theme.palette.grey[300],
    "&:hover": {
      backgroundColor: "unset",
    },
  },
}));

type MenuItemProps = {
  icon: string;
  onClick: any;
  tooltip: string;
  isActive?: boolean | undefined;
  disabled?: boolean;
  style?: any;
};

const MenuItem = (props: MenuItemProps) => {
  const classes = useStyles();

  return useMemo(
    () => (
      <button
        className={clsx(
          classes.menuItem,
          props.isActive && classes.isActive,
          props.disabled && classes.disabled
        )}
        type="button"
        onClick={props.onClick}
        title={props.tooltip}
        disabled={props.disabled}
      >
        <div style={{ fontSize: 20, ...props.style }}>
          <i className={`ri-${props.icon}`}></i>
        </div>
        {/* <svg style={props.style} className="remix">
        <use xlinkHref={`${remixiconUrl}#ri-${props.icon}`} />
      </svg> */}
      </button>
    ),
    [props.isActive, props.disabled, props.style, props.onClick]
  );
};

export default withTheme<MenuItemProps>(MenuItem);
