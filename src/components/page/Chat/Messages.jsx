import React from 'react'
import AIMessage from './AIMessage'
import HumanMessage from './HumanMessage'
import ErrorMessage from './ErrorMessage'
import { GoDotFill } from "react-icons/go";
import ToolCallingAnimation from './ToolCallingAnimation';

const Messages = ({
    messagesLoading,
    messages,
    isNewMessageLoading,
    isToolCalling,
    errorMessage
}) => {

    return (
        <div className='pb-2'>
            {
                messagesLoading ?
                    "Loading ..."
                    :
                    messages?.map((message, index) => <div key={index}>
                        {
                            message.author.role === "human" ?
                                <HumanMessage message={message} />
                                :
                                <AIMessage message={message} />
                        }
                    </div>)
            }
            {
                isNewMessageLoading ?
                    <div>
                        <GoDotFill size={25} className='icon animate-pulse' />
                    </div>
                    :
                    isToolCalling ?
                        <ToolCallingAnimation />
                        :
                        errorMessage &&
                        <ErrorMessage message={errorMessage} />
            }
        </div>
    )
}

export default Messages
