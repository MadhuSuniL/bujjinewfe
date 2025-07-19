import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import apiCallWithToken from "../../utils/Axios";
import { useNavigate } from "react-router-dom";

const NoteCollections = () => {
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate()

    useEffect(() => {
        const url = "/extra/note_collections/";
        const method = "get";
        const body = {};
        const loadingState = setIsLoading;

        const onSuccess = (data) => {
            setNotes(data || []);
        };

        const onError = () => {
            setErrorMessage("Failed to fetch notes.");
        };

        apiCallWithToken(url, body, method, loadingState, onSuccess, onError);
    }, []);

    return (
        <motion.div
            key="note-collections"
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
                    className="text-4xl md:text-5xl font-bold mb-4"
                >
                    <span className="font-main text-main">bujji</span> Note Collections
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-white/80 text-lg max-w-2xl mx-auto"
                >
                    Automatically organized notes saved during your conversations with <span className="text-main font-semibold">Bujji</span>. Explore them anytime — sorted by months and topics for your convenience.
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="w-full overflow-auto p-2"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl w-full mx-auto">
                    {isLoading ? (
                        Array.from({ length: 6 }).map((_, idx) => (
                            <div
                                key={idx}
                                className="w-full h-32 bg-white/10 animate-pulse rounded-xl"
                            ></div>
                        ))
                    ) : errorMessage ? (
                        <p className="text-red-400 col-span-full">{errorMessage}</p>
                    ) : notes.length > 0 ? (
                        notes.map((collection, idx) => (
                            <div
                                key={idx}
                                onClick={() => navigate(collection.id)}
                                className="bg-gradient-to-r from-white/10 to-orange-400/20 hover:bg-gradient-to-b hover:scale-[1.025] transition-all duration-200 border border-white/20 p-4 rounded-xl text-left text-white space-y-2"
                            >
                                <h2 className="font-semibold text-main">{collection.name || `Note ${idx + 1}`}</h2>
                                <p className="text-white/70 text-sm">
                                    {collection.notes?.length || 0} note{collection.notes?.length === 1 ? "" : "s"}
                                </p>
                                <p className="text-xs text-white/40 float-end">
                                    {new Date(collection.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-white/60 text-center col-span-full">No notes found.</p>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default NoteCollections;
