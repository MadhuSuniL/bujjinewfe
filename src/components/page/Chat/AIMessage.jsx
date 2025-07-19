import React, { useContext } from 'react'
import remarkGfm from 'remark-gfm'
import Markdown from "react-markdown";
import AImessageMenu from './AImessageMenu';
import { PromptContext } from '../../../contexts/PromptContext';


const AIMessage = ({ message }) => {

    const { conversationId } = useContext(PromptContext)

    return (
        <div className='llm-response'>
            {/* Markdown Content */}
            <div className='px-3'>
                <Markdown remarkPlugins={[remarkGfm]}>
                    {message.content.content}
                </Markdown>
            </div>

            {/* Sources Section */}
            {
                conversationId &&
                <AImessageMenu message={message} />
            }

        </div>
    )
}

export default AIMessage;
