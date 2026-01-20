import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';

interface VoiceAgentDemoProps {
    onClose?: () => void;
}

// Audio Processing Helpers
function encode(bytes: Uint8Array) {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

function decode(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

async function decodeAudioData(
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
        const channelData = buffer.getChannelData(channel);
        for (let i = 0; i < frameCount; i++) {
            channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
        }
    }
    return buffer;
}

const VoiceAgentDemo: React.FC<VoiceAgentDemoProps> = ({ onClose }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [status, setStatus] = useState<'Connecting' | 'Listening' | 'Speaking' | 'Idle'>('Idle');
    const [transcript, setTranscript] = useState<{ role: 'user' | 'agent', text: string }[]>([]);
    
    // Audio Refs
    const audioContextRef = useRef<AudioContext | null>(null);
    const nextStartTimeRef = useRef<number>(0);
    const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
    const sessionRef = useRef<any>(null);
    const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);

    const stopSession = () => {
        setIsConnected(false);
        setStatus('Idle');
        if (sessionRef.current) {
            sessionRef.current = null;
        }
        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
        // Properly catch potential errors when stopping audio sources
        sourcesRef.current.forEach(s => {
            try { 
                s.stop(); 
            } catch(e) {
                console.debug('Error stopping source:', e);
            }
        });
        sourcesRef.current.clear();
        nextStartTimeRef.current = 0;
    };

    const startSession = async () => {
        try {
            setStatus('Connecting');
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            // Setup Audio Contexts
            const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
            const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            audioContextRef.current = outputAudioContext;

            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            const sessionPromise = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-12-2025',
                callbacks: {
                    onopen: () => {
                        setIsConnected(true);
                        setStatus('Listening');
                        
                        // Stream Mic Input
                        const source = inputAudioContext.createMediaStreamSource(stream);
                        const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
                        scriptProcessorRef.current = scriptProcessor;

                        scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
                            const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                            const l = inputData.length;
                            const int16 = new Int16Array(l);
                            for (let i = 0; i < l; i++) {
                                int16[i] = inputData[i] * 32768;
                            }
                            const pcmBlob = {
                                data: encode(new Uint8Array(int16.buffer)),
                                mimeType: 'audio/pcm;rate=16000',
                            };
                            
                            sessionPromise.then((session) => {
                                if (session) session.sendRealtimeInput({ media: pcmBlob });
                            });
                        };
                        source.connect(scriptProcessor);
                        scriptProcessor.connect(inputAudioContext.destination);
                    },
                    onmessage: async (message: any) => {
                        const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
                        if (audioData) {
                            setStatus('Speaking');
                            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputAudioContext.currentTime);
                            const audioBuffer = await decodeAudioData(decode(audioData), outputAudioContext, 24000, 1);
                            const source = outputAudioContext.createBufferSource();
                            source.buffer = audioBuffer;
                            source.connect(outputAudioContext.destination);
                            
                            source.addEventListener('ended', () => {
                                sourcesRef.current.delete(source);
                                if (sourcesRef.current.size === 0) setStatus('Listening');
                            });

                            source.start(nextStartTimeRef.current);
                            nextStartTimeRef.current += audioBuffer.duration;
                            sourcesRef.current.add(source);
                        }

                        if (message.serverContent?.interrupted) {
                            sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
                            sourcesRef.current.clear();
                            nextStartTimeRef.current = 0;
                            setStatus('Listening');
                        }

                        if (message.serverContent?.modelTurn?.parts[0]?.text) {
                            const text = message.serverContent.modelTurn.parts[0].text;
                            setTranscript(prev => [...prev, { role: 'agent', text }]);
                        }
                    },
                    onclose: () => stopSession(),
                    onerror: () => stopSession(),
                },
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: {
                        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } },
                    },
                    systemInstruction: "You are Josh, a professional AI receptionist for Elite Agent Hub. Your goal is to help customers understand our plans, book discovery calls, and explain how we recover missed leads. Keep your tone helpful, professional, and cheerful. If someone asks for a demo, tell them they are currently in the live browser demo. Mention that Belle is our specialized phone agent reachable at 804-223-3141.",
                },
            });

            sessionRef.current = await sessionPromise;
        } catch (err) {
            console.error(err);
            stopSession();
        }
    };

    useEffect(() => {
        return () => stopSession();
    }, []);

    return (
        <div className="flex flex-col h-full min-h-[500px] w-full bg-white text-slate-900 font-sans rounded-3xl overflow-hidden shadow-sm pointer-events-auto">
            {/* Header */}
            <div className="p-5 border-b flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-inner">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-base font-black uppercase tracking-tight">Josh (Live Agent)</h3>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Simulation Connection</p>
                    </div>
                </div>
                {onClose && (
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Interaction Area */}
            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-10 bg-gradient-to-b from-white to-slate-50">
                
                {/* Visualizer Circle */}
                <div className="relative">
                    <div className={`absolute inset-0 rounded-full bg-primary/20 transition-all duration-700 ${status === 'Speaking' ? 'animate-ping scale-150' : 'scale-100'}`}></div>
                    <div className={`absolute inset-0 rounded-full bg-primary/10 transition-all duration-1000 ${status === 'Listening' ? 'animate-pulse scale-125' : 'scale-100'}`}></div>
                    
                    <div className={`w-40 h-40 rounded-full flex items-center justify-center z-10 relative transition-all duration-500 ${isConnected ? 'bg-primary shadow-[0_0_60px_rgba(37,99,235,0.4)]' : 'bg-slate-200'}`}>
                        {isConnected ? (
                            <div className="flex gap-2 items-end h-10">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className={`w-2 bg-white rounded-full transition-all duration-300 ${status === 'Speaking' ? 'animate-bounce' : 'h-2 opacity-50'}`} style={{ animationDelay: `${i * 100}ms`, height: status === 'Speaking' ? '100%' : '8px' }}></div>
                                ))}
                            </div>
                        ) : (
                            <svg className="w-16 h-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                        )}
                    </div>
                </div>

                <div className="space-y-3">
                    <h4 className="text-3xl font-black text-slate-900 leading-tight">
                        {!isConnected ? "Ready to talk?" : status === 'Speaking' ? "Josh is speaking..." : "Josh is listening..."}
                    </h4>
                    <p className="text-base text-slate-500 font-medium max-w-xs mx-auto">
                        {!isConnected 
                            ? "Click the button below to start a conversation with Josh in your browser." 
                            : "You can interrupt at any time. Just start talking like a normal conversation."}
                    </p>
                </div>

                <div className="w-full max-w-sm flex flex-col items-center gap-4">
                    <button
                        onClick={isConnected ? stopSession : startSession}
                        className={`w-full py-5 rounded-2xl font-black text-base uppercase tracking-widest shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-4 ${isConnected ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-primary text-white hover:bg-primary-dark'}`}
                    >
                        {status === 'Connecting' ? (
                            <>
                                <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Connecting...
                            </>
                        ) : isConnected ? "End Conversation" : "Start Conversation"}
                    </button>
                    {!isConnected && (
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Tip: Speak naturally — Josh will reply out loud.
                        </p>
                    )}
                </div>
            </div>

            {/* Footer Notice */}
            <div className="p-5 border-t text-center bg-white">
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                    Powered by Elite Agent Hub Streaming Voice Engine <br/> 
                    Browser Voice Protocol v2.5 • Privacy Encrypted
                </p>
            </div>
        </div>
    );
};

export default VoiceAgentDemo;