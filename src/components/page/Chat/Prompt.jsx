import React, { useEffect, useRef } from 'react';
import { FiMic, FiSend, FiMicOff } from 'react-icons/fi';
import { Switch } from '@headlessui/react';
import useSpeechToText from '../../../hocs/useSpeechToText';

const Prompt = ({
    prompt,
    setPrompt,
    kidsModeOn,
    setKidsModeOn,
    startCompletion
}) => {
    const { isListening, startListening, stopListening, transcript } = useSpeechToText();
    const textareaRef = useRef(null);

    // Update prompt when voice transcript updates
    useEffect(() => {
        if (transcript && setPrompt) setPrompt(transcript);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transcript]);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 300) + 'px';
        }
    }, [prompt]);

    // Handle prompt submission
    const handleSend = () => {
        if (prompt?.trim() === "") return;
        stopListening()
        startCompletion();
    };

    // Handle key presses
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className='px-2 lg:px-0'>
            <div className="white-gray-bg p-4 rounded-2xl">
                {/* Prompt TextArea */}
                <textarea
                    ref={textareaRef}
                    value={prompt}
                    onChange={(e) => setPrompt && setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything..."
                    className="w-full bg-transparent text-[15px] px-3 text-white outline-none resize-none overflow-auto"
                    style={{ maxHeight: '170px' }}
                />

                {/* Controls */}
                <div className="flex items-center justify-between">
                    {/* Kids Mode Toggle */}
                    <div className="flex items-center gap-3 text-white">
                        <div className="flex items-center gap-1">
                            <Switch
                                checked={kidsModeOn}
                                onChange={setKidsModeOn}
                                className={`mt-1 z-20 ${kidsModeOn ? 'bg-orange-600' : 'bg-gray-500'
                                    } relative inline-flex h-5 w-10 items-center rounded-full transition-colors`}
                            >
                                <span className="sr-only">Enable Kids Mode</span>
                                <span
                                    className={`${kidsModeOn ? 'translate-x-5' : 'translate-x-1'
                                        } inline-block h-3 w-3 transform rounded-full bg-white transition-transform`}
                                />
                            </Switch>
                            <span className="text-xs mx-2">Kids mode</span>
                        </div>
                    </div>

                    {/* Mic + Send Buttons */}
                    <div className="flex items-center gap-3 text-white">
                        <button className='icon cp' onClick={isListening ? stopListening : startListening}>
                            {isListening ? <FiMicOff size={20} /> : <FiMic size={20} />}
                        </button>
                        <button className='icon cp' onClick={handleSend}>
                            <FiSend size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="pt-1 flex justify-around text-white text-sm">
                <h1>
                    <b className="text-main text-xs mx-2 font-main">bujji</b>
                    <code className="text-xs">version 1.0.0</code>
                </h1>
                <h1>
                    <b className="text-main text-xs mx-2">Madhu SuniL</b>
                    <code className="text-xs">powered by</code>
                </h1>
            </div>
        </div>
    );
};

export default Prompt;
