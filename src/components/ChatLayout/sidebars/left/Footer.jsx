import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GiUpgrade } from "react-icons/gi";

const Footer = () => {
    const navigate = useNavigate();

    const handleUpgradeClick = () => {
        navigate('/upgrade');
    };

    return (
        <div className='w-full px-4'>
            <div
                onClick={handleUpgradeClick}
                className='flex items-center gap-3 cursor-pointer py-3'
            >
                <div className='text-white rounded-full'>
                    <GiUpgrade size={25} className='cp icon' />
                </div>
                <div>
                    <h1 className='font-semibold text-sm text-white'>Upgrade plan</h1>
                    <p className='text-xs text-gray-400'>More access to the best models</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
