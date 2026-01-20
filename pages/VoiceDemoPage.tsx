import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Meet Josh: Browser Demo</h1>
                    <p className="mt-4 text-lg text-gray-700 font-medium max-w-2xl mx-auto leading-relaxed">
                        Experience how our browser simulation agent, Josh, handles natural conversations and captures lead data instantly.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto space-y-8">
                    {/* Main Browser Demo Card */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                        <VoiceAgentDemo />
                    </div>

                    {/* Live Phone Demo Block */}
                    <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-lg border border-slate-800">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div className="flex-1">
                                <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                    Real Phone Demo
                                </div>
                                <h3 className="text-2xl font-black mb-2">Call Belle (Live Phone Demo)</h3>
                                <p className="text-sm text-slate-400 font-medium leading-relaxed mb-4">
                                    For the real phone-based experience, call Belle on your phone. This connects to our live GoHighLevel voice agent.
                                </p>
                                <div className="text-3xl font-black tracking-tighter text-white mb-6">
                                    (804) 223-3141
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <a 
                                        href="tel:+18042233141"
                                        className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-xl transition-all active:scale-[0.98] text-sm flex items-center gap-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                        Call Now (Mobile)
                                    </a>
                                    <button 
                                        onClick={handleCopy}
                                        className={`font-bold py-3 px-6 rounded-xl transition-all active:scale-[0.98] text-sm flex items-center gap-2 ${copied ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-200 hover:bg-slate-600'}`}
                                    >
                                        {copied ? 'Copied!' : (
                                            <>
                                                <CopyIcon className="h-4 w-4" />
                                                Copy Number
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Coming Soon Block */}
                    <div className="bg-blue-50/50 rounded-3xl p-8 border border-blue-100">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                            <div className="flex-1">
                                <h3 className="text-xl font-black text-slate-900 mb-2 flex items-center gap-2">
                                    Browser Calling (WebRTC + VoIP Gateway)
                                    <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded font-black uppercase">Coming Soon</span>
                                </h3>
                                <p className="text-sm text-slate-600 font-medium leading-relaxed mb-6">
                                    We’re building a browser-based calling option so you can talk to Belle directly from your computer without dialing.
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                                    {['WebRTC microphone calling', 'VoIP gateway to phone network', 'Same Belle agent, same call flows'].map((item) => (
                                        <li key={item} className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <Link 
                                    to="/contact"
                                    className="inline-flex items-center gap-2 text-sm font-black text-primary hover:underline group"
                                >
                                    Notify Me When It’s Ready
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 text-center text-gray-500 text-xs max-w-2xl mx-auto space-y-4">
                    <p>Josh is a browser-native digital simulation of our AI voice platform. For production environments, Elite Agent Hub utilizes enterprise-grade telephony and GoHighLevel CRM integrations.</p>
                    <p>Compliance Notice: This demo does not provide medical, legal, or emergency advice. In case of emergency, call 911 immediately.</p>
                </div>
            </div>
        </div>
    );
};

export default VoiceDemoPage;