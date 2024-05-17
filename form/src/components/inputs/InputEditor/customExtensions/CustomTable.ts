import Table from "@tiptap/extension-table";
import { mergeAttributes } from "@tiptap/react";

const CustomTable = Table.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      "table",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      ["tbody", 0],
    ];
  },
}).configure({
  resizable: true,
  HTMLAttributes: {
    style: `border-collapse: collapse;
            margin: 0;
            overflow: hidden;
            table-layout: fixed;
            width: 100%;`,
  },
});

export default CustomTable;
