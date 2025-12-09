
import React from 'react';
import type { PricingPlan } from '../types';
import { Link } from 'react-router-dom';

interface PricingCardProps {
    plan: PricingPlan;
    billingCycle: 'monthly' | 'yearly';
    ctaUrl?: string;
}

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const PricingCard: React.FC<PricingCardProps> = ({ plan, billingCycle, ctaUrl }) => {
    const isPopular = plan.isPopular || false;

    // Calculate prices
    const monthlyPrice = plan.monthlyPrice;
    const yearlyMonthlyEquivalent = Math.round(monthlyPrice * 0.85);
    const yearlyTotal = yearlyMonthlyEquivalent * 12;

    const displayPrice = billingCycle === 'monthly' ? monthlyPrice : yearlyMonthlyEquivalent;

    return (
        <div className={`border rounded-xl p-6 flex flex-col h-full relative transition-all duration-300 ${isPopular ? 'border-primary scale-105 bg-white shadow-2xl z-10' : 'bg-white shadow-lg border-gray-200 hover:shadow-xl'}`}>
            {isPopular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full text-center">
                    <span className="bg-accent text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md">
                        Best Value
                    </span>
                </div>
            )}
            
            <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-base text-gray-700 font-medium mt-1 min-h-[20px]">{plan.note}</p>
            </div>

            <div className="mb-6">
                <div className="flex items-baseline">
                    <span className="text-4xl font-extrabold text-gray-900">${displayPrice}</span>
                    <span className="text-gray-500 ml-1">/mo</span>
                </div>
                {billingCycle === 'yearly' && (
                    <p className="text-base text-green-600 font-medium mt-1">
                        Total: ${yearlyTotal.toLocaleString()} per year
                    </p>
                )}
                {billingCycle === 'yearly' ? (
                     <p className="text-base text-gray-700 font-medium mt-1">Billed annually</p>
                ) : (
                     <p className="text-base text-gray-700 font-medium mt-1">Billed monthly</p>
                )}
            </div>

             <div className="mb-6 space-y-2 text-base border-t border-b border-gray-100 py-4">
                <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">Included Minutes:</span>
                    <span className="font-bold text-gray-900">{plan.includedMinutes}</span>
                </div>
                 {plan.perMinuteRate && (
                    <div className="flex justify-between">
                        <span className="text-gray-700 font-medium">Rate:</span>
                        <span className="font-bold text-gray-900">{plan.perMinuteRate}</span>
                    </div>
                )}
                 <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">Extra Locations:</span>
                    <span className="font-bold text-gray-900">{plan.additionalLocationFee}</span>
                </div>
            </div>

            <ul className="space-y-3 text-base text-gray-700 font-medium flex-grow mb-8">
                {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-secondary flex-shrink-0 mr-2.5 mt-0.5" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <div className="mt-auto">
                {ctaUrl ? (
                    <a 
                        href={ctaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full text-center block font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 duration-300 ${isPopular ? 'bg-primary text-white hover:bg-primary-dark shadow-md' : 'bg-gray-100 text-primary hover:bg-gray-200'}`}
                    >
                        {plan.cta}
                    </a>
                ) : (
                    <Link 
                        to={'/book-demo'}
                        data-cta={`pricing-cta-${plan.name.toLowerCase().replace(/ /g, '-')}`}
                        className={`w-full text-center block font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 duration-300 ${isPopular ? 'bg-primary text-white hover:bg-primary-dark shadow-md' : 'bg-gray-100 text-primary hover:bg-gray-200'}`}
                    >
                        {plan.cta}
                    </Link>
                )}
            </div>
        </div>
    );
};

export default PricingCard;
