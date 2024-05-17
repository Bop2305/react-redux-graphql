import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { Editor } from "@tiptap/react";
import { Divider } from "@mui/material";

import withTheme from "hoc/withTheme";

import MenuItem from "../components/MenuItem";
import MenuItemHighlight from "./MenuItemHighlight";
import MenuItemColor from "./MenuItemColor";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    flexFlow: "wrap",
    height: "fit-content",
  },
  menuLeft: {
    display: "flex",
    gap: theme.spacing(1),
    flexFlow: "wrap",
    height: "fit-content",
    "& > hr": {
      display: "list-item",
    },
  },
  menuRight: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },
}));

type HomeProps = {
  editor: Editor | null;
};

const Home = (props: HomeProps) => {
  const classes = useStyles();

  return useMemo(
    () => (
      <div className={classes.wrapper}>
        <div className={classes.menuLeft}>
          <MenuItem
            onClick={() => {
              props.editor?.chain().focus().toggleHeading({ level: 1 }).run();
            }}
            icon="h-1"
            tooltip="H1"
            isActive={props.editor?.isActive("heading", { level: 1 })}
          />
          <MenuItem
            onClick={() => {
              props.editor?.chain().focus().toggleHeading({ level: 2 }).run();
            }}
            icon="h-2"
            tooltip="H2"
            isActive={props.editor?.isActive("heading", { level: 2 })}
          />
          <MenuItem
            onClick={() => {
              props.editor?.chain().focus().toggleHeading({ level: 3 }).run();
            }}
            icon="h-3"
            tooltip="H3"
            isActive={props.editor?.isActive("heading", { level: 3 })}
          />
          <Divider orientation="vertical" />
          <MenuItem
            onClick={() => {
              props.editor?.chain().focus().toggleBold().run();
            }}
            icon="bold"
            tooltip="Bold"
            isActive={props.editor?.isActive("bold")}
          />
          <MenuItem
            onClick={() => {
              props.editor?.chain().focus().toggleItalic().run();
            }}
            icon="italic"
            tooltip="Italic"
            isActive={props.editor?.isActive("italic")}
          />
          <MenuItem
            onClick={() => {
              props.editor?.chain().focus().toggleUnderline().run();
            }}
            icon="underline"
            tooltip="Underline"
            isActive={props.editor?.isActive("underline")}
          />
          <MenuItem
            onClick={() => {
              props.editor?.chain().focus().setParagraph().run();
            }}
            icon="paragraph"
            tooltip="Paragraph"
            isActive={props.editor?.isActive("paragraph")}
          />
          <Divider orientation="vertical" />
          <MenuItem
            onClick={() => {
              props.editor?.chain().focus().toggleStrike().run();
            }}
            icon="strikethrough"
            tooltip="Strike"
            isActive={props.editor?.isActive("strike")}
          />
          <MenuItem
            onClick={() => {
              props.editor?.chain().focus().toggleSubscript().run();
            }}
            icon="subscript-2"
            tooltip="Subscript"
            isActive={props.editor?.isActive("subscript")}
          />
          <MenuItem
            onClick={() => {
              props.editor?.chain().focus().toggleSuperscript().run();
            }}
            icon="superscript-2"
            tooltip="Superscript"
            isActive={props.editor?.isActive("superscript")}
          />
          <Divider orientation="vertical" />
          <MenuItem
            onClick={() => {
              props.editor?.chain().focus().toggleBlockquote().run();
            }}
            icon="double-quotes-l"
            tooltip="Blockquote"
            isActive={props.editor?.isActive("blockquote")}
          />
          <MenuItem
            onClick={() => {
              props.editor?.chain().focus().toggleCodeBlock().run();
            }}
            icon="code-box-line"
            tooltip="Code block"
            isActive={props.editor?.isActive("codeBlock")}
          />
          <MenuItem
            onClick={() => {
              props.editor?.chain().focus().toggleCode().run();
            }}
            icon="code-view"
            tooltip="Code"
            isActive={props.editor?.isActive("code")}
          />
          <Divider orientation="vertical" />
          <MenuItem
            onClick={() => {
              props.editor?.chain().focus().toggleBulletList().run();
            }}
            icon="list-unordered"
            tooltip="Bullet list"
            isActive={props.editor?.isActive("bulletList")}
          />
          <MenuItem
            onClick={() => {
              props.editor?.chain().focus().toggleOrderedList().run();
            }}
            icon="list-ordered"
            tooltip="Ordered list"
            isActive={props.editor?.isActive("orderedList")}
          />
          <Divider orientation="vertical" />
          <MenuItem
            onClick={() =>
              props.editor?.chain().focus().setTextAlign("left").run()
            }
            icon="align-left"
            tooltip="Align left"
            isActive={props.editor?.isActive({ textAlign: "left" })}
          />
          <MenuItem
            onClick={() =>
              props.editor?.chain().focus().setTextAlign("center").run()
            }
            icon="align-center"
            tooltip="Align center"
            isActive={props.editor?.isActive({ textAlign: "center" })}
          />
          <MenuItem
            onClick={() =>
              props.editor?.chain().focus().setTextAlign("right").run()
            }
            icon="align-right"
            tooltip="Align right"
            isActive={props.editor?.isActive({ textAlign: "right" })}
          />
          <MenuItem
            onClick={() =>
              props.editor?.chain().focus().setTextAlign("justify").run()
            }
            icon="align-justify"
            tooltip="Align justify"
            isActive={props.editor?.isActive({ textAlign: "justify" })}
          />
          <Divider orientation="vertical" />
          <MenuItemHighlight editor={props.editor} />
          <MenuItemColor editor={props.editor} />
          <MenuItem
            onClick={() => {
              props.editor?.chain().focus().setHorizontalRule().run();
            }}
            icon="separator"
            tooltip="Divider"
            isActive={false}
          />
        </div>
        <div className={classes.menuRight}>
          <MenuItem
            onClick={() => props.editor?.chain().focus().undo().run()}
            icon="arrow-go-back-line"
            tooltip="Undo"
            disabled={!props.editor?.can().undo()}
          />
          <MenuItem
            onClick={() => props.editor?.chain().focus().redo().run()}
            icon="arrow-go-forward-line"
            tooltip="Redo"
            disabled={!props.editor?.can().redo()}
          />
        </div>
      </div>
    ),
    [
      props.editor,
      props.editor?.isActive("heading", { level: 1 }),
      props.editor?.isActive("heading", { level: 2 }),
      props.editor?.isActive("heading", { level: 3 }),
      props.editor?.isActive("bold"),
      props.editor?.isActive("italic"),
      props.editor?.isActive("underline"),
      props.editor?.isActive("paragraph"),
      props.editor?.isActive("strike"),
      props.editor?.isActive("subscript"),
      props.editor?.isActive("superscript"),
      props.editor?.isActive("blockquote"),
      props.editor?.isActive("codeBlock"),
      props.editor?.isActive("code"),
      props.editor?.isActive("bulletList"),
      props.editor?.isActive("orderedList"),
      props.editor?.isActive({ textAlign: "left" }),
      props.editor?.isActive({ textAlign: "center" }),
      props.editor?.isActive({ textAlign: "right" }),
      props.editor?.isActive({ textAlign: "justify" }),
      props.editor?.can().undo(),
      props.editor?.can().redo(),
    ]
  );
};

export default withTheme<HomeProps>(Home);
