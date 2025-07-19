import React, { useContext, useEffect, useState } from 'react';
import { FiShare2, FiTrash2 } from 'react-icons/fi';
import { MdOutlineDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { ImSpinner9 } from "react-icons/im";
import { ModalsContext } from '../../../../contexts/ModalsContext';
import { useNavigate } from 'react-router-dom';
import { PromptContext } from '../../../../contexts/PromptContext';
import apiCallWithToken from '../../../../utils/Axios';
import { ChatsContext } from '../../../../contexts/ChatsContext';

const ChatMenu = ({ conversation }) => {

    const [deleting, setDeleting] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const { setShareModalOpen, setSource } = useContext(ModalsContext)
    const { conversationId } = useContext(PromptContext)
    const { removeChat } = useContext(ChatsContext)

    const navigate = useNavigate()

    const deleteConv = () => {
        const url = `chat/conversations/${conversation.id}/`;
        const method = "delete";
        const body = {};
        const loadingState = setIsDeleting;

        const onSuccess = (data) => {
            setDeleting(false)
            removeChat(conversation.id)
            conversation.id === conversationId && navigate("/")
        };

        const onError = () => {
            setErrorMessage("Failed to delete.");
        };

        apiCallWithToken(url, body, method, loadingState, onSuccess, onError);
    }


    return (
        <div className="flex items-center gap-2 text-gray-100">
            {
                deleting ?
                    isDeleting ?
                        <>
                            <button className="hover:text-white cp animate-spin"><ImSpinner9 size={14} /></button>
                        </>
                        :
                        <>
                            <button onClick={() => setDeleting(false)} className="hover:text-white cp"><RxCross2 size={17} /></button>
                            <button onClick={deleteConv} className="hover:text-red-500 cp"><MdOutlineDone size={17} /></button>
                        </>
                    :
                    <>
                        <button onClick={() => {
                            setShareModalOpen(true)
                            setSource(conversation)
                        }} className="hover:text-white cp"><FiShare2 size={14} /></button>
                        <button onClick={() => setDeleting(true)} className="hover:text-red-500 cp"><FiTrash2 size={14} /></button>
                    </>
            }
        </div>
    );
};

export default ChatMenu;
