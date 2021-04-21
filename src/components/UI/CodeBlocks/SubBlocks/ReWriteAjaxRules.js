import React from "react";
import ReWriteAjaxRule from "./ReWriteAjaxRule";
import ReWriteAjaxRulesContext from "../../../../contexts/ReWriteAjaxRulesContext";


const ReWriteAjaxRules = props => {
    const [ruleArrayObject, setRuleArrayObject, numberOfRules, setNumberOfRules] = React.useContext(ReWriteAjaxRulesContext);


    const createLayout = () => {
        let result = [];
        for (let i = 0; i < numberOfRules; i++) {

            result.push(<ReWriteAjaxRule
                index={i}
            />)
        }
        return result;
    }
    return (<div>
        {createLayout()}
    </div>);
}

export default ReWriteAjaxRules;