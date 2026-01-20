import React from 'react';

interface VoiceAgentDemoProps {
    onClose?: () => void;
}

/**
 * EMERGENCY HOTFIX: 
 * Set VOICE_DEMO_DISABLED to true to prevent visitors from interacting with a broken demo.
 * This preserves brand trust by directing users to the reliable phone demo.
 */
const VOICE_DEMO_DISABLED = true;

const VoiceAgentDemo: React.FC<VoiceAgentDemoProps> = ({ onClose }) => {
    if (VOICE_DEMO_DISABLED) {
        return (
            <div className="flex flex-col h-full min-h-[500px] w-full bg-white text-slate-900 font-sans rounded-3xl overflow-hidden shadow-sm p-8 text-center justify-center space-y-8">
                <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto border-4 border-amber-100">
                    <svg className="w-10 h-10 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                
                <div className="space-y-4">
                    <h3 className="text-2xl font-black text-slate-900">Browser Demo Offline</h3>
                    <p className="text-slate-600 font-medium leading-relaxed max-w-sm mx-auto">
                        We are currently upgrading Josh to our new <span className="text-primary font-bold">Streaming Voice Engine</span> for a more natural, low-latency experience.
                    </p>
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-inner">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Primary Demo Available</p>
                    <p className="text-sm font-bold text-slate-900 mb-3">Call Belle on your mobile phone:</p>
                    <a href="tel:+18042233141" className="text-3xl font-black text-primary hover:text-primary-dark transition-colors">
                        (804) 223-3141
                    </a>
                </div>

                <div className="pt-4">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                        Estimated Return: 24-48 Hours
                    </p>
                </div>
            </div>
        );
    }

    // This part is unreachable while VOICE_DEMO_DISABLED = true
    return null;
};

export default VoiceAgentDemo;