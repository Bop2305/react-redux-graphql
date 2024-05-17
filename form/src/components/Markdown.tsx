import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const Markdown = ({ value }: { value: any }) => {
  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
      {value}
    </ReactMarkdown>
  );
};

export default Markdown;
