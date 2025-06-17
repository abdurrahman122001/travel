
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

interface NavigationProps {
  onContactClick: () => void;
}

const Navigation = ({ onContactClick }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-blue-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Wanderlust
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-blue-900 hover:text-blue-600 transition-colors font-medium">
              Home
            </Link>
            <Link to="/packages" className="text-blue-900 hover:text-blue-600 transition-colors font-medium">
              Packages
            </Link>
            <Link to="/about" className="text-blue-900 hover:text-blue-600 transition-colors font-medium">
              About Us
            </Link>
            <Button onClick={onContactClick} className="bg-blue-600 hover:bg-blue-700 text-white border-0">
              Contact
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-blue-900"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-200 bg-white/98">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-blue-900 hover:text-blue-600 transition-colors px-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/packages" 
                className="text-blue-900 hover:text-blue-600 transition-colors px-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Packages
              </Link>
              <Link 
                to="/about" 
                className="text-blue-900 hover:text-blue-600 transition-colors px-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Button 
                onClick={() => {
                  onContactClick();
                  setIsMenuOpen(false);
                }} 
                className="bg-blue-600 hover:bg-blue-700 text-white border-0 mx-2"
              >
                Contact
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
