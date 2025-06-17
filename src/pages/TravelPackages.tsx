
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Star, Calendar, Users, Plane, Hotel, Camera, Shield } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ContactModal from "@/components/ContactModal";
import PackageCard from "@/components/PackageCard";

const TravelPackages = () => {
  const { id } = useParams();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
        "Day 7: Departure"
      ]
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
        "Day 10: Departure"
      ]
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
        "Day 12: Departure"
      ]
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
        "Day 14: Departure"
      ]
    }
  ];

  const filteredPackages = allPackages.filter(pkg =>
    pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // If an ID is provided, show single package details
  if (id) {
    const packageDetails = allPackages.find(pkg => pkg.id === parseInt(id));
    
    if (!packageDetails) {
      return (
        <div className="min-h-screen bg-background">
          <Navigation onContactClick={() => setIsContactModalOpen(true)} />
          <div className="pt-20 px-4 text-center">
            <h1 className="text-4xl font-bold">Package Not Found</h1>
            <Link to="/packages" className="text-primary hover:underline">
              Back to all packages
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background">
        <Navigation onContactClick={() => setIsContactModalOpen(true)} />
        
        {/* Package Hero */}
        <section className="relative h-96 mt-16">
          <img
            src={packageDetails.image}
            alt={packageDetails.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-5xl font-bold mb-4">{packageDetails.title}</h1>
              <p className="text-xl">{packageDetails.description}</p>
            </div>
          </div>
        </section>

        {/* Package Details */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Package Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center">
                        <Calendar className="w-6 h-6 mx-auto mb-2 text-primary" />
                        <p className="font-medium">{packageDetails.duration}</p>
                        <p className="text-sm text-muted-foreground">Duration</p>
                      </div>
                      <div className="text-center">
                        <MapPin className="w-6 h-6 mx-auto mb-2 text-primary" />
                        <p className="font-medium">{packageDetails.location}</p>
                        <p className="text-sm text-muted-foreground">Location</p>
                      </div>
                      <div className="text-center">
                        <Star className="w-6 h-6 mx-auto mb-2 text-primary" />
                        <p className="font-medium">{packageDetails.rating}/5</p>
                        <p className="text-sm text-muted-foreground">{packageDetails.reviews} Reviews</p>
                      </div>
                      <div className="text-center">
                        <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                        <p className="font-medium">2-8</p>
                        <p className="text-sm text-muted-foreground">Group Size</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Highlights */}
                <Card>
                  <CardHeader>
                    <CardTitle>Package Highlights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {packageDetails.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Camera className="w-4 h-4 text-primary" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Itinerary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Itinerary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {packageDetails.itinerary.map((day, index) => (
                        <div key={index} className="flex gap-4 p-4 bg-muted/30 rounded-lg">
                          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <p>{day}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* What's Included */}
                <Card>
                  <CardHeader>
                    <CardTitle>What's Included</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {packageDetails.includes.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-green-600" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Booking Card */}
              <div className="lg:col-span-1">
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle className="text-3xl">${packageDetails.price}</CardTitle>
                    <CardDescription>per person</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Plane className="w-4 h-4 text-primary" />
                        <span className="text-sm">Flights included</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Hotel className="w-4 h-4 text-primary" />
                        <span className="text-sm">Premium accommodation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-sm">Professional guide</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => setIsContactModalOpen(true)}
                    >
                      Book Now
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setIsContactModalOpen(true)}
                    >
                      Get Quote
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <ContactModal 
          isOpen={isContactModalOpen} 
          onClose={() => setIsContactModalOpen(false)} 
        />
      </div>
    );
  }

  // Show all packages
  return (
    <div className="min-h-screen bg-background">
      <Navigation onContactClick={() => setIsContactModalOpen(true)} />
      
      {/* Hero Section */}
      <section className="relative h-64 mt-16 bg-gradient-to-r from-primary to-primary/80">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-primary-foreground px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Travel Packages</h1>
            <p className="text-xl">Discover your next adventure</p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search packages by destination..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12"
              />
            </div>
            <Button size="lg" onClick={() => setSearchTerm("")}>
              Clear
            </Button>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPackages.map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} />
            ))}
          </div>
          
          {filteredPackages.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">No packages found matching your search.</p>
              <Button onClick={() => setSearchTerm("")} className="mt-4">
                View All Packages
              </Button>
            </div>
          )}
        </div>
      </section>

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
};

export default TravelPackages;
