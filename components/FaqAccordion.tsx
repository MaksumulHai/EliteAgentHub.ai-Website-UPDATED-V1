
import React, { useState } from 'react';
import type { FaqItem } from '../types';

interface FaqAccordionProps {
    items: FaqItem[];
}

const AccordionItem: React.FC<{ item: FaqItem }> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 py-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left"
                aria-expanded={isOpen}
            >
                <h3 className="text-lg font-semibold text-gray-800">{item.question}</h3>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen mt-4' : 'max-h-0'}`}
            >
                <p className="text-sm md:text-base text-gray-700 font-medium leading-relaxed">
                    {item.answer}
                </p>
            </div>
        </div>
    );
};

const FaqAccordion: React.FC<FaqAccordionProps> = ({ items }) => {
    return (
        <div>
            {items.map((item, index) => (
                <AccordionItem key={index} item={item} />
            ))}
        </div>
    );
};

export default FaqAccordion;
