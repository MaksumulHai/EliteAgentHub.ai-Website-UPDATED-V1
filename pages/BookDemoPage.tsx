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
        <section className="section wrap">
            <div>

                <section>
                    <h1>
                        Book Your 30-Minute Discovery Call
                    </h1>
                    <p>
                        Choose a time to discuss your business, website or agent requirements with us. This is a human discovery call; it is separate from the AI demonstrations being prepared.
                    </p>
                </section>

                <section className="card">
                    <p id="calendar-help">Select your timezone and an available time. We will call the number you provide. If you have not received a call within 10 minutes of the appointment, call (804) 223-2111.</p>
                    <p><a className="button ink" href="https://api.leadconnectorhq.com/widget/booking/i5FDnRI93yvxtYQGNq1Q" target="_blank" rel="noopener noreferrer">Open discovery calendar (new tab)</a></p>
                    <p className="small">If the embedded calendar stays blank, use the same calendar above. An appointment is confirmed only when the calendar displays its confirmation.</p>
                    <div id="calendar-container" className="native-calendar-frame">
                        <iframe
                            src="https://api.leadconnectorhq.com/widget/booking/i5FDnRI93yvxtYQGNq1Q"
                            style={{ width: '100%', border: 'none', overflow: 'hidden' }}
                            scrolling="no"
                            id="i5FDnRI93yvxtYQGNq1Q_1764126279030"
                            title="Discovery Call Calendar"
                            aria-describedby="calendar-help"
                        ></iframe>
                    </div>
                </section>

            </div>
        </section>
    );
};

export default BookDemoPage;
