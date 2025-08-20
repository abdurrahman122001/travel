import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import { WhatsAppWidget } from 'react-whatsapp-widget';
import 'react-whatsapp-widget/dist/index.css';

const queryClient = new QueryClient();

const App = () => {
  const [showWidget, setShowWidget] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <VisitorCounter />

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

          {showWidget && (
            <div style={{ zIndex: 9999, position: "relative" }}>
              <WhatsAppWidget
                phoneNumber="+918368753277"     // Your WhatsApp number with country code
                message="Hi! How can we help you?" // Default message text
                companyName="Travel Support"     // Optional company name shown in widget header
                sendButtonText="Send"            // Button text
                // You can customize styles and props further if needed
                onClose={() => setShowWidget(false)} // Optional: close widget
              />
            </div>

          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
