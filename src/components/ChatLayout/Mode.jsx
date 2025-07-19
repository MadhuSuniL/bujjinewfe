import React, { useState, useEffect, useRef } from "react";
import { MdModelTraining } from "react-icons/md";
import Card from "../ui/Card";

const MODES = [
    "Casual",
    "Analytical",
    "Scientific",
    "Motivational",
    "Story",
    "Humorous",
    "Science Fiction",
    "Kids"
];


const STORAGE_KEY = "selectedMode";

const Mode = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMode, setSelectedMode] = useState("Casual");
    const modeRef = useRef(null);


    useEffect(() => {
        const savedMode = localStorage.getItem(STORAGE_KEY);
        if (savedMode) setSelectedMode(savedMode);
    }, []);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modeRef.current && !modeRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const handleModeSelect = (mode) => {
        setSelectedMode(mode);
        localStorage.setItem(STORAGE_KEY, mode);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={modeRef}>
            <div
                className="flex items-center space-x-2 cursor-pointer p-2 text-main"
                onClick={() => setIsOpen(!isOpen)}
            >
                <MdModelTraining size={24} className="icon" />
                <span className="font-bold">{selectedMode}</span>
            </div>

            {isOpen && (
                <Card className="absolute top-full right-0 mt-2 rounded-xl w-40 p-2 z-10" fill>
                    {MODES.map((mode) => (
                        <div
                            key={mode}
                            className={`p-2 text-sm cursor-pointer rounded-md ${selectedMode === mode ? "" : ""
                                }`}
                            onClick={() => handleModeSelect(mode)}
                        >
                            {mode}
                        </div>
                    ))}
                </Card>
            )}
        </div>
    );
};

export default Mode;
