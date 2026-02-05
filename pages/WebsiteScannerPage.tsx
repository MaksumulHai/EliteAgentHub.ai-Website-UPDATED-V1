import React, { useState, useEffect } from 'react';

interface ScanResults {
    overallScore: number;
    conversionScore: number;
    bookingScore: number;
    seoScore: number;
    aiScore: number;
    broken: string[];
    quickWins: string[];
}

const WebsiteScannerPage: React.FC = () => {
    useEffect(() => {
        document.title = "Website Customer Capture Scan | Elite Agent Hub";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', "Run a quick check to see if your website is capturing customers or losing them. Identify missed opportunities and response gaps instantly.");
        }
    }, []);

    const [url, setUrl] = useState('');
    const [pastedContent, setPastedContent] = useState('');
    const [mode, setMode] = useState<'url' | 'paste'>('url');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<ScanResults | null>(null);

    const getScoreTheme = (score: number, hasResults: boolean) => {
        if (!hasResults) {
            return {
                ringStroke: '#e5e7eb',
                barFillClass: 'bg-gray-200',
                scoreTextClass: 'text-gray-400'
            };
        }
        if (score < 40) {
            return {
                ringStroke: '#ef4444', // red-500
                barFillClass: 'bg-red-500',
                scoreTextClass: 'text-red-600'
            };
        }
        if (score < 60) {
            return {
                ringStroke: '#f97316', // orange-500
                barFillClass: 'bg-orange-500',
                scoreTextClass: 'text-orange-600'
            };
        }
        if (score < 80) {
            return {
                ringStroke: '#2563eb', // primary (blue-600)
                barFillClass: 'bg-primary',
                scoreTextClass: 'text-primary'
            };
        }
        return {
            ringStroke: '#22c55e', // green-500
            barFillClass: 'bg-green-500',
            scoreTextClass: 'text-green-600'
        };
    };

    const analyzeHtml = (html: string): ScanResults => {
        const lowerHtml = html.toLowerCase();
        
        // Detection Checks
        const hasPhone = /tel:|(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/.test(lowerHtml);
        const hasCTA = /\b(call now|get quote|request quote|contact us|book now|schedule|appointment)\b/i.test(lowerHtml);
        const hasForm = /<form/i.test(lowerHtml) && /(name|email|message)/i.test(lowerHtml);
        const hasBooking = /\b(book|schedule|appointment|calendly|acuity|gohighlevel|calendar)\b/i.test(lowerHtml);
        const hasTitle = /<title[^>]*>.+?<\/title>/i.test(lowerHtml);
        const hasMetaDesc = /<meta[^>]*name=["']description["']/i.test(lowerHtml);
        const hasH1 = /<h1/i.test(lowerHtml);
        const hasServices = /\b(services|we offer)\b/i.test(lowerHtml) || (lowerHtml.match(/<h[123]/gi) || []).length >= 3;
        const hasLocation = /\b(serving|service area|near)\b/i.test(lowerHtml);
        const hasFAQ = /\b(faq|q&a|questions?|answers?)\b/i.test(lowerHtml);
        const hasAbout = /\b(about|our story|who we are)\b/i.test(lowerHtml);
        const headingCount = (lowerHtml.match(/<h[123]/gi) || []).length;
        const hasStructure = headingCount >= 3;
        const hasTrust = /\b(testimonials|reviews|rated|stars|google reviews)\b/i.test(lowerHtml);
        const isMobileFriendly = /<meta[^>]*name=["']viewport["']/i.test(lowerHtml);

        // Deductions & Broken Items
        const broken: string[] = [];
        const quickWins: string[] = [];
        
        let overallDeduction = 0;
        let convDeduction = 0;
        let bookDeduction = 0;
        let seoDeduction = 0; let aiDeduction = 0;

        if (!hasPhone) {
            broken.push("Without a click-to-call number, mobile customers often give up and leave.");
            quickWins.push("Add a prominent click-to-call button in your header.");
            overallDeduction += 15;
            convDeduction += 15;
        }
        if (!hasCTA) {
            broken.push("Customers need to know exactly what to do next (Call, Book, Message).");
            quickWins.push("Place 'Get a Quote' or 'Call Now' buttons throughout your page.");
            overallDeduction += 10;
            convDeduction += 10;
        }
        if (!hasForm) {
            broken.push("A simple contact form lets you capture leads even when you're busy.");
            quickWins.push("Embed a simple contact form to capture name and email.");
            overallDeduction += 5;
            convDeduction += 5;
        }
        if (!hasTrust) {
            broken.push("Reviews prove you are reliable before a customer decides to call.");
            quickWins.push("Display Google Reviews or client testimonials to build trust.");
            overallDeduction += 5;
            convDeduction += 5;
        }
        if (!isMobileFriendly) {
            broken.push("Mobile customers leave instantly if the site is hard to read on a phone.");
            quickWins.push("Update your site layout to be mobile-responsive.");
            overallDeduction += 5;
            convDeduction += 5;
        }
        if (!hasBooking) {
            broken.push("Letting customers book 24/7 stops them from calling competitors.");
            quickWins.push("Add a simple booking link so customers can schedule themselves.");
            overallDeduction += 15;
            bookDeduction += 15;
        }
        if (!hasTitle) {
            broken.push("A clear title ensures customers know they found the right local business.");
            quickWins.push("Write a clear title including your main service and location.");
            overallDeduction += 5;
            seoDeduction += 5;
        }
        if (!hasMetaDesc) {
            broken.push("A clear summary in search results helps customers choose you first.");
            quickWins.push("Add a short business summary for search results.");
            overallDeduction += 3;
            seoDeduction += 3;
        }
        if (!hasH1) {
            broken.push("Your main headline must instantly tell visitors what you do.");
            quickWins.push("Ensure your main headline clearly states your service.");
            overallDeduction += 5;
            seoDeduction += 5;
        }
        if (!hasServices) {
            broken.push("Listing services clearly helps customers know you can solve their problem.");
            quickWins.push("Create a clear list of the services you offer.");
            overallDeduction += 5;
            seoDeduction += 5;
        }
        if (!hasLocation) {
            broken.push("Listing your service area confirms you can actually help them.");
            quickWins.push("Explicitly list the cities or regions you serve.");
            overallDeduction += 2;
            seoDeduction += 2;
        }
        if (!hasFAQ) {
            broken.push("Answering common questions upfront prevents doubts and hesitation.");
            quickWins.push("Add a simple FAQ section to handle common questions.");
            overallDeduction += 5;
            aiDeduction += 5;
        }
        if (!hasAbout) {
            broken.push("A brief 'About' section builds the trust needed to hire you.");
            quickWins.push("Write a brief 'About' section to build authority.");
            overallDeduction += 5;
            aiDeduction += 5;
        }
        if (!hasStructure) {
            broken.push("Organized content helps customers find answers fast without frustration.");
            quickWins.push("Use clear headings to organize your service details.");
            overallDeduction += 5;
            aiDeduction += 5;
        }

        return {
            overallScore: Math.max(0, 100 - overallDeduction),
            conversionScore: Math.max(0, 40 - convDeduction),
            bookingScore: Math.max(0, 20 - bookDeduction),
            seoScore: Math.max(0, 20 - seoDeduction),
            aiScore: Math.max(0, 20 - aiDeduction),
            broken: broken.length ? broken : ["Your website looks solid. Customers can find what they need."],
            quickWins: quickWins.length ? quickWins : ["Your site is ready to convert. Focus on driving traffic."]
        };
    };

    const handleAnalyzeUrl = async () => {
        if (!url.trim()) return;

        setIsLoading(true);
        setError(null);
        setResults(null);

        let targetUrl = url.trim();
        if (!/^https?:\/\//i.test(targetUrl)) {
            targetUrl = 'https://' + targetUrl;
        }

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);
            
            const response = await fetch(targetUrl, { 
                mode: 'cors',
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);

            if (!response.ok) throw new Error('Network response was not ok');
            const html = await response.text();
            setResults(analyzeHtml(html));
        } catch (err: any) {
            console.warn('URL Scan Limitation:', err.message);
            setMode('paste');
            setError("We couldn't reach your site automatically. To check your page, simply right-click your homepage, select 'View Page Source', copy the code, and paste it below.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAnalyzePaste = () => {
        if (!pastedContent.trim()) return;
        setIsLoading(true);
        setError(null);
        setResults(null);
        
        // Slight artificial delay for UX feel
        setTimeout(() => {
            setResults(analyzeHtml(pastedContent));
            setIsLoading(false);
        }, 800);
    };

    // Circular Progress Ring calculations
    const score = results ? results.overallScore : 0;
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - (score / 100));
    const theme = getScoreTheme(score, !!results);

    return (
        <div className="bg-white py-16 md:py-24 min-h-screen">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                        Is Your Website Losing Customers?
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-700 font-medium max-w-2xl mx-auto leading-relaxed">
                        Run a quick check to see if your site connects with customers—or if they're leaving before you can respond.
                    </p>
                </div>

                {/* Scanner Tool UI */}
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 md:p-10 shadow-sm mb-12">
                    <div className="max-w-2xl mx-auto">
                        
                        {/* Mode Toggle */}
                        <div className="flex justify-center mb-8">
                            <div className="inline-flex bg-gray-200 p-1 rounded-lg">
                                <button 
                                    onClick={() => { setMode('url'); setError(null); }}
                                    className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${mode === 'url' ? 'bg-white text-primary shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                                >
                                    Scan by URL
                                </button>
                                <button 
                                    onClick={() => { setMode('paste'); setError(null); }}
                                    className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${mode === 'paste' ? 'bg-white text-primary shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                                >
                                    Paste site code
                                </button>
                            </div>
                        </div>

                        {mode === 'url' ? (
                            <div className="animate-fadeIn">
                                <label htmlFor="website-url" className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">
                                    Website URL
                                </label>
                                <div className="flex flex-col md:flex-row gap-4">
                                    <input
                                        id="website-url"
                                        type="url"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleAnalyzeUrl()}
                                        placeholder="https://example.com"
                                        className="flex-grow px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-base transition-all"
                                    />
                                    <button
                                        onClick={handleAnalyzeUrl}
                                        disabled={!url.trim() || isLoading}
                                        className="bg-primary hover:bg-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-md whitespace-nowrap min-w-[160px] flex items-center justify-center"
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Checking response paths...
                                            </>
                                        ) : 'Check My Website'}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="animate-fadeIn">
                                <label htmlFor="pasted-content" className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">
                                    Paste homepage text or HTML code
                                </label>
                                <textarea
                                    id="pasted-content"
                                    value={pastedContent}
                                    onChange={(e) => setPastedContent(e.target.value)}
                                    placeholder="Visit your site, right-click and 'View Page Source', then Select All (Ctrl+A), Copy (Ctrl+C), and Paste (Ctrl+V) here..."
                                    rows={8}
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm font-mono transition-all mb-4"
                                />
                                <button
                                    onClick={handleAnalyzePaste}
                                    disabled={!pastedContent.trim() || isLoading}
                                    className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-md whitespace-nowrap flex items-center justify-center"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Checking response paths...
                                        </>
                                    ) : 'Run Analysis on Paste'}
                                </button>
                            </div>
                        )}

                        {error && (
                            <div className="mt-6 p-5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-900 leading-relaxed flex items-start shadow-sm">
                                <div className="bg-amber-100 p-2 rounded-lg mr-4 mt-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-amber-700">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-bold mb-1">Browser Security Notice</p>
                                    <p>{error}</p>
                                </div>
                            </div>
                        )}
                        <p className="mt-5 text-xs text-gray-400 italic text-center">
                            Privacy first: Check happens entirely in your browser. No data is saved.
                        </p>
                    </div>
                </div>

                {/* Results Panel */}
                <div className={`space-y-8 transition-all duration-700 ${!results ? 'opacity-30 blur-[2px] pointer-events-none select-none' : 'opacity-100 blur-0'}`}>
                    
                    {/* Health Dashboard - Full Width Card */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-4 text-center">Capture Readiness Report</h2>
                        
                        <div className="flex flex-col items-center mb-10">
                            {/* Circular Progress Ring */}
                            <div className="relative w-44 h-44 flex items-center justify-center mb-6">
                                <svg width="140" height="140" viewBox="0 0 140 140">
                                    {/* Background Circle */}
                                    <circle
                                        cx="70"
                                        cy="70"
                                        r="54"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="transparent"
                                        className="text-gray-100"
                                    />
                                    {/* Foreground Circle */}
                                    <circle
                                        cx="70"
                                        cy="70"
                                        r="54"
                                        stroke={theme.ringStroke}
                                        strokeWidth="8"
                                        strokeDasharray={circumference}
                                        style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s ease-in-out' }}
                                        strokeLinecap="round"
                                        fill="transparent"
                                        transform="rotate(-90 70 70)"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className={`text-5xl font-black tracking-tighter leading-none ${theme.scoreTextClass}`}>
                                        {results ? results.overallScore : 0}
                                    </span>
                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1.5 transform scale-x-90 origin-center">Capture Score</span>
                                </div>
                            </div>

                            {/* Numeric Score Text */}
                            <div className="text-center mb-8">
                                <p className="text-2xl font-bold text-gray-900">
                                    <span className={theme.scoreTextClass}>{results ? results.overallScore : '—'}</span> <span className="text-gray-400">/ 100</span>
                                </p>
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-2">Customer Connection Score</p>
                            </div>

                            {/* Horizontal Progress Bar */}
                            <div className="w-full max-w-md h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                                <div 
                                    className={`h-full transition-all duration-1000 ease-out ${theme.barFillClass}`} 
                                    style={{ width: `${score}%` }}
                                />
                            </div>
                        </div>
                        
                        {/* Category Scores Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-10 border-t border-gray-50">
                            <div className="text-center">
                                <p className={`text-3xl font-bold ${results ? 'text-gray-800' : 'text-gray-300'}`}>{results ? results.conversionScore : '—'} <span className="text-xs text-gray-400">/ 40</span></p>
                                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-tight mt-1 leading-tight">Ease of Contact</p>
                            </div>
                            <div className="text-center">
                                <p className={`text-3xl font-bold ${results ? 'text-gray-800' : 'text-gray-300'}`}>{results ? results.bookingScore : '—'} <span className="text-xs text-gray-400">/ 20</span></p>
                                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-tight mt-1 leading-tight">Booking Accessibility</p>
                            </div>
                            <div className="text-center">
                                <p className={`text-3xl font-bold ${results ? 'text-gray-800' : 'text-gray-300'}`}>{results ? results.seoScore : '—'} <span className="text-xs text-gray-400">/ 20</span></p>
                                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-tight mt-1 leading-tight">Clarity & Trust</p>
                            </div>
                            <div className="text-center">
                                <p className={`text-3xl font-bold ${results ? 'text-gray-800' : 'text-gray-300'}`}>{results ? results.aiScore : '—'} <span className="text-xs text-gray-400">/ 20</span></p>
                                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-tight mt-1 leading-tight">Response Readiness</p>
                            </div>
                        </div>
                    </div>

                    {/* Insights Grid - Side-by-Side Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Opportunities Column */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-full">
                            <h3 className="text-lg font-bold text-red-600 uppercase tracking-wide mb-1 flex items-center">
                                <span className="bg-red-100 p-1.5 rounded mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                    </svg>
                                </span>
                                Where Customers Are Getting Stuck
                            </h3>
                            <p className="text-xs text-gray-500 mb-6 font-medium italic leading-relaxed">These missing elements make it harder for customers to find, trust, or hire you.</p>
                            <ul className="space-y-4">
                                {results ? results.broken.map((item, i) => (
                                    <li key={i} className="flex items-start text-sm font-medium text-gray-800 leading-snug">
                                        <span className="h-2 w-2 bg-red-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                                        {item}
                                    </li>
                                )) : [1, 2, 3].map((i) => (
                                    <li key={i} className="flex items-start">
                                        <div className="h-4 bg-gray-100 rounded w-full"></div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quick Wins Column */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-full">
                            <h3 className="text-lg font-bold text-green-600 uppercase tracking-wide mb-1 flex items-center">
                                <span className="bg-green-100 p-1.5 rounded mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                                    </svg>
                                </span>
                                Quick Wins to Capture More Leads
                            </h3>
                            <p className="text-xs text-gray-500 mb-6 font-medium italic leading-relaxed">Simple changes to help you respond faster and capture more business.</p>
                            <ul className="space-y-4">
                                {results ? results.quickWins.map((item, i) => (
                                    <li key={i} className="flex items-start text-sm font-medium text-gray-800 leading-snug">
                                        <span className="h-2 w-2 bg-green-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                                        {item}
                                    </li>
                                )) : [1, 2, 3].map((i) => (
                                    <li key={i} className="flex items-start">
                                        <div className="h-4 bg-gray-100 rounded w-full"></div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Lead Capture Section */}
                {results && (
                    <div className="my-20 bg-white border border-gray-200 rounded-3xl p-6 md:p-12 shadow-2xl animate-fadeIn max-w-3xl mx-auto">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">Stop Losing Customers to Silence</h3>
                        <p className="text-gray-600 mb-10 font-medium text-center leading-relaxed max-w-md mx-auto">Our systems answer every customer instantly—on your site and phone. Let’s make sure you never miss another lead.</p>
                        <div className="w-full overflow-hidden rounded-2xl border border-gray-100 h-[820px] md:h-[720px] shadow-inner bg-gray-50">
                            <iframe
                                src="https://api.leadconnectorhq.com/widget/form/jEJU1z5a32roJ4NAEXrj"
                                className="w-full h-full border-none rounded-2xl"
                                id="inline-jEJU1z5a32roJ4NAEXrj"
                                title="Help Fixing Website Form"
                            ></iframe>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WebsiteScannerPage;