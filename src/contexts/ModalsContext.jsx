import React, { useState, createContext } from "react";

export const ModalsContext = createContext();

const ModalsProvider = ({ children }) => {

    const [shareModalOpen, setShareModalOpen] = useState(false)
    const [source, setSource] = useState(null)




    return (
        <ModalsContext.Provider
            value={{
                setShareModalOpen,
                shareModalOpen,
                source,
                setSource
            }}
        >
            {children}
        </ModalsContext.Provider>
    );
};

export default ModalsProvider;
