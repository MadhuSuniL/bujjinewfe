import React, { useState, createContext, useEffect } from "react";
import apiCallWithToken from '../utils/Axios'

// eslint-disable-next-line react-refresh/only-export-components
export const ChatsContext = createContext();

const ChatsProvider = ({ children }) => {
    const [chats, setChats] = useState([]);
    const [newChat, setNewChat] = useState({})
    const [chatsLoading, setChatsLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    const manageChats = (data) => {
        const { p, o, v } = data
        if (!p || !o) return;

        if (o === "add" && p === "conversation") {
            // Add a new chat to the top
            setChats(prev => [v, ...prev]);
            setNewChat(v)
        }

        else if (p.startsWith("conversation/")) {
            const keyToUpdate = p.split('/')[1]; // e.g., "title", "created_at"

            setChats(prev => {
                if (prev.length === 0) return prev;

                const updatedFirst = { ...prev[0] };

                if (o === "add" || o === "update") {
                    updatedFirst[keyToUpdate] = v;
                } else if (o === "append") {
                    if (typeof updatedFirst[keyToUpdate] === "string") {
                        updatedFirst[keyToUpdate] += v;
                    } else if (Array.isArray(updatedFirst[keyToUpdate])) {
                        updatedFirst[keyToUpdate] = [
                            ...updatedFirst[keyToUpdate],
                            ...v,
                        ];
                    } else {
                        updatedFirst[keyToUpdate] = v;
                    }
                }

                return [updatedFirst, ...prev.slice(1)];
            });
        }
    }

    const refreshChats = () => {
        setRefresh(prev => !prev)
    }

    const getChats = () => {
        let url = 'chat/conversations'
        let method = 'get'
        let body = {}
        let loadingState = setChatsLoading
        const onSuccess = (data) => {
            setChats(data)
            setErrorMessage(null)
        }
        const onError = () => {
            setErrorMessage("Failed to fetch chats....")
        }
        apiCallWithToken(url, body, method, loadingState, onSuccess, onError)
    }

    const removeChat = (conversationId) => {
        setChats(prev => prev.filter(conv => conv.id !== conversationId));
    };

    useEffect(() => {
        getChats()
    }, [refresh])

    return (
        <ChatsContext.Provider
            value={{
                chats,
                refreshChats,
                errorMessage,
                manageChats,
                chatsLoading,
                newChat,
                setNewChat,
                removeChat
            }}
        >
            {children}
        </ChatsContext.Provider>
    );
};

export default ChatsProvider;
