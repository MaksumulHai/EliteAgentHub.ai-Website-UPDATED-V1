import React, { useEffect, useState } from 'react';
import VoiceAgentDemo from '../components/VoiceAgentDemo';

const CopyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const VoiceDemoPage: React.FC = () => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        document.title = "AI Voice Agent Demo | Elite Agent Hub";
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText("+18042233141");
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="bg-white py-12 md:py-20 min-h-screen">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">AI Voice Experience</h1>
                    <p className="mt-4 text-lg text-gray-700 font-medium max-w-2xl mx-auto leading-relaxed">
                        For the best demo experience right now, call Belle — our live production-grade agent.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto space-y-8">
                    {/* Live Phone Demo Block - PRIORITIZED */}
                    <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl border-4 border-primary/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 00-1.02.24l-2.2 2.2a15.045 15.045 0 01-6.59-6.59l2.2-2.21c.28-.27.36-.66.25-1.02A11.36 11.36 0 018.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 12h2a9 9 0 00-9-9v2c3.87 0 7 3.13 7 7zm-4 0h2c0-2.76-2.24-5-5-5v2c1.66 0 3 1.34 3 3z"/></svg>
                        </div>
                        
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                                Live Production Demo
                            </div>
                            <h3 className="text-3xl font-black mb-3">Call Belle Now</h3>
                            <p className="text-base text-slate-300 font-medium leading-relaxed mb-8">
                                Witness our production environment including GoHighLevel integration and real telephony latency. Talk naturally; she's ready to help.
                            </p>
                            <div className="text-4xl font-black tracking-tighter text-white mb-8 border-b border-slate-700 pb-6">
                                (804) 223-3141
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <a 
                                    href="tel:+18042233141"
                                    className="flex-1 bg-primary hover:bg-primary-dark text-white font-black py-5 px-8 rounded-2xl transition-all active:scale-[0.95] text-center flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(37,99,235,0.4)]"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                    Dial Now
                                </a>
                                <button 
                                    onClick={handleCopy}
                                    className={`font-black py-5 px-8 rounded-2xl transition-all active:scale-[0.95] flex items-center justify-center gap-3 ${copied ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}`}
                                >
                                    {copied ? 'Copied!' : (
                                        <>
                                            <CopyIcon className="h-5 w-5" />
                                            Copy Number
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Maintenance Mode Browser Demo */}
                    <VoiceAgentDemo />

                    {/* Coming Soon Block */}
                    <div className="bg-blue-50/50 rounded-3xl p-8 border border-blue-100 opacity-60 grayscale-[0.5]">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                            <div className="flex-1">
                                <h3 className="text-xl font-black text-slate-900 mb-2 flex items-center gap-2">
                                    Browser-Based VoIP
                                    <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded font-black uppercase tracking-widest">Coming Soon</span>
                                </h3>
                                <p className="text-sm text-slate-600 font-medium leading-relaxed mb-6">
                                    We’re building a secure WebRTC gateway so you can talk to Belle directly from your computer without a mobile device.
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                                    {['Zero-Latency Audio', 'No Mobile Device Required', 'End-to-End Encryption'].map((item) => (
                                        <li key={item} className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 text-center text-gray-400 text-[10px] font-bold uppercase tracking-widest max-w-2xl mx-auto leading-relaxed">
                    <p className="mb-2">Note: Live phone demo (804) 223-3141 is our active production line.</p>
                    <p>Compliance: In case of emergency, always call 911 directly.</p>
                </div>
            </div>
        </div>
    );
};

export default VoiceDemoPage;