import React from 'react';
import { RiMenuFold2Line } from 'react-icons/ri';
import Header from './Header';
import Footer from './Footer';
import Chats from './Chats';

const LeftSidebar = ({ isDrawerOpen, toggleDrawer }) => {
    return (
        <>
            {/* Mobile Drawer (z fixed high) */}
            <div
                className={`
                    dark-bg fixed md:relative top-0 left-0 h-full transition-all duration-300 ease-in-out
                    ${isDrawerOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full'}
                    md:w-64 md:translate-x-0 
                    z-[888]
                `}
            >
                <div
                    className={`
                        bg-bg2 flex flex-col h-full w-64
                        transition-all duration-300 ease-in-out
                        ${isDrawerOpen || window.innerWidth >= 768 ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
                    `}
                >
                    <Header isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
                    <Chats />
                    <Footer />
                </div>
            </div>

            {/* Backdrop (only on mobile) */}
            {isDrawerOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-[998] md:hidden"
                    onClick={toggleDrawer}
                />
            )}
        </>
    );
};

export default LeftSidebar;
