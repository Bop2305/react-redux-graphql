import TableCell from "@tiptap/extension-table-cell";
import { mergeAttributes } from "@tiptap/react";

const styles = `border: 1px solid #ced4da;
                box-sizing: border-box;
                padding: 3px 5px;`;

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: null,
        // Take the attribute values
        renderHTML: (attributes) => {
          // … and return an object with HTML attributes.
          return attributes.style
            ? {
                style: attributes.style,
              }
            : {};
        },
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    this.options.HTMLAttributes.style =
      styles +
      (HTMLAttributes.colwidth?.[0]
        ? ` width: ${HTMLAttributes.colwidth?.[0]}px;`
        : "");

    return [
      "td",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
}).configure({
  HTMLAttributes: {
    style: styles,
  },
});

export default CustomTableCell;
