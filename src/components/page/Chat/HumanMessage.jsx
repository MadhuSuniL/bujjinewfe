import React, { useState } from 'react'
import Attachment from './Attachment'
import { MdContentCopy, MdDone } from "react-icons/md";

const HumanMessage = ({
    message
}) => {

    const [copyFlag, setCopyFlag] = useState(false);

    const handleCopy = () => {
        const content = message?.content?.content || "";
        navigator.clipboard.writeText(content);
        setCopyFlag(true);
        setTimeout(() => setCopyFlag(false), 3000);
    };
    return (
        <div className='flex flex-col group p-2 md:px-0 md:py-2'>
            {
                message.content.content_type !== 'text' && <Attachment />
            }
            <p className='p-2 px-3 rounded-2xl white-gray-bg self-end'>
                {message.content.content}
            </p>
            <div className='flex items-center space-x-2 p-2 px-3 self-end opacity-0 group-hover:opacity-100'>
                <button onClick={handleCopy} title="Copy" className="icon-button group">
                    {copyFlag ? (
                        <MdDone className="text-lg group-hover:scale-110 duration-300 icon cursor-pointer" />
                    ) : (
                        <MdContentCopy className="text-lg group-hover:scale-110 duration-300 icon cursor-pointer" />
                    )}
                </button>
            </div>
        </div>
    )
}

export default HumanMessage