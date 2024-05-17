import React, { useRef } from "react";
import { makeStyles } from "@mui/styles";
import { Editor } from "@tiptap/react";

import MenuItem from "../components/MenuItem";

const useStyles = makeStyles((theme) => ({
  wrapper: {},
}));

type MenuItemImageProps = {
  editor: Editor | null;
  uploadService: any;
};

const MenuItemImage = (props: MenuItemImageProps) => {
  const classes = useStyles();
  const inputRef = useRef(null);

  return (
    <div className={classes.wrapper}>
      <MenuItem
        onClick={() => {
          // const url = window.prompt("URL");

          // if (url) {
          //   props.editor?.chain().focus().setImage({ src: url }).run();
          // }
          (inputRef?.current as any).click();
        }}
        icon="image-line"
        tooltip="Image"
        isActive={false}
      />
      <input
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        onChange={async (event) => {
          const fileObj = event.target.files && event.target.files[0];
          if (!fileObj) {
            return;
          }

          // 👇️ reset file input
          (event.target.value as any) = null;

          const res = await props.uploadService(fileObj);

          if (res?.statusCode === 0) {
            props.editor
              ?.chain()
              .focus()
              .setImage({ src: res?.content?.url })
              .run();
          }
        }}
      />
    </div>
  );
};

export default MenuItemImage;
