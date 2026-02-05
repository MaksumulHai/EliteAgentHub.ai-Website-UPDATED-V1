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
    "Open for business 24/7",
    "Answers every call, even during busy times",
    "Follows your specific instructions perfectly",
    "Always polite, professional, and helpful",
    "Understands your services and pricing",
    "Handles bookings and scheduling automatically",
    "Stops you from being glued to the phone",
    "Customers get answers instantly, not voicemail",
    "Full transparency: read or listen to every call"
];

const HowItWorksPage: React.FC = () => {
    const steps = [
        { title: "1. Customer Reaches Out", description: "A customer calls your phone or messages your website. Instead of voicemail or silence, they get an instant, professional response." },
        { title: "2. We Handle the Details", description: "We answer their questions, check if they are a good fit, and collect their name and project details based on your instructions." },
        { title: "3. Booked & Delivered", description: "If they are ready, we book the appointment on your calendar. If they need you specifically, we notify you instantly." }
    ];

    const flowDiagramItems = ["Receptionist", "Calendar", "CRM", "Notifications"];

    return (
        <div className="bg-white">
            {/* Header Section */}
            <div className="py-20 text-center bg-gray-50">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Your Business, Always Open.</h1>
                    <p className="mt-4 text-lg text-gray-700 font-medium max-w-2xl mx-auto">Here is how Elite Agent Hub turns every missed call into a booked job.</p>
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
                        <p className="mt-4 text-lg text-blue-100 font-medium max-w-2xl mx-auto">This isn't just an answering service. It's a reliable way to capture every lead.</p>
                    </div>
                    <div className="max-w-3xl mx-auto">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                            {differentiators.map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center flex-shrink-0 mr-3 mt-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
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
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Seamless Connection</h2>
                        <p className="mt-4 text-lg text-gray-700 font-medium">We capture the information and send it exactly where you need it.</p>
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
                    <p className="text-center mt-8 text-sm md:text-base text-gray-700 font-medium">Your schedule and customer list update automatically. No manual entry needed.</p>
                </div>
            </section>

            {/* Recordings and Transcripts Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Full Visibility</h2>
                        <p className="mt-4 text-lg text-gray-700 font-medium">
                            Every conversation is logged. You can read transcripts or listen to recordings anytime to see exactly what happened and ensure your customers are well taken care of.
                        </p>
                        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg border">
                            <h4 className="font-bold text-left text-gray-800">Instant Summaries</h4>
                            <p className="text-left mt-2 text-sm md:text-base text-gray-700 font-medium">Find names, phone numbers, or job details instantly without having to listen to the whole recording.</p>
                            <div className="mt-4 h-32 bg-gray-100 rounded flex items-center justify-center">
                                <p className="text-gray-400">Transcript view placeholder</p>
                            </div>
                        </div>
                        <p className="mt-4 text-sm md:text-base text-gray-700 font-medium">
                            <strong>Note:</strong> We handle standard recording notifications automatically to keep your business compliant.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HowItWorksPage;