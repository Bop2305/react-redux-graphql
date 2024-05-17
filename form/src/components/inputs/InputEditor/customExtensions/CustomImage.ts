import Image from "@tiptap/extension-image";

const CustomImage = Image.configure({
  HTMLAttributes: {
    style: `width: 100%;`,
  },
});

export default CustomImage;
