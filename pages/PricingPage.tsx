import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PricingCard from '../components/PricingCard';
import FaqAccordion from '../components/FaqAccordion';
import { PRICING_PLANS, FAQ_DATA } from '../constants';

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const comparisonData = [
    { feature: 'Works 24/7', human: false, ai: true },
    { feature: 'Handles unlimited calls', human: false, ai: true },
    { feature: 'Always available, no scheduling gaps', human: false, ai: true },
    { feature: 'High consistency with defined workflows', human: false, ai: true },
    { feature: 'Monthly Cost', human: '$2,800 - $4,000', ai: '$120 - $549' },
];

const websitePlans = [
    {
        name: "Website + Chat Starter",
        price: "199",
        features: [
            "Simple, professional website (1–3 pages)",
            "Website chat assistant that answers visitors and captures contact details",
            "Appointment booking support (calendar embedded)",
            "Lead capture into CRM",
            "Email notifications for new leads and bookings",
            "Hosting and maintenance while subscribed"
        ]
    },
    {
        name: "Website + Chat Pro",
        price: "249",
        features: [
            "Includes everything in Starter, plus:",
            "SMS notifications for new leads and bookings (where enabled and compliant)",
            "Optional SMS confirmations and reminders"
        ]
    }
];

const MONTHLY_URLS: Record<string, string> = {
  "Starter Lite": "https://buy.stripe.com/bJe4gA4TScnjcrrbs20Ba01",
  "Essentials": "https://buy.stripe.com/fZu4gA72072Zezz1Rs0Ba05",
  "Growth Unlimited": "https://buy.stripe.com/4gM5kEdqo0EB8bb0No0Ba0b",
  "Elite Unlimited": "https://buy.stripe.com/cNifZifywgDz6339jU0Ba0f"
};

const YEARLY_URLS: Record<string, string> = {
  "Starter Lite": "https://buy.stripe.com/cNi14oeus0EB1MNeEe0Ba02",
  "Essentials": "https://buy.stripe.com/aFa28s9a84URbnnfIi0Ba0a",
  "Growth Unlimited": "https://buy.stripe.com/5kQ00k5XWcnjcrr7bM0Ba0e",
  "Elite Unlimited": "https://buy.stripe.com/eVqaEYaecgDzfDDfIi0Ba0g"
};

const PricingPage: React.FC = () => {
    useEffect(() => {
        document.title = "Pricing | Elite Agent Hub";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', "Transparent pricing for AI voice and chat agents designed for service businesses.");
        }
    }, []);

    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    return (
        <div className="bg-white">
            {/* AI VOICE & CHAT SECTION */}
            <div className="py-20 text-center bg-gray-50">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Turn Every Customer Conversation Into a Real Lead</h1>
                    <p className="mt-4 text-base text-gray-700 font-medium leading-snug max-w-2xl mx-auto">Choose the plan that fits your business. We answer customers through your website and your phone, and capture every inquiry.</p>
                    
                    {/* Billing Toggle */}
                    <div className="mt-10 flex items-center justify-center space-x-4">
                        <span className={`text-base font-semibold ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-700'}`}>Monthly</span>
                        <button 
                            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                            className="relative inline-flex h-8 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-gray-200 hover:bg-gray-300"
                            role="switch"
                            aria-checked={billingCycle === 'yearly'}
                        >
                             <span
                                aria-hidden="true"
                                className={`${
                                  billingCycle === 'yearly' ? 'translate-x-6 bg-primary' : 'translate-x-0 bg-white'
                                } pointer-events-none inline-block h-7 w-7 transform rounded-full shadow ring-0 transition duration-200 ease-in-out`}
                              />
                        </button>
                        <span className={`text-base font-semibold ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-700'}`}>
                            Yearly <span className="text-accent">(Save 15%)</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* AI Pricing Cards Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <p className="
                      mt-10 
                      mb-6 
                      text-2xl 
                      md:text-3xl 
                      font-extrabold 
                      text-yellow-500 
                      drop-shadow-md 
                      text-center
                    ">
                      Limited-Time Bonus: <span className="text-yellow-400">$300</span> Setup Fee Waived
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start relative">
                        {PRICING_PLANS.map((plan) => {
                            const checkoutUrl = billingCycle === 'yearly' 
                                ? YEARLY_URLS[plan.name] 
                                : MONTHLY_URLS[plan.name];

                            return (
                                <PricingCard 
                                    key={plan.name} 
                                    plan={plan} 
                                    billingCycle={billingCycle} 
                                    ctaUrl={checkoutUrl}
                                />
                            );
                        })}
                    </div>
                </div>
            </section>

             {/* AI Billing Notes Section */}
            <section className="pb-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-gray-100 p-8 rounded-lg border border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">Important Billing Notes</h3>
                        <ul className="space-y-4 text-base text-gray-700 font-medium leading-snug">
                            <li className="flex items-start">
                                <CheckIcon className="h-5 w-5 text-secondary flex-shrink-0 mr-3 mt-1" />
                                <span><strong>Starter Lite</strong> includes no minutes. Usage billed at $0.13/min.</span>
                            </li>
                             <li className="flex items-start">
                                <CheckIcon className="h-5 w-5 text-secondary flex-shrink-0 mr-3 mt-1" />
                                <span><strong>Essentials</strong> includes 500 minutes. Additional minutes at $0.13/min.</span>
                            </li>
                             <li className="flex items-start">
                                <CheckIcon className="h-5 w-5 text-secondary flex-shrink-0 mr-3 mt-1" />
                                <span><strong>Growth Unlimited and Elite Unlimited</strong> include unlimited AI minutes.</span>
                            </li>
                             <li className="flex items-start">
                                <CheckIcon className="h-5 w-5 text-secondary flex-shrink-0 mr-3 mt-1" />
                                <span>All plans have no long-term contract — <strong>cancel anytime</strong>.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* WEBSITE + CHAT ASSISTANT SECTION */}
            <section className="py-20 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Website + Chat Assistant</h2>
                        <p className="mt-4 text-lg text-gray-700 font-medium max-w-2xl mx-auto">
                            A simple, managed website that answers customers, captures leads, and helps book next steps — without complexity.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {websitePlans.map((plan, index) => (
                            <div key={index} className="border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full bg-white">
                                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                                <div className="mt-4 mb-6">
                                    <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
                                    <span className="text-gray-500 ml-1">/ month</span>
                                </div>
                                <ul className="space-y-3 mb-8 flex-grow">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <CheckIcon className="h-5 w-5 text-secondary flex-shrink-0 mr-2.5 mt-0.5" />
                                            <span className="text-gray-700 font-medium">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    to="/book-demo"
                                    className="w-full text-center block font-bold py-3 px-4 rounded-lg bg-gray-100 text-primary hover:bg-gray-200 transition-transform transform hover:scale-105 duration-300"
                                >
                                    Book a Demo
                                </Link>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-sm text-gray-500 mt-8 font-medium">
                        This is a managed subscription service. The website and chat assistant remain active while the subscription is active.
                    </p>
                </div>
            </section>

            {/* AI vs Human Comparison */}
            <section className="py-20 bg-gray-50 border-y border-gray-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">AI vs. Human Receptionist</h2>
                        <p className="mt-4 text-base text-gray-700 font-medium leading-snug">See how an AI agent stacks up on cost, reliability, and performance.</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="py-4 px-6 bg-gray-200 font-bold uppercase text-base text-gray-700 border-b border-gray-300">Feature</th>
                                    <th className="py-4 px-6 bg-gray-200 font-bold uppercase text-base text-gray-700 border-b border-gray-300 text-center">Human Receptionist</th>
                                    <th className="py-4 px-6 bg-primary-light/20 font-bold uppercase text-base text-primary-dark border-b border-gray-300 text-center">AI Receptionist</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonData.map(item => (
                                    <tr key={item.feature} className="hover:bg-gray-100">
                                        <td className="py-4 px-6 border-b border-gray-200 font-semibold text-base text-gray-700">{item.feature}</td>
                                        <td className="py-4 px-6 border-b border-gray-200 text-center">
                                            {typeof item.human === 'boolean' ? (
                                                item.human ? <CheckIcon className="h-6 w-6 text-green-500 mx-auto" /> : <XIcon className="h-6 w-6 text-red-500 mx-auto" />
                                            ) : <span className="text-base text-gray-700 font-medium">{item.human}</span>}
                                        </td>
                                        <td className="py-4 px-6 border-b border-gray-200 text-center bg-green-50">
                                            {typeof item.ai === 'boolean' ? (
                                                item.ai ? <CheckIcon className="h-6 w-6 text-green-500 mx-auto" /> : <XIcon className="h-6 w-6 text-red-500 mx-auto" />
                                            ) : <span className="font-bold text-primary text-base">{item.ai}</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
                    </div>
                    <FaqAccordion items={FAQ_DATA} />
                </div>
            </section>
        </div>
    );
};

export default PricingPage;