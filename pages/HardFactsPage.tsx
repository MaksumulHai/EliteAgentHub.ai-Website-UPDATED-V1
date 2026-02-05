import React from 'react';
import { Link } from 'react-router-dom';
import CtaBand from '../components/CtaBand';

const PhoneMissedCallIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l-3-3-3 3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 14.25l-1.5-1.5-1.5 1.5" />
    </svg>
);
const ChartBarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
);
const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const CurrencyDollarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const GoogleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.19,4.73C14.76,4.73 16.04,5.7 17.09,6.62L19.27,4.5C17.22,2.63 14.86,1.5 12.19,1.5C6.92,1.5 2.71,5.78 2.71,12C2.71,18.22 6.92,22.5 12.19,22.5C17.6,22.5 21.5,18.32 21.5,12.27C21.5,11.77 21.45,11.43 21.35,11.1Z" />
    </svg>
);
const CheckmarkIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);


const stats = [
    { value: '62%', text: 'of customers won’t leave a voicemail.', source: 'Forbes / Invoca', icon: <PhoneMissedCallIcon className="h-10 w-10 text-primary" /> },
    { value: '85%', text: 'of callers never call back after hitting voicemail.', source: 'Salesforce SMB', icon: <PhoneMissedCallIcon className="h-10 w-10 text-primary" /> },
    { value: '20-35%', text: 'of calls are missed by service businesses daily.', source: 'CallRail', icon: <ChartBarIcon className="h-10 w-10 text-primary" /> },
    { value: '10-15s', text: 'is how fast half of customers expect an answer.', source: 'SuperOffice', icon: <ClockIcon className="h-10 w-10 text-primary" /> },
    { value: '$500+', text: 'is the average revenue lost per missed new customer.', source: 'Smith.ai, DentalROI', icon: <CurrencyDollarIcon className="h-10 w-10 text-primary" /> },
    { value: 'Lower', text: 'Google ranking and responsiveness score from missed calls.', source: 'Google LSA Docs', icon: <GoogleIcon className="h-10 w-10 text-primary" /> }
];

const threatPoints = [
    "Missed calls and unresponded messages don’t disappear — they go straight to your rivals.",
    "Customers choose whoever answers first — not who’s best.",
    "Your hard-earned leads shouldn’t feed the business next door.",
    "Your next customer shouldn’t become your competitor’s next sale.",
];

const HardFactsPage: React.FC = () => {
    return (
        <div className="bg-white">
            {/* Header Section */}
            <div className="py-20 text-center bg-gray-50">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">The Numbers Don’t Lie — Missed Customers Cost You Revenue</h1>
                    <p className="mt-6 text-3xl md:text-4xl font-extrabold text-red-600 leading-tight max-w-3xl mx-auto drop-shadow-sm text-center underline underline-offset-4">Here are the real statistics that show how missed website visitors and missed calls impact your business.</p>
                </div>
            </div>

            {/* Stats Block */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl border border-gray-200 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 cursor-pointer relative shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.7)] hover:border-cyan-400">
                                <div className="mb-4">{stat.icon}</div>
                                <p className="text-5xl font-extrabold text-primary">{stat.value}</p>
                                <p className="mt-2 text-base md:text-lg text-gray-700 font-medium">{stat.text}</p>
                                <p className="mt-1 text-sm md:text-base text-gray-700 font-medium">Source: {stat.source}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Competitor Threat Block */}
            <section className="py-20 bg-primary-dark text-white">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-semibold leading-tight whitespace-nowrap max-[500px]:whitespace-normal">When you miss a customer, your competitor answers them.</h2>
                     <p className="mt-6 text-2xl md:text-3xl font-extrabold text-white underline underline-offset-8 decoration-accent">The customer you attracted — they get the sale.</p>
                     <div className="mt-10 max-w-2xl mx-auto">
                        <ul className="space-y-4 text-left">
                           {threatPoints.map((point, index) => (
                                <li key={index} className="flex items-center text-base md:text-lg font-medium">
                                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-accent flex items-center justify-center mr-4">
                                        <CheckmarkIcon className="h-4 w-4 text-white" />
                                    </div>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                     </div>
                </div>
            </section>
            
            <CtaBand
                title="Stop Losing Customers — Book Your Free Consultation"
                subtitle={
                    <span className="block text-2xl md:text-3xl font-serif text-blue-100 leading-snug drop-shadow-sm">
                        It’s time to protect your revenue and take back the leads your business is already generating.
                    </span>
                }
                buttonText="Book a Free Consultation"
                buttonLink="/book-demo"
            />
        </div>
    );
};

export default HardFactsPage;