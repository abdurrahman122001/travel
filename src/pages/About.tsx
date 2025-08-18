import { useState } from "react";
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
const About = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const stats = [
    { icon: Users, label: "Happy Travelers", value: "10,000+" },
    { icon: Globe, label: "Destinations", value: "50+" },
    { icon: Award, label: "Awards Won", value: "25+" },
    { icon: Clock, label: "Years Experience", value: "10+" },
  ];
  const team = [
    {
      name: "Divyanshi Chadha",
      role: "Founder",
      image: "/images/team/divyanshi.jpg", // replace with actual image path
      bio: "A dynamic leader and passionate traveler, Divyanshi blends discipline, creativity, and business acumen. A national-level basketball player and MBA in Finance, she has led 47+ group trips with unmatched energy. Known for connecting deeply with people, she inspires trust and ensures every journey is full of learning, fun, and unforgettable memories.",
    },
    {
      name: "Ankit Joshi",
      role: "Co-Founder",
      image: "/images/team/ankit.jpg", // replace with actual image path
      bio: "With a Masters in Media and Governance and a traveler’s spirit, Ankit has covered 30,000+ km and completed challenging treks across India. A former basketball representative for India, he brings vision and depth, ensuring every itinerary balances comfort, excitement, and authenticity for truly memorable experiences.",
    },
    {
      name: "Vikram Chadha",
      role: "Advisor",
      image: "/images/team/vikram.jpg", // replace with actual image path
      bio: "With 30+ years in the travel industry and work with 155+ schools, Vikram is the guiding light of Breakout Wanderers. A seasoned professional and vigorous traveler, he brings fresh perspectives and unique destinations. His expertise ensures safety, legacy, and excellence in every journey.",
    },
  ];

  const values = [
    {
      icon: Heart, // ❤️
      title: "Legacy",
      description: "A family-driven venture built on 25 years of passion and trust.",
    },
    {
      icon: Shield, // 🛡️ safety/protection
      title: "Safety First",
      description: "Zero-compromise safety protocols for students and professionals.",
    },
    {
      icon: Globe, // 🌍 global + customization
      title: "Customization",
      description: "Every journey is tailor-made to the needs of our clients.",
    },
    {
      icon: Users, // 👥 team/professionalism
      title: "Professionalism",
      description: "From planning to execution, we ensure excellence at every step.",
    },
    {
      icon: Sparkles, // ✨ enrichment/creativity
      title: "Enrichment",
      description: "We design experiences that educate, inspire, and create lifelong memories.",
    },
  ];
  return (
    <div className="min-h-screen bg-background">
      <Navigation onContactClick={() => setIsContactModalOpen(true)} />

      {/* Hero Section */}
      <section className="relative h-64" style={{ backgroundColor: '#38bdf8' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About Wanderlust
            </h1>
            <p className="text-xl">
              Creating extraordinary travel experiences since 2020
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
              Breakout Wanderers was born out of a passion for travel that began more than 25 years ago with our founder, a
              father whose love for exploration inspired him to create meaningful journeys for schools and organizations. What
              started as a simple dream soon transformed into a trusted family business, delivering safe, enriching, and
              unforgettable travel experiences across India and abroad.
            </p>
            <p>
              Today, his daughter carries forward this legacy, taking Breakout Wanderers into a new era. With the same dedication
              to safety, learning, and discovery, she is expanding the business to meet the evolving needs of schools, corporates,
              and global travelers.
            </p>
            <p>
              For us, travel is not just about destinations — it’s about heritage, learning, and creating lasting bonds. Each journey
              we curate reflects our family values of trust, care, and innovation, ensuring that every trip becomes a story worth
              remembering.
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
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Our Mission</h2>
          <Card className="p-8 bg-primary text-primary-foreground">
            <CardContent className="text-xl leading-relaxed">
              "To create safe, enriching, and memorable travel experiences that inspire learning, strengthen connections, and
              leave lasting impressions for every traveler."
            </CardContent>
          </Card>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
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
              At Breakout Wanderers, our strength lies in the passion and expertise of our people.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden shadow-lg rounded-2xl">
                {/* <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                </div> */}
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
        <div className="max-w-4xl mx-auto px-4 text-center p-10 rounded-xl" style={{ backgroundColor: '#38BDF8' }}>
          <h2 className="text-4xl text-white font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white text-muted-foreground mb-8">
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
      <Footer setIsContactModalOpen={setIsContactModalOpen} />
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
};

export default About;
