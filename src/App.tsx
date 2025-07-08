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

// Only this import for WhatsApp widget:
import { FloatingWhatsApp } from "react-floating-whatsapp";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      {/* === WhatsApp Widget (shows on all pages) === */}
      <FloatingWhatsApp
        phoneNumber="918368753277" // +91 8368753277 (India)
        accountName="Travel Support"
        chatMessage="Hi! How can we help you?"
        avatar="/logo192.png" // optional: replace with your logo or remove
        allowEsc
        allowClickAway
        notification
        notificationSound
      />

      <BrowserRouter>
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
          <Route path="/effect" element={<EffectCard />} />
          <Route path="/desclaimer" element={<Desclaimer />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
