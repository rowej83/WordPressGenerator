import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import PluginMetaContext from "../../../contexts/PluginMetaContext";
import {slugify} from "../../../utils";
import {Modal, Button, TextField} from "@material-ui/core/";
import {Checkbox, FormControlLabel, FormGroup} from "@material-ui/core";

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
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    }
}));
let styleClasses = {
    blackbg: {backgroundColor: "black"}
};
export default function ModalForMeta(props) {
    const [classNameDisabled, setClassNameDisabled] = React.useState(false);
    const [nonceNameDisabled, setNonceNameDisabled] = React.useState(false);
    const [pluginMeta, setPluginMeta] = React.useContext(PluginMetaContext);
    const classes = useStyles();
    const classNameRef = React.useRef(null);
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);


    const validateNames = () => {
        if (pluginMeta.className != "" && pluginMeta.nonceName != "") {
            return false;
        } else {
            return true;
        }
    };
    const handleCloseModal = () => {
        props.setInitialLoad(false);
            console.log(pluginMeta);
        if (pluginMeta.className && pluginMeta.nonceName) {
            setClassNameDisabled(true);
            setNonceNameDisabled(true);
            // let classAndNonceNameSluggedAndSet = {...pluginMeta};
            //
            // classAndNonceNameSluggedAndSet['className'] = slugify(pluginMeta.className, "_");
            // classAndNonceNameSluggedAndSet['nonceName'] = slugify(pluginMeta.nonceName, "_");
            // setPluginMeta(classAndNonceNameSluggedAndSet);
            setPluginMeta(draft => {
                draft.className = slugify(pluginMeta.className, "_");
                draft.nonceName = slugify(pluginMeta.nonceName, "_");

            });
            props.setOpenModalForPluginInfo(false);


            return false;
        }
    };
    const handleOpen = () => {
        props.setOpenModalForPluginInfo(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleMetaFormUpdates = e => {
        console.log("from handle meta:",pluginMeta);
        let theKey = e.target.id;
        let tempDescription = "";
        let value = e.target.value;

        if (theKey === "pluginDescription") {
            setPluginMeta(draft => {
                draft.pluginDescriptionDisplay = value
                    .trim()
                    .split(/((?:\w+ ){10})/g)
                    .filter(Boolean)
                    .join("  \n    * ");
                draft.pluginDescription = value;

            });
            // let newObject = {...pluginMeta};
            // newObject["pluginDescriptionDisplay"] = value
            //     .trim()
            //     .split(/((?:\w+ ){10})/g)
            //     .filter(Boolean)
            //     .join("  \n    * ");
            // newObject["pluginDescription"] = value;
            // setPluginMeta(newObject);
        } else if (theKey === "useNonce") {

            setPluginMeta(draft => {
                draft.useNonce = !pluginMeta.useNonce
            })
        } else {
            // let newObject = {...pluginMeta};
            // newObject[theKey] = value;
            setPluginMeta(draft => {
                draft[theKey] = value;

            });
        }

        // console.log(pluginMeta);
    };
    let disabled = validateNames() ? {disabled: "disabled"} : {};
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h1>WordPress Plugin Generator</h1>
            <h2 id="simple-modal-title" style={{textAlign: "center"}}>
                Details
            </h2>
            <p
                style={{
                    textAlign: "center",
                    margin: "0 auto 0 auto",
                    display: "block",
                    marginBottom: "10px"
                }}
            >
                At minimum, Class & Nonce Name must be set.
            </p>
            <small
                style={{
                    textAlign: "center",
                    margin: "0 auto 0 auto",
                    display: "block",
                    marginBottom: "10px"
                }}
            >
                Please note, once Class and Nonce Names are set they can not be changed.
            </small>
            <div style={{marginBottom: "20px"}}>


                <TextField
                    disabled={classNameDisabled}
                    id="className"
                    label="Class Name"
                    className={["metaBottomMargin"]}
                    onChange={handleMetaFormUpdates}
                    value={pluginMeta.className}
                    ref={classNameRef}
                    autoFocus
                />

                <TextField
                    disabled={nonceNameDisabled}
                    id="nonceName"
                    label="Nonce Name"
                    style={{marginLeft: "10px"}}
                    className={["metaBottomMargin"]}
                    onChange={handleMetaFormUpdates}
                    value={pluginMeta.nonceName}
                />
            </div>
            <small
                style={{
                    textAlign: "center",
                    margin: "0 auto 0 auto",
                    display: "block",
                    marginBottom: "10px"
                }}
            >
                The plugin info below can be edited at anytime
            </small>
            <FormControlLabel fullwidth
                              control={
                                  <Checkbox
                                      id="useNonce"
                                      checked={pluginMeta.useNonce}
                                      onChange={
                                          handleMetaFormUpdates
                                      }

                                  />
                              }
                              label="Add nonce to head?"
            />

            <TextField
                id="pluginName"
                label="Plugin Name"
                fullWidth
                className={["metaBottomMargin"]}
                onChange={handleMetaFormUpdates}
                value={pluginMeta.pluginName}
            />
            <TextField
                id="pluginDescription"
                label="Plugin Description"
                className={["metaBottomMargin"]}
                value={pluginMeta.pluginDescription}
                onChange={handleMetaFormUpdates}
                fullWidth
                multiline
                rows={4}
            />
            <TextField
                id="pluginAuthor"
                label="Plugin Author"
                className={["metaBottomMargin"]}
                value={pluginMeta.pluginAuthor}
                onChange={handleMetaFormUpdates}
                fullWidth
            />
            <TextField
                id="pluginAuthorUrl"
                label="Plugin Author Url"
                className={["metaBottomMargin"]}
                value={pluginMeta.pluginAuthorUrl}
                onChange={handleMetaFormUpdates}
                fullWidth
            />
            <TextField
                id="pluginUrl"
                label="Plugin Url"
                fullWidth
                className={["metaBottomMargin"]}
                onChange={handleMetaFormUpdates}
                value={pluginMeta.pluginUrl}
            />
            <Button
                onClick={handleCloseModal}
                {...disabled}
                variant="contained"
                href="#contained-buttons"
                color="primary"
                style={{marginTop: "20px", marginBottom: "20px", width: "100%"}}
            >
                Finished
            </Button>
        </div>
    );

    return (
        <div>
            <Button
                onClick={handleOpen}
                variant="contained"
                href="#contained-buttons"
                style={{ width: "100%",marginBottom:"10px"}}
            >
                Set Plugin Info (Name, Description, Url etc..)
            </Button>
            <Modal
                disableEnforceFocus
                disableBackdropClick
                BackdropProps={{style: {backgroundColor: "rgba(0,0,0,1)"}}}
                open={props.openModalForPluginInfo}
               //  onClose={handleCloseModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}
