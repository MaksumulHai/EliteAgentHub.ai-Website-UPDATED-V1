
import React from 'react';

const LegalPage: React.FC = () => {
    return (
        <div className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Legal & Compliance</h1>
                    <p className="mt-4 text-lg text-gray-700 font-medium">Information about our policies and your responsibilities.</p>
                </div>

                <div className="prose prose-lg max-w-none text-sm md:text-base text-gray-700 font-medium leading-relaxed">
                    <section className="mb-12 p-8 bg-gray-50 rounded-lg">
                        <h2 className="text-2xl font-bold text-gray-800">Privacy Policy Summary</h2>
                        <p><strong>[TODO: Insert Full Privacy Policy Here]</strong></p>
                        <p>
                            We are committed to protecting your privacy. This summary outlines how we collect, use, and protect your personal information. We collect information you provide to us directly, such as your name, email, and phone number when you book a demo or contact us. We also collect information automatically as you navigate the site.
                        </p>
                        <p>
                            Your information is used to provide and improve our services, to communicate with you, and for marketing purposes. We do not sell your personal data to third parties.
                        </p>
                    </section>

                    <section className="mb-12 p-8 bg-gray-50 rounded-lg">
                        <h2 className="text-2xl font-bold text-gray-800">Call Recording Consent</h2>
                        <p><strong>[TODO: Insert Detailed Consent Policy Here]</strong></p>
                        <p>
                            Our service includes call recording and transcription features. It is your responsibility to comply with all applicable laws regarding call recording consent. Many jurisdictions require that you notify and/or obtain consent from all parties on a recorded call.
                        </p>
                        <p>
                            Our platform is configured by default to play a notice such as, "This call may be recorded for quality and training purposes," at the beginning of each call. You can customize this message. By using our service, you agree that you have the necessary consent from all participants for any call you record.
                        </p>
                    </section>
                    
                    <section className="mb-12 p-8 bg-gray-50 rounded-lg">
                        <h2 className="text-2xl font-bold text-gray-800">HIPAA & Legal Disclaimer</h2>
                        <p><strong>[TODO: Consult with legal counsel to draft appropriate disclaimers]</strong></p>
                        <p>
                            Our service is not HIPAA compliant by default. If you are a covered entity or business associate under HIPAA, you must not use our service to handle Protected Health Information (PHI) without entering into a Business Associate Agreement (BAA) with us. Please contact us to discuss your specific compliance needs.
                        </p>
                        <p>
                            The information provided on this website does not, and is not intended to, constitute legal advice; instead, all information, content, and materials available on this site are for general informational purposes only.
                        </p>
                    </section>
                    
                    <section className="text-center">
                        <p>For full details, please review our official <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.</p>
                        <p className="text-sm md:text-base text-gray-700 font-medium mt-2">Last Updated: {new Date().toLocaleDateString()}</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default LegalPage;
