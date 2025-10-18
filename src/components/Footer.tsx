import { useEffect, useState } from "react";
import { Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../public/logo.png";

interface FooterProps {
  setIsContactModalOpen: (isOpen: boolean) => void;
}

type Category = {
  _id: string;
  name: string;
};

const API_URL = import.meta.env.VITE_API_URL as string | undefined;

const Footer = ({ setIsContactModalOpen }: FooterProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchCategories() {
      if (!API_URL) {
        setError("API base URL (VITE_API_URL) is not set.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/package-categories`, {
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error(
            `Failed to load categories: ${res.status} ${res.statusText}`
          );
        }

        const data = await res.json();
        // Expecting array of { _id, name }
        const list: Category[] = Array.isArray(data) ? data : data?.data ?? [];

        if (isMounted) {
          setCategories(list);
          setError(null);
        }
      } catch (e: any) {
        if (isMounted)
          setError(e?.message || "Something went wrong fetching categories.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <footer className="bg-[#112123] pt-2 pb-0 mt-10 w-full border-t-4 border-[#20e0ff]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-white">
          {/* Column 1: Logo + tagline */}
          <div>
            <img src={logo} alt="Wanderlust Logo" className="mb-4 h-48 w-auto" />
            <p className="text-gray-300 text-[15px]">
              To create safe, enriching, and memorable travel experiences that
              inspire learning, strengthen connections, and leave lasting
              impressions for every traveler.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2 text-gray-300 text-[15px]">
              <li>
                <Link to="/" className="hover:text-[#20e0ff] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/package" className="hover:text-[#20e0ff] transition">
                  Packages
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#20e0ff] transition">
                  About Us
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="hover:text-[#20e0ff] transition"
                >
                  Contact
                </button>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-[#20e0ff] transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-and-conditions"
                  className="hover:text-[#20e0ff] transition"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Categories (fetched) */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Categories</h4>

            {loading && <p className="text-gray-400 text-[15px]">Loading…</p>}
            {!loading && error && (
              <p className="text-red-300 text-[14px]">{error}</p>
            )}
            {!loading && !error && categories.length === 0 && (
              <p className="text-gray-400 text-[15px]">No categories found.</p>
            )}

            {!loading && !error && categories.length > 0 && (
              <ul className="space-y-2 text-gray-300 text-[15px]">
                {categories.map((cat) => (
                  <li key={cat._id}>
                    <Link
                      to={`/category/${cat._id}`}
                      className="hover:text-[#20e0ff] transition"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Contact Info</h4>
            <div className="space-y-2 text-gray-300 text-[15px]">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+91 83687 53277</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>breakoutwanderers@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#27393e] mt-10 pt-6 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Breakout Wanderers. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
