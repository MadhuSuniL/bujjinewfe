import React, { useState, createContext, useContext } from "react";
import { stream } from 'fetch-event-stream'
import { BACKEND_HOST } from "../utils/Axios";
import { CurrentChatMessageContext } from "./CurrentChatMessageContext";
import { getData } from "../utils/localStorage";
import { ChatsContext } from "./ChatsContext";

// eslint-disable-next-line react-refresh/only-export-components
export const PromptContext = createContext();

const PromptProvider = ({ children }) => {
    const [prompt, setPrompt] = useState("")
    const [kidsModeOn, setKidsModeOn] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isStreaming, setIsStreaming] = useState(false)
    const [isToolCalling, setIsToolCalling] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)



    const { conversationId, manageMessages, addHumanMessage } = useContext(CurrentChatMessageContext) || {}
    const { manageChats } = useContext(ChatsContext) || {}


    const startCompletion = async () => {
        const url = BACKEND_HOST + "chat/bujji/completion/";
        const body = JSON.stringify({
            conversation_id: conversationId || null,
            query: prompt,
            kids_mode: kidsModeOn
        });

        const method = "POST";
        const headers = {
            Accept: "*/*",
            Authorization: `Bearer ${getData("accessToken")}`,
            "Content-Type": "application/json"
        };

        setIsLoading(true);
        setErrorMessage(false);
        setIsToolCalling(false);
        setIsStreaming(false);

        try {
            addHumanMessage(prompt);
            setPrompt("");

            const events = await stream(url, { method, headers, body });

            let firstChunk = true;

            for await (let event of events) {
                if (event.data === "[DONE]") break;

                if (firstChunk) {
                    setIsLoading(false);
                    setIsStreaming(true);
                    firstChunk = false;
                }

                const { t, p, o, v } = JSON.parse(event.data);

                if (t === "conversations") {
                    manageChats({ p, o, v });
                } else if (t === "status" && p === "tool_call") {
                    setIsToolCalling(v);
                } else if (t === "error") {
                    setErrorMessage(v);
                } else {
                    manageMessages({ p, o, v });
                }
            }
        } catch (error) {
            setErrorMessage("Something went wrong while fetching the response.");
            setIsLoading(false);
        } finally {
            setIsStreaming(false);
            setIsToolCalling(false);
        }
    };




    return (
        <PromptContext.Provider
            value={{
                prompt,
                setPrompt,
                kidsModeOn,
                setKidsModeOn,
                startCompletion,
                conversationId,
                isToolCalling,
                isLoading,
                errorMessage
            }}
        >
            {children}
        </PromptContext.Provider>
    );
};

export default PromptProvider;
