import React, {useState} from "react";
import CodeBlock from "../../GeneratedCode/CodeBlock";
import RewriteBlockContext from "../../../contexts/RewriteBlockContext";
import CodeInjectionContext from "../../../contexts/CodeInjectionContext";
import PluginMetaContext from "../../../contexts/PluginMetaContext";
import ReWriteAjaxRulesContext from "../../../contexts/ReWriteAjaxRulesContext";

import {
    FormControl,
    InputLabel,
    Input,
    Button,
    Checkbox,
    FormGroup,
    FormLabel,
    FormControlLabel,
    TextareaAutosize, TextField, Select, MenuItem,
} from "@material-ui/core";
import {useImmer} from "use-immer";
import NameAndCodeWrapper from "./Wrappers/NameAndCodeWrapper";

import {t2, t2nl, t3, t3nl, onlyUnique} from "../../../utils";

import ReWriteAjaxRules from "./SubBlocks/ReWriteAjaxRules";
import OnlyNameWrapper from "./Wrappers/OnlyNameWrapper";
import AddBlockContext from "../../../contexts/AddBlockContext";


//

const RewriteAjaxInput = props => {
    const [openModalForAddBlock, setOpenModalForAddBlock]=React.useContext(AddBlockContext);
    const [ruleArrayObject, setRuleArrayObject] = useImmer([
        {
            optionalBase: "dsf",
            tag: "sdfsf",
            regexPattern: "static"
        }
    ]);

    const [numberOfRules, setNumberOfRules] = React.useState(1);
    // const [baseUrl,setBaseUrl]=React.useState("");
    const [resultingRegex, setResultingRegex] = React.useState("");
    const [resultingFinalUrl, setResultingFinalUrl] = React.useState("");
    React.useEffect(e => {
        let regexResult = "";
        let finalUrlResult = "index.php";
        let matches = 1;

        for (let i = 0; i < ruleArrayObject.length; i++) {
            if (i != 0) {
                regexResult += "/";
            }
            if (ruleArrayObject[i].optionalBase) {

                regexResult += ruleArrayObject[i].optionalBase + "/";
            }

            if (ruleArrayObject[i].regexPattern) {
                //https://wordpress.stackexchange.com/questions/5413/need-help-with-add-rewrite-rule
                // ([^/]+) takes alphanumeric, while ([0-9]+) accepts digit
                // ([^/]*) is "anything but / "
                switch (ruleArrayObject[i].regexPattern) {
                    case "static":
                        regexResult += "1";
                        if (ruleArrayObject.length - 1 == i) {
                            regexResult += "/?";
                        }
                        break;
                    case "any":
                        regexResult += "([^/]+)"
                        if (ruleArrayObject.length - 1 == i) {
                            regexResult += "/?";
                        }
                        break;
                    case "digit":
                        regexResult += "([0-9]+)"
                        if (ruleArrayObject.length - 1 == i) {
                            regexResult += "/?";
                        }
                        break;
                    default:
                        regexResult += "1";
                        if (ruleArrayObject.length - 1 == i) {
                            regexResult += "/?";
                        }
                        break;

                }
                // result+=ruleArrayObject[i].regexPattern;
            }
            if (ruleArrayObject[i].tag) {
                finalUrlResult += `?${ruleArrayObject[i].tag}=$matches[${matches}]`;
                matches++;
            }

        }
        setResultingRegex(regexResult);
        setResultingFinalUrl(finalUrlResult);
    }, [ruleArrayObject]);


    const [pluginMeta, setPluginMeta] = React.useContext(PluginMetaContext);
    const [name, setName] = React.useState();
    const [codeForBlock, setCodeForBlock] = React.useState("");
    const [rewriteBlocks, setRewriteBlocks] = React.useContext(
        RewriteBlockContext
    );
    const [codeInjection, setCodeInjection] = React.useContext(
        CodeInjectionContext
    );
    const addRule = (e) => {
        // do something
        setRuleArrayObject(draft => {
            draft.push(
                {
                    optionalBase: "dsf",
                    tag: "sdfsf",
                    regexPattern: "static"
                }
            )
        });

        setNumberOfRules(numberOfRules + 1);
    }

    const submitCodeBlock = () => {
        // Add Query Vars for for ${name}
        // add_filter( 'query_vars', array ( $this, 'add_query_vars_${name}' ), 0 );
        //  public function add_query_vars_${name}( $vars ) {
        //   $vars[] = '___my-api';
        //   $vars[] = 'action';
        //   return $vars;
        //   }
        // Add API Endpoint for ${name}
        // public function add_endpoint_${name}() {
        //   add_rewrite_rule( '^my-api/v1/([^/]*)/?', 'index.php?___my-api=1&action=$matches[1]', 'top' );
        //   flush_rewrite_rules( false ); //// <---------- REMOVE THIS WHEN DONE TESTING
        //   }
        // ([^/]+) takes alphanumeric, while ([0-9]+) accepts digit
        // ([^/]*) is "anything but / "

        //     let code="";
        //
        // code+=`\n`;
        // code+=t2nl(`// Sniff Requests for ${name}`);
        // code+=`\n`;
        // code+=t2nl(`public function sniff_requests_for_${name}( $wp_query ) {`)
        // code+=`\n`;
        // code+=t3nl(`global $wp;`);
        // code+=`\n`;


        let tempSniffInput = "";
        if (ruleArrayObject.length > 0) {

            tempSniffInput += t2(`if ( isset (`);
            let count = 1;
            for (let i = 0; i < ruleArrayObject.length; i++) {
                if (ruleArrayObject.length == 1) {
                    //only 1
                    tempSniffInput += `$wp->query_vars['${ruleArrayObject[i].tag}']`;
                } else if (ruleArrayObject.length == i + 1) {//last
                    tempSniffInput += `$wp->query_vars['${ruleArrayObject[i].tag}']`;
                } else {
                    tempSniffInput += `$wp->query_vars['${ruleArrayObject[i].tag}'],`;
                }
            }
            //
            // ruleArrayObject.forEach(item=>{
            //     if(ruleArrayObject.length===1){
            //         tempSniffInput+=`$wp->query_vars['${item.tag}']`;
            //     }else if(ruleArrayObject.length-1===count){
            //         tempSniffInput+=`$wp->query_vars['${item.tag}']`;
            //     }else{
            //         tempSniffInput+=`$wp->query_vars['${item.tag}'],`;
            //
            //     }
            // count++;
            //     // console.log(item.tag);
            //
            // })
            tempSniffInput += `) ) {\n`;
            tempSniffInput += t3nl(`//sniff test for ${name}`);
            tempSniffInput += t3nl(`//conditions met, add code here`);
            tempSniffInput += "\n";
            tempSniffInput += t3nl(`wp_die();`);
            tempSniffInput += t3nl(`}`);
            tempSniffInput += t3nl(`}`);
        }
        setRewriteBlocks(draft => {
            draft.rewriteSniffRequests.push(tempSniffInput);

        });
        // code+=t3nl(`if ( isset( $wp->query_vars[ '___my-api' ], $wp->query_vars[ 'action' ] ) ) {`);
        // code+=t3nl(`wp_die( "Action requested: " . $wp->query_vars[ 'action' ] ); `);
        // code+=t3nl(`}`);
        // code+=t2nl(`}`);
        //
        //
        //
        // let itemToAdd = <CodeBlock code={code}/>;
        // // props.addToRewrite(`${name}`);
        // console.log("name", name);
        let tags = [];
        for (let i = 0; i < ruleArrayObject.length; i++) {
            console.log(ruleArrayObject[i].tag);
            tags.push(ruleArrayObject[i].tag);
        }

        let rules = `add_rewrite_rule( '${resultingRegex}', '${resultingFinalUrl}', 'top' );`;

        setRewriteBlocks(draft => {
            let tempArray = draft.rewriteTags.concat(tags);
            draft.rewriteTags = tempArray.filter(onlyUnique);
            draft.rewriteRules.push(rules);
            draft.rewriteFunctionNames.push(name);

        });

        if (rewriteBlocks.rewriteRules.length === 0) {

            setCodeInjection(draft => {
                draft.codeForActivation.push(`add_action('init', array($this,'add_rewrite_rules_for_${pluginMeta.className}' );`);
            });
            setCodeInjection(draft => {
                draft.codeForInit.push(`add_action('parse_request', array ( $this, 'sniff_requests_for_${pluginMeta.className}' ), 0 );`)
            });
        }


        props.onAdd();
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
                <OnlyNameWrapper name={name} functionNameLabel={"Rewrite Ajax API Function Name:"}setName={setName} codeForBlock={codeForBlock} setCodeForBlock>


                    {/*<p style={{wordBreak:"break-all"}}>Resulting Regex: {resultingRegex}</p>*/}
                    {/*    <p style={{wordBreak:"break-all"}}>Resulting Final Url: {resultingFinalUrl}</p>*/}
                    <Button onClick={addRule} color="secondary">Add Rule</Button>
                    <hr/>
                    <ReWriteAjaxRulesContext.Provider
                        value={[ruleArrayObject, setRuleArrayObject, numberOfRules, setNumberOfRules]}>
                        <ReWriteAjaxRules/>
                    </ReWriteAjaxRulesContext.Provider>
                </OnlyNameWrapper>
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

export default RewriteAjaxInput;
