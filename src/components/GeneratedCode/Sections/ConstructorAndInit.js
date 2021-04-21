import React from "react";
import CodeBlock from "../CodeBlock";
import RewriteBlockContext from "../../../contexts/RewriteBlockContext";
import CodeInjectionContext from "../../../contexts/CodeInjectionContext";
import PluginMetaContext from "../../../contexts/PluginMetaContext";
import {t1, t2, t2nl, t3nl} from "../../../utils";

const ConstructorAndInit = props => {
    const [pluginMeta, setPluginMeta] = React.useContext(PluginMetaContext);
    const [codeInjection, setCodeInjection] = React.useContext(
        CodeInjectionContext
    );
    const [rewriteBlocks, setRewriteBlocks] = React.useContext(
        RewriteBlockContext
    );

    let result = "";

    result += t2nl(`function __construct(){`);
    result += t2nl(`}`);
    result += t2nl(`function init(){`)

    result += `\n`;
    if (pluginMeta.useNonce) {
        if (pluginMeta.nonceName) {
            // result+=`       `;
            result += t3nl(`add_action('wp_head', array( $this, 'add_nonce_in_head_area'));`);
            // result+=`       `;
            result += t3nl(`add_action('admin_head', array( $this, 'add_nonce_in_head_area'));`);
        }

    }
    if (rewriteBlocks.rewriteTags.length > 0) {
        result += t3nl(`add_filter('query_vars', array ( $this, 'add_query_vars_${pluginMeta.className}' ), 0 );`);
    }

    if (codeInjection.codeForInit) {

        codeInjection.codeForInit.forEach(task => {
            //  result+=;

            result += t3nl(task);
            //result+='\n';

        });
    }
    result += t2nl(`}`);
    // add_filter( 'query_vars', array ( $this, 'add_query_vars_${name}' ), 0 );
    //  public function add_query_vars_${name}( $vars ) {
    //   $vars[] = '___my-api';
    //   $vars[] = 'action';
    //   return $vars;
    //   }

    if (rewriteBlocks.rewriteTags.length > 0) {
        result += "\n";
        result += t2nl(`function add_query_vars_${pluginMeta.className} ($vars){`);
        result += "\n";
        rewriteBlocks.rewriteTags.forEach(tag => {
            result += t3nl(`$vars[] = '${tag}'`);

        });
        result += t3nl(`return $vars;`);
        result += t2nl(" }");

    }
//TODO refactor - move sniff/tag to separate component
    //if rewrites then add sniff test
    if (rewriteBlocks.rewriteSniffRequests.length > 0) {
        result += "\n";
        result += t2nl(`function sniff_requests_for_${pluginMeta.className} {`);
        result += "\n";

// go thru sniff tests array
        rewriteBlocks.rewriteSniffRequests.forEach(item => {
            result += item;
        });

        result += t2nl(`}`);

    }


    return <CodeBlock code={result}/>;
    // return result;
    // return (
    //   <>
    //     <CodeBlock code={result} />
    //   </>
    // );
};

export default ConstructorAndInit;
