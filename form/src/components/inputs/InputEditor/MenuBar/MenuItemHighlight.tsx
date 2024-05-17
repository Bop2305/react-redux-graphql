import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Editor } from "@tiptap/react";
import { SketchPicker } from "react-color";
import "remixicon/fonts/remixicon.css";

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
  },
  hide: {
    display: "none",
  },
  iconWrapper: {
    border: `1px solid ${theme.palette.grey[300]}`,
    height: "fit-content",
    borderRadius: theme.spacing(1),
    display: "flex",
  },
  btnArrow: {
    backgroundColor: "transparent",
    border: "none",
    height: "1.75rem",
    width: "1.75rem",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
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
}));

type MenuItemHighlightProps = {
  editor: Editor | null;
};

function useOutsideAlerter(ref: any, open: boolean, setOpen: any, btnRef: any) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        open &&
        btnRef &&
        !btnRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, open, setOpen]);
}

const MenuItemHighlight = (props: MenuItemHighlightProps) => {
  const classes = useStyles();
  const boxRef = useRef(null);
  const btnRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState({
    r: "67",
    g: "67",
    b: "69",
    a: "1",
  });
  useOutsideAlerter(boxRef, open, setOpen, btnRef);

  return (
    <div className={classes.wrapper}>
      <div className={classes.iconWrapper}>
        <MenuItem
          style={{
            color: `rgba(${color?.r}, ${color?.g}, ${color?.b}, ${color?.a})`,
          }}
          onClick={() => {
            props.editor
              ?.chain()
              .focus()
              .toggleHighlight({
                color: `rgba(${color?.r}, ${color?.g}, ${color?.b}, ${color?.a})`,
              })
              .run();
          }}
          icon="mark-pen-line"
          tooltip="Text highlight color"
          isActive={props.editor?.isActive("highlight", {
            color: `rgba(${color?.r}, ${color?.g}, ${color?.b}, ${color?.a})`,
          })}
        />
        <button
          ref={btnRef}
          type="button"
          className={`${classes.btnArrow} ${open ? classes.isActive : ""}`}
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
          <div style={{ fontSize: 20 }}>
            <i className="ri-arrow-drop-down-line"></i>
          </div>

          {/* <svg className="remix">
            <i xlinkHref={`ri-arrow-drop-down-line`} />
          </svg> */}
        </button>
      </div>

      <div ref={boxRef as any} className={open ? classes.frame : classes.hide}>
        <SketchPicker
          color={color}
          onChange={(c: any) => {
            setColor(c?.rgb);
          }}
        />
      </div>
    </div>
  );
};

export default MenuItemHighlight;
