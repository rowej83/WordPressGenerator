import React from "react";
import PluginMetaContext from "../../../contexts/PluginMetaContext";
import CodeBlock from "../CodeBlock";
import {nl} from "../../../utils";

const ClassFooter = () => {
    const [pluginMeta] = React.useContext(PluginMetaContext)
    let code = "";
    code += nl(`}`);
    code += "\n" + "\n";
    code += nl(`// running init`);
    code += "\n";
    code += nl(`$app=new ${pluginMeta.className}();`)
    code += nl(`$app->init();`)


    return (<CodeBlock code={code}/>)
}

export default ClassFooter;