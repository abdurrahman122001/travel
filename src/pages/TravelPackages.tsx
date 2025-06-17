import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  MapPin,
  Calendar,
  Users,
  Globe,
  ArrowLeft,
  Heart,
  Share2,
  Clock,
  Camera,
  Shield,
  CheckCircle2,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import ContactModal from "@/components/ContactModal";
import PackageCard from "@/components/PackageCard";
import PackageFilters from "@/components/PackageFilters";

const allPackages = [
  {
    id: 1,
    title: "Bali Paradise",
    description: "Experience the magic of Bali with pristine beaches and cultural wonders",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=500&q=80",
    price: 1299,
    duration: "7 Days",
    location: "Bali, Indonesia",
    rating: 4.8,
    reviews: 156,
    highlights: ["Private beach access", "Cultural temple tours", "Balinese cooking class", "Spa treatments"],
    includes: ["Round-trip flights", "5-star resort accommodation", "Daily breakfast", "Airport transfers"],
    itinerary: [
      "Day 1: Arrival in Denpasar, transfer to resort",
      "Day 2-3: Beach relaxation and water sports",
      "Day 4: Temple hopping tour",
      "Day 5: Cooking class and spa day",
      "Day 6: Free day for shopping",
      "Day 7: Departure",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: 2,
    title: "Swiss Alps Adventure",
    description: "Breathtaking mountain views and alpine adventures await",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=500&q=80",
    price: 1899,
    duration: "10 Days",
    location: "Switzerland",
    rating: 4.9,
    reviews: 203,
    highlights: ["Matterhorn viewing", "Train journeys", "Alpine hiking", "Swiss chocolate tours"],
    includes: ["International flights", "Boutique hotels", "Swiss Pass", "Professional guide"],
    itinerary: [
      "Day 1-2: Zurich arrival and city tour",
      "Day 3-4: Lucerne and Mount Pilatus",
      "Day 5-6: Interlaken and Jungfraujoch",
      "Day 7-8: Zermatt and Matterhorn",
      "Day 9: Montreux and departure prep",
      "Day 10: Departure",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: 3,
    title: "African Safari",
    description: "Witness incredible wildlife in their natural habitat",
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&w=500&q=80",
    price: 2499,
    duration: "12 Days",
    location: "Kenya & Tanzania",
    rating: 4.7,
    reviews: 98,
    highlights: ["Big 5 game viewing", "Masai Mara", "Serengeti", "Ngorongoro Crater"],
    includes: ["All flights", "Safari lodges", "All meals", "Professional safari guide"],
    itinerary: [
      "Day 1-2: Nairobi arrival and Amboseli",
      "Day 3-5: Masai Mara game drives",
      "Day 6-8: Serengeti National Park",
      "Day 9-10: Ngorongoro Crater",
      "Day 11: Arusha and cultural visit",
      "Day 12: Departure",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: 4,
    title: "Patagonia Expedition",
    description: "Explore the untamed wilderness of South America",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=500&q=80",
    price: 2199,
    duration: "14 Days",
    location: "Argentina & Chile",
    rating: 4.6,
    reviews: 87,
    highlights: ["Torres del Paine", "Glacier trekking", "Penguin colonies", "Gaucho culture"],
    includes: ["Regional flights", "Eco-lodges", "Expert guides", "All equipment"],
    itinerary: [
      "Day 1-2: Buenos Aires arrival",
      "Day 3-5: El Calafate and glaciers",
      "Day 6-9: Torres del Paine",
      "Day 10-12: Ushuaia and Tierra del Fuego",
      "Day 13: Puerto Madryn penguins",
      "Day 14: Departure",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508326099804-190c33bd8274?auto=format&fit=crop&w=800&q=80",
    ],
  },
];

const TravelPackages = () => {
  const { id } = useParams();

  // ALL HOOKS DECLARED UNCONDITIONALLY AT TOP
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Filter states for all-packages view
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("All Destinations");
  const [selectedDuration, setSelectedDuration] = useState("Any Duration");
  const [priceRange, setPriceRange] = useState([500, 3000]);
  const [selectedRating, setSelectedRating] = useState("Any Rating");

  // Filter logic
  const filteredPackages = allPackages.filter((pkg) => {
    const matchesSearch =
      pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDestination =
      selectedDestination === "All Destinations" ||
      pkg.location === selectedDestination;

    const matchesDuration =
      selectedDuration === "Any Duration" ||
      (selectedDuration === "1-7 Days" && parseInt(pkg.duration) <= 7) ||
      (selectedDuration === "8-14 Days" && parseInt(pkg.duration) >= 8 && parseInt(pkg.duration) <= 14) ||
      (selectedDuration === "15+ Days" && parseInt(pkg.duration) >= 15);

    const matchesPrice = pkg.price >= priceRange[0] && pkg.price <= priceRange[1];

    const matchesRating =
      selectedRating === "Any Rating" ||
      (selectedRating === "4.0+" && pkg.rating >= 4.0) ||
      (selectedRating === "4.5+" && pkg.rating >= 4.5) ||
      (selectedRating === "4.8+" && pkg.rating >= 4.8);

    return (
      matchesSearch &&
      matchesDestination &&
      matchesDuration &&
      matchesPrice &&
      matchesRating
    );
  });

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedDestination("All Destinations");
    setSelectedDuration("Any Duration");
    setPriceRange([500, 3000]);
    setSelectedRating("Any Rating");
  };

  // ========== DETAIL PAGE STYLE ==========
  if (id) {
    const packageDetails = allPackages.find((pkg) => pkg.id === parseInt(id));

    if (!packageDetails) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Package not found</h2>
            <Link to="/packages">
              <Button>Back to Packages</Button>
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Navigation/Header */}
        <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2">
                <Globe className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-slate-800">Wanderlust</span>
              </Link>
              <nav className="hidden md:flex items-center space-x-8">
                <Link to="/" className="text-slate-700 hover:text-blue-600 transition-colors">Home</Link>
                <Link to="/packages" className="text-blue-600 font-medium">Packages</Link>
                <Link to="/about" className="text-slate-700 hover:text-blue-600 transition-colors">About</Link>
                <Button onClick={() => setIsContactModalOpen(true)} variant="ghost">Contact</Button>
              </nav>
              <Button onClick={() => setIsContactModalOpen(true)} variant="outline">Contact</Button>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link to="/packages" className="hover:text-blue-600">Packages</Link>
            <span>/</span>
            <span className="text-slate-800">{packageDetails.title}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-4 pb-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={packageDetails.galleryImages[selectedImage]}
                  alt={packageDetails.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/90 backdrop-blur-sm"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {packageDetails.galleryImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-blue-600' : 'border-slate-200'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Package Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-blue-600 hover:bg-blue-700">{packageDetails.duration}</Badge>
                  <Badge variant="secondary">{packageDetails.location}</Badge>
                </div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">{packageDetails.title}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-600">{packageDetails.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{packageDetails.rating}</span>
                    <span className="text-slate-500">({packageDetails.reviews} reviews)</span>
                  </div>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed">{packageDetails.description}</p>
              </div>

              {/* Pricing */}
              <Card className="border-2 border-blue-100 bg-blue-50/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-3xl font-bold text-blue-600">${packageDetails.price}</span>
                      </div>
                      <p className="text-sm text-slate-600">per person</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      onClick={() => setIsContactModalOpen(true)}
                    >
                      Book Now
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setIsContactModalOpen(true)}
                    >
                      Get Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-slate-600">{packageDetails.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-slate-600">2-8 People</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-slate-600">All year round</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-slate-600">Fully insured</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Trip Highlights</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {packageDetails.highlights.map((highlight, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm border">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-slate-700">{highlight}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Itinerary */}
        <section className="container mx-auto px-4 py-12 bg-slate-50">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Day by Day Itinerary</h2>
          <div className="space-y-4">
            {packageDetails.itinerary.map((day, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-600">{day}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* What's Included */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">What's Included</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-green-700 mb-4 flex items-center">
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  Included
                </h3>
                <ul className="space-y-2">
                  {packageDetails.includes.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-red-700 mb-4">Not Included</h3>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <div className="w-4 h-4 border border-red-300 rounded flex-shrink-0"></div>
                    <span className="text-slate-700">Personal expenses</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-4 h-4 border border-red-300 rounded flex-shrink-0"></div>
                    <span className="text-slate-700">Optional activities</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-4 h-4 border border-red-300 rounded flex-shrink-0"></div>
                    <span className="text-slate-700">Gratuities</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-12 bg-blue-600 text-white rounded-2xl mx-4 mb-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready for Your Adventure?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Don&apos;t wait - spots are limited and this amazing experience fills up quickly!
            </p>
            <div className="flex justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 px-8"
                onClick={() => setIsContactModalOpen(true)}
              >
                Book This Trip
              </Button>
              <Link to="/packages">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Packages
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      </div>
    );
  }

  // ================= LIST PAGE STYLE ===================
  return (
    <div className="min-h-screen bg-white">
      <Navigation onContactClick={() => setIsContactModalOpen(true)} />

      {/* Hero Section */}
      <section className="relative h-64 mt-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Travel Packages</h1>
            <p className="text-xl">Discover your next adventure</p>
          </div>
        </div>
      </section>

      {/* Filters and Packages */}
      <section className="py-8 px-4 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <PackageFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedDestination={selectedDestination}
                setSelectedDestination={setSelectedDestination}
                selectedDuration={selectedDuration}
                setSelectedDuration={setSelectedDuration}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
                onClearFilters={clearAllFilters}
              />
            </div>

            {/* Packages Results */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">
                  {filteredPackages.length} Package{filteredPackages.length !== 1 ? 's' : ''} Found
                </h2>
                <p className="text-blue-700">
                  {filteredPackages.length === allPackages.length
                    ? "Showing all available packages"
                    : "Filtered results based on your preferences"
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPackages.map((pkg) => (
                  <PackageCard key={pkg.id} package={pkg} />
                ))}
              </div>

              {filteredPackages.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-xl text-blue-900 mb-4">No packages found matching your criteria.</p>
                  <Button onClick={clearAllFilters} className="bg-blue-600 hover:bg-blue-700">
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
};

export default TravelPackages;
