import React, { useEffect } from 'react';

const ContactPage: React.FC = () => {
    useEffect(() => {
        document.title = "Contact | Elite Agent Hub";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', "Contact Elite Agent Hub for help with AI agents, website scans, or getting a new website built. We’ll respond as soon as possible.");
        }

        // Load the GoHighLevel form script dynamically for A2P form
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
        <div className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Contact</h1>
                    <p className="text-lg text-gray-700 font-medium max-w-2xl mx-auto">
                        Have questions or want help getting set up? Reach out — we’ll respond as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info Section */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Phone</p>
                                    <p className="text-lg text-gray-900 font-semibold">(804) 223-3141</p>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Email</p>
                                    <p className="text-lg text-gray-900 font-semibold">support@eliteagenthub.ai</p>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Registered Agent Address</p>
                                    <div className="text-lg text-gray-900 font-semibold">
                                        <p>8401 Maryland Dr, Suite A</p>
                                        <p>Henrico, VA 23294</p>
                                        <p>United States</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* GHL Contact Form Embed */}
                    <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                        <div className="w-full overflow-hidden rounded-lg">
                            {/* TEMP A2P FORM – replace with original contact form after approval */}
                            <iframe
                                src="https://api.leadconnectorhq.com/widget/form/RU9x01XEeYSLI8QlR5yw"
                                style={{ width: '100%', height: '865px', border: 'none', borderRadius: '3px' }}
                                id="inline-RU9x01XEeYSLI8QlR5yw" 
                                data-layout="{'id':'INLINE'}"
                                data-trigger-type="alwaysShow"
                                data-trigger-value=""
                                data-activation-type="alwaysActivated"
                                data-activation-value=""
                                data-deactivation-type="neverDeactivate"
                                data-deactivation-value=""
                                data-form-name="A2P regg"
                                data-height="865"
                                data-layout-iframe-id="inline-RU9x01XEeYSLI8QlR5yw"
                                data-form-id="RU9x01XEeYSLI8QlR5yw"
                                title="A2P regg"
                            ></iframe>
                        </div>
                        <p className="text-center text-xs text-gray-500 mt-6">
                            Prefer email? Contact us at <a href="mailto:support@eliteagenthub.ai" className="text-primary hover:underline">support@eliteagenthub.ai</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;