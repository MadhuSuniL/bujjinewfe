import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

const ErrorMessage = ({ message = "Something went wrong. Please try again." }) => {
    if (!message) return null;

    return (
        <div className="mt-10 gray-bg border-red-400 text-red-400 p-4 rounded-md flex items-center gap-2 text-sm animate-fade-in">
            <FiAlertCircle className="text-red-400 text-lg" />
            <span>{message}</span>
        </div>
    );
};

export default ErrorMessage;
