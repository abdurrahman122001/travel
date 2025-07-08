import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft, MessageCircle, BookOpen } from "lucide-react";
import Footer from "@/components/Footer";
import Navigations from "@/components/Navigation";
import { motion, AnimatePresence } from "framer-motion";

interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  createdAt: string;
  category: string;
  content?: string;
  tags?: string[];
}

interface Comment {
  _id: string;
  blog: string;
  name: string;
  comment: string;
  createdAt: string;
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const timeAgo = (date: string) => {
  const now = new Date();
  const past = new Date(date);
  const diff = (now.getTime() - past.getTime()) / 1000;
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
  return past.toLocaleDateString();
};

const BlogDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const navigate = useNavigate();

  // Comments
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentForm, setCommentForm] = useState({ name: "", comment: "" });
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);
  const [commentSuccess, setCommentSuccess] = useState<string | null>(null);

  // Related blogs
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [relatedLoading, setRelatedLoading] = useState(false);

  // Fetch blog
  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/blogs/slug/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Blog not found");
        return res.json();
      })
      .then((data) => setBlog(data))
      .catch(() => setBlog(null))
      .finally(() => setLoading(false));
  }, [slug]);

  // Fetch comments
  useEffect(() => {
    if (!blog?._id) return;
    setCommentsLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/comments/blog/${blog._id}`)
      .then((res) => res.json())
      .then((data) => setComments(Array.isArray(data) ? data : []))
      .catch(() => setComments([]))
      .finally(() => setCommentsLoading(false));
  }, [blog?._id]);

  // Fetch related blogs
  useEffect(() => {
    if (!blog?.category) return;
    setRelatedLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/blogs/category/${encodeURIComponent(blog.category)}`)
      .then((res) => res.json())
      .then((data) => {
        // Filter out current blog (by _id or slug)
        if (Array.isArray(data)) {
          setRelated(data.filter((b) => b._id !== blog._id && b.status === "Published").slice(0, 4));
        } else {
          setRelated([]);
        }
      })
      .catch(() => setRelated([]))
      .finally(() => setRelatedLoading(false));
  }, [blog?.category, blog?._id]);

  // Handle comment submit
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blog?._id) return;
    if (!commentForm.name.trim() || !commentForm.comment.trim()) {
      setCommentError("Name and comment are required.");
      return;
    }
    setCommentLoading(true);
    setCommentError(null);
    setCommentSuccess(null);
    fetch(`${import.meta.env.VITE_API_URL}/comments/blog/${blog._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentForm),
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to add comment");
        }
        return res.json();
      })
      .then((newComment) => {
        setComments((prev) => [newComment, ...prev]);
        setCommentForm({ name: "", comment: "" });
        setCommentSuccess("Thank you! Your comment has been posted.");
        setTimeout(() => setCommentSuccess(null), 2500);
      })
      .catch((err) => setCommentError(err.message))
      .finally(() => setCommentLoading(false));
  };

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

      {/* HERO */}
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

      {/* Main content area */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-2 sm:px-4 max-w-[1350px]">
          <Button
            variant="outline"
            className="mb-8"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main blog */}
            <div className="flex-1 min-w-0">
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
                <Card className="overflow-hidden shadow-xl max-w-full mx-auto border-0">
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
                        {blog.tags?.map((tag) => (
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

              {/* Comments Section */}
              <section className="max-w-5xl mx-auto mt-12 mb-24">
                <div className="rounded-xl shadow-xl px-6 sm:px-10 py-10 bg-gradient-to-tr from-blue-50 to-white border border-blue-100">
                  <div className="flex items-center gap-2 mb-7">
                    <MessageCircle className="w-6 h-6 text-sky-500" />
                    <h3 className="text-2xl font-bold text-slate-800">
                      Comments ({comments.length})
                    </h3>
                  </div>
                  {/* New comment form */}
                  <form onSubmit={handleCommentSubmit} className="mb-10 space-y-3">
                    <div className="flex gap-4 flex-col sm:flex-row">
                      <input
                        className="border border-slate-300 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 p-2 rounded-md w-full max-w-xs"
                        type="text"
                        placeholder="Your Name"
                        value={commentForm.name}
                        onChange={(e) =>
                          setCommentForm((f) => ({ ...f, name: e.target.value }))
                        }
                        required
                        disabled={commentLoading}
                      />
                      <textarea
                        className="border border-slate-300 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 p-2 rounded-md w-full min-h-[46px]"
                        placeholder="Write your comment..."
                        value={commentForm.comment}
                        onChange={(e) =>
                          setCommentForm((f) => ({
                            ...f,
                            comment: e.target.value,
                          }))
                        }
                        required
                        disabled={commentLoading}
                      />
                      <button
                        type="submit"
                        className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded font-semibold transition shadow"
                        disabled={commentLoading}
                      >
                        {commentLoading ? "Posting..." : "Post"}
                      </button>
                    </div>
                    <div className="flex flex-col min-h-[24px]">
                      {commentError && (
                        <span className="text-red-600 text-sm mt-1">{commentError}</span>
                      )}
                      {commentSuccess && (
                        <span className="text-green-600 text-sm mt-1">{commentSuccess}</span>
                      )}
                    </div>
                  </form>
                  {/* List of comments */}
                  <div>
                    {commentsLoading ? (
                      <div className="text-slate-400 pb-10">Loading comments...</div>
                    ) : comments.length === 0 ? (
                      <div className="text-slate-400 pb-10">
                        No comments yet. Be the first!
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <AnimatePresence>
                          {comments.map((c) => (
                            <motion.div
                              key={c._id}
                              initial={{ opacity: 0, translateY: 24 }}
                              animate={{ opacity: 1, translateY: 0 }}
                              exit={{ opacity: 0, translateY: 24 }}
                              transition={{ duration: 0.18, type: "spring" }}
                              className="flex gap-3 items-start"
                            >
                              <div className="bg-sky-500 flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-inner select-none">
                                {getInitials(c.name || "U")}
                              </div>
                              <div className="flex-1 bg-white rounded-lg shadow-sm px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-sky-700">
                                    {c.name}
                                  </span>
                                  <span className="text-xs text-slate-400 ml-2">
                                    {timeAgo(c.createdAt)}
                                  </span>
                                </div>
                                <div className="text-slate-800 mt-1">{c.comment}</div>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </div>

            {/* SIDEBAR: Related blogs */}
            <aside className="w-full lg:w-[370px] flex-shrink-0">
              <div className="rounded-xl shadow-lg bg-white/90 border border-slate-100 p-5 sticky top-24">
                <div className="flex items-center gap-2 mb-5">
                  <BookOpen className="text-pink-600 w-5 h-5" />
                  <h4 className="font-semibold text-lg text-slate-800">
                    Related Blogs
                  </h4>
                </div>
                {relatedLoading ? (
                  <div className="text-slate-400 pb-6">Loading related blogs...</div>
                ) : related.length === 0 ? (
                  <div className="text-slate-400 pb-6">No related blogs found.</div>
                ) : (
                  <div className="space-y-4">
                    {related.map((rel) => (
                      <Link
                        to={`/blog/${rel.slug}`}
                        key={rel._id}
                        className="block"
                      >
                        <div className="flex gap-3 rounded-lg hover:bg-sky-50 transition-all px-2 py-2 items-center">
                          {rel.image && (
                            <img
                              src={rel.image}
                              alt={rel.title}
                              className="w-16 h-16 object-cover rounded-lg border border-slate-200"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-sky-700 font-bold truncate">{rel.title}</div>
                            <div className="text-xs text-slate-400">{rel.category}</div>
                            <div className="text-xs text-slate-500 truncate">{rel.excerpt}</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
      <Footer setIsContactModalOpen={setIsContactModalOpen} />
    </div>
  );
};

export default BlogDetails;
