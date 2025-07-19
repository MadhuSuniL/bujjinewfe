import React from 'react';

const Card = ({
    children,
    className = '',
    extraClassName = '',
    fill = false,
    ...props
}) => {
    return (
        <div
            className={
                (className
                    ? className
                    : ` dark-bg rounded-xl ${!fill && 'bg-opacity-10'} p-4 transition duration-300 ease-in-out transform hover:border-main hover:shadow-lg`
                ) +
                " " +
                (extraClassName || "")
            }
            {...props}
        >
            {children}
        </div >
    );
};

export default Card;
