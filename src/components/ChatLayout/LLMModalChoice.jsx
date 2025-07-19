import React, { useState, useRef, useEffect } from 'react';
import { FiLock, FiZap, FiChevronDown } from 'react-icons/fi';
import Card from '../ui/Card';

const LLMModalChoice = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedModel, setSelectedModel] = useState(null);
    const [groqApiKey, setGroqApiKey] = useState('');
    const menuRef = useRef(null);

    const upgradeModels = [
        'meta-llama/Llama-Guard-4-12B',
        'llama-3.3-70b-versatile',
        'meta-llama/llama-4-maverick-17b-128e-instruct',
    ];

    const freeModels = [
        'qwen-qwq-32b',
        'mistral-saba-24b',
        'llama3-70b-8192',
        'gemma2-9b-it',
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleUpgradeRedirect = () => {
        window.location.href = '/upgrade';
    };

    const handleModelSelect = (model) => {
        setSelectedModel(model);
        setIsOpen(false);
        console.log('Selected model:', model);
    };

    const handleApiKeyChange = (e) => {
        setGroqApiKey(e.target.value);
        console.log('Groq API Key:', e.target.value); // (Optional) Replace with secure handling
    };

    return (
        <div className="relative" ref={menuRef}>
            {/* Trigger */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center cursor-pointer gap-1"
            >
                <span className='text-xl text-main zero' style={{ fontWeight: 500 }}>
                    {'bujji'}
                </span>
                <FiChevronDown
                    className={`transform icon transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute left-0 mt-2 w-80 z-50">
                    <Card fill>
                        <div className="p-2">
                            {/* Free Models */}
                            <p className="font-semibold text-sm text-gray-400 mb-2">Available Models</p>

                            {freeModels.map((model) => (
                                <div
                                    key={model}
                                    onClick={() => handleModelSelect(model)}
                                    className={`p-2 rounded cursor-pointer text-sm flex items-center justify-between
                                        hover:bg-main hover:text-white transition-colors duration-200
                                        ${selectedModel === model ? 'bg-main text-white font-semibold' : ''}`}
                                >
                                    <div className="flex items-center gap-2">
                                        <FiZap className="text-green-400 flex-shrink-0" size={16} />
                                        <span className="truncate">{model}</span>
                                    </div>
                                    {selectedModel === model && <span className="font-bold">✔</span>}
                                </div>
                            ))}

                            {/* Upgrade Models */}
                            <p className="font-semibold text-sm text-gray-400 mt-4 mb-2">Upgrade Required</p>

                            {upgradeModels.map((model) => (
                                <div
                                    key={model}
                                    onClick={handleUpgradeRedirect}
                                    className="p-2 rounded cursor-pointer text-sm flex items-center gap-2
                                        text-gray-400 hover:bg-main hover:text-white transition-colors duration-200"
                                >
                                    <FiLock className="text-yellow-400 flex-shrink-0" size={16} />
                                    <span className="truncate">{model}</span>
                                </div>
                            ))}

                            {/* Groq API Key Input */}
                            <div className="mt-4 border-t border-gray-700 pt-3">
                                <label className="block text-sm text-gray-300 mb-1 font-medium">
                                    Groq API Key
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter your Groq API Key"
                                    value={groqApiKey}
                                    onChange={handleApiKeyChange}
                                    className="w-full bg-transparent border border-orange-600 rounded-md px-3 py-2 text-sm outline-none"
                                />
                                <p className="text-xs text-gray-400 mt-1">
                                    Don’t have a key?{' '}
                                    <a
                                        href="https://console.groq.com/keys"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-main font-bold underline"
                                    >
                                        Get it from Groq Console →
                                    </a>
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default LLMModalChoice;
