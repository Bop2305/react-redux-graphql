import TableHeader from "@tiptap/extension-table-header";
import { mergeAttributes } from "@tiptap/react";

const styles = `border: 1px solid #ced4da;
            box-sizing: border-box;
            padding: 3px 5px;
            position: relative;
            vertical-align: top;
            background-color: #f1f3f5;
            font-weight: bold;
            text-align: left;`;

const CustomTableHeader = TableHeader.extend({
  renderHTML({ HTMLAttributes }) {
    this.options.HTMLAttributes.style =
      styles +
      (HTMLAttributes.colwidth?.[0]
        ? ` width: ${HTMLAttributes.colwidth?.[0]}px;`
        : "");

    return [
      "th",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
}).configure({
  HTMLAttributes: {
    style: styles,
  },
});

export default CustomTableHeader;
