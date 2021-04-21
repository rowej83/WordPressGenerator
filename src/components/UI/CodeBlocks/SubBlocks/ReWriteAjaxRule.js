import React from "react";
import {InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import ReWriteAjaxRulesContext from "../../../../contexts/ReWriteAjaxRulesContext";

const ReWriteAjaxRule = props => {
    const [ruleArrayObject, setRuleArrayObject, numberOfRules, setNumberOfRules] = React.useContext(ReWriteAjaxRulesContext);

    const sendBaseUpdate = (e) => {
        let newValue = e.target.value ? e.target.value : "";
        // console.log(e.target);
        setRuleArrayObject(draft => {
            draft[props.index].optionalBase = newValue;
        });

    }
    const sendTagUpdate = (e) => {
        let newValue = e.target.value ? e.target.value : "";
        setRuleArrayObject(draft => {
            draft[props.index].tag = newValue;
        });

    }
    const sendRegexPatternUpdate = (e) => {
        let newValue = e.target.value ? e.target.value : "";
        setRuleArrayObject(draft => {
            draft[props.index].regexPattern = newValue;
        });

    }
    return (<div className={"reWriteRuleRow"}>
        <TextField label="Base:"
                   helperText="Optional Base of Rewrite"
                   value={ruleArrayObject[props.index].optionalBase}
                   onChange={sendBaseUpdate}
                   type="text"
                   style={{marginRight: "10px"}}
        />
        <TextField label="GET Variable:"
            // helperText="Shortcode tag in the content. e.g. [tag]"
                   value={ruleArrayObject[props.index].tag}
                   onChange={sendTagUpdate}
                   type="text"
                   style={{marginLeft: "10px"}}
        />
        <InputLabel>
            Get Variable Type(regex):
            <Select
                labelId="label"
                id="select"
                value={ruleArrayObject[props.index].regexPattern}
                onChange={sendRegexPatternUpdate}
                style={{marginLeft: "10px"}}
            >
                <MenuItem value="static">Static Value</MenuItem>
                <MenuItem value="any">Any Value</MenuItem>
                <MenuItem value="digit">Only digit Value</MenuItem>
            </Select>
            {/*<br/><small>Self-closing shortcode: [tag]</small>*/}
            {/*<br/><small>Enclosing shortcode: [tag]content[/tag]</small>*/}
        </InputLabel>

    </div>);
}

export default ReWriteAjaxRule;