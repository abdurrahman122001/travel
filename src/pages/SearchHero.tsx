import React, { useState } from "react";
import { Search } from "lucide-react";
import Navigations from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import { useNavigate } from "react-router-dom"; // Using react-router instead of Next.js router

interface SearchHeroProps {
  onContactClick?: () => void;
}

export const SearchHero: React.FC<SearchHeroProps> = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Navigate to search results page with the query
    navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <>
      <Navigations onContactClick={() => setIsContactModalOpen(true)} />

      {/* Search Hero Section */}
      <div className="min-h-screen bg-white relative flex items-center justify-center">
        {/* Search Box positioned below navigation */}
        <div className="absolute top-24 w-full flex justify-center px-4">
          <form
            onSubmit={handleSearch}
            className="flex w-[600px] max-w-[90vw] shadow-2xl rounded-xl overflow-hidden border border-blue-200 bg-white"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              placeholder="Where do you want to go? Search for destinations, trips, or packages..."
              className="flex-1 px-6 py-5 bg-blue-50 text-lg placeholder:text-gray-700 outline-none"
            />
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 transition-all px-7 flex items-center justify-center"
              style={{ minHeight: "60px" }}
            >
              <Search className="w-6 h-6 text-gray-800" />
            </button>
          </form>
        </div>
      </div>

      <Footer setIsContactModalOpen={setIsContactModalOpen} />

      {isContactModalOpen && (
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />)}
    </>
  );
};
export default SearchHero;