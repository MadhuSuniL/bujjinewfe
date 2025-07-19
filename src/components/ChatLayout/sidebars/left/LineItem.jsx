import React from 'react';

const LineItem = ({ icon: Icon, value, onClick, menu: MenuComponent }) => {
    return (
        <div
            className="group relative flex items-center gap-2 hover:bg-gradient-to-r from-[#d7610c] to-[#a22f09] p-2 rounded-md cursor-pointer transition-all duration-200"
        >
            {/* Left Section: Icon + Text */}
            <div onClick={onClick} className="flex items-center gap-3 w-full overflow-hidden pr-6">
                {Icon && (
                    <div className="flex-shrink-0">
                        <Icon size={18} />
                    </div>
                )}
                <span className="truncate text-sm">{value?.title}</span>
            </div>

            {/* Right Section: Menu (Absolutely Positioned) */}
            {MenuComponent && (
                <div className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 gray-bg p-2 py-1 rounded-2xl">
                    <MenuComponent conversation={value} />
                </div>
            )}
        </div>
    );
};

export default LineItem;
