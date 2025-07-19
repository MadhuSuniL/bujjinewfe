import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apiCallWithToken from '../../utils/Axios';
import Messages from '../../components/page/Chat/Messages';
import { ImSpinner9 } from "react-icons/im";

const ShareChat = () => {

    const { share_id } = useParams()
    const [conversation, setConversation] = useState({});
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading2, setIsLoading2] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate()

    const cloneAndContinue = () => {
        const url = `chat/share/conversation/details-and-clone/${share_id}`;
        const method = "patch";
        const body = {};
        const loadingState = setIsLoading2;

        const onSuccess = (data) => {
            const conversationId = data.conversation_id
            navigate(`/chat?conversation=${conversationId}`);
        };

        const onError = () => {
            setErrorMessage("Oops! We couldn’t load the conversation. It might expired.");
        };

        apiCallWithToken(url, body, method, loadingState, onSuccess, onError);
    }

    useEffect(() => {
        const url = `chat/share/conversation/details-and-clone/${share_id}`;
        const method = "get";
        const body = {};
        const loadingState = setIsLoading;

        const onSuccess = (data) => {
            setConversation(data.conversation);
            setMessages(data.messages || []);
        };

        const onError = () => {
            setErrorMessage("Oops! We couldn’t load the conversation. It might expired.");
        };

        apiCallWithToken(url, body, method, loadingState, onSuccess, onError);
    }, []);

    return (
        <div className='h-full flex flex-col relative'>
            {
                errorMessage && !isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <h1 className="text-main -400 font-semibold text-lg">{errorMessage}</h1>
                    </div>
                ) : (
                    <>
                        <div className='flex-1 overflow-auto'>
                            <div className='max-w-3xl mx-auto px-4 py-6'>
                                {/* Conversation Header */}
                                {
                                    conversation?.title &&
                                    <div className="mb-4 text-center">
                                        <h2 className="text-2xl font-bold text-main">{conversation.title}</h2>
                                        <p className="text-sm text-gray-500 mt-1">Shared Conversation Preview</p>
                                    </div>
                                }

                                {/* Messages */}
                                <Messages messagesLoading={isLoading} messages={messages} />
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className='max-w-3xl mx-auto px-4 pb-6'>
                            {
                                isLoading2 ?
                                    <ImSpinner9 className='animate-spin icon' size={23} />
                                    :
                                    <button
                                        className='bg-main hover:bg-opacity-90 text-white px-6 py-2 rounded-xl transition-all duration-200 w-full cursor-pointer'
                                        onClick={cloneAndContinue}
                                    >
                                        Continue the Conversation
                                    </button>
                            }

                        </div>
                    </>
                )
            }
        </div>
    )
}

export default ShareChat;
