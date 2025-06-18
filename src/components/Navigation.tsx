import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import logo from "../../public/logo.png";

interface NavigationProps {
  onContactClick: () => void;
}

// Dummy dropdowns for each menu
const skyMenuDropdowns: Record<string, string[]> = {
  "International Trips": ["Europe", "Dubai", "Thailand", "Singapore"],
  "Indian Trips": ["Kashmir", "Goa", "Himachal", "Kerala"],
  "School Trips": ["Delhi School Tour", "Science Park", "Zoo Visit"],
  "Inschool Camps": ["Yoga Camp", "STEM Workshop", "Adventure Day"],
  "Corporates Trips": ["Annual Meetup", "Offsite Retreat", "Team Building"],
  "Group Tours": ["Friends Group", "Solo Travelers", "Family Group"],
  "Educational Trips": ["Museum Visit", "Industrial Tour", "Tech Park"],
  "Weekend Trips": ["Kasol", "Manali", "Goa", "Rishikesh"],
};

const skyMenuOrder = [
  "International Trips",
  "Indian Trips",
  "School Trips",
  "Inschool Camps",
  "Corporates Trips",
  "Group Tours",
  "Educational Trips",
  "Weekend Trips",
];

const Navigations: React.FC<NavigationProps> = ({ onContactClick }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarSearchTerm, setSidebarSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/search");
  };

  return (
    <header className="w-full z-50">
      {/* Top Header */}
      <div className="bg-white px-4 md:px-12 py-3 border-b border-blue-200">
        <div className="flex items-center justify-between">
          {/* Logo + Desktop Search */}
          <div className="flex items-center gap-3">
            <Link to="/"><img src={logo} alt="Logo" className="h-24 w-auto" /></Link>
            {/* Desktop Search */}
            <div className="relative hidden lg:block ml-6">
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onFocus={handleSearch}
                placeholder="Where do you want to go?"
                className="w-72 px-4 py-2 pl-5 pr-10 text-sm rounded-full border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-500"
              />
              <Search
                className="absolute right-3 top-2.5 w-4 h-4 text-blue-400 cursor-pointer"
                onClick={handleSearch}
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
            <Link to="/payments" className="hover:text-blue-600">Payments</Link>
            <button
              onClick={onContactClick}
              className="px-5 py-2 rounded-full transition font-semibold border border-sky-400 text-sky-400 hover:bg-sky-50"
            >
              Contact Us
            </button>
          </div>
          {/* Mobile Menu */}
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden">
            <Menu className="w-6 h-6 text-blue-600" />
          </button>
        </div>
      </div>

      {/* Sky Blue Menu: only handwritten options */}
      <div className="bg-sky-400 text-white text-[15px] font-medium py-4 hidden lg:flex justify-center items-center space-x-7 relative z-40">
        {skyMenuOrder.map(label => (
          <div className="group relative" key={label}>
            <div className="cursor-pointer group-hover:text-yellow-100 transition flex items-center gap-1 whitespace-nowrap">
              {label}
              <ChevronDown className="w-4 h-4 mt-[1px]" />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 mt-3 bg-white text-black rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[220px] p-4 z-50">
              <div className="flex flex-col gap-2 text-sm">
                {skyMenuDropdowns[label].map((item, index) => (
                  <Link key={index} to="#" className="hover:text-blue-600 whitespace-nowrap">
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar for Mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex">
          <div className="w-80 bg-white p-5 flex flex-col space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-blue-700">Menu</h2>
              <button onClick={() => setIsSidebarOpen(false)}>
                <X className="w-6 h-6 text-blue-700" />
              </button>
            </div>
            {/* Sidebar Search */}
            <div className="relative">
              <input
                type="text"
                value={sidebarSearchTerm}
                onChange={e => setSidebarSearchTerm(e.target.value)}
                onFocus={() => {
                  setIsSidebarOpen(false);
                  navigate("/search");
                }}
                placeholder="Where do you want to go?"
                className="w-full px-4 pl-5 pr-10 py-2 text-sm rounded-full border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <Search
                className="absolute right-3 top-2.5 w-4 h-4 text-blue-400 cursor-pointer"
                onClick={() => {
                  setIsSidebarOpen(false);
                  navigate("/search");
                }}
              />
            </div>
            {/* Links */}
            <nav className="flex flex-col space-y-3 text-sm text-gray-800">
              <Link to="/upcoming-trips" onClick={() => setIsSidebarOpen(false)}>📅 Upcoming Trips</Link>
              <Link to="/corporate-tours" onClick={() => setIsSidebarOpen(false)}>Corporate Tours</Link>
              <Link to="/blogs" onClick={() => setIsSidebarOpen(false)}>Blogs</Link>
              <Link to="/about" onClick={() => setIsSidebarOpen(false)}>About Us</Link>
              <Link to="/payments" onClick={() => setIsSidebarOpen(false)}>Payments</Link>
              <button
                onClick={() => {
                  setIsSidebarOpen(false);
                  onContactClick();
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full px-5 py-2 rounded-full transition font-semibold shadow border-0 mt-1"
              >
                Contact Us
              </button>
            </nav>
            <hr className="border-gray-300" />
            {/* For simplicity, you can also add the sky menu items here if you want */}
          </div>
          <div className="flex-1" onClick={() => setIsSidebarOpen(false)} />
        </div>
      )}
    </header>
  );
};

export default Navigations;
