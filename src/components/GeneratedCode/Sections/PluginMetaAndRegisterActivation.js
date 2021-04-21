import React from "react";
import PluginMetaContext from "../../../contexts/PluginMetaContext";
import RewriteBlockContext from "../../../contexts/RewriteBlockContext";
import CodeBlock from "../CodeBlock";
import {nl} from "../../../utils";

const PluginMetaAndRegisterActivation = () => {
    const [rewriteBlocks] = React.useContext(RewriteBlockContext);
    const [pluginMeta] = React.useContext(PluginMetaContext);
    let code = "";
    code += nl(`<?php`);
    code += nl(`defined( 'ABSPATH' ) OR exit;`);
    code += nl(`if (  class_exists( '${pluginMeta.className}' ) ) return; `);
    code += `\n`;
    code += nl(`/**`);
    code += nl(`* Plugin Name: ${pluginMeta.pluginName || pluginMeta.className}`);
    code += nl(`* Description: ${pluginMeta.pluginDescriptionDisplay || ""}`);
    code += nl(`* Author:      ${pluginMeta.pluginAuthor || ""}`);
    code += nl(`* Author URL:  ${pluginMeta.pluginAuthorUrl || ""}`);
    code += nl(`* Plugin URL:  ${pluginMeta.pluginUrl || ""}`);
    code += nl(`*/`);
    code += `\n`;
    code += `\n`;


    if (rewriteBlocks.rewriteFunctionNames.length !== 0) {
        code += nl(`register_activation_hook(   __FILE__, array( '${
            pluginMeta.className
        }', 'activation_method' ) );`);
        code += `\n`;
    }
    return (
        <CodeBlock code={code}/>
    )
}


export default PluginMetaAndRegisterActivation;