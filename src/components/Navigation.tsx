
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-900/95 backdrop-blur-md border-b border-cyan-600">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-orange-400">
            Wanderlust
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-cyan-400 transition-colors">
              Home
            </Link>
            <Link to="/packages" className="text-white hover:text-cyan-400 transition-colors">
              Packages
            </Link>
            <Link to="/about" className="text-white hover:text-cyan-400 transition-colors">
              About Us
            </Link>
            <Button onClick={onContactClick} className="bg-orange-600 hover:bg-orange-700 text-white border-0">
              Contact
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-cyan-600 bg-blue-900/98">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-white hover:text-cyan-400 transition-colors px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/packages" 
                className="text-white hover:text-cyan-400 transition-colors px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Packages
              </Link>
              <Link 
                to="/about" 
                className="text-white hover:text-cyan-400 transition-colors px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Button 
                onClick={() => {
                  onContactClick();
                  setIsMenuOpen(false);
                }} 
                className="bg-orange-600 hover:bg-orange-700 text-white border-0 mx-2"
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
