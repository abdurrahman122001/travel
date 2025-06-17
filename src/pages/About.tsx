
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Award, Globe, Heart, MapPin, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";
import ContactModal from "@/components/ContactModal";

const About = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const stats = [
    { icon: Users, label: "Happy Travelers", value: "10,000+" },
    { icon: Globe, label: "Destinations", value: "50+" },
    { icon: Award, label: "Awards Won", value: "25+" },
    { icon: Clock, label: "Years Experience", value: "10+" }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=300&q=80",
      bio: "Passionate traveler with 15+ years in the tourism industry"
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      bio: "Expert in logistics and creating seamless travel experiences"
    },
    {
      name: "Emma Williams",
      role: "Travel Specialist",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
      bio: "Specializes in adventure and cultural immersion trips"
    },
    {
      name: "David Rodriguez",
      role: "Guide Coordinator",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
      bio: "Connects travelers with the best local guides worldwide"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Passion for Travel",
      description: "We believe travel transforms lives and connects cultures"
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Every decision is made with our travelers' best interests in mind"
    },
    {
      icon: Globe,
      title: "Sustainable Tourism",
      description: "We promote responsible travel that benefits local communities"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for perfection in every aspect of your journey"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation onContactClick={() => setIsContactModalOpen(true)} />
      
      {/* Hero Section */}
      <section className="relative h-96 mt-16">
        <img
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1920&q=80"
          alt="About Us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4">About Wanderlust</h1>
            <p className="text-xl max-w-2xl">
              Creating extraordinary travel experiences since 2015
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Our Story</h2>
          <div className="text-lg text-muted-foreground space-y-6">
            <p>
              Founded in 2015 by a group of passionate travelers, Wanderlust was born from the belief 
              that travel should be more than just visiting places – it should be about creating 
              life-changing experiences and meaningful connections.
            </p>
            <p>
              What started as a small team of travel enthusiasts has grown into a trusted partner 
              for thousands of adventurers worldwide. We specialize in crafting unique journeys 
              that go beyond the typical tourist experience, focusing on authentic cultural 
              immersion and sustainable tourism practices.
            </p>
            <p>
              Today, we continue to push the boundaries of what's possible in travel, always 
              staying true to our core mission: making the world more accessible, one adventure at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center p-6">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle>{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground">
              The passionate people behind your perfect journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden">
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Our Mission</h2>
          <Card className="p-8 bg-primary text-primary-foreground">
            <CardContent className="text-xl leading-relaxed">
              "To inspire and enable authentic travel experiences that create lasting memories, 
              foster cultural understanding, and contribute positively to the communities we visit. 
              We believe that travel has the power to transform both travelers and destinations, 
              creating a more connected and understanding world."
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let us help you create memories that will last a lifetime
          </p>
          <div className="space-x-4">
            <Button size="lg" onClick={() => setIsContactModalOpen(true)}>
              Contact Us
            </Button>
            <Button size="lg" variant="outline">
              <a href="/packages">View Packages</a>
            </Button>
          </div>
        </div>
      </section>

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
};

export default About;
