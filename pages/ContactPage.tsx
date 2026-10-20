import React, { useEffect } from 'react';

const ContactPage: React.FC = () => {
    useEffect(() => {
        document.title = "Contact | Elite Agent Hub";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', "Discuss a website, landing page, voice or website-chat project with Elite Agent Hub.");
        }

        // Load the GoHighLevel form script dynamically
        const scriptSrc = "https://link.msgsndr.com/js/form_embed.js";
        const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
        
        let script: HTMLScriptElement | null = null;
        
        if (!existingScript) {
            script = document.createElement('script');
            script.src = scriptSrc;
            script.type = "text/javascript";
            script.async = true;
            document.body.appendChild(script);
        }

        return () => {
            // Cleanup script on unmount if we added it
            if (script && document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <div className="section wrap">
            <div>
                <div>
                    <h1>Contact</h1>
                    <p>
                        Tell us about your website, landing page, voice or website-chat needs. Agencies can ask about overflow page production.
                    </p>
                </div>

                <div className="grid two contact-grid">
                    {/* Contact Info Section */}
                    <div>
                        <div>
                            <h2>Contact Information</h2>
                            <div>
                                <div>
                                    <p>Phone</p>
                                    <p><a href="tel:+18042232111">(804) 223-2111</a></p>
                                </div>
                                <div>
                                    <p>Email</p>
                                    <p><a href="mailto:support@eliteagenthub.ai">support@eliteagenthub.ai</a></p>
                                </div>
                                <div>
                                    <p>Registered Agent Address</p>
                                    <div>
                                        <p>8401 Mayland Dr, Suite A</p>
                                        <p>Henrico, VA 23294</p>
                                        <p>United States</p>
                                    </div>
                                    <p className="small">Registered-agent office for its authorized legal purpose; not a general project or marketing-mail address.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* GHL Contact Form Embed */}
                    <div className="card">
                        <h2>Send Us a Message</h2>
                        <p id="contact-form-help">
                            The form may take a moment to appear. If it stays blank, open the same contact form directly.
                        </p>
                        <a
                            href="https://api.leadconnectorhq.com/widget/form/RIEyRo76RF6JLKaxWTnQ"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button ink"
                        >
                            Open contact form (new tab)
                        </a>
                        <p>
                            Prefer email? Contact us at <a href="mailto:support@eliteagenthub.ai">support@eliteagenthub.ai</a>
                        </p>
                        <div className="native-form-frame">
                            <iframe
                                src="https://api.leadconnectorhq.com/widget/form/RIEyRo76RF6JLKaxWTnQ"
                                style={{ width: '100%', height: '927px', border: 'none', borderRadius: '8px' }}
                                id="inline-RIEyRo76RF6JLKaxWTnQ"
                                title="EAH_Contact Page – Send Us a Message"
                                aria-describedby="contact-form-help"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;