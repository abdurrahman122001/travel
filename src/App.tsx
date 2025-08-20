import { useEffect, useMemo, useRef, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Index from "./pages/Index";
import TravelPackages from "./pages/TravelPackages";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/Terms&Condition";
import SearchHero from "./pages/SearchHero";
import Package from "./pages/Packages";
import EffectCard from "./pages/EffectCard";
import Desclaimer from "./pages/Desclaimer";
import BlogDetails from "./pages/BlogDetails";
import VisitorCounter from "./pages/VisitorCounter";
import CategoryOrSubcategoryPage from "./pages/CategoryPage";
import LatestPackagesSection from "./pages/LatestPackagesSection";
import SearchResults from "./pages/SearchResults";

// Import WhatsApp widget and CSS
import { WhatsAppWidget } from "react-whatsapp-widget";
import "react-whatsapp-widget/dist/index.css";

const queryClient = new QueryClient();

/** Spinner overlay using #38BDF8 */
const SpinnerOverlay = ({ show }: { show: boolean }) => {
  if (!show) return null;
  return (
    <>
      {/* Minimal CSS for spinner */}
      <style>{`
        @keyframes app_spin {
          to { transform: rotate(360deg); }
        }
        .app-spinner-backdrop {
          position: fixed;
          inset: 0;
          background: #ffffff; /* WHITE background now */
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999; /* above WhatsApp widget wrapper */
        }
        .app-spinner {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 4px solid rgba(56, 189, 248, 0.25); /* #38BDF8 with opacity */
          border-top-color: #38BDF8;                  /* primary arc */
          animation: app_spin 0.9s linear infinite;
        }
      `}</style>

      <div className="app-spinner-backdrop">
        <div className="app-spinner" />
      </div>
    </>
  );
};

/** Wrap Routes to toggle spinner on navigation changes */
const RoutedContent = ({
  onNavigating,
}: {
  onNavigating?: (path: string) => void;
}) => {
  const location = useLocation();
  const prevPath = useRef<string>(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPath.current) {
      onNavigating?.(location.pathname);
      prevPath.current = location.pathname;
    }
  }, [location.pathname, onNavigating]);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/packages" element={<TravelPackages />} />
      <Route path="/packages/:slug" element={<TravelPackages />} />
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/search" element={<SearchHero />} />
      <Route path="/package" element={<Package />} />
      <Route path="/category/:id" element={<CategoryOrSubcategoryPage />} />
      <Route path="/subcategory/:id" element={<CategoryOrSubcategoryPage />} />
      <Route path="/effect" element={<EffectCard />} />
      <Route path="/desclaimer" element={<Desclaimer />} />
      <Route path="/blog/:slug" element={<BlogDetails />} />
      <Route path="upcoming-trips" element={<LatestPackagesSection />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/search-results" element={<SearchResults />} />
    </Routes>
  );
};

const App = () => {
  const [showWidget, setShowWidget] = useState(true);
  const [loading, setLoading] = useState(true);

  // Hide the initial spinner after a short delay (feel free to tweak)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  // Memoize a handler for route changes: show spinner briefly each time
  const handleNavigating = useMemo(
    () => (/* path: string */) => {
      setLoading(true);
      const t = setTimeout(() => setLoading(false), 450);
      return () => clearTimeout(t);
    },
    []
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <VisitorCounter />

          {/* Routes wrapped so we can toggle spinner on path changes */}
          <RoutedContent onNavigating={handleNavigating} />

          {/* WhatsApp widget with high z-index; spinner sits above it */}
          {showWidget && (
            <div style={{ zIndex: 9999, position: "relative" }}>
              <WhatsAppWidget
                phoneNumber="+918368753277"
                message="Hi! How can we help you?"
                companyName="Travel Support"
                sendButtonText="Send"
                onClose={() => setShowWidget(false)}
              />
            </div>
          )}

          {/* Global spinner overlay */}
          <SpinnerOverlay show={loading} />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
