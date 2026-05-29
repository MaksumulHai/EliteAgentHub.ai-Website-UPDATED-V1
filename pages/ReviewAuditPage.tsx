import React, { useEffect, useState } from 'react';
import { 
  X, 
  Search, 
  Star, 
  TrendingDown, 
  CheckCircle2, 
  FileText, 
  ArrowRight, 
  AlertTriangle, 
  UserCheck, 
  DollarSign, 
  Award,
  HelpCircle,
  TrendingUp,
  Sliders,
  Sparkles,
  Eye
} from 'lucide-react';

// Stripe Checkout URL (as specified in Task 2)
const STRIPE_CHECKOUT_URL = "https://buy.stripe.com/28EeVe4TS0EBbnn53E0Ba0j";

type PageId = 'cover' | 'exec-summary' | 'revenue-model' | 'scorecard';

const galleryImages = [
  {
    src: "https://imagedelivery.net/3ycrRDYByciJhEX28VeAng/76438463-502a-4f68-75aa-4e2517b8e300/public",
    alt: "EAH Report Cover",
    title: "Cover Page",
    description: "Subject details, Regional Residential Contracting benchmarks, classification metrics, and audit summary headers."
  },
  {
    src: "https://imagedelivery.net/3ycrRDYByciJhEX28VeAng/984d711a-3756-43c0-28d2-7c90e3185000/public",
    alt: "Executive Summary",
    title: "Executive Summary",
    description: "Brief professional digest highlighting the primary friction points, latency gaps, and immediate advisor recommendations."
  },
  {
    src: "https://imagedelivery.net/3ycrRDYByciJhEX28VeAng/df83db21-c788-45fb-b2ca-e6c0f7810000/public",
    alt: "Revenue Impact Modeling",
    title: "Revenue Impact Modeling",
    description: "Quantitative simulation of local searches, standard CTR values, competitor diversion percentages, and monthly client leakage estimations."
  },
  {
    src: "https://imagedelivery.net/3ycrRDYByciJhEX28VeAng/fde18e43-0013-43c3-4afe-5f032bca3b00/public",
    alt: "Risk Scorecard",
    title: "Risk Scorecard",
    description: "Risk score metrics with clear high-risk threat indicators for response latency delays, negative drift, and competitor velocity."
  }
];

const ReviewAuditPage: React.FC = () => {
  // Page SEO / Metadata Title
  useEffect(() => {
    document.title = "Review Revenue Audit | Elite Agent Hub";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content', 
        "Discover hidden risks and identify revenue slip-ups. Our manual Review Revenue Audit provides deep competitor benchmarks, customer trends, and raw revenue-at-risk mathematics in a professional 48-hour delivery document."
      );
    }
  }, []);

  // Lightbox state for visual report gallery
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    alt: string;
    title: string;
    description: string;
  } | null>(null);
  
  // Accordion state (FAQ)
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Static items mapping
  const problemCards = [
    {
      title: "Review Trust",
      description: "How prospective searchers evaluate your credibility instantly. A handful of unresolved negative experiences, or an stale feedback cycle, can direct customers elsewhere before they ever make direct contact.",
      icon: Star,
      iconColor: "text-amber-500 bg-amber-50"
    },
    {
      title: "Customer Experience",
      description: "Detecting underlying friction from real reviews. Unanswered questions, repetitive complaints, and perceived booking delays reflect deep structural risks in your raw live response speed.",
      icon: UserCheck,
      iconColor: "text-blue-500 bg-blue-50"
    },
    {
      title: "Competitor Comparison",
      description: "A professional benchmark showing exactly how you stack up. If local alternatives respond daily and carry higher velocity, they slowly absorb the margins of high-intent searchers.",
      icon: Search,
      iconColor: "text-cyan-500 bg-cyan-50"
    },
    {
      title: "Revenue Impact",
      description: "The hard economics. We quantify potential traffic diversion, unanswered ratings penalties, and slow reaction costs into real dollars of client value routinely slipped to other options.",
      icon: TrendingDown,
      iconColor: "text-rose-500 bg-rose-50"
    }
  ];

  const packageIncludes = [
    { name: "Executive Summary", desc: "A brief, professional digest highlighting the single highest-priority exposure point and immediate recommended next steps." },
    { name: "Review Landscape Analysis", desc: "Your overall digital review health score, age distribution, response latency, and average rating breakdown." },
    { name: "Theme Analysis", desc: "Manual correlation of review complaints to discover repeating operational barriers (e.g. queue waits, missed followups)." },
    { name: "Customer Sentiment Review", desc: "Deep qualitative feedback categorized by core service sectors to locate exactly where trust breaks look consistent." },
    { name: "Competitor Benchmark", desc: "An objective side-by-side positioning grid mapping you against your top 3 local industry competitors." },
    { name: "Revenue Impact Modeling", desc: "Our objective mathematical estimation of yearly client leakage, based on normal local search volumes and ticket sizes." },
    { name: "Risk Scorecard", desc: "A clear, low-middle-high threat rating matrix assessing reputation, speed, and positioning vulnerabilities." },
    { name: "48-Hour Action Plan", desc: "An actionable, step-by-step checklist of immediate tasks to stabilize your rating profile and protect your pipeline." },
    { name: "30-Day Improvement Roadmap", desc: "A strategic milestone guide indicating long-term operational shifts to support organic feedback accumulation safely." },
    { name: "Final Recommendations", desc: "Comprehensive advisor recommendations focused strictly on professional business tactics, customer compliance, and retention." }
  ];

  const sampleReportPages = [
    { id: 'cover' as PageId, name: 'Cover Page' },
    { id: 'exec-summary' as PageId, name: 'Executive Summary' },
    { id: 'revenue-model' as PageId, name: 'Revenue Impact Modeling' },
    { id: 'scorecard' as PageId, name: 'Risk Scorecard' }
  ];

  const faqItems = [
    {
      q: "What businesses is this for?",
      a: "This review revenue audit is designed for service-based businesses, clinics, legal offices, contractors, and multi-location firms that rely on local reputation to win prospects. It is built as a highly technical, objective document to help owners review the concrete business impact of customer experiences."
    },
    {
      q: "How long does delivery take?",
      a: "Because this report is manually structured and written by professional business analysts, we deliver the complete PDF report to your direct email address within 48 business hours after you place your audit order."
    },
    {
      q: "Do you need access to my accounts?",
      a: "No. Our analysts inspect your public review presence, competitor footprints, local map positioning, and public feedback histories. We do not require usernames, passwords, API links, or any internal dashboard access to construct this audit."
    },
    {
      q: "Do you guarantee results?",
      a: "No, we do not promise miracles, ranking increases, review removals, or arbitrary score changes. We deliver an honest, realistic diagnostic analysis. Successful execution depends entirely on your team adopting the provided recommendations."
    },
    {
      q: "Is this a subscription?",
      a: "No. This is a simple, one-time investment of $197 with no automatic renewals, recurring charges, hidden developer setup fees, or lock-in contracts."
    },
    {
      q: "Can I schedule a review call?",
      a: "Yes. Every manual PDF report includes a calendar link where you can lock in a complimentary 15-minute clarification review call with our senior operations advisor to discuss your findings."
    }
  ];

  return (
    <div className="bg-slate-50 text-slate-800 antialiased min-h-screen">
      
      {/* ━━━━━━━━━━━━━━━━━━ SECTION 1 — HERO ━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200 pt-16 pb-20 md:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60"></div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Price Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs md:text-sm font-semibold tracking-wider uppercase mb-6 shadow-sm">
            <span>$197 One-Time</span>
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            <span>Manual Consulting Service</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-none max-w-4xl mx-auto animate-fade-in">
            Find Out What Your Reviews Could Be Costing Your Business
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Most business owners know their reviews matter. Few know how much revenue may be slipping away because of customer experience issues, unanswered reviews, competitor pressure, or missed opportunities.
          </p>
          <p className="mt-3 text-base md:text-lg font-medium text-slate-500 max-w-3xl mx-auto">
            The Review Revenue Audit helps identify those risks and provides a clear action plan.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href={STRIPE_CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-lg shadow-lg shadow-primary/10 transition-transform active:scale-[0.98] duration-200 text-base inline-flex items-center justify-center text-center"
            >
              Get My Review Revenue Audit
            </a>
            <button
              onClick={() => setLightboxImage(galleryImages[0])}
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-4 px-8 rounded-lg border border-slate-200 transition-all text-base"
            >
              View Sample Report
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-8 text-xs text-slate-500 font-semibold tracking-wide uppercase">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>No Subscription</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>48-Hr Delivery</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>No Account Logins Req.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ SECTION 2 — THE PROBLEM ━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-black text-slate-950 uppercase tracking-wider mb-4">
              Most Businesses Never See The Customers They Lose
            </h2>
            <div className="w-16 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="text-lg text-slate-700 leading-relaxed">
              When potential customers compare businesses online, they make decisions before ever calling. Small review issues, slow responses, recurring complaints, and stronger competitors can quietly influence who gets chosen. Most owners never know how many opportunities were lost.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {problemCards.map((pCard, idx) => {
              const IconComp = pCard.icon;
              return (
                <div key={idx} className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${pCard.iconColor} flex-shrink-0`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{pCard.title}</h3>
                      <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                        {pCard.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ SECTION 3 — WHAT YOU RECEIVE ━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-black text-slate-950 uppercase tracking-wider mb-4">
              What’s Included In The Audit
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-slate-600 text-lg">
              Each document is customized to your specific market. This is an end-to-end diagnosis of customer perception, competitor risks, and leakage math.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packageIncludes.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col justify-between hover:border-blue-300 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-mono text-xs flex items-center justify-center flex-shrink-0 font-bold">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-base font-bold text-slate-950 tracking-tight">{item.name}</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed pr-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ SECTION 4 — SAMPLE REPORT PREVIEW ━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-black tracking-widest text-secondary mb-2 block">Transparency First</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              See The Report Before You Buy
            </h2>
            <p className="mt-4 text-slate-400 text-sm md:text-base leading-relaxed">
              Review exactly what a business owner receives. This sample report demonstrates the depth of analysis, layout quality, and rigorous benchmarks manually compiled by our advisory team.
            </p>
          </div>

          {/* Premium Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {galleryImages.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setLightboxImage(img)}
                className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:border-slate-500 group cursor-pointer duration-300 flex flex-col justify-between"
              >
                {/* Image top */}
                <div className="aspect-[4/3] w-full overflow-hidden relative bg-slate-950 border-b border-slate-700/50">
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <span className="p-2.5 rounded-full bg-slate-900/80 border border-slate-700 text-white shadow">
                      <Eye className="w-5 h-5 text-secondary" />
                    </span>
                    <span className="text-xs font-semibold tracking-wider text-white uppercase bg-slate-900/80 px-3 py-1 rounded">
                      Enlarge Page
                    </span>
                  </div>
                </div>

                {/* Text description */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-100 text-lg group-hover:text-secondary transition-colors">
                      {img.title}
                    </h3>
                    <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-bold">
                      PAGE {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    {img.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Secondary CTA style button below the gallery */}
          <div className="mt-12 text-center" id="sample-trigger-block">
            <button
              onClick={() => setLightboxImage(galleryImages[0])}
              className="inline-flex items-center gap-2 bg-transparent hover:bg-slate-800 text-white font-bold py-3.5 px-8 rounded-lg text-sm border border-slate-700 hover:border-slate-500 transition duration-200"
            >
              <span>Preview Sample Report</span>
              <ArrowRight className="w-4 h-4 text-secondary" />
            </button>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ SECTION 5 (TASK 4) — WHY BUSINESS OWNERS BUY THIS ━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 bg-slate-50 border-b border-slate-200" id="why-buy-section">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-black text-slate-950 uppercase tracking-wider">
              Why Business Owners Buy This
            </h2>
            <div className="w-16 h-1 bg-secondary mx-auto mt-4 mb-4"></div>
            <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Our manually-delivered analysis provides deep repulation benchmarks, custom sentiment graphs, and quantitative revenue diagnostics with zero automated template filling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Search className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-2">Understand competitor advantages</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct insights comparing your response rates and rating counts against direct local alternatives.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <AlertTriangle className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-2">Identify customer experience issues</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Locate critical feedback drift and recurring complaints left unanswered on public business pages.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-2">Estimate potential revenue impact</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Quantify realistic estimates of comparison-driven customer leakage slipping to rival offices.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-2">Prioritize what to fix first</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Get low-hanging fruit roadmaps you can assign directly to operations managers immediately.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-2">Receive a professional decision document</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A clean, printable, executive-ready PDF report built perfectly for internal corporate alignment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ SECTION 6 — PRICING ━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 bg-white border-b border-slate-200" id="pricing-block">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-slate-950 uppercase tracking-wider">
              Simple One-Time Pricing
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-4"></div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-8 sm:p-12 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 border-b border-slate-800 pb-8">
              <div>
                <h3 className="text-3xl font-extrabold text-white">Review Revenue Audit</h3>
                <p className="mt-2 text-slate-400 text-sm sm:text-base">
                  A professional, customized consulting evaluation. Hand-compiled and delivered within 48 business hours.
                </p>
              </div>
              <div className="text-center flex-shrink-0 bg-slate-800 border border-slate-700 p-4 rounded-xl min-w-[200px]">
                <span className="text-4xl font-extrabold text-white">$197</span>
                <span className="text-slate-400 block text-xs tracking-wider uppercase font-bold mt-1">One-Time Only</span>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-slate-200 text-xs tracking-widest uppercase font-bold mb-4">Complete Deliverable Package Includes:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                  <span>Manual Analysis by Senior Advisors</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                  <span>Professional Printable PDF Report</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                  <span>Detailed Competitor Benchmark Metric Comparison</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                  <span>Quantitative Revenue Loss Estimations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                  <span>Prioritized 30-Day Improvement Checklist</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                  <span>Optional Response Script Framework Templates</span>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <a
                href={STRIPE_CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-lg shadow-lg shadow-primary/20 transition-all text-center inline-block"
              >
                Get My Review Revenue Audit ($197)
              </a>
              <span className="block text-center text-xs text-slate-500 mt-3">
                Secure SSL Encrypted Checkout • No automatic recurring subscriptions
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ SECTION 6B (TASK 3) — WHAT HAPPENS NEXT ━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 bg-slate-50 border-b border-slate-200" id="process-roadmap">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-black text-slate-950 uppercase tracking-wider mb-4">
              What Happens Next?
            </h2>
            <div className="w-16 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="text-slate-600 text-lg">
              Our straightforward manual process delivers board-ready diagnostic intelligence in 5 easy steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Step 1 */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col justify-between hover:border-slate-300 transition-colors">
              <div>
                <span className="text-3xl font-black text-primary mb-3 block">01</span>
                <h3 className="text-base font-bold text-slate-950 mb-1">Purchase Audit</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Complete your secure $197 checkout via Stripe. There are zero contracts or recurring software subscriptions.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col justify-between hover:border-slate-300 transition-colors">
              <div>
                <span className="text-3xl font-black text-primary mb-3 block">02</span>
                <h3 className="text-base font-bold text-slate-950 mb-1">Submit Information</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Provide your business name, public website URL, and key competitors you wish us to benchmark.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col justify-between hover:border-slate-300 transition-colors">
              <div>
                <span className="text-3xl font-black text-primary mb-3 block">03</span>
                <h3 className="text-base font-bold text-slate-950 mb-1">We Analyze</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our senior advisory consultants inspect your public profiles, map directories, and calculate local leakages manually.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col justify-between hover:border-slate-300 transition-colors">
              <div>
                <span className="text-3xl font-black text-primary mb-3 block">04</span>
                <h3 className="text-base font-bold text-slate-950 mb-1">Receive Report</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Get your professional, customized PDF advisor document delivered straight to your email in under 48 business hours.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col justify-between hover:border-slate-300 transition-colors">
              <div>
                <span className="text-3xl font-black text-primary mb-3 block">05</span>
                <h3 className="text-base font-bold text-slate-950 mb-1">Findings discussion</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Optionally schedule a complimentary 15-minute alignment call with our advisor to clarify the recommended action plan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ SECTION 7 — FAQ ━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 bg-white border-b border-slate-200" id="faq-block">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-black text-slate-950 uppercase tracking-wider mb-2">
              Frequently Asked Questions
            </h2>
            <div className="w-16 h-1 bg-secondary mx-auto mb-4"></div>
            <p className="text-slate-600">
              Clear answers to help you evaluate if this consulting analysis is a fit for your business.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  className="bg-slate-50 rounded-xl border border-slate-200 shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between text-slate-900 hover:bg-slate-100/50 transition-colors"
                  >
                    <span className="font-bold text-base md:text-lg">{faq.q}</span>
                    <span className="text-slate-400 flex-shrink-0 ml-4">
                      {isOpen ? (
                        <span className="text-2xl font-black leading-none">-</span>
                      ) : (
                        <span className="text-2xl font-black leading-none">+</span>
                      )}
                    </span>
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-slate-600 border-t border-slate-100 leading-relaxed text-sm md:text-base">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ SECTION 8 — FINAL CTA ━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 bg-primary/10 w-96 h-96 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Know Where Revenue May Be Slipping Away
          </h2>
          <p className="mt-6 text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Get a professional Review Revenue Audit and see where customer trust, competitor activity, and review patterns may be affecting your business.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
            <a
              href={STRIPE_CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-transform active:scale-95 duration-200 inline-block text-center"
            >
              Get My Review Revenue Audit
            </a>
          </div>
          <span className="block text-slate-500 text-xs mt-4">
            Delivered in 48 hours • Professional PDF manual report • $197 One-Time
          </span>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ ENLARGEABLE REPORT PREVIEW LIGHTBOX OVERLAY ━━━━━━━━━━━━━━━━━━ */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/95 backdrop-blur-md p-4 sm:p-6 md:p-10 flex flex-col justify-center items-center"
          onClick={() => setLightboxImage(null)}
          id="report-image-lightbox"
        >
          <div 
            className="relative bg-slate-900 text-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden border border-slate-850 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
            id="lightbox-card-container"
          >
            {/* Header / Top Toolbar */}
            <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="bg-primary/20 text-blue-400 px-2.5 py-0.5 rounded text-[10px] font-mono font-black uppercase tracking-widest border border-primary/20">
                  Document Sheet Preview
                </span>
                <span className="text-sm font-bold text-slate-200">{lightboxImage.title}</span>
              </div>
              <button
                onClick={() => setLightboxImage(null)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition duration-200"
                aria-label="Close report preview lightbox"
                id="lightbox-close-button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-Resolution Document Image View Canvas */}
            <div className="p-4 sm:p-8 bg-slate-950 flex-grow flex items-center justify-center overflow-auto max-h-[70vh]">
              <img 
                src={lightboxImage.src} 
                alt={lightboxImage.alt}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[58vh] md:max-h-[66vh] object-contain rounded-lg shadow-xl border border-slate-800"
                id="lightbox-enlarged-image"
              />
            </div>

            {/* Bottom Annotation Details & Direct Checkout Link */}
            <div className="bg-slate-950 p-4 sm:px-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-450 text-center sm:text-left leading-relaxed font-sans max-w-md">
                <strong>Analysis Focus:</strong> {lightboxImage.description}
              </p>
              <div className="flex items-center gap-3 w-full sm:w-auto flex-shrink-0">
                <button
                  onClick={() => setLightboxImage(null)}
                  className="w-1/2 sm:w-auto px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-bold transition"
                  id="lightbox-dismiss-button"
                >
                  Close Preview
                </button>
                <a
                  href={STRIPE_CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-1/2 sm:w-auto px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-xs font-bold transition text-center inline-block"
                  id="lightbox-order-button"
                >
                  Order My Audit ($197)
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ReviewAuditPage;
