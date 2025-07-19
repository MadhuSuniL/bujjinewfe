/* eslint-disable no-unused-vars */
import React from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import NewChat from "./NewChat";
import CurrentChat from "./CurrentChat";

const Chat = () => {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const conversationId = queryParams.get("conversation");

    return (
        <div className="w-full h-full relative overflow-hidden">
            <AnimatePresence mode="wait">
                {conversationId ? (
                    <motion.div
                        key="current"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full absolute top-0 left-0"
                    >
                        <CurrentChat />
                    </motion.div>
                ) : (
                    <motion.div
                        key="new"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full absolute top-0 left-0"
                    >
                        <NewChat />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Chat;
