import React from "react";
import { FiSidebar } from "react-icons/fi";
import { Link } from "react-router-dom";

const Header = ({
    isDrawerOpen,
    toggleDrawer
}) => {
    return (
        <div className="flex flex-col justify-center items-center px-4">
            <div className="bg-bg rounded-xl w-full flex justify-between items-center py-2">
                <Link to={'/'}>
                    <span className='text-xl text-main zero font-main' style={{ fontWeight: 500 }}>
                        {'bujji'}
                    </span>
                </Link>
                {
                    isDrawerOpen && <FiSidebar onClick={toggleDrawer} className="cp icon md:hidden" size={22} />
                }
            </div>
        </div>
    );
};

export default Header;
