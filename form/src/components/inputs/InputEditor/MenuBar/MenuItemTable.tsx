import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Editor } from "@tiptap/react";

import MenuItem from "../components/MenuItem";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "relative",
  },
  frame: {
    padding: theme.spacing(2),
    width: "fit-content",
    boxShadow: theme.shadows[3],
    position: "absolute",
    backgroundColor: theme.palette.common.white,
    zIndex: 1,
    display: "grid",
    gap: theme.spacing(1),
  },
  box: {
    border: `1px solid ${theme.palette.grey[400]}`,
    width: 15,
    height: 15,
    cursor: "pointer",
  },
  active: {
    backgroundColor: theme.palette.primary.main,
  },
  hide: {
    display: "none",
  },
}));

type MenuItemTableProps = {
  editor: Editor | null;
};

const MenuItemTable = (props: MenuItemTableProps) => {
  const classes = useStyles();
  const cols = 10;
  const rows = 8;
  const [position, setPosition] = useState({});
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.wrapper}>
      <MenuItem
        onClick={() => {
          setOpen((prev) => !prev);
        }}
        icon="table-2"
        tooltip="Table"
        isActive={open}
      />
      <div
        className={open ? classes.frame : classes.hide}
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        onMouseLeave={() => {
          setPosition({});
        }}
      >
        {Array.from(Array(rows).keys()).map((r) =>
          Array.from(Array(cols).keys()).map((c) => (
            <div
              onClick={() => {
                props.editor
                  ?.chain()
                  .focus()
                  .insertTable({
                    rows: r + 1,
                    cols: c + 1,
                    withHeaderRow: true,
                  })
                  .run();
                setOpen(false);
              }}
              key={`${r}${c}`}
              className={`${classes.box} ${
                r <= (position as any)?.row && c <= (position as any)?.col
                  ? classes.active
                  : ""
              }`}
              onMouseEnter={() => {
                setPosition({ row: r, col: c });
              }}
            ></div>
          ))
        )}
      </div>
    </div>
  );
};

export default MenuItemTable;
