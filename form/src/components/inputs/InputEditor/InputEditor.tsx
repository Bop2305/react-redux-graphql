import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useEditor, EditorContent } from "@tiptap/react";
import pretty from "pretty";

import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Dropcursor from "@tiptap/extension-dropcursor";
import TableRow from "@tiptap/extension-table-row";
import Gapcursor from "@tiptap/extension-gapcursor";
import Highlight from "@tiptap/extension-highlight";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import Strike from "@tiptap/extension-strike";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import CharacterCount from "@tiptap/extension-character-count";
import { Color } from "@tiptap/extension-color";
import History from "@tiptap/extension-history";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import HardBreak from "@tiptap/extension-hard-break";

import CustomParagraph from "./customExtensions/CustomParagraph";
import CustomHeading from "./customExtensions/CustomHeading";
import CustomBlockquote from "./customExtensions/CustomBlockquote";
import CustomCodeBlock from "./customExtensions/CustomCodeBlock";
import CustomImage from "./customExtensions/CustomImage";
import CustomTable from "./customExtensions/CustomTable";
import CustomTableCell from "./customExtensions/CustomTableCell";
import CustomTableHeader from "./customExtensions/CustomTableHeader";
import CustomYoutube from "./customExtensions/CustomYoutube";
import CustomCode from "./customExtensions/CustomCode";
import CustomItemImageText from "./customExtensions/CustomItemImageText";

import withTheme from "hoc/withTheme";

import InputWrapper from "../InputWrapper";
import MenuBar from "./MenuBar";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.spacing(1),
    "& .ProseMirror": {
      margin: theme.spacing(5),
      marginTop: 0,
      padding: theme.spacing(3),
      border: `1px solid ${theme.palette.grey[300]}`,
      minHeight: 300,
      "&:focus": {
        outline: "none",
        border: `1px solid ${theme.palette.primary.main}`,
      },
      "& table": {
        borderCollapse: "collapse",
        margin: 0,
        overflow: "hidden",
        tableLayout: "fixed",
        width: "100%",
        "& td": {
          borderRight: "1px solid #ced4da !important",
        },
        "& .selectedCell": {
          "&:after": {
            background: "rgba(200, 200, 255, 0.4)",
            content: '""',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            pointerEvents: "none",
            position: "absolute",
            zIndex: 2,
          },
        },
        "& .column-resize-handle": {
          backgroundColor: "#adf",
          bottom: "-2px",
          position: "absolute",
          right: "-2px",
          pointerEvents: "none",
          top: 0,
          width: 4,
        },
      },
    },
    '& [contenteditable="false"]': {
      color: "#999",
      cursor: "not-allowed",
    },
    "& .resize-cursor": {
      cursor: "ew-resize",
    },
  },
  characterCount: {
    fontSize: 12,
    padding: theme.spacing(1, 5),
    textAlign: "right",
  },
}));

type InputEditorProps = {
  id: string;
  label?: string;
  hideLabel?: boolean;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  value: string;
  defaultValue: string;
  autoFocus?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  required?: boolean;
  loading?: boolean;
  uploadService: any;
};

function useOutsideAlerter(
  ref: any,
  onChange: any,
  id: any,
  editor: any,
  focused: any,
  setFocused: any
) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target) && focused) {
        console.log(1234);

        onChange({
          target: {
            name: id,
            value: editor?.getText() !== "" ? pretty(editor?.getHTML()) : "",
          },
        } as any);
        setFocused(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, editor, onChange, id, focused, setFocused]);
}

const InputEditor = (props: InputEditorProps) => {
  const classes = useStyles();
  const boxRef = useRef(null);
  let [focused, setFocused] = useState(false);

  const editor = useEditor({
    extensions: [
      Document,
      Text,
      ListItem,
      BulletList,
      OrderedList,
      HorizontalRule.configure({
        HTMLAttributes: {
          style: `margin: 0; width: 100%; background-color: #ced4da; height: 1px; border-width: 0px;`,
        },
      }),
      Dropcursor,
      TableRow,
      Gapcursor,
      Italic,
      Underline,
      Link,
      Strike,
      Subscript,
      Superscript,
      TextStyle,
      Color,
      History,
      CharacterCount,
      Bold,
      HardBreak,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({ multicolor: true }),
      Typography,
      CustomCode,
      CustomYoutube,
      CustomTable,
      CustomTableCell,
      CustomTableHeader,
      CustomImage,
      CustomParagraph,
      CustomBlockquote,
      CustomCodeBlock,
      CustomHeading,
      CustomItemImageText,
    ],
    autofocus: props.autoFocus ? true : false,
    editable: !props.disabled,
    content: props.value,
    onFocus: () => {
      setFocused(true);
    },
    // onBlur: ({ editor: editorVal }) => {},
    // onUpdate: ({ editor: editorVal }) => {
    //   props.onChange({
    //     target: {
    //       name: props.id,
    //       value: editorVal.getText() !== "" ? pretty(editorVal.getHTML()) : "",
    //     },
    //   } as any);
    // },
    editorProps: {
      attributes: {
        spellcheck: "false",
      },
    },
  });
  useOutsideAlerter(
    boxRef,
    props.onChange,
    props.id,
    editor,
    focused,
    setFocused
  );

  useEffect(() => {
    // this is just an example. do whatever you want to do here
    // to retrieve your editors content from somewhere
    // console.log(editor?.commands.);

    editor?.commands.setContent(props.value, false, {
      preserveWhitespace: true,
    });
  }, [props.value]);

  return (
    <InputWrapper
      htmlFor={props.id}
      label={props.label}
      hideLabel={props.hideLabel}
      helperText={props.helperText}
      error={props.error}
      required={props.required}
    >
      {/* <div ref={boxRef} style={{ height: 200, backgroundColor: "red" }}>
        <div style={{ height: 100, backgroundColor: "yellow" }}></div>
      </div> */}
      <div ref={boxRef} className={classes.wrapper}>
        <MenuBar editor={editor} uploadService={props.uploadService} />
        <div className={classes.characterCount}>
          {editor?.storage.characterCount.characters()} characters |{" "}
          {editor?.storage.characterCount.words()} words
        </div>
        <EditorContent id={props.id} name={props.id} editor={editor} />
      </div>
    </InputWrapper>
  );
};

export default withTheme<InputEditorProps>(InputEditor);
