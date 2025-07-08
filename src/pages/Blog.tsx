import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";

interface BlogPost {
  _id: string;
  slug: string; // <--- Add this!
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
  featured?: boolean;
}

const Blog = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/blogs`)
      .then(res => res.json())
      .then(data => {
        setBlogPosts(Array.isArray(data) ? data : []);
      })
      .catch(() => setBlogPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const featuredPost = blogPosts.find(post => post.featured);
  const recentPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <Navigation onContactClick={() => setIsContactModalOpen(true)} />
      <section className="relative h-64" style={{ backgroundColor: '#38bdf8' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Travel Blog
            </h1>
            <p className="text-xl">
              Stories, tips, and inspiration for your next adventure
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {loading ? (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center py-8 text-xl text-muted-foreground">
              Loading blog posts...
            </div>
          </div>
        </section>
      ) : (
        featuredPost && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                  <Badge className="bg-blue-600 hover:bg-blue-700 mb-4">Featured</Badge>
                  <h2 className="text-3xl font-bold text-slate-800 mb-4">Latest from our blog</h2>
                </div>
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
                        <Button
                          asChild
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Link to={`/blog/${featuredPost.slug}`}> {/* <--- use slug */}
                            Read More <ArrowRight className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )
      )}

      {/* Blog Posts Grid */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Recent Posts</h2>
            <p className="text-xl text-slate-600">Discover travel insights and inspiration</p>
          </div>

          {loading ? (
            <div className="text-center text-lg py-16 text-muted-foreground">
              Loading...
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.length > 0 ? (
                recentPosts.map((post) => (
                  <Card key={post._id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
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
                      <Button
                        asChild
                        variant="outline"
                        className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors"
                      >
                        <Link to={`/blog/${post.slug}`}> {/* <--- use slug */}
                          Read More <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center text-lg text-muted-foreground">
                  No blog posts found.
                </div>
              )}
            </div>
          )}
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
      <Footer setIsContactModalOpen={setIsContactModalOpen} />
    </div>
  );
};

export default Blog;
