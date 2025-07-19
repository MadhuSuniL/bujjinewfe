import React, { useContext, useEffect, useState } from 'react';
import apiCallWithToken from '../../../utils/Axios';
import { ImSpinner9 } from "react-icons/im";
import Card from '../../ui/Card';
import { motion } from 'framer-motion';
import { ModalsContext } from '../../../contexts/ModalsContext';

const ShareModal = ({ conversation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [shareId, setShareId] = useState(null);
    const [copied, setCopied] = useState(false);
    const { setShareModalOpen, setSource } = useContext(ModalsContext);

    useEffect(() => {
        const url = "/chat/share/conversation/create";
        const method = "post";
        const body = {
            conversation_id: conversation?.id,
        };
        const loadingState = setIsLoading;

        const onSuccess = (data) => {
            const fullUrl = `${window.location.origin}/chat/share/${data?.share_id}`;
            setShareId(fullUrl);
        };

        const onError = () => { };

        conversation?.id &&
            apiCallWithToken(url, body, method, loadingState, onSuccess, onError);
    }, [conversation]);

    const handleCopy = () => {
        if (shareId) {
            navigator.clipboard.writeText(shareId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <Card>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="w-full max-w-xl relative text-black overflow-hidden p-6"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={() => {
                        setShareModalOpen(false);
                        setSource(null);
                    }}
                    className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-lg font-bold cursor-pointer"
                >
                    &times;
                </button>

                {/* Content */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-24">
                        <ImSpinner9 className="animate-spin text-2xl text-main" />
                    </div>
                ) : shareId ? (
                    <div className="w-full flex flex-col gap-4 items-center mt-4">
                        <div className="w-full flex gap-2 items-center">
                            <input
                                readOnly
                                value={shareId}
                                className="flex-1 bg-transparent text-sm px-4 py-2 border border-main ring-main  rounded-md text-gray-600 cursor-default"
                            />
                            <button
                                onClick={handleCopy}
                                className="bg-main text-white text-sm px-4 py-2 rounded-md hover:brightness-110 transition-all cursor-pointer"
                            >
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        </div>
                        <p className="text-xs text-gray-500">
                            Your name, custom instructions, and any messages you add after sharing stay private.
                        </p>
                    </div>
                ) : (
                    <div className="text-sm text-red-600 text-center mt-6">
                        Unable to generate Share ID.
                    </div>
                )}
            </motion.div>
        </Card>
    );
};

export default ShareModal;
