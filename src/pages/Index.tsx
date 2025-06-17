
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { MapPin, Star, Users, Calendar, Phone, Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import ContactModal from "@/components/ContactModal";
import Navigation from "@/components/Navigation";
import PackageCard from "@/components/PackageCard";
import TestimonialCard from "@/components/TestimonialCard";

const Index = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1920&q=80",
      title: "Discover Amazing Destinations",
      subtitle: "Explore the world's most beautiful places with our curated travel packages"
    },
    {
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1920&q=80",
      title: "Adventure Awaits You",
      subtitle: "Experience breathtaking landscapes and unforgettable memories"
    },
    {
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1920&q=80",
      title: "Paradise Found",
      subtitle: "Relax on pristine beaches and enjoy luxury accommodations"
    }
  ];

  const featuredPackages = [
    {
      id: 1,
      title: "Bali Paradise",
      description: "Experience the magic of Bali with pristine beaches and cultural wonders",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=500&q=80",
      price: 1299,
      duration: "7 Days",
      location: "Bali, Indonesia",
      rating: 4.8,
      reviews: 156
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
      reviews: 203
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
      reviews: 98
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
      reviews: 87
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      text: "Our Bali trip was absolutely incredible! Every detail was perfectly planned and the experiences were unforgettable."
    },
    {
      name: "Michael Chen",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      text: "The Swiss Alps adventure exceeded all expectations. The views were breathtaking and the service was impeccable."
    },
    {
      name: "Emma Williams",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      text: "Amazing safari experience! We saw all the Big 5 and the guides were incredibly knowledgeable."
    }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
    // Here you would typically send the email to your backend
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onContactClick={() => setIsContactModalOpen(true)} />
      
      {/* Hero Section with Slider */}
      <section className="relative h-screen">
        <Carousel className="h-full">
          <CarouselContent>
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="relative h-screen">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center text-white px-4 max-w-4xl">
                      <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                        {slide.title}
                      </h1>
                      <p className="text-xl md:text-2xl mb-8 opacity-90">
                        {slide.subtitle}
                      </p>
                      <div className="space-x-4">
                        <Button size="lg" className="bg-primary hover:bg-primary/90">
                          <Link to="/packages">Explore Packages</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                          <Link to="/about">Learn More</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-8" />
          <CarouselNext className="right-8" />
        </Carousel>
      </section>

      {/* Featured Packages Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Travel Packages</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of extraordinary travel experiences
            </p>
          </div>

          {/* Package Slider */}
          <div className="mb-16">
            <Carousel className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {featuredPackages.map((pkg) => (
                  <CarouselItem key={pkg.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <PackageCard package={pkg} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Package Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPackages.map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Wanderlust</h2>
            <p className="text-xl text-muted-foreground">We make your travel dreams come true</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Expert Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Our experienced local guides ensure you get the most authentic and memorable experiences
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Unique Destinations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  We take you to hidden gems and exclusive locations that most tourists never discover
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Flexible Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Customize your journey with flexible itineraries tailored to your preferences and budget
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Travelers Say</h2>
            <p className="text-xl text-muted-foreground">Real experiences from real adventurers</p>
          </div>
          
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <TestimonialCard testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 opacity-90">
            Subscribe to our newsletter for exclusive deals and travel inspiration
          </p>
          
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="flex-1">
              <Label htmlFor="email" className="sr-only">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white text-black"
              />
            </div>
            <Button type="submit" variant="secondary" size="default">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Wanderlust</h3>
              <p className="text-muted-foreground">
                Creating unforgettable travel experiences since 2015. Your adventure starts here.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link></li>
                <li><Link to="/packages" className="text-muted-foreground hover:text-foreground">Packages</Link></li>
                <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
                <li><button onClick={() => setIsContactModalOpen(true)} className="text-muted-foreground hover:text-foreground">Contact</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Destinations</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Bali, Indonesia</li>
                <li>Swiss Alps</li>
                <li>African Safari</li>
                <li>Patagonia</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-muted-foreground">
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
          
          <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Wanderlust Travel. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
