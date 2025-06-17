import { useState } from "react";
import { MapPin, Star, Users, Calendar, Phone, Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface FooterProps {
  setIsContactModalOpen: (isOpen: boolean) => void;
}

const Footer = ({ setIsContactModalOpen }: FooterProps) => {

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">Wanderlust</h3>
          <p className="">
            Creating unforgettable travel experiences since 2015. Your adventure
            starts here.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-blue-900">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/packages"
                className="hover:text-blue-900"
              >
                Packages
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-900">
                About Us
              </Link>
            </li>
            <li>
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="hover:text-blue-900"
              >
                Contact
              </button>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-blue-900">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-and-conditions" className="hover:text-blue-900">
                Teams & COndition
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Destinations</h4>
          <ul className="space-y-2">
            <li>Bali, Indonesia</li>
            <li>Swiss Alps</li>
            <li>African Safari</li>
            <li>Patagonia</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Contact Info</h4>
          <div className="space-y-2">
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

      <div className="border-t border-blue-200 mt-12 pt-8 text-center">
        <p>&copy; 2024 Wanderlust Travel. All rights reserved.</p>
      </div>
    </div>
  );
};
export default Footer;