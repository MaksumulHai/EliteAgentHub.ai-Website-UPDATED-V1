import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import HowItWorksPage from './pages/HowItWorksPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PricingPage from './pages/PricingPage';
import RoiCalculatorPage from './pages/RoiCalculatorPage';
import MissedCallCalculatorPage from './pages/MissedCallCalculatorPage';
import FaqPage from './pages/FaqPage';
import BookDemoPage from './pages/BookDemoPage';
import LegalPage from './pages/LegalPage';
import HardFactsPage from './pages/HardFactsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import AcceptableUsePage from './pages/AcceptableUsePage';
import AiDisclaimerPage from './pages/AiDisclaimerPage';
import WebsiteScannerPage from './pages/WebsiteScannerPage';
import SolutionsPage from './pages/SolutionsPage';
import BuildMyWebsitePage from './pages/BuildMyWebsitePage';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/roi-calculator" element={<RoiCalculatorPage />} />
            <Route path="/missed-call-calculator" element={<MissedCallCalculatorPage />} />
            <Route path="/website-scanner" element={<WebsiteScannerPage />} />
            <Route path="/website-scan" element={<WebsiteScannerPage />} />
            <Route path="/build-my-website" element={<BuildMyWebsitePage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/book-demo" element={<BookDemoPage />} />
            <Route path="/hard-facts" element={<HardFactsPage />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/refund-policy" element={<RefundPolicyPage />} />
            <Route path="/acceptable-use" element={<AcceptableUsePage />} />
            <Route path="/ai-disclaimer" element={<AiDisclaimerPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;