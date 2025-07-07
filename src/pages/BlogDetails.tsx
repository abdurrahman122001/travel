import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import Navigations from "@/components/Navigation";

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
  content?: string; // HTML or long string
}

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/blogs/${id}`)
      .then(res => res.json())
      .then(data => setBlog(data))
      .catch(() => setBlog(null))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navigations onContactClick={() => setIsContactModalOpen(true)} />
      <section className="relative h-48 md:h-64" style={{ backgroundColor: '#38bdf8' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {blog ? blog.title : "Loading..."}
            </h1>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Button
            variant="outline"
            className="mb-8"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>

          {loading ? (
            <div className="text-center py-12 text-lg text-muted-foreground">
              Loading blog details...
            </div>
          ) : !blog ? (
            <div className="text-center py-12 text-lg text-red-500">
              Blog not found.
            </div>
          ) : (
            <Card className="overflow-hidden shadow-lg max-w-4xl mx-auto">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <div className="flex items-center space-x-4 mb-4">
                    <Badge variant="secondary">{blog.category}</Badge>
                    <div className="flex items-center text-slate-500 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {blog.date}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">{blog.title}</h2>
                  <div className="flex items-center text-slate-500 text-sm mb-4">
                    <User className="h-4 w-4 mr-1" />
                    {blog.author}
                  </div>
                  <p className="text-slate-600 mb-6">{blog.excerpt}</p>
                </div>
              </div>
              {blog.content && (
                <CardContent className="prose prose-lg max-w-none p-8" style={{ background: "#f8fafc" }}>
                  {/* 
                    If content is HTML (from ReactQuill etc.), use dangerouslySetInnerHTML.
                    Otherwise just render as text.
                  */}
                  {/<[a-z][\s\S]*>/i.test(blog.content) ? (
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                  ) : (
                    <div>{blog.content}</div>
                  )}
                </CardContent>
              )}
            </Card>
          )}
        </div>
      </section>
      <Footer setIsContactModalOpen={setIsContactModalOpen => setIsContactModalOpen} />
    </div>
  );
};

export default BlogDetails;
