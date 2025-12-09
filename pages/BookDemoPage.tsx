import React, { useEffect } from 'react';

const BookDemoPage: React.FC = () => {
    useEffect(() => {
        // Load the GoHighLevel form script dynamically
        const script = document.createElement('script');
        script.src = "https://link.msgsndr.com/js/form_embed.js";
        script.type = "text/javascript";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            // Cleanup script on unmount
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <main className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-5xl mx-auto">

                <section className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
                        Book Your 30-Minute Discovery Call
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
                        Choose a convenient time below. We’ll review your missed-call losses and show how our AI receptionist can recover revenue instantly.
                    </p>
                </section>

                <section className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 md:p-8">
                    <div className="w-full" id="calendar-container">
                        <iframe
                            src="https://api.leadconnectorhq.com/widget/booking/i5FDnRI93yvxtYQGNq1Q"
                            style={{ width: '100%', border: 'none', overflow: 'hidden' }}
                            scrolling="no"
                            id="i5FDnRI93yvxtYQGNq1Q_1764126279030"
                            title="Discovery Call Calendar"
                        ></iframe>
                    </div>
                </section>

            </div>
        </main>
    );
};

export default BookDemoPage;