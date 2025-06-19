
// import { useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   Star, MapPin, Calendar, Users, ArrowLeft,
//   Heart, Share2, Clock, Shield, CheckCircle2, ChevronDown, ChevronUp
// } from "lucide-react";
// import Navigation from "@/components/Navigation";
// import ContactModal from "@/components/ContactModal";
// import PackageCard from "@/components/PackageCard";
// import PackageFilters from "@/components/PackageFilters";

// const allPackages = [
//   {
//     id: 1,
//     title: "Bali Paradise",
//     description: "Experience the magic of Bali with pristine beaches and cultural wonders",
//     image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=500&q=80",
//     price: 1299,
//     duration: "7 Days",
//     location: "Bali, Indonesia",
//     rating: 4.8,
//     reviews: 156,
//     highlights: ["Private beach access", "Cultural temple tours", "Balinese cooking class", "Spa treatments"],
//     includes: ["Round-trip flights", "5-star resort accommodation", "Daily breakfast", "Airport transfers"],
//     itinerary: [
//       "Day 1: Arrival in Denpasar, transfer to resort",
//       "Day 2-3: Beach relaxation and water sports",
//       "Day 4: Temple hopping tour",
//       "Day 5: Cooking class and spa day",
//       "Day 6: Free day for shopping",
//       "Day 7: Departure",
//     ],
//     galleryImages: [
//       "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80",
//     ],
//   },
//   {
//     id: 2,
//     title: "Swiss Alps Adventure",
//     description: "Breathtaking mountain views and alpine adventures await",
//     image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=500&q=80",
//     price: 1899,
//     duration: "10 Days",
//     location: "Switzerland",
//     rating: 4.9,
//     reviews: 203,
//     highlights: ["Matterhorn viewing", "Train journeys", "Alpine hiking", "Swiss chocolate tours"],
//     includes: ["International flights", "Boutique hotels", "Swiss Pass", "Professional guide"],
//     itinerary: [
//       "Day 1-2: Zurich arrival and city tour",
//       "Day 3-4: Lucerne and Mount Pilatus",
//       "Day 5-6: Interlaken and Jungfraujoch",
//       "Day 7-8: Zermatt and Matterhorn",
//       "Day 9: Montreux and departure prep",
//       "Day 10: Departure",
//     ],
//     galleryImages: [
//       "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
//     ],
//   },
//   {
//     id: 3,
//     title: "African Safari",
//     description: "Witness incredible wildlife in their natural habitat",
//     image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&w=500&q=80",
//     price: 2499,
//     duration: "12 Days",
//     location: "Kenya & Tanzania",
//     rating: 4.7,
//     reviews: 98,
//     highlights: ["Big 5 game viewing", "Masai Mara", "Serengeti", "Ngorongoro Crater"],
//     includes: ["All flights", "Safari lodges", "All meals", "Professional safari guide"],
//     itinerary: [
//       "Day 1-2: Nairobi arrival and Amboseli",
//       "Day 3-5: Masai Mara game drives",
//       "Day 6-8: Serengeti National Park",
//       "Day 9-10: Ngorongoro Crater",
//       "Day 11: Arusha and cultural visit",
//       "Day 12: Departure",
//     ],
//     galleryImages: [
//       "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80",
//     ],
//   },
//   {
//     id: 4,
//     title: "Patagonia Expedition",
//     description: "Explore the untamed wilderness of South America",
//     image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=500&q=80",
//     price: 2199,
//     duration: "14 Days",
//     location: "Argentina & Chile",
//     rating: 4.6,
//     reviews: 87,
//     highlights: ["Torres del Paine", "Glacier trekking", "Penguin colonies", "Gaucho culture"],
//     includes: ["Regional flights", "Eco-lodges", "Expert guides", "All equipment"],
//     itinerary: [
//       "Day 1-2: Buenos Aires arrival",
//       "Day 3-5: El Calafate and glaciers",
//       "Day 6-9: Torres del Paine",
//       "Day 10-12: Ushuaia and Tierra del Fuego",
//       "Day 13: Puerto Madryn penguins",
//       "Day 14: Departure",
//     ],
//     galleryImages: [
//       "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1508326099804-190c33bd8274?auto=format&fit=crop&w=800&q=80",
//     ],
//   },
// ];


// const TravelPackages = () => {
//   const { id } = useParams();
//   const [isContactModalOpen, setIsContactModalOpen] = useState(false);
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(0);

//   // Itinerary accordion toggle state (allow multiple open, or just one: for one, use a number, for multiple use array)
//   const [openDayIndexes, setOpenDayIndexes] = useState<number[]>([0]); // First day open by default

//   // Filter states for all-packages view
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedDestination, setSelectedDestination] = useState("All Destinations");
//   const [selectedDuration, setSelectedDuration] = useState("Any Duration");
//   const [priceRange, setPriceRange] = useState([500, 3000]);
//   const [selectedRating, setSelectedRating] = useState("Any Rating");

//   // Filter logic
//   const filteredPackages = allPackages.filter((pkg) => {
//     const matchesSearch =
//       pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       pkg.location.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesDestination =
//       selectedDestination === "All Destinations" ||
//       pkg.location === selectedDestination;

//     const matchesDuration =
//       selectedDuration === "Any Duration" ||
//       (selectedDuration === "1-7 Days" && parseInt(pkg.duration) <= 7) ||
//       (selectedDuration === "8-14 Days" && parseInt(pkg.duration) >= 8 && parseInt(pkg.duration) <= 14) ||
//       (selectedDuration === "15+ Days" && parseInt(pkg.duration) >= 15);

//     const matchesPrice = pkg.price >= priceRange[0] && pkg.price <= priceRange[1];

//     const matchesRating =
//       selectedRating === "Any Rating" ||
//       (selectedRating === "4.0+" && pkg.rating >= 4.0) ||
//       (selectedRating === "4.5+" && pkg.rating >= 4.5) ||
//       (selectedRating === "4.8+" && pkg.rating >= 4.8);

//     return (
//       matchesSearch &&
//       matchesDestination &&
//       matchesDuration &&
//       matchesPrice &&
//       matchesRating
//     );
//   });

//   const clearAllFilters = () => {
//     setSearchTerm("");
//     setSelectedDestination("All Destinations");
//     setSelectedDuration("Any Duration");
//     setPriceRange([500, 3000]);
//     setSelectedRating("Any Rating");
//   };

//   // Accordion toggle handler
//   const toggleDay = (idx: number) => {
//     setOpenDayIndexes(prev => {
//       // For "only one open at a time", use:
//       // return prev[0] === idx ? [] : [idx];
//       // For "multiple can open", use:
//       if (prev.includes(idx)) {
//         return prev.filter(i => i !== idx);
//       } else {
//         return [...prev, idx];
//       }
//     });
//   };

//   // ========== DETAIL PAGE STYLE ==========
//   if (id) {
//     const packageDetails = allPackages.find((pkg) => pkg.id === parseInt(id));

//     if (!packageDetails) {
//       return (
//         <div className="min-h-screen flex items-center justify-center">
//           <div className="text-center">
//             <h2 className="text-2xl font-bold text-slate-800 mb-4">Package not found</h2>
//             <Link to="/packages">
//               <Button>Back to Packages</Button>
//             </Link>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen">
//         <Navigation onContactClick={() => setIsContactModalOpen(true)} />

//         {/* Breadcrumb */}
//         <div className="container mx-auto px-4 pt-6 pb-2">
//           <div className="flex items-center gap-2 text-sm text-gray-500">
//             <Link to="/" className="hover:text-blue-600">Home</Link>
//             <span>/</span>
//             <Link to="/packages" className="hover:text-blue-600">Packages</Link>
//             <span>/</span>
//             <span className="text-gray-800">{packageDetails.title}</span>
//           </div>
//         </div>

//         {/* MAIN HERO SECTION */}
//         <section className="container mx-auto px-4 pb-8">
//           <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
//             {/* GALLERY */}
//             <div>
//               <div className="relative overflow-hidden rounded-2xl shadow-sm mb-4">
//                 <img
//                   src={packageDetails.galleryImages[selectedImage]}
//                   alt={packageDetails.title}
//                   className="w-full h-[360px] object-cover"
//                 />
//                 <div className="absolute top-4 right-4 flex gap-2">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="bg-white/80 backdrop-blur-sm"
//                     onClick={() => setIsWishlisted(w => !w)}
//                     aria-label="Wishlist"
//                   >
//                     <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
//                   </Button>
//                   <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm" aria-label="Share">
//                     <Share2 className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//               <div className="flex gap-2 overflow-x-auto pt-1">
//                 {packageDetails.galleryImages.map((img, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => setSelectedImage(idx)}
//                     className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
//                       selectedImage === idx ? "border-blue-600" : "border-slate-200"
//                     }`}
//                     aria-label={`Select image ${idx + 1}`}
//                   >
//                     <img src={img} alt="" className="w-full h-full object-cover" />
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* SUMMARY / ACTIONS */}
//             <div className="flex flex-col gap-6">
//               <div>
//                 <div className="flex items-center gap-2 mb-3">
//                   <Badge className="bg-blue-600 hover:bg-blue-700">{packageDetails.duration}</Badge>
//                   <Badge variant="secondary">{packageDetails.location}</Badge>
//                 </div>
//                 <h1 className="text-3xl font-bold text-gray-900 mb-1">{packageDetails.title}</h1>
//                 <div className="flex items-center flex-wrap gap-4 mb-3">
//                   <div className="flex items-center gap-1">
//                     <MapPin className="h-4 w-4 text-slate-500" />
//                     <span className="text-gray-600">{packageDetails.location}</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                     <span className="font-medium">{packageDetails.rating}</span>
//                     <span className="text-gray-500">({packageDetails.reviews} reviews)</span>
//                   </div>
//                 </div>
//                 <p className="text-gray-600 text-lg leading-relaxed">{packageDetails.description}</p>
//               </div>
//               {/* PRICING & ACTIONS (Sticky on large screens) */}
//               <div className="lg:sticky lg:top-28">
//                 <Card className="border-2 border-blue-100 bg-blue-50/60 shadow-none">
//                   <CardContent className="p-5">
//                     <div className="flex items-center justify-between mb-4">
//                       <div>
//                         <span className="text-3xl font-bold text-blue-600">${packageDetails.price}</span>
//                         <span className="ml-2 text-sm text-gray-700">per person</span>
//                       </div>
//                     </div>
//                     <div className="flex gap-3">
//                       <Button
//                         className="flex-1 bg-blue-600 hover:bg-blue-700 text-lg"
//                         onClick={() => setIsContactModalOpen(true)}
//                       >
//                         Book Now
//                       </Button>
//                       <Button
//                         variant="outline"
//                         className="flex-1"
//                         onClick={() => setIsContactModalOpen(true)}
//                       >
//                         Get Quote
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//                 <div className="grid grid-cols-2 gap-3 mt-4">
//                   <div className="flex items-center gap-2">
//                     <Calendar className="h-5 w-5 text-blue-600" />
//                     <span className="text-sm text-gray-600">{packageDetails.duration}</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Users className="h-5 w-5 text-blue-600" />
//                     <span className="text-sm text-gray-600">2-8 People</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Clock className="h-5 w-5 text-blue-600" />
//                     <span className="text-sm text-gray-600">All year round</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Shield className="h-5 w-5 text-blue-600" />
//                     <span className="text-sm text-gray-600">Fully insured</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* HIGHLIGHTS */}
//         <section className="container mx-auto px-4 py-12">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6">Trip Highlights</h2>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {packageDetails.highlights.map((h, idx) => (
//               <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border">
//                 <CheckCircle2 className="h-5 w-5 text-green-500" />
//                 <span className="text-gray-700">{h}</span>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* ITINERARY - Accordion/FAQ style */}
//         <section className="container mx-auto px-4 py-12 bg-slate-50">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6">Day by Day Itinerary</h2>
//           <div className="space-y-3">
//             {packageDetails.itinerary.map((day, idx) => (
//               <Card key={idx} className="border-0 shadow-md">
//                 <button
//                   className="flex items-center w-full justify-between px-6 py-5 bg-white rounded-xl font-semibold text-lg text-left focus:outline-none"
//                   onClick={() => toggleDay(idx)}
//                   aria-expanded={openDayIndexes.includes(idx)}
//                 >
//                   <span className="flex items-center gap-3">
//                     <span className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full font-bold">{idx + 1}</span>
//                     <span>{`Day ${idx + 1}`}</span>
//                   </span>
//                   {openDayIndexes.includes(idx) ? (
//                     <ChevronUp className="w-6 h-6 text-blue-600" />
//                   ) : (
//                     <ChevronDown className="w-6 h-6 text-blue-600" />
//                   )}
//                 </button>
//                 <div
//                   className={`transition-all duration-200 overflow-hidden px-6 ${
//                     openDayIndexes.includes(idx) ? "max-h-40 py-2" : "max-h-0 py-0"
//                   }`}
//                   style={{ background: openDayIndexes.includes(idx) ? "#f8fafc" : "white" }}
//                 >
//                   <CardContent className="p-0">
//                     <div className="text-gray-600 text-base">{day}</div>
//                   </CardContent>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         </section>

//         {/* INCLUSIONS / EXCLUSIONS */}
//         <section className="container mx-auto px-4 py-12">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h2>
//           <div className="grid md:grid-cols-2 gap-8">
//             <Card className="border-0 shadow-md">
//               <CardContent className="p-6">
//                 <h3 className="text-lg font-bold text-green-700 mb-4 flex items-center">
//                   <CheckCircle2 className="h-5 w-5 mr-2" /> Included
//                 </h3>
//                 <ul className="space-y-2">
//                   {packageDetails.includes.map((item, i) => (
//                     <li key={i} className="flex items-center gap-2">
//                       <CheckCircle2 className="h-4 w-4 text-green-500" />
//                       <span className="text-gray-700">{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </CardContent>
//             </Card>
//             <Card className="border-0 shadow-md">
//               <CardContent className="p-6">
//                 <h3 className="text-lg font-bold text-red-700 mb-4">Not Included</h3>
//                 <ul className="space-y-2">
//                   <li className="flex items-center gap-2">
//                     <div className="w-4 h-4 border border-red-300 rounded"></div>
//                     <span className="text-gray-700">Personal expenses</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <div className="w-4 h-4 border border-red-300 rounded"></div>
//                     <span className="text-gray-700">Optional activities</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <div className="w-4 h-4 border border-red-300 rounded"></div>
//                     <span className="text-gray-700">Gratuities</span>
//                   </li>
//                 </ul>
//               </CardContent>
//             </Card>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="container mx-auto px-4 py-12 bg-blue-600 text-white rounded-2xl mx-4 mb-12">
//           <div className="text-center">
//             <h2 className="text-3xl font-bold mb-4">Ready for Your Adventure?</h2>
//             <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
//               Don&apos;t wait – spots are limited and this amazing experience fills up quickly!
//             </p>
//             <div className="flex flex-col sm:flex-row justify-center gap-4">
//               <Button
//                 size="lg"
//                 className="bg-white text-blue-600 hover:bg-blue-50 px-8 font-bold"
//                 onClick={() => setIsContactModalOpen(true)}
//               >
//                 Book This Trip
//               </Button>
//               <Link to="/packages">
//                 <Button
//                   size="lg"
//                   variant="outline"
//                   className="border-white text-white hover:bg-white hover:text-blue-600 px-8"
//                 >
//                   <ArrowLeft className="h-4 w-4 mr-2" />
//                   Back to Packages
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </section>

//         <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
//       </div>
//     );
//   }

//   // ================= LIST PAGE STYLE ===================
//   return (
//     <div className="min-h-screen bg-white">
//       <Navigation onContactClick={() => setIsContactModalOpen(true)} />

//       {/* Hero Section */}
//       <section className="relative h-64" style={{ backgroundColor: '#38bdf8' }}>
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="text-center text-white px-4">
//             <h1 className="text-4xl md:text-5xl font-bold mb-4">Travel Packages</h1>
//             <p className="text-xl">Discover your next adventure</p>
//           </div>
//         </div>
//       </section>

//       {/* Filters and Packages */}
//       <section className="py-8 px-4 bg-blue-50">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//             {/* Filters Sidebar */}
//             <div className="lg:col-span-1">
//               <PackageFilters
//                 searchTerm={searchTerm}
//                 setSearchTerm={setSearchTerm}
//                 selectedDestination={selectedDestination}
//                 setSelectedDestination={setSelectedDestination}
//                 selectedDuration={selectedDuration}
//                 setSelectedDuration={setSelectedDuration}
//                 priceRange={priceRange}
//                 setPriceRange={setPriceRange}
//                 selectedRating={selectedRating}
//                 setSelectedRating={setSelectedRating}
//                 onClearFilters={clearAllFilters}
//               />
//             </div>

//             {/* Packages Results */}
//             <div className="lg:col-span-3">
//               <div className="mb-6">
//                 <h2 className="text-2xl font-bold text-blue-900 mb-2">
//                   {filteredPackages.length} Package{filteredPackages.length !== 1 ? 's' : ''} Found
//                 </h2>
//                 <p className="text-blue-700">
//                   {filteredPackages.length === allPackages.length
//                     ? "Showing all available packages"
//                     : "Filtered results based on your preferences"
//                   }
//                 </p>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                 {filteredPackages.map((pkg) => (
//                   <PackageCard key={pkg.id} package={pkg} />
//                 ))}
//               </div>
//               {filteredPackages.length === 0 && (
//                 <div className="text-center py-16">
//                   <p className="text-xl text-blue-900 mb-4">No packages found matching your criteria.</p>
//                   <Button onClick={clearAllFilters} className="bg-blue-600 hover:bg-blue-700">
//                     Clear All Filters
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
//     </div>
//   );
// };

// export default TravelPackages;
import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Star, MapPin, Calendar, Users, Heart, Share2,
  ChevronDown, ChevronUp, CheckCircle2, ArrowLeft
} from "lucide-react";

// ---- DEMO DATA ----
const packageDetails = {
  title: "11 Days European Pathways Community Trip - France, Netherlands, Germany, Czechia",
  bannerImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1400&q=80", // Replace with your own image
  price: "₹1,69,990/-",
  perPerson: "per person",
  pickupDrop: "Paris Airport - Prague Airport",
  duration: "10N - 11D",
  overview: `Join us as we take you to some of the dreamiest places in the world. ...`,
  highlights: [
    "3N Paris - 3N Amsterdam - 2N Berlin - 2N Prague",
    "Guided tours and leisure time",
    "Iconic landmarks: Eiffel Tower, Prague’s Astronomical Clock"
  ],
  itinerary: [
    {
      day: "Day 1",
      title: "Arrive in Paris. Welcome to Europe.",
      details: [
        "Upon your arrival in Paris, complete the immigration formalities at the airport.",
        "Get a warm welcome from our Tour Manager, who will guide you to your hotel and help you with the check-in formalities.",
        "Have some rest and spend the rest of the day at leisure in this beautiful city known for its exceptional fashion, renowned museums, breathtaking landmarks, and captivating cabaret shows.",
        "Overnight stay in Paris."
      ]
    },
    {
      day: "Day 2",
      title: "Hop on Hop Off Bus Tour of Paris, Eiffel Tower (2nd Level), Seine River Cruise.",
      details: [
        "Enjoy a sightseeing tour of Paris including the Eiffel Tower and Seine River Cruise."
      ]
    },
    {
      day: "Day 3",
      title: "Day at Leisure. Optional Activity (Disneyland Paris/Louvre Museum).",
      details: [
        "Day at leisure or join optional tours to Disneyland or Louvre Museum."
      ]
    },
    {
      day: "Day 4",
      title: "France - Netherlands. Go Pub Crawling in Amsterdam.",
      details: [
        "Travel to Netherlands and enjoy Amsterdam’s vibrant nightlife with a pub crawl."
      ]
    },
  ],
  inclusions: [
    "Return economy class airfare",
    "Schengen visa charges",
    "Travel insurance",
    "Breakfasts at hotels",
    "All transfers and sightseeing by coach"
  ],
  exclusions: [
    "Personal expenses",
    "Optional activities",
    "Gratuities",
    "Lunches and dinners unless specified"
  ]
};

const tabList = [
  { label: "Overview & Highlights", key: "overview" },
  { label: "Itinerary", key: "itinerary" },
  { label: "Inclusions", key: "inclusions" },
  { label: "Exclusions", key: "exclusions" },
  { label: "Other Info", key: "otherinfo" }
];

const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
  ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const PackageDetailsPage = () => {
  // Section refs
  const overviewRef = useRef<HTMLDivElement>(null);
  const itineraryRef = useRef<HTMLDivElement>(null);
  const inclusionsRef = useRef<HTMLDivElement>(null);
  const exclusionsRef = useRef<HTMLDivElement>(null);
  const otherInfoRef = useRef<HTMLDivElement>(null);

  // Tab state
  const [activeTab, setActiveTab] = useState(tabList[0].key);
  const [openItineraryIndexes, setOpenItineraryIndexes] = useState<number[]>([0]);

  // Contact Form state
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "submitted">("idle");

  // Handle scrolling/tab
  const handleTabClick = (key: string) => {
    setActiveTab(key);
    switch (key) {
      case "overview": scrollToRef(overviewRef); break;
      case "itinerary": scrollToRef(itineraryRef); break;
      case "inclusions": scrollToRef(inclusionsRef); break;
      case "exclusions": scrollToRef(exclusionsRef); break;
      case "otherinfo": scrollToRef(otherInfoRef); break;
    }
  };

  // Itinerary accordion toggle
  const toggleDay = (idx: number) => {
    setOpenItineraryIndexes((prev) =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  // Contact form submission (demo only)
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitted");
    setTimeout(() => setFormStatus("idle"), 2000);
  };

  return (
    <div className="bg-[#f6fbfd] min-h-screen pb-8">
      {/* ------------- TOP BANNER IMAGE + TITLE + BUTTON ------------- */}
      <div className="relative w-full h-[370px] md:h-[410px] lg:h-[470px] flex items-end justify-center overflow-hidden">
        <img
          src={packageDetails.bannerImage}
          alt="cover"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ minHeight: 320, filter: "brightness(0.70)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent z-10" />
        <div className="z-20 w-full px-4 flex flex-col items-center pb-8 relative">
          {/* Title as overlay */}
          <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white shadow-xl text-center max-w-4xl">
            {packageDetails.title}
          </div>
          {/* Download Itinerary button */}
          <Button
            className="mt-5 bg-yellow-300 hover:bg-yellow-400 text-blue-900 font-bold rounded-full shadow-md px-8 py-3 text-base transition absolute left-1/2 -translate-x-1/2 bottom-[-24px] md:bottom-[-26px] z-30"
            style={{ boxShadow: "0 8px 24px 0 rgba(0,0,0,0.12)" }}
          >
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#1876d2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" x2="12" y1="15" y2="3"/>
              </svg>
              Download Itinerary
            </span>
          </Button>
        </div>
      </div>

      {/* --- Trip Summary (Pickup/Drop + Duration + Price Box) --- */}
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row gap-6 px-4 pt-16 pb-2 items-start relative z-10">
        {/* LEFT: Title + tags */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-white px-3 py-2 rounded-lg shadow border">
                <MapPin className="w-4 h-4 text-sky-600 mr-2" />
                <span className="text-xs text-sky-900 font-medium">{packageDetails.pickupDrop}</span>
              </div>
              <div className="flex items-center bg-white px-3 py-2 rounded-lg shadow border ml-2">
                <Calendar className="w-4 h-4 text-sky-600 mr-2" />
                <span className="text-xs text-sky-900 font-medium">{packageDetails.duration}</span>
              </div>
            </div>
          </div>
        </div>
        {/* RIGHT: Pricing Box */}
        <div className="md:w-[340px] w-full">
          <div className="bg-white rounded-lg border border-sky-200 shadow p-5 flex flex-col items-center text-center">
            <span className="block text-xs text-gray-500 mb-1">Starting from</span>
            <span className="text-2xl font-bold text-sky-700 mb-1">{packageDetails.price}</span>
            <span className="text-xs text-gray-500 mb-3">{packageDetails.perPerson}</span>
            <Button className="w-full bg-cyan-400 hover:bg-cyan-500 text-white font-semibold rounded transition">
              Dates & Costing
            </Button>
          </div>
        </div>
      </div>

      {/* ---- STICKY TABS ---- */}
      <div className="sticky top-0 z-40 bg-white/95 border-b">
        <div className="flex max-w-6xl mx-auto px-4">
          {tabList.map(tab => (
            <button
              key={tab.key}
              onClick={() => handleTabClick(tab.key)}
              className={`flex-1 py-3 font-semibold text-sm transition 
                border-b-2 ${activeTab === tab.key ? "border-[#09c2e7] text-[#09c2e7] bg-[#f3fdff]" : "border-transparent text-slate-700 hover:bg-slate-50"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ---- MAIN CONTENT ---- */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row mt-4 gap-8 px-4">
        {/* LEFT: Main Content */}
        <div className="flex-1 min-w-0">
          {/* Overview & Highlights */}
          <div ref={overviewRef} className="scroll-mt-24">
            <h2 className="flex items-center text-lg font-bold text-sky-700 mb-1">
              <span className="border-l-4 border-sky-500 pl-2 mr-2" />
              Overview & Highlights
            </h2>
            <div className="bg-white rounded-lg shadow p-5 mb-8">
              <div className="mb-2">
                {packageDetails.highlights.map((hl, idx) => (
                  <div
                    key={idx}
                    className="inline-block text-xs bg-sky-50 border border-sky-200 rounded px-3 py-1 mr-2 mb-2 text-sky-900 font-semibold"
                  >
                    {hl}
                  </div>
                ))}
              </div>
              <p className="text-gray-700 text-sm">{packageDetails.overview}</p>
            </div>
          </div>

          {/* Itinerary */}
          <div ref={itineraryRef} className="scroll-mt-24">
            <h2 className="flex items-center text-lg font-bold text-sky-700 mb-1">
              <span className="border-l-4 border-sky-500 pl-2 mr-2" />
              Itinerary
            </h2>
            <div className="bg-white rounded-lg shadow mb-8">
              {packageDetails.itinerary.map((day, idx) => (
                <div key={idx} className="border-b last:border-0">
                  <button
                    onClick={() => toggleDay(idx)}
                    className="flex items-center justify-between w-full px-5 py-4 focus:outline-none text-left bg-sky-50 hover:bg-sky-100 transition"
                  >
                    <span>
                      <span className="bg-[#09c2e7] text-white rounded px-3 py-1 mr-2 text-xs font-bold">{day.day}</span>
                      <span className="text-base font-semibold">{day.title}</span>
                    </span>
                    {openItineraryIndexes.includes(idx)
                      ? <ChevronUp className="w-6 h-6 text-sky-600" />
                      : <ChevronDown className="w-6 h-6 text-sky-600" />}
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-200 px-5
                    ${openItineraryIndexes.includes(idx) ? "max-h-40 py-3" : "max-h-0 py-0"}
                    `}
                    style={{ background: openItineraryIndexes.includes(idx) ? "#f8fafc" : "white" }}
                  >
                    {openItineraryIndexes.includes(idx) && (
                      <ul className="list-disc ml-8 text-sm text-gray-700 space-y-2">
                        {day.details.map((detail, i) => <li key={i}>{detail}</li>)}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions */}
          <div ref={inclusionsRef} className="scroll-mt-24">
            <h2 className="flex items-center text-lg font-bold text-green-700 mb-1">
              <span className="border-l-4 border-green-400 pl-2 mr-2" />
              Inclusions
            </h2>
            <div className="bg-white rounded-lg shadow p-5 mb-8">
              <ul className="space-y-2">
                {packageDetails.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> {inc}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Exclusions */}
          <div ref={exclusionsRef} className="scroll-mt-24">
            <h2 className="flex items-center text-lg font-bold text-red-700 mb-1">
              <span className="border-l-4 border-red-400 pl-2 mr-2" />
              Exclusions
            </h2>
            <div className="bg-white rounded-lg shadow p-5 mb-8">
              <ul className="space-y-2">
                {packageDetails.exclusions.map((exc, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="w-4 h-4 border border-red-300 rounded"></span>
                    {exc}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Other Info */}
          <div ref={otherInfoRef} className="scroll-mt-24">
            <h2 className="flex items-center text-lg font-bold text-gray-700 mb-1">
              <span className="border-l-4 border-gray-300 pl-2 mr-2" />
              Other Info
            </h2>
            <div className="bg-white rounded-lg shadow p-5 mb-8">
              <p className="text-sm text-gray-500">
                For more information, please contact our support team.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: Sticky Contact Form */}
        <div className="md:w-[340px] w-full md:sticky md:top-24 h-fit shrink-0">
          <div className="bg-[#eafdff] border border-sky-200 rounded-lg shadow p-5">
            <h3 className="font-bold text-sky-700 mb-2 text-sm">Wanderlust Calling?<br />Allow Us to Call You Back!</h3>
            <form className="space-y-3" onSubmit={handleFormSubmit}>
              <div>
                <label className="block text-xs font-medium text-sky-900 mb-1">Full Name *</label>
                <Input
                  type="text"
                  required
                  placeholder="e.g. John Smith"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-sky-900 mb-1">Phone No. *</label>
                <Input
                  type="tel"
                  required
                  placeholder="Enter your 10 digit number"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  pattern="[0-9]{10,}"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-sky-900 mb-1">Email ID *</label>
                <Input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>
              <Button
                className="w-full bg-yellow-300 hover:bg-yellow-400 text-sky-900 font-bold mt-2"
                type="submit"
                disabled={formStatus === "submitted"}
              >
                {formStatus === "submitted" ? "Submitted!" : "Submit"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailsPage;
