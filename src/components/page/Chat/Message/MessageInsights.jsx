import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../../../ui/Card';
import apiCallWithToken from '../../../../utils/Axios';
import { ReactTyped } from 'react-typed';
import ToolCallingAnimation from '../ToolCallingAnimation';


const MessageInsights = ({
    selectedMessage,
    setSelectedMessage,
    currentInsight
}) => {


    return (
        <Card>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="w-3xl relative text-black overflow-hidden px-3"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={() => setSelectedMessage(null)}
                    className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-lg font-bold cursor-pointer"
                >
                    &times;
                </button>
                <div className='overflow-auto max-h-96 mx-2'>
                    {
                        currentInsight === 'summary' ?
                            <InsightSummary message={selectedMessage} />
                            : currentInsight === "highlights" ?
                                <InsightHighlights message={selectedMessage} />
                                :
                                <InsightSources message={selectedMessage} />
                    }
                </div>
            </motion.div>
        </Card>
    );
};

export default MessageInsights;



const InsightSummary = ({ message }) => {
    const [summary, setSummary] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const getSummary = () => {
        const url = `chat/message/insights/summary/`;
        const method = "post";
        const body = {
            content: message?.content?.content || ""
        };
        const loadingState = setIsLoading;

        const onSuccess = (data) => {
            setSummary(data || "No summary available.");
        };

        const onError = () => {
            setSummary("This message provides an overview of solar energy, explaining how it's harnessed using panels and converted into usable power.");
        };

        apiCallWithToken(url, body, method, loadingState, onSuccess, onError);
    };

    useEffect(() => {
        getSummary();
    }, []);

    return (
        <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-200">Summary</h3>
            <p className="text-gray-300 text-sm">
                {isLoading ? <ToolCallingAnimation message={"Summarising ..."} /> : <ReactTyped strings={[summary]} />}
            </p>
        </div>
    );
};



const InsightHighlights = ({ message }) => {
    const [highlights, setHighlights] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getHighlights = () => {
        const url = `chat/message/insights/highlights/`;
        const method = "post";
        const body = {
            content: message?.content?.content || ""
        };
        const loadingState = setIsLoading;

        const onSuccess = (data) => {
            setHighlights(data?.split("\n") || []);
        };

        const onError = () => {
            setHighlights([
                "Solar energy is clean and renewable",
                "Harnessed through photovoltaic cells",
                "Reduces carbon footprint and energy bills"
            ]);
        };

        apiCallWithToken(url, body, method, loadingState, onSuccess, onError);
    };

    useEffect(() => {
        getHighlights();
    }, []);

    return (
        <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-200">Highlights</h3>
            {isLoading ? (
                <ToolCallingAnimation message={"Finding important points ..."} />
            ) : (
                <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                    {highlights.map((point, idx) => (
                        <li key={idx}><ReactTyped strings={[point.replace("*", "")]} showCursor={false} /></li>
                    ))}
                </ul>
            )}
        </div>
    );
};


const InsightSources = ({ message }) => {
    const sources = message?.sources?.retrived_contexts

    const getSourceTitle = (source) => {
        let titles = {
            "vector_db_search_tool": "Memory",
            "wikipedia_search_tool": "Wikipedia",
        }
        return titles[source.name]
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-200">Sources</h3>
            {
                sources?.map((source, idx) => (
                    <div
                        key={idx}
                        className="p-3 rounded-lg"
                    >
                        <h3 className="text-sm font-bold text-main mb-1">{getSourceTitle(source)}</h3>
                        <p className="text-sm text-gray-300">{source.content}</p>
                    </div>
                ))}
        </div>
    );
};


