import React, { useContext } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import Prompt from "../../components/page/Chat/Prompt";
import { PromptContext } from "../../contexts/PromptContext";
import Messages from "../../components/page/Chat/Messages";
import { CurrentChatMessageContext } from "../../contexts/CurrentChatMessageContext";
import { ModalsContext } from "../../contexts/ModalsContext";
import ShareModal from '../../components/page/Chat/ShareModal';

const starters = [
    "What is Quantum Computing?",
    "Tell me about the Roman Empire",
    "Who is the founder of OpenAI?",
    "How does solar energy work?",
];

const NewChat = () => {
    const {
        prompt,
        setPrompt,
        kidsModeOn,
        setKidsModeOn,
        startCompletion,
    } = useContext(PromptContext);

    const { messages } = useContext(CurrentChatMessageContext) || {};
    const { shareModalOpen, source } = useContext(ModalsContext)


    const handleStarterClick = (text) => {
        setPrompt(text);
    };


    return (
        <div className="w-full h-full relative overflow-hidden">
            <AnimatePresence mode="wait">
                {messages?.length ? (
                    <motion.div
                        key="chat"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="absolute inset-0 flex flex-col"
                    >
                        <div className="flex-1 overflow-auto">
                            <div className="max-w-3xl mx-auto">
                                <Messages
                                    messagesLoading={false}
                                    messages={messages}
                                    isNewMessageLoading={true}
                                />
                            </div>
                        </div>
                        <div className="max-w-3xl mx-auto w-full">
                            <Prompt
                                prompt={prompt}
                                setPrompt={setPrompt}
                                kidsModeOn={kidsModeOn}
                                setKidsModeOn={setKidsModeOn}
                                startCompletion={startCompletion}
                            />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="starter"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute inset-0 flex flex-col items-center justify-center px-4 py-8 text-center space-y-10"
                    >
                        <div>
                            <motion.h1
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="text-4xl md:text-5xl font-bold 0text-main mb-4 0font-main"
                            >
                                Meet <span className="text-main mb-4 font-main">bujji</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="text-white/80 text-lg max-w-2xl mx-auto"
                            >
                                Your trusted AI companion — powered by real sources like Wikipedia, designed to help you learn, explore, and understand with confidence.
                            </motion.p>
                        </div>

                        {/* Starter Questions */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl"
                        >
                            {starters.map((question, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleStarterClick(question)}
                                    className="bg-white/10 hover:bg-white/20 px-5 py-3 rounded-xl border border-white/20 transition-all duration-200 text-sm text-white"
                                >
                                    {question}
                                </button>
                            ))}
                        </motion.div>

                        {/* Prompt Box */}
                        <div className="w-full max-w-2xl pt-6">
                            <Prompt
                                prompt={prompt}
                                setPrompt={setPrompt}
                                kidsModeOn={kidsModeOn}
                                setKidsModeOn={setKidsModeOn}
                                startCompletion={startCompletion}
                            />
                        </div>

                        {/* Footer Info */}
                        <motion.p
                            className="text-xs text-white/40 pt-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                        >
                            Answers you can trust – verified with Wikipedia & real sources.
                        </motion.p>
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

export default NewChat;
