import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiCallWithToken from '../../utils/Axios';
import { ArrowLeft } from 'lucide-react';
import NotePopup from '../../components/page/notes/NotePopup';

const Notes = () => {
    const { collection_id } = useParams();
    const navigate = useNavigate();

    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedNote, setSelectedNote] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const url = `extra/note_collections/${collection_id}`;
        const method = "get";
        const body = {};
        const loadingState = setIsLoading;

        const onSuccess = (data) => {
            setNotes([...data?.notes] || []);
        };

        const onError = () => {
            setErrorMessage("Failed to fetch notes.");
        };

        apiCallWithToken(url, body, method, loadingState, onSuccess, onError);
    }, [collection_id]);

    return (
        <div className="p-4 max-w-7xl mx-auto">
            {/* Top Section */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-main mb-1">Notes</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Here are some curated notes from this collection. Each card shows a quick summary.
                    </p>
                </div>
                <button
                    onClick={() => navigate('/note_collections')}
                    className="flex items-center gap-2 text-sm text-main cursor-pointer hover:text-main font-medium transition"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Collections
                </button>
            </div>

            {/* Loading/Error/Empty States */}
            {isLoading ? (
                <div className="text-gray-500 dark:text-gray-400">Loading notes...</div>
            ) : errorMessage ? (
                <div className="text-red-600 dark:text-red-400">{errorMessage}</div>
            ) : notes.length === 0 ? (
                <div className="text-gray-500 dark:text-gray-400">No notes found in this collection.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {notes.map((note, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedNote(note)}
                            className="bg-white/10 hover:bg-white/20 border border-gray-200 dark:border-gray-700 p-5 rounded-2xl shadow hover:shadow-lg transition-all duration-200 h-[300px] flex flex-col"
                        >
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                                {note.heading || `Note ${index + 1}`}
                            </h3>
                            <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1 overflow-y-auto pr-1">
                                {note.points?.slice(0, 3)?.map((point, idx) => (
                                    <li key={idx} className="list-disc list-inside">{point}</li>
                                ))}
                                {note.points?.length > 3 && (
                                    <li className="text-xs text-main mt-1">+ {note.points.length - 3} more...</li>
                                )}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
            {selectedNote && (
                <NotePopup
                    note={selectedNote}
                    onClose={() => setSelectedNote(null)}
                />
            )}
        </div>
    );
};

export default Notes;
