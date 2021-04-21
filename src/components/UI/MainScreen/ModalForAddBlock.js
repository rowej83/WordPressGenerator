import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import PluginMetaContext from "../../../contexts/PluginMetaContext";
import {slugify} from "../../../utils";
import {Modal, Button, TextField} from "@material-ui/core/";
import {Checkbox, FormControlLabel, FormGroup} from "@material-ui/core";
import AddCodeBlock from "./AddCodeBlock";
import AddBlockContext from "../../../contexts/AddBlockContext";

function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: "absolute",
        minWidth: 900,
        maxWidth:"100%",
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    }
}));
let styleClasses = {
    blackbg: {backgroundColor: "black"}
};
export default function ModalForAddBlock(props) {
    const [openModalForAddBlock, setOpenModalForAddBlock]=React.useContext(AddBlockContext);

    const classes = useStyles();
    const classNameRef = React.useRef(null);
    const [modalStyle] = React.useState(getModalStyle);





    const toggle = () => {

        let result=openModalForAddBlock;
        setOpenModalForAddBlock(!result);
    };

  ;


//    let disabled = validateNames() ? {disabled: "disabled"} : {};
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <button className={"cancelButtonForOnAddBlock"} onClick={()=>{setOpenModalForAddBlock(false)}}>Cancel</button>
            <AddCodeBlock/>


        </div>
    );

    return (
        <div>
            <Button
                onClick={toggle}
                variant="contained"
                href="#contained-buttons"
                style={{ width: "100%"}}
            >
                Add Block
            </Button>
            <Modal
                id={"modalID"}
                disableEnforceFocus
                disableBackdropClick
                BackdropProps={{style: {backgroundColor: "rgba(0,0,0,.8)"}}}
                open={openModalForAddBlock}
                //  onClose={handleCloseModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}
