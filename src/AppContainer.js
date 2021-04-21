import React from "react";
import AddCodeBlock from "./components/UI/MainScreen/AddCodeBlock";
import BlockArrayContext from "./contexts/BlockArrayContext";
import PluginMetaContext from "./contexts/PluginMetaContext";
import RewriteBlockContext from "./contexts/RewriteBlockContext";
import CodeInjectionContext from "./contexts/CodeInjectionContext";
import AddBlockContext from "./contexts/AddBlockContext";
import NonceCodeBlock from "./components/GeneratedCode/Sections/NonceCodeBlock";
import ModalForMeta from "./components/UI/MainScreen/ModalForMeta";
import ConstructorAndInit from "./components/GeneratedCode/Sections/ConstructorAndInit";
import ActivationBlock from "./components/GeneratedCode/Sections/ActivationBlock";
import PluginMetaAndRegisterActivation from "./components/GeneratedCode/Sections/PluginMetaAndRegisterActivation";
import ClassHeader from "./components/GeneratedCode/Sections/ClassHeader";
import ClassFooter from "./components/GeneratedCode/Sections/ClassFooter";
import CodeBlock from "./components/GeneratedCode/CodeBlock";
import {Grid} from "@material-ui/core";
import ModalForAddBlock from "./components/UI/MainScreen/ModalForAddBlock";





const AppContainer = props => {
    const [codeBlocks, setCodeBlocks] = React.useContext(BlockArrayContext);
    const [pluginMeta, setPluginMeta] = React.useContext(PluginMetaContext);
    const [codeInjection, setCodeInjection] = React.useContext(
        CodeInjectionContext
    );
    const [openModalForAddBlock, setOpenModalForAddBlock]=React.useContext(AddBlockContext);
    const [rewriteBlocks, setRewriteBlocks] = React.useContext(
        RewriteBlockContext
    );
    const [openModalForPluginInfo, setOpenModalForPluginInfo] = React.useState(
        true
    );

    const [initialLoad, setInitialLoad] = React.useState(true);


    const itemsRef = React.useRef([]);
    // you can access the elements with itemsRef.current[n]

    React.useEffect(() => {
        itemsRef.current = itemsRef.current.slice(0, codeBlocks.length);
    }, [codeBlocks]);

    // console.log('rewriteRules',rewriteBlocks.rewriteRules.length);


    return (
        <>
            <h1 style={{textAlign: "center"}}>WordPress Plugin Generator</h1>

            <Grid container item xs={12} md={12}>
                <div className={"stage"}>
                    <h2>Plugin Options</h2>

                    <ModalForMeta
                        initialLoad={initialLoad}
                        setInitialLoad={setInitialLoad}
                        openModalForPluginInfo={openModalForPluginInfo}
                        setOpenModalForPluginInfo={setOpenModalForPluginInfo}
                    />
                    <ModalForAddBlock
                                      // openModalForAddBlock={openModalForAddBlock}
                                      // setOpenModalForAddBlock={setOpenModalForAddBlock}
                    />
                <div className={"codeBlockDiv"}>

                    {pluginMeta.className && <PluginMetaAndRegisterActivation/>}
                    {pluginMeta.className && <ClassHeader/>}
                    {pluginMeta.className && <ConstructorAndInit/>}

                    {rewriteBlocks.rewriteFunctionNames.length !== 0 && (
                        <ActivationBlock/>
                    )}
                    {pluginMeta.nonceName && pluginMeta.useNonce && <NonceCodeBlock/>}
                    {codeBlocks.map((item) =>item)}
                    {pluginMeta.className && <ClassFooter/>}
                </div></div>
            </Grid>
        </>
    );
};

export default AppContainer;
