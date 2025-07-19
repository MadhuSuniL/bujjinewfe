import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Card from '../../components/ui/Card';

const SearchChat = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const mockChats = [
        {
            id: 1,
            user: 'Aarav',
            lastMessage: 'Are we still on for the meeting at 5 PM?',
            timestamp: '2 mins ago',
        },
        {
            id: 2,
            user: 'Mei Lin',
            lastMessage: 'I’ll share the report soon.',
            timestamp: '15 mins ago',
        },
        {
            id: 3,
            user: 'Ethan',
            lastMessage: 'Let’s catch up tomorrow!',
            timestamp: '1 hour ago',
        },
        {
            id: 4,
            user: 'Zara',
            lastMessage: 'Thanks for the help!',
            timestamp: '3 hours ago',
        },
        {
            id: 1,
            user: 'Aarav',
            lastMessage: 'Are we still on for the meeting at 5 PM?',
            timestamp: '2 mins ago',
        },
        {
            id: 2,
            user: 'Mei Lin',
            lastMessage: 'I’ll share the report soon.',
            timestamp: '15 mins ago',
        },
        {
            id: 3,
            user: 'Ethan',
            lastMessage: 'Let’s catch up tomorrow!',
            timestamp: '1 hour ago',
        },
        {
            id: 4,
            user: 'Zara',
            lastMessage: 'Thanks for the help!',
            timestamp: '3 hours ago',
        },
        {
            id: 1,
            user: 'Aarav',
            lastMessage: 'Are we still on for the meeting at 5 PM?',
            timestamp: '2 mins ago',
        },
        {
            id: 2,
            user: 'Mei Lin',
            lastMessage: 'I’ll share the report soon.',
            timestamp: '15 mins ago',
        },
        {
            id: 3,
            user: 'Ethan',
            lastMessage: 'Let’s catch up tomorrow!',
            timestamp: '1 hour ago',
        },
        {
            id: 4,
            user: 'Zara',
            lastMessage: 'Thanks for the help!',
            timestamp: '3 hours ago',
        },
    ];

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);

        // Simulate result filtering or fetch here
        // For now, we'll just mock empty results
        setResults([]);
    };

    return (
        <div className="py-6 flex flex-col h-full w-full">
            {/* Title */}
            <div className="mb-4 max-w-2xl mx-auto flex flex-col items-start">
                <h1 className="text-2xl font-bold">Search Chats</h1>
                <p className="text-sm text-gray-500 mt-1">Find messages from your previous conversations easily.</p>
            </div>

            {/* Search Input */}
            <div className="relative mb-6 max-w-2xl mx-auto w-full">
                <input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    placeholder="Type to search chats..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-orange-600 bg-transparent outline-none text-sm"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600" />
            </div>

            {/* Results */}
            <div className="flex-1 overflow-auto">
                <div className='space-y-4 max-w-2xl mx-auto'>
                    {mockChats.length === 0 ? (
                        <p className="text-center text-sm">No chats found matching your search.</p>
                    ) : (
                        mockChats.map((chat, index) => (
                            <Card key={index} fill>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-base font-semibold ">{chat.user}</h3>
                                        <p className="text-sm truncate">{chat.lastMessage}</p>
                                    </div>
                                    <span className="text-xs">{chat.timestamp}</span>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchChat;
