import React from "react";
import CodeBlock from "../CodeBlock";
import CodeInjectionContext from "../../../contexts/CodeInjectionContext";
import RewriteBlockContext from "../../../contexts/RewriteBlockContext";
import PluginMetaContext from "../../../contexts/PluginMetaContext";
import {nl, tnl, t2nl, t3nl} from "../../../utils";

const ActivationBlock = () => {
    const [pluginMeta, setPluginMeta] = React.useContext(PluginMetaContext);

    const [codeInjection, setCodeInjection] = React.useContext(
        CodeInjectionContext
    );
    const [rewriteBlocks, setRewriteBlocks] = React.useContext(
        RewriteBlockContext
    );


    let result = t2nl(`function activation_method(){ `);
    if (codeInjection.codeForActivation) {
        codeInjection.codeForActivation.forEach(task => {
            //tabs already entered when the task is put into the array
            result += t3nl(task);
        });
    }
    result += t2nl(`}`) + `\n`;
    if (rewriteBlocks.rewriteRules) {
        result += t2nl(`function add_rewrite_rules_for_${pluginMeta.className}{`);
        rewriteBlocks.rewriteRules.forEach(item => {
            result += t3nl(`${item}`);
        });

    }

    result += t3nl(`// add all rules here`);
    result += t3nl(`flush_rewrite_rules(false);`)
    result += t2nl(`}`)

    return (
        <>
            <CodeBlock code={result}/>
        </>
    );

}


export default ActivationBlock;
