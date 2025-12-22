import React, { useEffect } from 'react';
import FaqAccordion from '../components/FaqAccordion';
import { FAQ_DATA } from '../constants';

const FaqPage: React.FC = () => {
    useEffect(() => {
        document.title = "FAQ | Elite Agent Hub";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', "Answers to common questions about AI voice agents, missed-call recovery, website scans, setup, and support.");
        }
    }, []);

    return (
        <div className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Frequently Asked Questions</h1>
                    <p className="mt-4 text-lg text-gray-700 font-medium max-w-2xl mx-auto">
                        Have questions? We have answers. If you don't see what you're looking for, feel free to contact us.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto">
                    <FaqAccordion items={FAQ_DATA} />
                </div>
            </div>
        </div>
    );
};

export default FaqPage;