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

const OnlyNameWrapper = (props) => {

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


    </>);


}

export default OnlyNameWrapper;