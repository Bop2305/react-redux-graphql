import Heading from "@tiptap/extension-heading";

const CustomHeading = Heading.configure({
  HTMLAttributes: {
    style: `margin: 0`,
  },
});

export default CustomHeading;
