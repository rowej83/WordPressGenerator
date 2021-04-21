import React from "react";
import {
    FormControl,
    InputLabel,
    Input,


    FormGroup,
    FormLabel,
    FormControlLabel,
    TextareaAutosize
} from "@material-ui/core";

const NameAndCodeWrapper = (props) => {

    return (<>

        <FormControl>
            <InputLabel htmlFor="my-input">{props.functionNameLabel}</InputLabel>
            <Input
                value={props.name}
                onChange={e => {
                    props.setName(e.target.value);
                }}
                id="my-input"
                aria-describedby="my-helper-text"
            />

        </FormControl>

        {props.children}

        <FormControl>
            <label for="code">Code</label>
            <TextareaAutosize
                id="code"
                aria-describedby="my-helper-text"
                rowsMin={3}
                onChange={e => {
                    props.setCodeForBlock(e.target.value);
                }}
            >
                {props.codeForBlock}
            </TextareaAutosize>
        </FormControl>

    </>);


}

export default NameAndCodeWrapper;