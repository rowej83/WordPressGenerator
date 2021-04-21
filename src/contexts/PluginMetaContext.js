import React from "react";

const PluginMetaContext = React.createContext({
    pluginName: "",
        pluginDescription: "",
        pluginAuthor: "",
        pluginAuthorUrl: "",
        pluginUrl: ""
});

export default PluginMetaContext;

// {
//   pluginName: "",
//   pluginDescription: "",
//   pluginAuthor: "",
//   pluginAuthorUrl: "",
//   pluginUrl: ""
// }
