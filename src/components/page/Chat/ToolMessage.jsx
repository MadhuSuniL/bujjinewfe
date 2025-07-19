import React, { useState } from 'react';

const ToolMessage = ({ tool }) => {
    const [showContent, setShowContent] = useState(false);

    return (
        <div className="p-3 rounded-md bg-white/10 text-white max-w-md">
            {/* Tool Header with Dummy Icon and Name */}
            <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => setShowContent(!showContent)}
            >
                {/* Dummy Tool Icon */}
                <img
                    src="https://via.placeholder.com/30"
                    alt="Tool Icon"
                    className="w-8 h-8 rounded-full border"
                />

                <h3 className="font-semibold text-sm">{tool?.name || 'Unknown Tool'}</h3>
            </div>

            {/* Collapsible Tool Content */}
            {showContent && (
                <div className="mt-2 text-sm text-gray-200 border-l-2 border-orange-500 pl-3">
                    {tool?.content || 'No content available.'}
                </div>
            )}
        </div>
    );
};

export default ToolMessage;
