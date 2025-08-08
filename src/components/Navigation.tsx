import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  ChevronDown,
  Facebook,
  Instagram,
  Youtube,
  Phone,
} from "lucide-react";
import logo from "../../public/logo.png";

const API_BASE = import.meta.env.VITE_API_URL as string;

interface NavigationProps {
  onContactClick: () => void;
}

interface Category {
  _id: string;
  name: string;
}

interface Subcategory {
  _id: string;
  name: string;
  category: string | { _id: string; name: string };
}

interface HeaderSettings {
  logo: {
    url: string;
    altText: string;
  };
  socialLinks: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
}

const Navigations: React.FC<NavigationProps> = ({ onContactClick }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarSearchTerm, setSidebarSearchTerm] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [headerSettings, setHeaderSettings] = useState<HeaderSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [catRes, subcatRes, settingsRes] = await Promise.all([
          fetch(`${API_BASE}/package-categories`),
          fetch(`${API_BASE}/package-subcategories`),
          fetch(`${API_BASE}/header-settings`)
        ]);
        
        const [cat, subcat, settings] = await Promise.all([
          catRes.json(),
          subcatRes.json(),
          settingsRes.json()
        ]);

        setCategories(Array.isArray(cat) ? cat : []);
        setSubcategories(Array.isArray(subcat) ? subcat : []);
        setHeaderSettings(settings);
      } catch (err) {
        setError("Failed to load menu");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Group subcategories by category id string
  const subcategoriesByCat: Record<string, Subcategory[]> = {};
  subcategories.forEach((sub) => {
    let catId =
      typeof sub.category === "string"
        ? sub.category
        : sub.category?._id || "";
    if (!catId) return;
    if (!subcategoriesByCat[catId]) subcategoriesByCat[catId] = [];
    subcategoriesByCat[catId].push(sub);
  });

  const onSearchNavigate = () => navigate("/search");
  const isOnSearchRoute = location.pathname === "/search";

  // Get social icon component
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <Facebook className="w-4 h-4 hover:text-blue-800" />;
      case 'instagram':
        return <Instagram className="w-4 h-4 hover:text-pink-600" />;
      case 'youtube':
        return <Youtube className="w-4 h-4 hover:text-red-600" />;
      case 'whatsapp':
        return <Phone className="w-4 h-4 hover:text-green-600" />;
      default:
        return null;
    }
  };

  return (
    <header className="w-full z-50">
      {/* Top Header */}
      <div className="bg-white px-4 md:px-12 py-3 border-b border-blue-200">
        <div className="flex items-center justify-between">
          {/* Logo + Search */}
          <div className="flex items-center gap-3">
            <Link to="/">
              <img 
                src={headerSettings?.logo?.url || logo} 
                alt={headerSettings?.logo?.altText || "Logo"} 
                className="h-32 w-auto" 
              />
            </Link>
            {/* Desktop Search */}
            <div
              className={`relative hidden lg:block ml-6 ${
                isOnSearchRoute ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => !isOnSearchRoute && onSearchNavigate()}
                placeholder="Where do you want to go?"
                disabled={isOnSearchRoute}
                className="w-72 px-4 py-2 pl-5 pr-10 text-sm rounded-full border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-500 disabled:bg-gray-100 disabled:placeholder-gray-400"
              />
              <Search
                className={`absolute right-3 top-2.5 w-4 h-4 text-blue-400 cursor-pointer ${
                  isOnSearchRoute ? "text-gray-400 cursor-default" : ""
                }`}
                onClick={() => !isOnSearchRoute && onSearchNavigate()}
              />
            </div>
          </div>
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-6 text-sm text-gray-800">
            <Link to="/upcoming-trips" className="hover:text-blue-600 flex items-center gap-1">
              📅 Upcoming Trips
            </Link>
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/package" className="hover:text-blue-600">Packages</Link>
            <Link to="/about" className="hover:text-blue-600">About Us</Link>
            <Link to="/blog" className="hover:text-blue-600">Blog</Link>
            <div className="flex gap-4 items-center text-blue-600">
              {headerSettings?.socialLinks?.map((link) => (
                <a 
                  key={link.platform} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {getSocialIcon(link.platform)}
                </a>
              ))}
            </div>
            <button
              onClick={onContactClick}
              className="px-5 py-2 rounded-full transition font-semibold border border-sky-400 text-sky-400 hover:bg-sky-50"
            >
              Contact Us
            </button>
          </div>
          {/* Mobile Menu Button */}
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden">
            <Menu className="w-6 h-6 text-blue-600" />
          </button>
        </div>
      </div>
      {/* Sky Menu */}
      <div className="bg-sky-400 text-white text-[15px] font-medium py-4 hidden lg:flex justify-center items-center space-x-7 relative z-40">
        {loading ? (
          <span className="italic">Loading...</span>
        ) : error ? (
          <span className="text-red-200">{error}</span>
        ) : categories.length === 0 ? (
          <span>No categories found.</span>
        ) : (
          categories.map((cat) => (
            <div className="group relative" key={cat._id}>
              <Link
                to={`/category/${cat._id}`}
                className="cursor-pointer group-hover:text-yellow-100 transition flex items-center gap-1 whitespace-nowrap"
              >
                {cat.name}
                {subcategoriesByCat[cat._id]?.length > 0 && (
                  <ChevronDown className="w-4 h-4 mt-[1px]" />
                )}
              </Link>
              {/* Subcategories Dropdown */}
              {subcategoriesByCat[cat._id]?.length > 0 && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-3 bg-white text-black rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[220px] p-4 z-50">
                  <div className="flex flex-col gap-2 text-sm">
                    {subcategoriesByCat[cat._id].map((sub) => (
                      <Link
                        key={sub._id}
                        to={`/subcategory/${sub._id}`}
                        className="hover:text-blue-600 whitespace-nowrap"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex">
          <div className="w-80 bg-white p-5 flex flex-col space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-blue-700">Menu</h2>
              <button onClick={() => setIsSidebarOpen(false)}>
                <X className="w-6 h-6 text-blue-700" />
              </button>
            </div>
            {/* Sidebar Search: hidden/disabled on /search */}
            <div className={`${isOnSearchRoute ? "opacity-50 pointer-events-none" : ""}`}>
              <input
                type="text"
                value={sidebarSearchTerm}
                onChange={(e) => setSidebarSearchTerm(e.target.value)}
                onFocus={() => !isOnSearchRoute && (setIsSidebarOpen(false), onSearchNavigate())}
                placeholder="Where do you want to go?"
                disabled={isOnSearchRoute}
                className="w-full px-4 pl-5 pr-10 py-2 text-sm rounded-full border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 disabled:placeholder-gray-400"
              />
              <Search
                className={`absolute right-3 top-[92px] w-4 h-4 text-blue-400 cursor-pointer ${
                  isOnSearchRoute ? "text-gray-400 cursor-default" : ""
                }`}
                onClick={() => !isOnSearchRoute && (setIsSidebarOpen(false), onSearchNavigate())}
              />
            </div>
            {/* Links */}
            <nav className="flex flex-col space-y-3 text-sm text-gray-800">
              <Link to="/upcoming-trips" onClick={() => setIsSidebarOpen(false)}>📅 Upcoming Trips</Link>
              <Link to="/package" onClick={() => setIsSidebarOpen(false)}>Packages</Link>
              <Link to="/corporate-tours" onClick={() => setIsSidebarOpen(false)}>Corporate Tours</Link>
              <Link to="/blogs" onClick={() => setIsSidebarOpen(false)}>Blogs</Link>
              <Link to="/about" onClick={() => setIsSidebarOpen(false)}>About Us</Link>
              <button
                onClick={() => { setIsSidebarOpen(false); onContactClick(); }}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full px-5 py-2 rounded-full transition font-semibold shadow mt-1"
              >
                Contact Us
              </button>
            </nav>
            <hr className="border-gray-300" />
            {/* Social Icons */}
            <div className="flex justify-center gap-5 text-blue-600 mt-2">
              {headerSettings?.socialLinks?.map((link) => (
                <a 
                  key={link.platform} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {getSocialIcon(link.platform)}
                </a>
              ))}
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsSidebarOpen(false)} />
        </div>
      )}
    </header>
  );
};

export default Navigations;