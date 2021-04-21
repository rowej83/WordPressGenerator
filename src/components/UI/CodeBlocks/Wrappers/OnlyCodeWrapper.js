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

const OnlyCodeWrapper = (props) => {

    return (<>


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

export default OnlyCodeWrapper;