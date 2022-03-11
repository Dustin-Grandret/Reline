/* eslint-disable react/no-children-prop */
import React from "react";
import ReactMarkdown from "react-markdown";
import ReactDom from "react-dom";
import remarkGfm from "remark-gfm";

const markdown = `
Reline

> What

> > A Modelable and customizable mind map software

> > Free to use

> Why

> > Simple and convenient

> How

> > github
`;
ReactDom.render(
    <ReactMarkdown
        children={markdown}
        remarkPlugins={[remarkGfm]}
    />,
    document.getElementById("root"),
);
