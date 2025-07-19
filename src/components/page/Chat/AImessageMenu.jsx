import React, { useContext, useState } from 'react';
import { FaBrain, FaWikipediaW } from 'react-icons/fa';
import { MdContentCopy, MdOutlineFileDownload, MdOutlineNotes, MdDone } from "react-icons/md";
import { WiStars } from "react-icons/wi";
import { CurrentChatMessageContext } from '../../../contexts/CurrentChatMessageContext';

const AImessageMenu = ({ message }) => {
    const { selectedMessage, setSelectedMessage, currentInsight, setCurrentInsight } = useContext(CurrentChatMessageContext) || {};
    const [copyFlag, setCopyFlag] = useState(false);

    const getUniqueSources = () => {
        const rawSources = message?.sources?.retrived_contexts || [];
        const unique = new Set(rawSources.map(tool => tool.name));
        return [...unique];
    };

    const sourceDetails = {
        "vector_db_search_tool": {
            name: "Memory",
            icon: <FaBrain className="text-sm" />
        },
        "wikipedia_search_tool": {
            name: "Wikipedia",
            icon: <FaWikipediaW className="text-sm" />
        }
    };

    const handleCopy = () => {
        const content = message?.content?.content || "";
        navigator.clipboard.writeText(content);
        setCopyFlag(true);
        setTimeout(() => setCopyFlag(false), 3000);
    };

    const handleDownload = () => {
        const content = message?.content?.content || message?.response || "";
        const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "message.md";
        link.click();
        URL.revokeObjectURL(link.href);
    };

    const openMessageInsights = (insight) => {
        setCurrentInsight(insight);
        setSelectedMessage(message);
    };

    return (
        <div>
            {message?.content?.content && (
                <div className="mt-3 flex justify-between items-center flex-wrap text-white/80 text-xs">
                    {/* Left: Tool Buttons */}
                    <div className="flex gap-2 flex-wrap items-center">
                        <button onClick={handleCopy} title="Copy" className="icon-button group">
                            {copyFlag ? (
                                <MdDone className="text-lg group-hover:scale-110 duration-300 icon cursor-pointer" />
                            ) : (
                                <MdContentCopy className="text-lg group-hover:scale-110 duration-300 icon cursor-pointer" />
                            )}
                        </button>

                        <button onClick={handleDownload} title="Download as .md" className="icon-button group">
                            <MdOutlineFileDownload className="text-xl group-hover:scale-110 duration-300 icon cursor-pointer" />
                        </button>

                        <button onClick={() => openMessageInsights("summary")} title="Summary" className="icon-button group">
                            <WiStars className="text-2xl group-hover:scale-110 duration-300 icon cursor-pointer" />
                        </button>

                        <button onClick={() => openMessageInsights("highlights")} title="Highlights" className="icon-button group">
                            <MdOutlineNotes className="text-xl group-hover:scale-110 duration-300 icon cursor-pointer" />
                        </button>
                    </div>

                    {/* Right: Sources */}
                    {getUniqueSources().length > 0 && (
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-gray-400 text-xs">Sources:</span>
                            {getUniqueSources().map((src, idx) => {
                                const detail = sourceDetails[src] || { name: src, icon: null };
                                return (
                                    <span
                                        key={idx}
                                        title={detail.name}
                                        onClick={() => openMessageInsights("sources")}
                                        className="icon cursor-pointer flex items-center gap-1 border border-white/20 px-2 py-1 rounded-full bg-white/5"
                                    >
                                        {detail.icon}
                                    </span>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AImessageMenu;
