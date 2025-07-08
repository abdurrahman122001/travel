import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import Navigations from "@/components/Navigation";

interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  createdAt: string;
  category: string;
  content?: string; // HTML or text
  tags?: string[];
}

const BlogDetails: React.FC = () => {
  // use slug param instead of id!
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/blogs/slug/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error("Blog not found");
        return res.json();
      })
      .then(data => setBlog(data))
      .catch(() => setBlog(null))
      .finally(() => setLoading(false));
  }, [slug]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navigations onContactClick={() => setIsContactModalOpen(true)} />
      {/* Hero header */}
      <section
        className="relative h-44 md:h-64 flex items-center justify-center"
        style={{
          background: "linear-gradient(90deg,#38bdf8 0%,#0ea5e9 100%)",
        }}
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 w-full text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            {blog ? blog.title : "Loading..."}
          </h1>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <Button
            variant="outline"
            className="mb-8"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>

          {loading ? (
            <div className="flex flex-col items-center py-16 text-lg text-muted-foreground">
              <div className="animate-pulse w-2/3 h-10 rounded mb-6 bg-slate-200" />
              <div className="animate-pulse w-full h-96 rounded bg-slate-100" />
            </div>
          ) : !blog ? (
            <div className="text-center py-12 text-lg text-red-500">
              Blog not found.
            </div>
          ) : (
            <Card className="overflow-hidden shadow-xl max-w-4xl mx-auto border-0">
              {/* Blog meta and header */}
              <div className="md:flex">
                {blog.image && (
                  <div className="md:w-1/2 max-h-96 overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-64 md:h-full object-cover transition-all"
                    />
                  </div>
                )}
                <div className="md:w-1/2 p-6 flex flex-col justify-center bg-slate-50">
                  <div className="flex items-center flex-wrap gap-3 mb-4">
                    <Badge variant="secondary" className="uppercase">
                      {blog.category}
                    </Badge>
                    {blog.tags?.map(tag => (
                      <Badge key={tag} variant="outline" className="ml-1">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center text-slate-500 text-sm mb-2 space-x-4">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(blog.createdAt)}
                    </span>
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {blog.author}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    {blog.title}
                  </h2>
                  <p className="text-slate-700 mb-4">{blog.excerpt}</p>
                </div>
              </div>
              {/* Main blog content */}
              {blog.content && (
                <CardContent className="prose prose-lg max-w-none p-8 md:px-14 bg-white" style={{ background: "#f8fafc" }}>
                  <div dangerouslySetInnerHTML={{ __html: blog.content || "" }} />
                </CardContent>
              )}
            </Card>
          )}
        </div>
      </section>
      <Footer setIsContactModalOpen={setIsContactModalOpen} />
    </div>
  );
};

export default BlogDetails;
