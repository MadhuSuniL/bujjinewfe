import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

const modalVariants = {
    hidden: { y: "-30%", opacity: 0 },
    visible: { y: "0", opacity: 1 }
};

const NotePopup = ({ note, onClose }) => {
    const [page, setPage] = useState(1);
    const pointsPerPage = 10;

    const totalPages = Math.ceil(note?.points?.length / pointsPerPage) || 1;
    const startIdx = (page - 1) * pointsPerPage;
    const currentPoints = note?.points?.slice(startIdx, startIdx + pointsPerPage);

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                onClick={onClose}
            >
                <motion.div
                    className="dark-bg max-w-3xl w-full rounded-xl p-6 shadow-xl relative"
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        className="absolute cursor-pointer top-4 right-4 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                        onClick={onClose}
                    >
                        <X size={20} />
                    </button>

                    <h2 className="text-xl font-bold text-main mb-4">{note?.heading || "Note"}</h2>

                    <ul className="list-disc list-inside text-sm text-gray-800 dark:text-gray-200 space-y-1 max-h-64 overflow-y-auto pr-1">
                        {currentPoints?.map((point, idx) => (
                            <li key={idx}>{point}</li>
                        ))}
                    </ul>

                    <div className="flex justify-between mt-6 text-sm text-main font-medium">
                        <button
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                            className={`hover:underline ${page === 1 ? "opacity-30 cursor-not-allowed" : ""}`}
                        >
                            ← Prev
                        </button>
                        <span>Page {page} of {totalPages}</span>
                        <button
                            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={page === totalPages}
                            className={`hover:underline ${page === totalPages ? "opacity-30 cursor-not-allowed" : ""}`}
                        >
                            Next →
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default NotePopup;
