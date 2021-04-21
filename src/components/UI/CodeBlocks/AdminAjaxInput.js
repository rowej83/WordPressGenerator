import React from "react";
// import AdminAjaxBlock from "./AdminAjaxBlock";
import CodeBlock from "../../GeneratedCode/CodeBlock";
import PluginMetaContext from "../../../contexts/PluginMetaContext";
import CodeInjectionContext from "../../../contexts/CodeInjectionContext";
import {
    FormControl,
    InputLabel,
    Input,
    Button,
    Checkbox,
    FormGroup,
    FormLabel,
    FormControlLabel,
    TextareaAutosize
} from "@material-ui/core";
import {t2nl, t3nl} from "../../../utils";

import NameAndCodeWrapper from "./Wrappers/NameAndCodeWrapper";
import AddBlockContext from "../../../contexts/AddBlockContext";

const AdminAjaxInput = props => {

    const [pluginMeta, setPluginMeta] = React.useContext(PluginMetaContext);
    const [codeInjection, setCodeInjection] = React.useContext(
        CodeInjectionContext
    );
    const [openModalForAddBlock, setOpenModalForAddBlock]=React.useContext(AddBlockContext);
    const [name, setName] = React.useState();
    const [loadNoPriv, setNoPriv] = React.useState(false);
    const [loadWithPriv, setWithPriv] = React.useState(false);
    const [codeForBlock, setCodeForBlock] = React.useState("");
    const submitCodeBlock = () => {

        let newTempObject = {...codeInjection};
        let newInitcode = "";
        if (loadNoPriv) {


            newInitcode = `add_action("wp_ajax_nopriv_${name}", array( $this, "${name}" ));`;


        }
        if (loadWithPriv) {

            newInitcode = `add_action("wp_ajax_${name}", array( $this, "${name}" ));`;

        }

        if (loadNoPriv || loadWithPriv) {
            setCodeInjection(draft => {
                draft.codeForInit.push(newInitcode);
            });

        }
        let code = "";
        if (pluginMeta.nonceName) {

            code += t2nl(`function ${name}{ `);
            code += t3nl(`if (!check_ajax_referer( '${pluginMeta.nonceName}',$_POST['${
                pluginMeta.nonceName
            }'],false )){ `);
            code += t3nl(`wp_die();`)
            code += t3nl(`}else{`)
            code += t3nl(`${codeForBlock}`)
            code += t3nl(`}`)
            code += t2nl(`}`)


        } else {
            code = t2nl(`function ${name}{`);
            code += t3nl(`${codeForBlock}`)
            code = t2nl(`}`);
        }

        let itemToAdd = (
            <CodeBlock
                // name={name}
                code={code}
                // nonceName={props.nonceName}
            />
        );
        props.onAdd(itemToAdd);
        setOpenModalForAddBlock(false);
    };
    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid grey",
                    padding: "10px"
                }}
            >
                <NameAndCodeWrapper functionNameLabel={"admin-ajax.php function name"}name={name} setName={setName} codeForBlock={codeForBlock}
                                    setCodeForBlock={setCodeForBlock}>
                    <FormControl component="fieldset" style={{marginTop: "20px"}}>
                        <FormLabel component="legend" style={{marginBottom: "10px"}}>
                            Options
                        </FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={loadNoPriv}
                                        onChange={() => {
                                            setNoPriv(!loadNoPriv);
                                        }}
                                        value="loadnopriv"
                                    />
                                }
                                label="Load regardless if user is logged in."
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={loadWithPriv}
                                        onChange={() => {
                                            setWithPriv(!loadWithPriv);
                                        }}
                                        value="loadnopriv"
                                    />
                                }
                                label="Load only when user is logged in."
                            />
                        </FormGroup>
                    </FormControl>

                </NameAndCodeWrapper>

                <Button
                    onClick={submitCodeBlock}
                    variant="contained"
                    color="primary"
                    href="#contained-buttons"
                    style={{marginTop: "20px"}}
                >
                    Submit
                </Button>
            </div>
        </>
    );
};

export default AdminAjaxInput;
