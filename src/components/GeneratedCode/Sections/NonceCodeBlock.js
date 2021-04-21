import React from "react";
import PluginMetaContext from "../../../contexts/PluginMetaContext";
import CodeBlock from "../CodeBlock";
import {t2nl, t3nl} from "../../../utils";

const NonceCodeBlock = props => {

    const [pluginMeta, setPluginMeta] = React.useContext(PluginMetaContext);
    if (!pluginMeta.useNonce) {
        return;
    }
    let codeWithNonce = "";
    codeWithNonce += t2nl(`function add_nonce_in_head_area(){ ?>`);
    codeWithNonce += t3nl(`<script type="text/javascript">`);
    codeWithNonce += t3nl(`var site_variables = {`);

    codeWithNonce += t3nl(` ${pluginMeta.nonceName}:<?php echo json_encode(wp_create_nonce("${
        pluginMeta.nonceName}")); ?>,`);
    codeWithNonce += t3nl(`'ajax_url'  :<?php admin_url( 'admin-ajax.php' )?>`);
    codeWithNonce += t3nl(`};`);
    codeWithNonce += t3nl(`</script><?php`);
    codeWithNonce += t2nl(`}`);

    return (<CodeBlock code={codeWithNonce}/>);

};

export default NonceCodeBlock;
