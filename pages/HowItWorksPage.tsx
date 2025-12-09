
import React from 'react';

const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ArrowRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
);

const differentiators = [
    "Works 24/7 with perfect consistency",
    "Handles unlimited simultaneous calls",
    "Never forgets details or instructions",
    "No mood swings, no attitude, no mistakes",
    "Learns your business instantly",
    "Manages bookings, cancellations, and confirmations",
    "Reduces staff overwhelm and burnout",
    "Keeps customers happy with instant answers",
    "Total transparency: every call is recorded and transcribed"
];

const HowItWorksPage: React.FC = () => {
    const steps = [
        { title: "1. Answer & Engage", description: "Our AI agent instantly answers the call with a custom greeting and understands the caller's needs in natural language." },
        { title: "2. Qualify & Collect", description: "The agent asks qualifying questions you define, collecting essential information like name, contact details, and service required." },
        { title: "3. Book or Escalate", description: "If the caller is a qualified lead, the agent books them directly into your calendar. If they need human help, it escalates the call." }
    ];

    const flowDiagramItems = ["AI Agent", "Calendar", "CRM", "Notifications"];

    return (
        <div className="bg-white">
            {/* Header Section */}
            <div className="py-20 text-center bg-gray-50">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Simple, Powerful, Automated.</h1>
                    <p className="mt-4 text-lg text-gray-700 font-medium max-w-2xl mx-auto">See how our AI seamlessly integrates into your workflow to capture every opportunity.</p>
                </div>
            </div>

            {/* 3-Step Flow Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {steps.map((step, index) => (
                            <div key={index} className="p-8 bg-gray-50 rounded-lg shadow-sm">
                                <div className="flex items-center justify-center h-16 w-16 bg-primary text-white rounded-full mx-auto">
                                    <CheckCircleIcon className="h-8 w-8" />
                                </div>
                                <h3 className="mt-6 text-2xl font-bold text-gray-900">{step.title}</h3>
                                <p className="mt-4 text-sm md:text-base text-gray-700 font-medium">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Why It Works Section */}
            <section className="py-20 bg-primary-dark text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold">The Elite Agent Hub Difference</h2>
                        <p className="mt-4 text-lg text-blue-100 font-medium max-w-2xl mx-auto">This isn't just an answering service. It's a revolution in reliability and efficiency.</p>
                    </div>
                    <div className="max-w-3xl mx-auto">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                            {differentiators.map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <CheckCircleIcon className="h-6 w-6 text-accent flex-shrink-0 mr-3 mt-1" />
                                    <span className="text-sm md:text-base font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Call Flow Diagram Section */}
            <section className="py-20 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">The Automated Call Journey</h2>
                        <p className="mt-4 text-lg text-gray-700 font-medium">From first ring to your CRM, here’s how data flows.</p>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                        {flowDiagramItems.map((item, index) => (
                            <React.Fragment key={item}>
                                <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-auto text-center">
                                    <p className="font-bold text-lg text-primary">{item}</p>
                                </div>
                                {index < flowDiagramItems.length - 1 && (
                                     <ArrowRightIcon className="h-8 w-8 text-gray-400 transform md:rotate-0 rotate-90" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                    <p className="text-center mt-8 text-sm md:text-base text-gray-700 font-medium">Your systems are updated in real-time. No manual data entry needed.</p>
                </div>
            </section>

            {/* Recordings and Transcripts Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Total Visibility and Quality Control</h2>
                        <p className="mt-4 text-lg text-gray-700 font-medium">
                            All agent-handled calls are recorded and transcribed for quality assurance and training. 
                            We show consent notices and follow local recording laws. Ask about region-specific settings.
                        </p>
                        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg border">
                            <h4 className="font-bold text-left text-gray-800">Searchable Transcripts</h4>
                            <p className="text-left mt-2 text-sm md:text-base text-gray-700 font-medium">Quickly search conversations for keywords, names, or numbers, eliminating the need to listen to full recordings.</p>
                            <div className="mt-4 h-32 bg-gray-100 rounded flex items-center justify-center">
                                <p className="text-gray-400">Transcript search UI placeholder</p>
                            </div>
                        </div>
                        <p className="mt-4 text-sm md:text-base text-gray-700 font-medium">
                            <strong>Disclaimer:</strong> Users are responsible for ensuring compliance with all applicable state and federal laws regarding call recording and consent.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HowItWorksPage;
