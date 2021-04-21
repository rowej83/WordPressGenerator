import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {docco} from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeBlock = props => {
    return (
        <SyntaxHighlighter language="php" style={docco}>
            {props.code}
        </SyntaxHighlighter>
    );
};

export default CodeBlock;
