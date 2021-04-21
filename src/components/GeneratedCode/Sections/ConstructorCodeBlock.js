import React from "react";
import CodeBlock from "../CodeBlock";
import PluginMetaContext from "../../../contexts/PluginMetaContext";
import {t2nl} from "../../../utils"

const ConstructorCodeBlock = props => {
    const [pluginMeta, setPluginMeta] = React.useContext(PluginMetaContext);
    let codeWithNonce = "";
    codeWithNonce += t2nl(`function add_nonce_in_head_area(){ ?>`);
    codeWithNonce += t2nl(`<script type="text/javascript">`);
    codeWithNonce += t2nl(`var site_variables = {`);
    codeWithNonce += t2nl(`${pluginMeta.nonceName}:<?php echo json_encode(wp_create_nonce("${
        pluginMeta.nonceName
    }")); ?>,`);
    codeWithNonce += t2nl(`'ajax_url'  :<?php admin_url( 'admin-ajax.php' )?>`);
    codeWithNonce += t2nl(` };`);
    codeWithNonce += t2nl(`</script><?php`);
    codeWithNonce += t2nl(`}`);
    codeWithNonce += t2nl(`add_action( 'wp_head', array( $this, " add_nonce_in_head_area") );`);

    codeWithNonce += t2nl(`add_action( 'admin_head', array( $this, " add_nonce_in_head_area") );`);

    return (<CodeBlock code={codeWithNonce}/>)


};

export default ConstructorCodeBlock;
