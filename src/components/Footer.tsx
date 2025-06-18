import { MapPin, Star, Users, Calendar, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

interface FooterProps {
  setIsContactModalOpen: (isOpen: boolean) => void;
}

const Footer = ({ setIsContactModalOpen }: FooterProps) => {
  return (
    <footer className="bg-[#112123] pt-2 pb-0 mt-10 w-full border-t-4 border-[#20e0ff]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-white">
          {/* Column 1: Logo + tagline */}
          <div>
            <h3 className="text-xl font-bold mb-4">Wanderlust</h3>
            <p className="text-gray-300 text-[15px]">
              Creating unforgettable travel experiences since 2015.<br />
              Your adventure starts here.
            </p>
          </div>
          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2 text-gray-300 text-[15px]">
              <li>
                <Link to="/" className="hover:text-[#20e0ff] transition">Home</Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-[#20e0ff] transition">Packages</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#20e0ff] transition">About Us</Link>
              </li>
              <li>
                <button onClick={() => setIsContactModalOpen(true)} className="hover:text-[#20e0ff] transition">Contact</button>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-[#20e0ff] transition">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/desclaimer" className="hover:text-[#20e0ff] transition">Desclaimer</Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-[#20e0ff] transition">Teams & Condition</Link>
              </li>
            </ul>
          </div>
          {/* Column 3: Destinations */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Destinations</h4>
            <ul className="space-y-2 text-gray-300 text-[15px]">
              <li>Bali, Indonesia</li>
              <li>Swiss Alps</li>
              <li>African Safari</li>
              <li>Patagonia</li>
            </ul>
          </div>
          {/* Column 4: Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Contact Info</h4>
            <div className="space-y-2 text-gray-300 text-[15px]">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@wanderlust.com</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-[#27393e] mt-10 pt-6 text-center text-gray-400 text-sm">
          &copy; 2024 Wanderlust Travel. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
