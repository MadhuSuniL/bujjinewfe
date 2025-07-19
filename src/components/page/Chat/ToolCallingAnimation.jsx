import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const reflectAnimation = {
    hidden: { opacity: 0.4 },
    visible: (i) => ({
        opacity: [0.4, 1, 0.4],
        transition: {
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            delay: i * 0.08,
        },
    }),
};

const ToolCallingAnimation = ({ message }) => {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const user_first_name = user.first_name || "there";

    const staticPhrase = message || `Wait ${user_first_name}, I’m checking the facts for you`;
    const animatedDots = [".", ".", "."];

    return (
        <div className="w-full text-center py-6 text-white/90">
            <div className="flex px-3">
                <motion.div
                    className="text-sm md:text-base font-semibold mb-2 flex flex-wrap justify-center text-main"
                >
                    {/* Phrase animation */}
                    {staticPhrase.split("").map((char, i) => (
                        <motion.span
                            key={i}
                            custom={i}
                            variants={reflectAnimation}
                            initial="hidden"
                            animate="visible"
                            className="inline-block zero-2"
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}

                    {/* Dots animation (sequential reveal) */}
                    {animatedDots.map((dot, i) => (
                        <motion.span
                            key={`dot-${i}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 + i * 0.3, duration: 0.3 }}
                            className="inline-block zero-2 mx-1"
                        >
                            {dot}
                        </motion.span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default ToolCallingAnimation;
