import React from "react";
import { makeStyles } from "@mui/styles";
import { Editor } from "@tiptap/react";

import withTheme from "hoc/withTheme";

import Tabs from "../components/Tabs";
import Home from "./Home";
import Insert from "./Insert";

const useStyles = makeStyles((theme) => ({
  wrapper: {},
}));

type MenuBarProps = {
  editor: Editor | null;
  uploadService: any;
};

const MenuBar = (props: MenuBarProps) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Tabs
        tabs={[
          { label: "home", content: <Home editor={props.editor} /> },
          {
            label: "insert",
            content: (
              <Insert
                editor={props.editor}
                uploadService={props.uploadService}
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default withTheme<MenuBarProps>(MenuBar);
