
import React, { useState, useMemo } from 'react';
import type { RoiCalculatorResults } from '../types';
import Toast from '../components/Toast';
import { PRICING_PLANS } from '../constants';

const Tooltip: React.FC<{ text: string }> = ({ text }) => (
    <div className="relative group cursor-help inline-block ml-1">
        <span className="text-gray-400 font-bold">!</span>
        <div className="hidden group-hover:block absolute bg-gray-800 text-white text-xs md:text-sm rounded p-2 shadow-lg z-20 w-56 mt-1 font-normal">
            {text}
        </div>
    </div>
);

const RoiCalculatorPage: React.FC = () => {
    const [inputs, setInputs] = useState({
        missedPerDay: '5',
        businessDays: '22',
        avgValue: '150',
    });
    // Changed to store plan name to handle dynamic pricing labels robustly
    const [selectedPlanName, setSelectedPlanName] = useState<string>('Essentials');
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    const [email, setEmail] = useState('');
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // Allow only numbers and a single decimal point
        if (/^\d*\.?\d*$/.test(value)) {
            setInputs(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPlanName(e.target.value);
    };

    const results = useMemo(() => {
        const missedPerDay = parseFloat(inputs.missedPerDay) || 0;
        const businessDays = parseFloat(inputs.businessDays) || 0;
        const avgValue = parseFloat(inputs.avgValue) || 0;
        
        const selectedPlan = PRICING_PLANS.find(p => p.name === selectedPlanName) || PRICING_PLANS.find(p => p.name === 'Essentials') || PRICING_PLANS[0];
        const basePrice = selectedPlan.monthlyPrice;

        // Pricing Logic
        const isYearly = billingCycle === 'yearly';
        // Apply 15% discount if yearly is selected
        const effectiveMonthlyPrice = isYearly ? basePrice * 0.85 : basePrice;
        
        if (missedPerDay === 0 || businessDays === 0 || avgValue === 0) {
            return null;
        }

        // Simplified Loss Formula (Option B): 
        // monthlyLostRevenue = missedCallsPerDay * businessDays * avgJobValue
        const monthlyLostRevenue = missedPerDay * businessDays * avgValue;
        const annualLostRevenue = monthlyLostRevenue * 12;

        // Break Even Logic: planPrice / avgJobValue -> ensure at least 1
        // breakEvenCalls = Math.max(1, Math.round(breakEvenRaw))
        const breakEvenCalls = Math.max(1, Math.round(effectiveMonthlyPrice / avgValue));

        return {
            monthlyLostRevenue,
            annualLostRevenue,
            breakEvenCalls,
            planPayback: 'Instantly',
            effectiveMonthlyPrice,
            isYearly
        };
    }, [inputs, selectedPlanName, billingCycle]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Replace this with an actual API call
        console.log("Submitting results to email:", email);
        console.log("Calculator Inputs:", inputs);
        console.log("Calculated Results:", results);
        
        setToast({ message: "Your results have been sent!", type: 'success' });
        setEmail('');
    };

    return (
        <div className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">What Are Missed Calls Costing You?</h1>
                    <p className="mt-4 text-lg text-gray-700 font-medium max-w-3xl mx-auto">Do the math yourself. Your competitor gets the calls you miss. Use our calculator to see how much revenue you lose each month to voicemail.</p>
                </div>

                {/* Monthly / Yearly Toggle */}
                <div className="flex justify-center mb-10">
                    <div className="inline-flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                        <button 
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-6 py-2.5 rounded-md text-sm font-bold transition-all duration-200 ${billingCycle === 'monthly' ? 'bg-white text-primary shadow-sm ring-1 ring-gray-200' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            Monthly
                        </button>
                        <button 
                            onClick={() => setBillingCycle('yearly')}
                            className={`px-6 py-2.5 rounded-md text-sm font-bold transition-all duration-200 ${billingCycle === 'yearly' ? 'bg-white text-primary shadow-sm ring-1 ring-gray-200' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            Yearly (Save 15%)
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Calculator Inputs */}
                    <div className="bg-gray-50 p-8 rounded-xl shadow-lg border border-gray-100">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Business Metrics</h2>
                        <div className="space-y-6">
                             <div>
                                <label htmlFor="selectedPlan" className="text-lg font-semibold text-gray-800 mb-1 flex items-center">Compare Against Plan</label>
                                <select 
                                    name="selectedPlan" 
                                    value={selectedPlanName} 
                                    onChange={handlePlanChange} 
                                    className="block w-full px-4 py-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-base font-medium transition-all"
                                >
                                    {PRICING_PLANS.map(plan => {
                                        let label = `${plan.name} - $${plan.monthlyPrice}/mo`;
                                        if (billingCycle === 'yearly') {
                                            // Option C logic: Discounted monthly rate AND total yearly amount
                                            const yearlyTotal = Math.round(plan.monthlyPrice * 12 * 0.85);
                                            const discountedMonthly = Math.round((plan.monthlyPrice * 12 * 0.85) / 12);
                                            label = `${plan.name} — $${discountedMonthly}/mo ($${yearlyTotal}/year)${plan.isPopular ? ' ⭐ BEST VALUE ⭐' : ''}`;
                                        }
                                        return (
                                            <option key={plan.name} value={plan.name}>
                                                {label}
                                            </option>
                                        );
                                    })}
                                </select>
                                {results?.isYearly && (
                                    <p className="text-xs md:text-sm text-green-600 mt-1.5 font-medium">
                                        Applied: 15% yearly discount
                                    </p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="missedPerDay" className="text-lg font-semibold text-gray-800 mb-1 flex items-center">
                                    Missed Calls Per Day
                                    <Tooltip text="How many customer calls your business likely misses per day due to busyness, after-hours, weekends, or staff being unavailable." />
                                </label>
                                <input type="text" name="missedPerDay" value={inputs.missedPerDay} placeholder="5" onChange={handleInputChange} className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-base font-medium transition-all" />
                            </div>
                            <div>
                                <label htmlFor="businessDays" className="text-lg font-semibold text-gray-800 mb-1 flex items-center">
                                    Business Days Per Month
                                    <Tooltip text="How many days your business is open each month. Example: Mon–Fri = about 22 days. If you're open weekends, increase this number." />
                                </label>
                                <input type="text" name="businessDays" value={inputs.businessDays} onChange={handleInputChange} className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-base font-medium transition-all" />
                            </div>
                            <div>
                                <label htmlFor="avgValue" className="text-lg font-semibold text-gray-800 mb-1 flex items-center">
                                    Average Job/Client Value ($)
                                    <Tooltip text="How much revenue you typically earn from one new customer or one completed job. For many businesses this ranges from $100 to $500+." />
                                </label>
                                <input type="text" name="avgValue" value={inputs.avgValue} placeholder="150" onChange={handleInputChange} className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-base font-medium transition-all" />
                            </div>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                          <p className="text-base text-gray-700 font-medium leading-snug">
                            Calculator assumes every missed call equals a lost customer.
                          </p>
                        </div>
                    </div>

                    {/* Calculator Results */}
                    <div className="bg-primary-dark text-white p-8 md:p-10 rounded-xl shadow-2xl flex flex-col justify-center items-center text-center relative overflow-hidden">
                        {/* Top accent bar */}
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-accent to-primary"></div>

                         <h2 className="text-3xl font-bold text-white text-center mb-2">Your Lost Revenue</h2>
                        {results ? (
                            <div className="space-y-6 w-full">
                                <div className="rounded-2xl bg-white/95 border border-slate-200 px-6 py-4 shadow-sm">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Monthly Lost Revenue</p>
                                    <p className="mt-1 text-3xl font-bold tracking-tight text-red-500">{formatCurrency(results.monthlyLostRevenue)}</p>
                                </div>
                                
                                <div className="rounded-2xl bg-white/95 border border-slate-200 px-6 py-4 shadow-sm">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Annual Lost Revenue</p>
                                    <p className="mt-1 text-3xl font-bold tracking-tight text-red-500">{formatCurrency(results.annualLostRevenue)}</p>
                                </div>
                                
                                <div className="mt-8 border-t border-white/10 w-full pt-6">
                                    <div className="bg-[#23346F] rounded-xl p-6 text-center mt-4 shadow-lg">
                                        <p className="text-5xl font-extrabold text-white">
                                            {results.breakEvenCalls}
                                        </p>
                                        <p className="text-lg md:text-xl font-semibold text-gray-200 mt-2 text-center leading-snug">
                                            {results.breakEvenCalls === 1 
                                                ? "If just 1 call is saved this month, your entire plan is fully paid for — every additional saved call becomes pure profit and a new customer your competitors don’t get."
                                                : `If just ${results.breakEvenCalls} calls are saved this month, your entire plan is fully paid for — every additional saved call becomes pure profit and a new customer your competitors don’t get.`}
                                        </p>
                                    </div>

                                    {results.isYearly ? (
                                        <div className="mt-4 text-sm md:text-base text-gray-300 font-medium">
                                            <p>Comparing against: ${Math.round(results.effectiveMonthlyPrice)}/mo (billed annually)</p>
                                            <p className="mt-0.5">Total: ${formatCurrency(results.effectiveMonthlyPrice * 12)} per year</p>
                                        </div>
                                    ) : (
                                         <p className="mt-4 text-sm md:text-base text-gray-300 font-medium">Based on ${Math.round(results.effectiveMonthlyPrice)}/mo</p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
                                <p className="text-lg text-blue-100 font-medium">Enter your business details to see your results.</p>
                            </div>
                        )}
                         <div className="mt-10 w-full">
                            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                                <input 
                                    type="email" 
                                    placeholder="Enter your email to save results..." 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-lg shadow-inner text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent" 
                                />
                                <button data-cta="roi-send-results" type="submit" className="w-full bg-accent hover:bg-cyan-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg text-lg">
                                    Send My ROI Report
                                </button>
                            </form>
                         </div>
                    </div>
                </div>
            </div>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
    );
};

export default RoiCalculatorPage;
