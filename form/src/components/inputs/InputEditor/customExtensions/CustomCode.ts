import Code from "@tiptap/extension-code";

const CustomCode = Code.configure({
  HTMLAttributes: {
    style: `background-color: #6161611a;
            border-radius: 0.25em;
            box-decoration-break: clone;
            color: #616161;
            font-size: 0.9rem;
            padding: 0.25em;
            margin: 0.25em`,
  },
});

export default CustomCode;
