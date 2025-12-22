import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BuildMyWebsitePage: React.FC = () => {
    useEffect(() => {
        document.title = "Build My Website | Elite Agent Hub";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', "Need a website? Get online fast with a clean, conversion-first website built to generate calls, bookings, and trust.");
        }
    }, []);

    const [formData, setFormData] = useState({
        businessName: '',
        businessType: '',
        location: '',
        services: '',
        needsBooking: 'No',
        preferredContact: 'Email'
    });

    const isFormValid = formData.businessName.trim() !== '' && formData.location.trim() !== '';

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Build My Website</h1>
                    <p className="text-lg md:text-xl text-gray-700 font-medium max-w-2xl mx-auto leading-relaxed">
                        Don’t have a website yet? We’ll help you get online fast with a clean site built to generate calls, bookings, and trust.
                    </p>
                </div>

                {/* Intake Form Card */}
                <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-200 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Quick Website Intake</h2>
                    
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="col-span-1">
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">
                                Business Name *
                            </label>
                            <input
                                type="text"
                                name="businessName"
                                value={formData.businessName}
                                onChange={handleInputChange}
                                placeholder="e.g. Acme Plumbing"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                                required
                            />
                        </div>

                        <div className="col-span-1">
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">
                                Business Type
                            </label>
                            <input
                                type="text"
                                name="businessType"
                                value={formData.businessType}
                                onChange={handleInputChange}
                                placeholder="e.g. Plumbing, HVAC, Legal"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">
                                City or Zip Code *
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                placeholder="Where are you located?"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                                required
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">
                                Services Offered
                            </label>
                            <textarea
                                name="services"
                                value={formData.services}
                                onChange={handleInputChange}
                                rows={3}
                                placeholder="Briefly list your primary services..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                            />
                        </div>

                        <div className="col-span-1">
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">
                                Do you need online booking?
                            </label>
                            <select
                                name="needsBooking"
                                value={formData.needsBooking}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                            >
                                <option>No</option>
                                <option>Yes</option>
                                <option>Not Sure</option>
                            </select>
                        </div>

                        <div className="col-span-1">
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">
                                Preferred Contact Method
                            </label>
                            <select
                                name="preferredContact"
                                value={formData.preferredContact}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                            >
                                <option>Email</option>
                                <option>Phone</option>
                            </select>
                        </div>

                        <div className="col-span-1 md:col-span-2 mt-4">
                            <button
                                type="button"
                                disabled={!isFormValid}
                                className={`w-full font-bold py-4 px-8 rounded-xl shadow-lg transition-all text-lg ${
                                    isFormValid 
                                    ? 'bg-primary hover:bg-primary-dark text-white transform hover:scale-[1.01] active:scale-[0.99]' 
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                Request a Website Build
                            </button>
                        </div>
                    </form>

                    <div className="mt-10 pt-8 border-t border-gray-200 text-center">
                        <p className="text-gray-600 font-medium mb-4">Prefer to talk first? Visit Contact and we’ll guide you.</p>
                        <Link
                            to="/contact"
                            className="text-primary font-bold hover:underline inline-flex items-center"
                        >
                            Contact Us
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuildMyWebsitePage;