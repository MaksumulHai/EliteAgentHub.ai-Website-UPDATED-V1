
import React, { useState } from 'react';
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
    { feature: 'No sick days or breaks', human: false, ai: true },
    { feature: '100% accurate every time', human: false, ai: true },
    { feature: 'Monthly Cost', human: '$2,800 - $4,000', ai: '$120 - $549' },
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
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    return (
        <div className="bg-white">
            {/* Header Section */}
            <div className="py-20 text-center bg-gray-50">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Simple, Transparent Pricing</h1>
                    <p className="mt-4 text-base text-gray-700 font-medium leading-snug max-w-2xl mx-auto">Choose the plan that fits your business. Even 1-2 saved calls per month pays for your entire plan.</p>
                    
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

            {/* Pricing Cards Section */}
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
                      ✨ Limited-Time Bonus: <span className="text-yellow-400">$300</span> Setup Fee Waived ✨
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

            {/* See Hard Facts CTA */}
            <section className="pb-16 text-center">
                <div className="container mx-auto px-4">
                    <Link
                        to="/hard-facts"
                        className="inline-block bg-gray-800 hover:bg-black text-white font-bold py-4 px-10 rounded-lg text-lg transition-transform transform hover:scale-105 duration-300"
                    >
                        See The Hard Facts
                    </Link>
                    <p className="mt-4 text-base text-gray-700 font-medium leading-snug max-w-xl mx-auto">
                        Real data. Real losses. Understand exactly why missed calls are costing you thousands.
                    </p>
                </div>
            </section>
            
             {/* Billing Notes Section */}
            <section className="pb-20">
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
                                <span>Each plan includes <strong>1 business location</strong>. Additional locations are <strong>$99/month</strong>.</span>
                            </li>
                              <li className="flex items-start">
                                <CheckIcon className="h-5 w-5 text-secondary flex-shrink-0 mr-3 mt-1" />
                                <span>Multiple phone lines inside one location share the same minute pool.</span>
                            </li>
                             <li className="flex items-start">
                                <CheckIcon className="h-5 w-5 text-secondary flex-shrink-0 mr-3 mt-1" />
                                <span>Separate physical locations require separate AI containers and incur the $99/location fee.</span>
                            </li>
                             <li className="flex items-start">
                                <CheckIcon className="h-5 w-5 text-secondary flex-shrink-0 mr-3 mt-1" />
                                <span>All plans have no long-term contract — <strong>cancel anytime</strong>.</span>
                            </li>
                             <li className="flex items-start">
                                <CheckIcon className="h-5 w-5 text-secondary flex-shrink-0 mr-3 mt-1" />
                                <span>If our AI doesn’t save you money, simply walk away — no hard feelings.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* AI vs Human Comparison */}
            <section className="py-20 bg-gray-50">
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
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
                    </div>
                    <FaqAccordion items={FAQ_DATA} />
                </div>
            </section>
        </div>
    );
};

export default PricingPage;
