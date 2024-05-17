import CodeBlock from "@tiptap/extension-code-block";

const CustomCodeBlock = CodeBlock.configure({
  HTMLAttributes: {
    style: `background: #0d0d0d;
            border-radius: 0.5rem;
            color: #fff;
            font-family: "JetBrainsMono", monospace;
            padding: 0.75rem 1rem;`,
  },
});

export default CustomCodeBlock;
