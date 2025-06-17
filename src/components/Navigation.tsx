// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Menu, X } from "lucide-react";
// import { Link } from "react-router-dom";

// interface NavigationProps {
//   onContactClick: () => void;
// }

// const Navigation = ({ onContactClick }: NavigationProps) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-blue-200 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           <Link to="/" className="text-2xl font-bold text-blue-600">
//             Wanderlust
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             <Link to="/" className="text-blue-900 hover:text-blue-600 transition-colors font-medium">
//               Home
//             </Link>
//             <Link to="/packages" className="text-blue-900 hover:text-blue-600 transition-colors font-medium">
//               Packages
//             </Link>
//             <Link to="/about" className="text-blue-900 hover:text-blue-600 transition-colors font-medium">
//               About Us
//             </Link>
//             <Button onClick={onContactClick} className="bg-blue-600 hover:bg-blue-700 text-white border-0">
//               Contact
//             </Button>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="md:hidden p-2 text-blue-900"
//           >
//             {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="md:hidden py-4 border-t border-blue-200 bg-white/98">
//             <div className="flex flex-col space-y-4">
//               <Link
//                 to="/"
//                 className="text-blue-900 hover:text-blue-600 transition-colors px-2 font-medium"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Home
//               </Link>
//               <Link
//                 to="/packages"
//                 className="text-blue-900 hover:text-blue-600 transition-colors px-2 font-medium"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Packages
//               </Link>
//               <Link
//                 to="/about"
//                 className="text-blue-900 hover:text-blue-600 transition-colors px-2 font-medium"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 About Us
//               </Link>
//               <Button
//                 onClick={() => {
//                   onContactClick();
//                   setIsMenuOpen(false);
//                 }}
//                 className="bg-blue-600 hover:bg-blue-700 text-white border-0 mx-2"
//               >
//                 Contact
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navigation;
import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Menu, X, Search, ChevronDown } from "lucide-react";
import logo from "../../public/logo.png"

interface NavigationProps {
  onContactClick: () => void;
}

const Navigations: React.FC<NavigationProps> = ({ onContactClick }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const dropdowns = {
    international: [
      "Europe",
      "Georgia",
      "Bali",
      "Vietnam",
      "Thailand",
      "Spain",
      "Singapore",
      "Kazakhstan",
      "Japan",
      "Sri Lanka",
      "Dubai",
      "Malaysia",
      "Bhutan",
      "South Africa",
      "Kenya",
      "Switzerland",
      "Australia",
      "Mauritius",
      "Maldives",
      "New Zealand",
    ],
    india: [
      "Himachal",
      "Kashmir",
      "Ladakh",
      "Meghalaya",
      "Uttarakhand",
      "Rajasthan",
      "Sikkim",
      "Kerala",
      "Goa",
      "Andaman",
    ],
    weekend: ["Kasol", "Manali", "Bir Billing", "Jibhi", "Jaisalmer"],
    group: ["Students", "Solo", "Couples", "Family", "Corporate"],
  };

  return (
    <header className="w-full z-50">
      {/* Top Header */}
      <div className="bg-white px-4 md:px-12 py-3 border-b border-blue-200">
        <div className="flex items-center justify-between">
          {/* Logo + Search */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-24 w-auto" />
            {/* <span className="text-sm font-semibold text-blue-700">WANDERON</span> */}
            <div className="relative hidden lg:block ml-6">
              <input
                type="text"
                placeholder="Where do you want to go?"
                className="w-72 px-4 py-2 pl-5 pr-10 text-sm rounded-full border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-500"
              />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-blue-400" />
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-6 text-sm text-gray-800">
            <Link
              to="/upcoming-trips"
              className="hover:text-blue-600 flex items-center gap-1"
            >
              📅 Upcoming Trips
            </Link>
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link to="/packages" className="hover:text-blue-600">
              Packages
            </Link>
            <Link to="/about" className="hover:text-blue-600">
              About Us
            </Link>
            <Link to="/blog" className="hover:text-blue-600">
              Blog
            </Link>

            <Link to="/payments" className="hover:text-blue-600">
              Payments
            </Link>
            <a
              href="tel:+919090403075"
              className="flex items-center border border-blue-400 px-3 py-1.5 rounded-full text-blue-600 hover:bg-blue-100"
            >
              <Phone className="w-4 h-4 mr-1" />
              +91-9090403075
            </a>
          </div>

          {/* Mobile Menu */}
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden">
            <Menu className="w-6 h-6 text-blue-600" />
          </button>
        </div>
      </div>

      {/* Sky Blue Menu with Dropdowns */}
      <div className="bg-sky-400 text-white text-[15px] font-medium py-4 hidden lg:flex justify-center items-center space-x-8 relative z-40">
        {[
          { label: "International Trips", key: "international" },
          { label: "India Trips", key: "india" },
          { label: "Weekend Trips", key: "weekend" },
          { label: "Group Tours", key: "group" },
        ].map(({ label, key }) => (
          <div className="group relative" key={key}>
            <div className="cursor-pointer group-hover:text-yellow-100 transition flex items-center gap-1 whitespace-nowrap">
              {label}
              <ChevronDown className="w-4 h-4 mt-[1px]" />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 mt-3 bg-white text-black rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[300px] p-4 z-50">
              <div className="grid grid-cols-2 gap-2 text-sm">
                {dropdowns[key as keyof typeof dropdowns].map((item, index) => (
                  <Link
                    key={index}
                    to="#"
                    className="hover:text-blue-600 whitespace-nowrap"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
        <Link
          to="#"
          className="cursor-pointer hover:text-yellow-100 transition whitespace-nowrap"
        >
          Honeymoon Packages
        </Link>
        <Link
          to="#"
          className="cursor-pointer hover:text-yellow-100 transition whitespace-nowrap"
        >
          🎁 Gift Cards
        </Link>
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

            {/* Search in Sidebar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Where do you want to go?"
                className="w-full px-4 pl-5 pr-10 py-2 text-sm rounded-full border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-blue-400" />
            </div>

            {/* Links */}
            <nav className="flex flex-col space-y-3 text-sm text-gray-800">
              <Link
                to="/upcoming-trips"
                onClick={() => setIsSidebarOpen(false)}
              >
                📅 Upcoming Trips
              </Link>
              <Link
                to="/corporate-tours"
                onClick={() => setIsSidebarOpen(false)}
              >
                Corporate Tours
              </Link>
              <Link to="/blogs" onClick={() => setIsSidebarOpen(false)}>
                Blogs
              </Link>
              <Link to="/about" onClick={() => setIsSidebarOpen(false)}>
                About Us
              </Link>
              <Link to="/payments" onClick={() => setIsSidebarOpen(false)}>
                Payments
              </Link>
              <a
                href="tel:+919090403075"
                className="flex items-center border border-blue-400 px-3 py-1.5 rounded-full text-blue-600 hover:bg-blue-100 w-fit"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Phone className="w-4 h-4 mr-1" />
                +91-9090403075
              </a>
            </nav>

            <hr className="border-gray-300" />

            <div className="text-sm font-medium text-sky-600 space-y-1">
              {Object.entries(dropdowns).map(([key, items]) => (
                <div key={key}>
                  <div className="font-semibold capitalize mb-1">{key}:</div>
                  <div className="grid grid-cols-2 gap-1">
                    {items.map((item, idx) => (
                      <Link to="#" key={idx} className="hover:text-blue-500">
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Link to="#" className="text-sky-600 hover:text-blue-500">
                Honeymoon Packages
              </Link>
              <Link to="#" className="text-sky-600 hover:text-blue-500">
                🎁 Gift Cards
              </Link>
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsSidebarOpen(false)} />
        </div>
      )}
    </header>
  );
};

export default Navigations;
