import Blockquote from "@tiptap/extension-blockquote";

const CustomBlockquote = Blockquote.configure({
  HTMLAttributes: {
    style: "border-left: 3px solid rgba(13,13,13,.1); padding-left: 1rem;",
  },
});

export default CustomBlockquote;
