import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import classNames from 'classnames';
import Markdown from 'react-markdown';

const ThinkingMessage = ({ message, isThinking }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="p-2">
            {/* Header Section */}
            <div
                className="flex items-center justify space-x-1 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-2">
                    <div
                        className={classNames('text-sm font-semibold', {
                            'animate-pulse': isThinking,
                            '': !isThinking,
                        })}
                    >
                        {isThinking ? 'Thinking...' : 'Thinked in a couple of seconds'}
                    </div>
                </div>
                <div>
                    {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                </div>
            </div>

            {/* Collapsible Content */}
            {isExpanded && !isThinking && (
                <div className="mt-3 text-sm white-gray-bg p-3 rounded-2xl">
                    <Markdown>{message.content.content}</Markdown>
                </div>
            )}
        </div>
    );
};

export default ThinkingMessage;
