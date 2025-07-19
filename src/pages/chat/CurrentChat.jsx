import React, { useContext, useEffect, useRef } from 'react';
import Messages from '../../components/page/Chat/Messages';
import Prompt from '../../components/page/Chat/Prompt';
import { CurrentChatMessageContext } from '../../contexts/CurrentChatMessageContext';
import { PromptContext } from "../../contexts/PromptContext";
import { motion, AnimatePresence } from 'framer-motion';
import MessageInsights from '../../components/page/Chat/Message/MessageInsights';
import { ModalsContext } from '../../contexts/ModalsContext';
import ShareModal from '../../components/page/Chat/ShareModal';

const CurrentChat = () => {
    const { messages, messagesLoading, selectedMessage, setSelectedMessage, currentInsight } = useContext(CurrentChatMessageContext) || {};
    const { prompt, setPrompt, kidsModeOn, setKidsModeOn, startCompletion, isLoading, isToolCalling, errorMessage } = useContext(PromptContext)
    const { shareModalOpen, source } = useContext(ModalsContext)

    const bottomRef = useRef(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className='h-full flex flex-col relative'>
            <div className='flex-1 overflow-auto'>
                <div className='max-w-3xl mx-auto'>
                    <Messages messagesLoading={messagesLoading} messages={messages} isNewMessageLoading={isLoading} isToolCalling={isToolCalling} errorMessage={errorMessage} />
                    <div ref={bottomRef} />
                </div>
            </div>

            <div className='max-w-3xl mx-auto w-full'>
                <Prompt prompt={prompt} setPrompt={setPrompt} kidsModeOn={kidsModeOn} setKidsModeOn={setKidsModeOn} startCompletion={startCompletion} />
            </div>

            {/* Insights Popup Modal */}
            <AnimatePresence>
                {selectedMessage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center overflow-hidden"
                        onClick={() => setSelectedMessage(null)}
                    >
                        <MessageInsights selectedMessage={selectedMessage} setSelectedMessage={setSelectedMessage} currentInsight={currentInsight} />
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {shareModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center overflow-hidden"
                    >
                        <ShareModal conversation={source} />
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default CurrentChat;
