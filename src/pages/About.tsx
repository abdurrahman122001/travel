// pages/About.jsx
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Award, Globe, Heart, Clock, Shield, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import ContactModal from "@/components/ContactModal";
import Footer from "@/components/Footer";

const iconMap = {
  Users,
  Award,
  Globe,
  Heart,
  Clock,
  Shield,
  Sparkles,
};

// Default data in case API fails or returns null
const defaultAboutData = {
  heroTitle: "About Breakout Wanderers",
  heroSubtitle: "Creating extraordinary travel experiences since 2000",
  heroBackgroundColor: "#38bdf8",
  storyTitle: "Our Story",
  storyContent: [
    "Breakout Wanderers was born out of a passion for travel that began more than 25 years ago with our founder, a father whose love for exploration inspired him to create meaningful journeys for schools and organizations. What started as a simple dream soon transformed into a trusted family business, delivering safe, enriching, and unforgettable travel experiences across India and abroad.",
    "Today, his daughter carries forward this legacy, taking Breakout Wanderers into a new era. With the same dedication to safety, learning, and discovery, she is expanding the business to meet the evolving needs of schools, corporates, and global travelers.",
    "For us, travel is not just about destinations — it's about heritage, learning, and creating lasting bonds. Each journey we curate reflects our family values of trust, care, and innovation, ensuring that every trip becomes a story worth remembering."
  ],
  stats: [
    { icon: "Users", label: "Happy Travelers", value: "10,000+" },
    { icon: "Globe", label: "Destinations", value: "50+" },
    { icon: "Award", label: "Awards Won", value: "25+" },
    { icon: "Clock", label: "Years Experience", value: "10+" },
  ],
  missionTitle: "Our Mission",
  missionStatement: "To create safe, enriching, and memorable travel experiences that inspire learning, strengthen connections, and leave lasting impressions for every traveler.",
  valuesTitle: "Our Values",
  valuesSubtitle: "The principles that guide everything we do",
  values: [
    { icon: "Heart", title: "Legacy", description: "A family-driven venture built on 25 years of passion and trust." },
    { icon: "Shield", title: "Safety First", description: "Zero-compromise safety protocols for students and professionals." },
    { icon: "Globe", title: "Customization", description: "Every journey is tailor-made to the needs of our clients." },
    { icon: "Users", title: "Professionalism", description: "From planning to execution, we ensure excellence at every step." },
    { icon: "Sparkles", title: "Enrichment", description: "We design experiences that educate, inspire, and create lifelong memories." },
  ],
  teamTitle: "Meet Our Team",
  teamSubtitle: "At Breakout Wanderers, our strength lies in the passion and expertise of our people.",
  team: [
    {
      name: "Divyanshi Chadha",
      role: "Founder",
      image: "/divyanshi.jpg",
      bio: "A dynamic leader and passionate traveler, Divyanshi blends discipline, creativity, and business acumen. A national-level basketball player and MBA in Finance, she has led 47+ group trips with unmatched energy. Known for connecting deeply with people, she inspires trust and ensures every journey is full of learning, fun, and unforgettable memories.",
    },
    {
      name: "Ankit Joshi",
      role: "Co-Founder",
      image: "/ankit.jpg",
      bio: "With a Masters in Media and Governance and a traveler's spirit, Ankit has covered 1 Lakh+ km and completed challenging treks across India. A former basketball representative for India, he brings vision and depth, ensuring every itinerary balances comfort, excitement, and authenticity for truly memorable experiences.",
    },
    {
      name: "Vikram Chadha",
      role: "Advisor",
      image: "/vikram.jpg",
      bio: "With 30+ years in the travel industry and work with 155+ schools, Vikram is the guiding light of Breakout Wanderers. A seasoned professional and vigorous traveler, he brings fresh perspectives and unique destinations. His expertise ensures safety, legacy, and excellence in every journey.",
    },
  ],
  ctaTitle: "Ready to Start Your Journey?",
  ctaSubtitle: "Let us help you create memories that will last a lifetime",
  ctaBackgroundColor: "#38bdf8",
};

const About = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/about`);
        
        if (res.ok) {
          const data = await res.json();
          setAboutData(data);
        } else {
          throw new Error('Failed to fetch about data');
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
        setError(error.message);
        // Use default data if API fails
        setAboutData(defaultAboutData);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation onContactClick={() => setIsContactModalOpen(true)} />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
        <Footer setIsContactModalOpen={setIsContactModalOpen} />
      </div>
    );
  }

  // Use aboutData if available, otherwise use default data
  const data = aboutData || defaultAboutData;

  return (
    <div className="min-h-screen bg-background">
      <Navigation onContactClick={() => setIsContactModalOpen(true)} />

      {/* Hero Section */}
      <section
        className="relative h-64"
        style={{ backgroundColor: data.heroBackgroundColor }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {data.heroTitle}
            </h1>
            <p className="text-xl">{data.heroSubtitle}</p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">{data.storyTitle}</h2>
          <div className="text-lg text-muted-foreground space-y-6">
            {data.storyContent?.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {data.stats?.map((stat, index) => {
              const IconComponent = iconMap[stat.icon];
              return (
                <div key={index} className="text-center">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">{data.missionTitle}</h2>
          <Card className="p-8 bg-primary text-primary-foreground">
            <CardContent className="text-xl leading-relaxed">
              "{data.missionStatement}"
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{data.valuesTitle}</h2>
            <p className="text-xl text-muted-foreground">
              {data.valuesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {data.values?.map((value, index) => {
              const IconComponent = iconMap[value.icon];
              return (
                <Card key={index} className="text-center p-6">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <IconComponent className="w-8 h-8 text-primary" />
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
            <h2 className="text-4xl font-bold mb-4">{data.teamTitle}</h2>
            <p className="text-xl text-muted-foreground">
              {data.teamSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.team?.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden shadow-lg rounded-2xl">
                <div className="relative">
                  <img
                    src={member.image || "/placeholder-team.jpg"}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      e.target.src = "/placeholder-team.jpg";
                    }}
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

      {/* Call to Action */}
      <section className="py-20 bg-muted/30">
        <div
          className="max-w-4xl mx-auto px-4 text-center p-10 rounded-xl"
          style={{ backgroundColor: data.ctaBackgroundColor }}
        >
          <h2 className="text-4xl text-white font-bold mb-4">
            {data.ctaTitle}
          </h2>
          <p className="text-xl text-white text-muted-foreground mb-8">
            {data.ctaSubtitle}
          </p>
          <div className="space-x-4">
            <Button size="lg" onClick={() => setIsContactModalOpen(true)}>
              Contact Us
            </Button>
            <Button size="lg" variant="outline">
              <a href="/package">View Packages</a>
            </Button>
          </div>
        </div>
      </section>

      {error && (
        <div className="fixed bottom-4 right-4 bg-destructive text-destructive-foreground p-4 rounded-lg shadow-lg">
          <p>Failed to load latest content: {error}</p>
        </div>
      )}

      <Footer setIsContactModalOpen={setIsContactModalOpen} />
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
};

export default About;