import React from "react";
import CodeBlock from "../CodeBlock";
import PluginMetaContext from "../../../contexts/PluginMetaContext";
import {nl} from "../../../utils";

const ClassHeader = () => {
    const [pluginMeta] = React.useContext(PluginMetaContext);
    let code = nl(`class ${pluginMeta.className} {`);
    return <CodeBlock code={code}/>;

}
export default ClassHeader;