import React from 'react';
import { Disclosure, DisclosurePanel, DisclosureButton } from '@headlessui/react';
import { FiChevronDown } from 'react-icons/fi';

const FAQ = () => {
    const faqs = [
        {
            question: "What is bujji?",
            answer: "bujji is an intelligent AI assistant that provides factual, reliable answers using a combination of a private Vector Database and Wikipedia. It is designed to help students, learners, and curious users get trustworthy information in a friendly format."
        },
        {
            question: "How does bujji answer questions?",
            answer: "When you ask a question, bujji first checks its internal Vector DB for any stored knowledge. If nothing useful is found, it searches Wikipedia and converts the result into a clean, readable markdown response — often with images, links, and references."
        },
        {
            question: "What is Kids Mode?",
            answer: "Kids Mode makes bujji's responses fun and easier to understand for children. It adds emojis 🎉, friendly words, and simpler explanations to help young learners enjoy their experience."
        },
        {
            question: "Does bujji hallucinate or guess answers?",
            answer: "No. bujji prioritizes facts. It only answers from its sources: Vector DB, Wikipedia, or internal fallback knowledge (only with your permission). It never guesses or gives personal opinions."
        },
        {
            question: "Can I see images and links in the answers?",
            answer: "Yes! When bujji pulls information from Wikipedia, it formats the response with images, bullet points, and clickable links to references — all neatly structured in markdown."
        }
    ];

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-2">
                {faqs.map((faq, idx) => (
                    <Disclosure key={idx}>
                        {({ open }) => (
                            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                                <DisclosureButton className="flex justify-between items-center w-full text-left">
                                    <span className='text-main font-bold'>{faq.question}</span>
                                    <FiChevronDown
                                        className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                                    />
                                </DisclosureButton>
                                <DisclosurePanel className="mt-2 text-sm">
                                    {faq.answer}
                                </DisclosurePanel>
                            </div>
                        )}
                    </Disclosure>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
