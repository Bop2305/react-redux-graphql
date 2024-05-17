import { mergeAttributes, Node } from "@tiptap/core";

export interface CustomItemImageTextOptions {
  /**
   * Custom HTML attributes that should be added to the rendered HTML tag.
   */
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    itemImageText: {
      /**
       * Toggle a item image text
       */
      toggleItemImageText: (attributes?: any) => ReturnType;
    };
  }
}

const CustomItemImageText = Node.create<CustomItemImageTextOptions>({
  name: "itemImageText",

  priority: 1000,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  content: "block*",

  group: "block",

  parseHTML() {
    return [
      {
        tag: "div",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      toggleItemImageText:
        () =>
        ({ commands }) => {
          return commands.toggleNode("itemImageText", "itemImageText");
        },
    };
  },
});

export default CustomItemImageText;
