import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Phone, Mail, MapPin } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage(null);
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/contact-messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error("Failed to send message");
      setSubmitMessage("Message sent successfully!");
      setFormData({ fullName: "", email: "", phone: "", message: "" });
      setTimeout(onClose, 1500); // Optional: close modal after submit
    } catch (err) {
      setSubmitMessage("Failed to send message. Please try again.");
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <Card className="relative w-full max-w-sm mx-2 max-h-[90vh] overflow-y-auto shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Get in Touch</CardTitle>
              <CardDescription>
                We'd love to hear from you. Send us a message!
              </CardDescription>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pb-4">
          {/* Contact Information */}
          <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Phone</p>
                <p className="text-xs text-muted-foreground">
                  +1 (555) 123-4567
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Email</p>
                <p className="text-xs text-muted-foreground">
                  info@wanderlust.com
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Address</p>
                <p className="text-xs text-muted-foreground">
                  123 Travel St, City
                </p>
              </div>
            </div>
          </div>
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full min-h-[80px] px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Tell us about your travel plans..."
              />
            </div>
            {submitMessage && (
              <div className={`text-sm ${submitMessage.includes("success") ? "text-green-600" : "text-red-600"}`}>
                {submitMessage}
              </div>
            )}
            <div className="flex gap-2 pt-2">
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactModal;
