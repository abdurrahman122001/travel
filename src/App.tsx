import { useEffect } from "react";
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
// Only this import for WhatsApp widget:
import { FloatingWhatsApp } from "react-floating-whatsapp";

const queryClient = new QueryClient();

// --- New: VisitorCounter component ---
// --- Main App ---
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      {/* === WhatsApp Widget (shows on all pages) === */}
      <FloatingWhatsApp
        phoneNumber="918368753277"
        accountName="Travel Support"
        chatMessage="Hi! How can we help you?"
        avatar="/logo192.png"
        allowEsc
        allowClickAway
        notification
        notificationSound
      />

      <BrowserRouter>
        {/* Place VisitorCounter inside BrowserRouter so useLocation works */}
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
          <Route path="upcoming-trips" element={<LatestPackagesSection/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
