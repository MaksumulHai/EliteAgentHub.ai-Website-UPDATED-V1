
import React, { useState, useMemo } from 'react';
import type { MissedCallCalculatorResults } from '../types';
import { PRICING_PLANS } from '../constants';

const MissedCallCalculatorPage: React.FC = () => {
    const [inputs, setInputs] = useState({
        avgValue: '500',
        savedCalls: '3',
    });
    const [selectedPlanPrice, setSelectedPlanPrice] = useState<string>('249'); // Default to Essentials

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (/^\d*\.?\d*$/.test(value)) {
            setInputs(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPlanPrice(e.target.value);
    };
    
    const results: MissedCallCalculatorResults | null = useMemo(() => {
        const planFee = parseFloat(selectedPlanPrice) || 249;
        const avgValue = parseFloat(inputs.avgValue) || 0;
        const savedCalls = parseFloat(inputs.savedCalls) || 0;

        if (planFee <= 0 || avgValue <= 0) {
            return null;
        }

        const revenue = avgValue * savedCalls;
        const netGain = revenue - planFee;
        const roiPercentage = (netGain / planFee) * 100;
        const breakEvenCalls = planFee / avgValue;

        return {
            roiPercentage,
            netGainPerMonth: netGain,
            breakEvenCalls: Math.ceil(breakEvenCalls),
        };

    }, [inputs, selectedPlanPrice]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
    };

    return (
        <div className="bg-gray-50 py-16 md:py-24">
            <div className="container mx-auto px-4">
                 <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Break-Even & ROI Calculator</h1>
                    <p className="mt-4 text-lg text-gray-700 font-medium max-w-3xl mx-auto">A simpler way to see the impact. How many saved calls does it take to profit? Even 1-2 calls per month can pay for your entire plan.</p>
                </div>
                
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Calculator Inputs */}
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Enter Your Numbers</h2>
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="selectedPlan" className="block text-sm md:text-base font-medium text-gray-700">Select Your Plan</label>
                                <select 
                                    name="selectedPlan" 
                                    value={selectedPlanPrice} 
                                    onChange={handlePlanChange} 
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                >
                                    {PRICING_PLANS.map(plan => (
                                        <option key={plan.name} value={plan.monthlyPrice}>
                                            {plan.name} - ${plan.monthlyPrice}/mo
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="avgValue" className="block text-sm md:text-base font-medium text-gray-700">Average Job/Client Value ($)</label>
                                <input type="text" name="avgValue" value={inputs.avgValue} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="savedCalls" className="block text-sm md:text-base font-medium text-gray-700">Expected Saved Calls Per Month</label>
                                <input type="text" name="savedCalls" value={inputs.savedCalls} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                            </div>
                        </div>
                    </div>
                    
                    {/* Calculator Results */}
                     <div className="bg-primary-dark text-white p-8 rounded-lg shadow-lg">
                         <h2 className="text-2xl font-bold mb-6">Your Potential Return</h2>
                        {results ? (
                            <div className="space-y-6">
                                <div>
                                    <p className="text-lg text-blue-100 font-medium">Return on Investment (ROI)</p>
                                    <p className="text-5xl font-extrabold text-accent">{results.roiPercentage.toFixed(0)}%</p>
                                </div>
                                <div>
                                    <p className="text-lg text-blue-100 font-medium">Net Gain Per Month</p>
                                    <p className="text-4xl font-bold">{formatCurrency(results.netGainPerMonth)}</p>
                                </div>
                                <div className="pt-4 border-t border-blue-700">
                                    <p className="text-lg text-blue-100 font-medium">Break-Even Point</p>
                                    <p className="text-3xl font-bold">{results.breakEvenCalls} saved calls/month</p>
                                    <p className="mt-2 text-sm md:text-base text-blue-200 font-medium">You only need to save {results.breakEvenCalls} call(s) per month to cover the cost. Every call after that is pure profit.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-lg text-blue-100 font-medium">Enter your details to calculate your ROI.</p>
                            </div>
                        )}
                    </div>
                 </div>
            </div>
        </div>
    );
};

export default MissedCallCalculatorPage;
