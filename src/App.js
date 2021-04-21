import React from "react";
import AppContainer from "./AppContainer";
import BlockArrayContext from "./contexts/BlockArrayContext";
import RewriteBlockContext from "./contexts/RewriteBlockContext";
import PluginMetaContext from "./contexts/PluginMetaContext";
import CodeInjectionContext from "./contexts/CodeInjectionContext";
import {useImmer} from "use-immer";
import "./styles.css";
import AddBlockContext from "./contexts/AddBlockContext";

export default function App() {

    const [codeBlocks, setCodeBlocks] = useImmer([]);


        // const [pluginMeta, setPluginMeta] = useImmer({
        //     className:"",
        //     nonceName:"",
        //     useNonce:true,
        //     pluginName:"",
        //     pluginDescription:"",
        //     pluginAuthor:"",
        //     pluginAuthorUrl:"",
        //     pluginUrl:""
        // });

      const [pluginMeta, setPluginMeta] = useImmer({});
    const [openModalForAddBlock, setOpenModalForAddBlock] = React.useState(
        false
    );

    const [codeInjection, setCodeInjection] = useImmer({
        codeForInit: [],
        codeForConstruct: [],
        codeForActivation: [],
        codeForDeactivation: []
    });
    const [rewriteBlocks, setRewriteBlocks] = useImmer({
        rewriteFunctionNames: [],
        rewriteTags: [],
        rewriteRules: [],
        rewriteSniffRequests:[]
    });

    return (
        <CodeInjectionContext.Provider value={[codeInjection, setCodeInjection]}>
            <PluginMetaContext.Provider value={[pluginMeta, setPluginMeta]}>
                <AddBlockContext.Provider value={[openModalForAddBlock, setOpenModalForAddBlock]}>
                <RewriteBlockContext.Provider value={[rewriteBlocks, setRewriteBlocks]}>
                    <BlockArrayContext.Provider value={[codeBlocks, setCodeBlocks]}>
                        <div className="App">
                            <AppContainer/>
                        </div>
                    </BlockArrayContext.Provider>
                </RewriteBlockContext.Provider>
                </AddBlockContext.Provider>
            </PluginMetaContext.Provider>
        </CodeInjectionContext.Provider>
    );
}
