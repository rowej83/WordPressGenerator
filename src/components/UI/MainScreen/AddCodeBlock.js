import React from "react";
import "../../../styles.css";
import BlockArrayContext from "../../../contexts/BlockArrayContext";

import RewriteAjaxInput from "../CodeBlocks/RewriteAjaxInput"
import AdminAjaxInput from "../CodeBlocks/AdminAjaxInput";
import ShortCodeInput from "../CodeBlocks/ShortCodeInput";
import BlankComponent from "../CodeBlocks/BlankComponent";
import PluginMetaContext from "../../../contexts/PluginMetaContext";
import {
    Label,
    Container,
    InputLabel,
    Select,
    MenuItem, FormControl
} from "@material-ui/core";

const AddCodeBlock = props => {
    const [codeBlocks, setCodeBlocks] = React.useContext(BlockArrayContext);
    const [nameOfBlock, setNameOfBlock] = React.useState();
    const [typeOfBlockToAdd, setTypeOfBlockToAdd] = React.useState("blank");
    const [pluginMeta, setPluginMeta] = React.useContext(PluginMetaContext);
    const Styles = {
        AddCodeBlockContainer: {
            display: "flex",
            margin: "auto 0",
            textAlign: "center"
        }
    };
    const addToCodeBlocks = blockToAdd => {
        // setCodeBlocks([...codeBlocks, blockToAdd]);
        setCodeBlocks(draft => {
            draft.push(blockToAdd);
        });
        setTypeOfBlockToAdd("blank");
    };
    const goBackToBlankCodeBlock = () => {

        setTypeOfBlockToAdd("blank");
    };
    const updateTypeOfBlockToAdd = event => {
        setTypeOfBlockToAdd(event.target.value);
    };
    return (
        <>
            <div style={{marginBottom: "30px",width:"100%"}}>
                {typeOfBlockToAdd === "blank" && (
                    <BlankComponent/>
                )}
                <InputLabel id="typeOfBlockToAdd">
                    Add function : </InputLabel>
                <Select
                    labelId="typeOfBlockToAdd"
                    id="select"
                    value={typeOfBlockToAdd}
                    onChange={updateTypeOfBlockToAdd}
                    fullwidth
                >
                    <MenuItem value="blank" disabled>Click to add</MenuItem>
                    <MenuItem value="wp-ajax">Ajax Admin.php (POST)</MenuItem>
                    <MenuItem value="rewriteAPI">Ajax Rewrite API (GET)</MenuItem>
                    <MenuItem value="shortCode">Add shortcode</MenuItem>
                </Select>

            </div>
            {typeOfBlockToAdd === "wp-ajax" && (
                <AdminAjaxInput onAdd={addToCodeBlocks}/>
            )}
            {typeOfBlockToAdd === "rewriteAPI" && (
                <RewriteAjaxInput onAdd={goBackToBlankCodeBlock}/>
            )}
            {typeOfBlockToAdd === "shortCode" && (
                <ShortCodeInput onAdd={addToCodeBlocks}/>
            )}


        </>
    );
};

export default AddCodeBlock;
