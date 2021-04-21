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
    TextareaAutosize, Select, MenuItem, TextField
} from "@material-ui/core";
import {t2nl, t2, t3nl, t3, slugify} from "../../../utils";

import OnlyCodeWrapper from "./Wrappers/OnlyCodeWrapper";
import AddBlockContext from "../../../contexts/AddBlockContext";


const ShortCodeInput = props => {
    const [openModalForAddBlock, setOpenModalForAddBlock]=React.useContext(AddBlockContext);
    const [pluginMeta, setPluginMeta] = React.useContext(PluginMetaContext);
    const [codeInjection, setCodeInjection] = React.useContext(
        CodeInjectionContext
    );

    const [tagName, setTagName] = React.useState("");

    const [shortCodeType, setShortcodeType] = React.useState("selfClosing");
    const [codeForBlock, setCodeForBlock] = React.useState("");
    const [hasAttributes, setHasAttributes] = React.useState(false);

    const [attributes, setAttributes] = React.useState({
        attribute1Name: "",
        attribute1DefaultValue: "",
        attribute2Name: "",
        attribute2DefaultValue: "",
        attribute3Name: "",
        attribute3DefaultValue: ""
    });

    const handleAttributeUpdates = e => {

        let key = e.target.name;
        let newAttributes = {...attributes};
        newAttributes[key] = e.target.value;
        setAttributes(newAttributes);
    }

    const submitCodeBlock = () => {


        let codeToAddIfHasAttrOrEnclosed = "";
        if (shortCodeType === "Enclosed") {
            codeToAddIfHasAttrOrEnclosed += `( $atts , $content=null )`;
        } else if (hasAttributes) {
            codeToAddIfHasAttrOrEnclosed += `( $atts )`;
        } else {
            codeToAddIfHasAttrOrEnclosed += `()`;
        }

        let code = "";

        code += t2nl(`function function_for_shortcode_${tagName} ${codeToAddIfHasAttrOrEnclosed} {`);

        if (hasAttributes) {
            code += t2(`$atts = shortcode_atts(`)
            code += ` array(`;
            if (attributes.attribute1Name) {
                code += `${attributes.attribute1Name.toLowerCase()} =>`;
                if (isNaN(attributes.attribute1DefaultValue)) {
                    code += ` "${attributes.attribute1DefaultValue}"`;
                } else if (attributes.attribute1DefaultValue == "") {
                    code += ` "${attributes.attribute1DefaultValue}"`;
                } else {
                    code += ` ${attributes.attribute1DefaultValue}`;
                }

            }
            if (attributes.attribute2Name) {
                code += `, ${attributes.attribute2Name.toLowerCase()} =>`;
                if (isNaN(attributes.attribute2DefaultValue)) {
                    code += ` "${attributes.attribute2DefaultValue}"`;
                } else if (attributes.attribute2DefaultValue == "") {
                    code += ` "${attributes.attribute2DefaultValue}"`;
                } else {
                    code += ` ${attributes.attribute2DefaultValue}`;
                }

            }
            if (attributes.attribute3Name) {
                code += `, ${attributes.attribute3Name.toLowerCase()} =>`;
                if (isNaN(attributes.attribute3DefaultValue)) {
                    code += ` "${attributes.attribute3DefaultValue}"`;
                } else if (attributes.attribute3DefaultValue == "") {
                    code += ` "${attributes.attribute3DefaultValue}"`;
                } else {
                    code += ` ${attributes.attribute3DefaultValue}`;
                }
            }

            code += ` ), $atts );\n`;
        }

        if (attributes.attribute1Name) {
            code += t3nl(`// use it like $atts["${attributes.attribute1Name}"];`);
        }
        code += t3nl(`// be sure to return and not echo your shortcode output`)
        code += t3nl(codeForBlock);

        code += t2nl(`}`);

        // finally adds to block array
        let itemToAdd = (
            <CodeBlock
                // name={name}
                code={code}
                // nonceName={props.nonceName}
            />
        );
        // let newCodeToInjectForInit=[...codeInjection.codeForInit];
        // newCodeToInjectForInit.push(`if(!is_admin()){add_shortcode( '${tagName}', 'function_for_shortcode_${tagName}' );}`);
        // let newCodeInjection={...codeInjection};
        // newCodeInjection['codeForInit']=newCodeToInjectForInit;
        setCodeInjection(draft => {
            draft.codeForInit.push(`if(!is_admin()){add_shortcode( '${tagName}', 'function_for_shortcode_${tagName}' );}`);
        });

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
                <OnlyCodeWrapper  codeForBlock={codeForBlock}
                                 setCodeForBlock={setCodeForBlock}>
                    <TextField label="Tag Name"
                               helperText="Shortcode tag in the content. e.g. [tag]"
                               value={tagName}
                               onChange={e => {
                                   setTagName(e.target.value);
                               }}
                    />


                    <InputLabel style={{marginBottom: "20px", marginTop: "20px"}}>
                        Short Code type:
                        <Select
                            labelId="label"
                            id="select"
                            value={shortCodeType}
                            onChange={e => {
                                setShortcodeType(e.target.value)
                            }}
                            style={{marginLeft: "20px"}}
                        >
                            <MenuItem value="selfClosing">Self-Closing</MenuItem>
                            <MenuItem value="Enclosed">Enclosed</MenuItem>
                        </Select><br/>
                        <br/><small>Self-closing shortcode: [tag]</small>
                        <br/><small>Enclosing shortcode: [tag]content[/tag]</small>
                    </InputLabel>
                    <FormControlLabel style={{marginTop: "0px"}}
                                      control={
                                          <Checkbox
                                              checked={hasAttributes}
                                              onChange={() => {
                                                  setHasAttributes(!hasAttributes);
                                              }}
                                              value="hasAttributes"
                                          />
                                      }
                                      label={`Has Attributes: e.g. [tag attr_name="a_value"]`}
                    />
                    {hasAttributes ? (<div style={{marginBottom: "20px"}}>
                        <div className={["attributeRow"]}>
                            <TextField label="Attribute 1"
                                       name="attribute1Name"
                                       value={attributes.attribute1Name}
                                       onChange={handleAttributeUpdates}
                                       style={{marginRight: "10px"}}

                            />
                            <TextField label="Attribute 1 default value"
                                       name="attribute1DefaultValue"
                                       value={attributes.attribute1DefaultValue}
                                       style={{marginLeft: "10px"}}
                                       onChange={handleAttributeUpdates}
                            />
                        </div>

                        <div className={["attributeRow"]}>
                            <TextField label="Attribute 2"
                                       name="attribute2Name"
                                       value={attributes.attribute2Name}
                                       onChange={handleAttributeUpdates}
                                       style={{marginRight: "10px"}}

                            />
                            <TextField label="Attribute 2 default value"
                                       name="attribute2DefaultValue"
                                       value={attributes.attribute2DefaultValue}
                                       style={{marginLeft: "10px"}}
                                       onChange={handleAttributeUpdates}
                            />
                        </div>

                        <div className={["attributeRow"]}>
                            <TextField label="Attribute 3"
                                       name="attribute3Name"
                                       value={attributes.attribute3Name}
                                       onChange={handleAttributeUpdates}
                                       style={{marginRight: "10px"}}

                            />
                            <TextField label="Attribute 3 default value"
                                       name="attribute3DefaultValue"
                                       value={attributes.attribute3DefaultValue}
                                       style={{marginLeft: "10px"}}
                                       onChange={handleAttributeUpdates}
                            />
                        </div>

                    </div>) : ""}
                </OnlyCodeWrapper>

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

export default ShortCodeInput;
