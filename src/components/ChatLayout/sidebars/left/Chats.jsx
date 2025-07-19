import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiPlus } from 'react-icons/fi';
import { MdOutlineCollectionsBookmark } from "react-icons/md";
import LineItem from './LineItem';
import ChatMenu from './ChatMenu';
import { ChatsContext } from '../../../../contexts/ChatsContext';
import Buffer from '../../../ui/Buffer';


const Chats = () => {
    const navigate = useNavigate();
    const { chats, newChat, setNewChat, chatsLoading, errorMessage } = useContext(ChatsContext)

    // Menu items with icon and path
    const menuItems = [
        {
            icon: FiPlus,
            title: 'New Chat',
            path: '/',
        },
        {
            icon: MdOutlineCollectionsBookmark,
            title: 'Note Collections',
            path: '/note_collections',
        },
    ];

    useEffect(() => {
        if (newChat?.id) {
            navigate(`/chat?conversation=${newChat.id}`);
            setNewChat({})
        }
    }, [newChat])

    return (
        <div className="flex-1 overflow-auto space-y-1 px-2">
            {/* Top menu (New Chat, Search Chats) */}
            {menuItems.map((item, index) => (
                <LineItem
                    key={index}
                    icon={item.icon}
                    value={item}
                    onClick={() => navigate(item.path)}
                />
            ))}

            <div className="pt-2" />
            {
                errorMessage ?
                    errorMessage
                    :
                    <Buffer isLoading={chatsLoading} message={"Loading Chats .."}>
                        {chats.map((chat, index) => (
                            <LineItem
                                key={index}
                                value={chat}
                                onClick={() => {
                                    navigate(`/chat?conversation=${chat.id}`);
                                }}
                                menu={ChatMenu}
                            />
                        ))}
                    </Buffer>
            }
        </div>
    );
};

export default Chats;
