import React, { createContext, useState, useEffect } from "react";
import apiCallWithToken from "../utils/Axios";

export const CurrentChatMessageContext = createContext();

const CurrentChatMessageProvider = ({ children, conversationId }) => {
    const [messages, setMessages] = useState([]);
    const [messagesLoading, setMessagesLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [selectedMessage, setSelectedMessage] = useState(null)
    const [currentInsight, setCurrentInsight] = useState(null)

    const refreshMessages = () => {
        setRefresh(prev => !prev);
    };

    const setDeepValue = (obj, path, value, operation) => {
        const keys = path.split("/");
        const lastKey = keys.pop();
        let current = obj;

        for (let key of keys) {
            if (!(key in current)) current[key] = {};
            current = current[key];
        }

        if (operation === "append") {
            if (typeof current[lastKey] === "string") {
                current[lastKey] += value;
            } else if (Array.isArray(current[lastKey])) {
                current[lastKey] = [...current[lastKey], ...value];
            } else {
                current[lastKey] = value;
            }
        } else {
            current[lastKey] = value;
        }

        return obj;
    };

    const manageMessages = ({ p, o, v }) => {
        if (!p || !o) return;

        setMessages(prevMessages => {
            const updated = [...prevMessages];

            if (o === "add" && p === "messages") {
                const exists = updated.some(msg => msg.id === v.id);
                if (!exists) return [...updated, v];
                return updated;
            }

            if (p.startsWith("message/")) {
                const path = p.replace("message/", "");

                let targetIndex = -1;

                // ✅ For "append" operation — always target last assistant message
                if (o === "append") {
                    targetIndex = [...updated]
                        .reverse()
                        .findIndex(msg => msg.author?.role === "assistant");

                    if (targetIndex !== -1) {
                        targetIndex = updated.length - 1 - targetIndex;
                    }
                }

                // Otherwise try to match by ID (e.g. for full replacements)
                if (targetIndex === -1 && v?.id) {
                    targetIndex = updated.findIndex(msg => msg.id === v.id);
                }

                // Final fallback
                if (targetIndex === -1) {
                    targetIndex = updated.length - 1;
                }

                if (targetIndex !== -1) {
                    const modified = JSON.parse(JSON.stringify(updated[targetIndex]));
                    setDeepValue(modified, path, v, o);
                    updated[targetIndex] = modified;
                }

                return updated;
            }

            return updated;
        });
    };


    const addHumanMessage = (content) => {
        const tempId = "temp-" + Date.now(); // unique temp id

        const message = {
            id: tempId,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            author: {
                name: "Human",
                role: "human"
            },
            content: {
                content: content,
                content_type: "text"
            },
            status: "complete",
            conversation: conversationId
        };

        setMessages(prev => [...prev, message]);
        return message;
    };


    const getMessages = () => {
        if (!conversationId) {
            setMessages([]);
            return
        };
        const url = `chat/conversations/${conversationId}/messages`;
        const method = "get";
        const body = {};
        const loadingState = setMessagesLoading;

        const onSuccess = (data) => {
            let filterdMessages = data.filter(message => message?.content?.content_type == "text")
            setMessages(filterdMessages || []);
        };

        const onError = () => {
            setErrorMessage("Failed to fetch messages.");
        };

        apiCallWithToken(url, body, method, loadingState, onSuccess, onError);
    };

    useEffect(() => {
        getMessages();
    }, [refresh, conversationId]);

    return (
        <CurrentChatMessageContext.Provider
            value={{
                messages,
                refreshMessages,
                errorMessage,
                manageMessages,
                conversationId,
                messagesLoading,
                addHumanMessage,
                selectedMessage,
                setSelectedMessage,
                currentInsight,
                setCurrentInsight
            }}
        >
            {children}
        </CurrentChatMessageContext.Provider>
    );
};

export default CurrentChatMessageProvider;
