import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
const Blog = () => {
      const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const blogPosts = [
    {
      id: 1,
      title: "10 Hidden Gems in the Swiss Alps",
      excerpt: "Discover breathtaking locations off the beaten path in Switzerland's most beautiful mountain range.",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
      author: "Sarah Chen",
      date: "March 15, 2024",
      category: "Adventure",
      featured: true
    },
    {
      id: 2,
      title: "Sustainable Travel: Making a Positive Impact",
      excerpt: "Learn how to travel responsibly and support local communities while exploring the world.",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80",
      author: "Marcus Rodriguez",
      date: "March 12, 2024",
      category: "Sustainability",
      featured: false
    },
    {
      id: 3,
      title: "Cultural Immersion: Beyond Tourist Attractions",
      excerpt: "Experience authentic local culture through food, traditions, and meaningful connections.",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
      author: "Elena Kowalski",
      date: "March 10, 2024",
      category: "Culture",
      featured: false
    },
    {
      id: 4,
      title: "Photography Tips for Travel Enthusiasts",
      excerpt: "Capture stunning travel memories with these professional photography techniques.",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=800&q=80",
      author: "Sarah Chen",
      date: "March 8, 2024",
      category: "Photography",
      featured: false
    },
    {
      id: 5,
      title: "The Ultimate Packing Guide for Adventure Travel",
      excerpt: "Pack smart and light for your next adventure with our comprehensive packing checklist.",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
      author: "Marcus Rodriguez",
      date: "March 5, 2024",
      category: "Tips",
      featured: false
    },
    {
      id: 6,
      title: "Luxury Travel on a Budget: Insider Secrets",
      excerpt: "Experience luxury travel without breaking the bank with these money-saving strategies.",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80",
      author: "Elena Kowalski",
      date: "March 1, 2024",
      category: "Budget",
      featured: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <Navigation onContactClick={() => setIsContactModalOpen(true)} />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Travel Blog</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Stories, tips, and inspiration for your next adventure
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {blogPosts.find(post => post.featured) && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <Badge className="bg-blue-600 hover:bg-blue-700 mb-4">Featured</Badge>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Latest from our blog</h2>
              </div>
              
              {(() => {
                const featuredPost = blogPosts.find(post => post.featured);
                return (
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
                    <div className="md:flex">
                      <div className="md:w-1/2">
                        <img 
                          src={featuredPost.image} 
                          alt={featuredPost.title}
                          className="w-full h-64 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-1/2 p-8">
                        <div className="flex items-center space-x-4 mb-4">
                          <Badge variant="secondary">{featuredPost.category}</Badge>
                          <div className="flex items-center text-slate-500 text-sm">
                            <Calendar className="h-4 w-4 mr-1" />
                            {featuredPost.date}
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-4">{featuredPost.title}</h3>
                        <p className="text-slate-600 mb-6">{featuredPost.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-slate-500 text-sm">
                            <User className="h-4 w-4 mr-1" />
                            {featuredPost.author}
                          </div>
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            Read More <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })()}
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Recent Posts</h2>
            <p className="text-xl text-slate-600">Discover travel insights and inspiration</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.filter(post => !post.featured).map((post) => (
              <Card key={post.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <div className="relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700">
                    {post.category}
                  </Badge>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center text-slate-500 text-sm mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-4">{post.date}</span>
                    <User className="h-4 w-4 mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{post.title}</h3>
                  <p className="text-slate-600 mb-4">{post.excerpt}</p>
                  <Button variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    Read More <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Never Miss an Update</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest travel tips and destination guides
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-400"
            />
            <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
      <footer className="bg-white py-16 border-t border-blue-200">
            <Footer setIsContactModalOpen={setIsContactModalOpen} />
      </footer>
    </div>
  );
};

export default Blog;
