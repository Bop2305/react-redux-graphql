import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { Editor } from "@tiptap/react";
import { Divider } from "@mui/material";

import withTheme from "hoc/withTheme";

import MenuItem from "../components/MenuItem";
import MenuItemTable from "./MenuItemTable";
import MenuItemImage from "./MenuItemImage";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    gap: theme.spacing(1),
    flexFlow: "wrap",
    "& > hr": {
      display: "list-item",
    },
  },
}));

type InsertProps = {
  editor: Editor | null;
  uploadService: any;
};

const Insert = (props: InsertProps) => {
  const classes = useStyles();

  return useMemo(
    () => (
      <div className={classes.wrapper}>
        <MenuItemImage
          editor={props.editor}
          uploadService={props.uploadService}
        />
        <MenuItem
          onClick={() => {
            const url = window.prompt("URL");

            if (url) {
              props.editor?.chain().focus().setYoutubeVideo({ src: url }).run();
            }
          }}
          icon="youtube-fill"
          tooltip="Youtube"
          isActive={false}
        />
        <MenuItem
          onClick={() => {
            const previousUrl = props.editor?.getAttributes("link").href;
            const url = window.prompt("URL", previousUrl);

            // cancelled
            if (url === null) {
              return;
            }

            // empty
            if (url === "") {
              props.editor
                ?.chain()
                .focus()
                .extendMarkRange("link")
                .unsetLink()
                .run();

              return;
            }

            // update link
            props.editor
              ?.chain()
              .focus()
              .extendMarkRange("link")
              .setLink({ href: url })
              .run();
          }}
          icon="link"
          tooltip="Link"
          isActive={props.editor?.isActive("link")}
        />
        <Divider orientation="vertical" />
        <MenuItemTable editor={props.editor} />
        <MenuItem
          onClick={() => {
            props.editor?.chain().focus().mergeCells().run();
          }}
          icon="merge-cells-horizontal"
          tooltip="Merge cells"
          isActive={false}
          disabled={!props.editor?.isActive("table")}
        />
        <MenuItem
          onClick={() => {
            props.editor?.chain().focus().addColumnBefore().run();
          }}
          icon="insert-column-left"
          tooltip="Add column before"
          isActive={false}
          disabled={!props.editor?.isActive("table")}
        />
        <MenuItem
          onClick={() => {
            props.editor?.chain().focus().addColumnAfter().run();
          }}
          icon="insert-column-right"
          tooltip="Add column after"
          isActive={false}
          disabled={!props.editor?.isActive("table")}
        />
        <MenuItem
          onClick={() => {
            props.editor?.chain().focus().deleteColumn().run();
          }}
          icon="delete-column"
          tooltip="Delete column"
          isActive={false}
          disabled={!props.editor?.isActive("table")}
        />
        <MenuItem
          onClick={() => {
            props.editor?.chain().focus().addRowBefore().run();
          }}
          icon="insert-row-top"
          tooltip="Add row before"
          isActive={false}
          disabled={!props.editor?.isActive("table")}
        />
        <MenuItem
          onClick={() => {
            props.editor?.chain().focus().addRowAfter().run();
          }}
          icon="insert-row-bottom"
          tooltip="Add row after"
          isActive={false}
          disabled={!props.editor?.isActive("table")}
        />
        <MenuItem
          onClick={() => {
            props.editor?.chain().focus().deleteRow().run();
          }}
          icon="delete-row"
          tooltip="Delete row"
          isActive={false}
          disabled={!props.editor?.isActive("table")}
        />

        <MenuItem
          onClick={() => {
            const _style =
              "border-top: 0px solid #fff; border-left: 0px solid #fff; border-right: 0px solid #fff; border-bottom: 0px solid #fff;";

            props.editor
              ?.chain()
              .focus()
              .insertTable({
                rows: 1,
                cols: 2,
                withHeaderRow: false,
              })
              .setCellAttribute(
                "style",
                _style + " padding-top: 4px; width: 43px;"
              )
              .goToNextCell()
              .setCellAttribute(
                "style",
                _style + " padding-left: 8px; padding-top: 4px;"
              )
              .goToPreviousCell()
              .run();
          }}
          icon="layout-column-line"
          tooltip="Two column line"
          isActive={false}
        />
      </div>
    ),
    [
      props.editor,
      props.editor?.isActive("link"),
      props.editor?.isActive("table"),
    ]
  );
};

export default withTheme<InsertProps>(Insert);
