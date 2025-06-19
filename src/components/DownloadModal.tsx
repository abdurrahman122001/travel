// components/DownloadModal.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

const DownloadModal = ({ isOpen, onClose }: any) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleDownload = () => {
    if (!email) return;

    setSubmitted(true);
    // Simulate download (ensure /public/itinerary.pdf exists)
    const link = document.createElement("a");
    link.href = "/itinerary.pdf"; 
    link.setAttribute("download", "Europe_Itinerary.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setEmail("");
      setSubmitted(false);
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2">
          <X className="text-gray-500 hover:text-red-600" />
        </button>

        <h2 className="text-lg font-semibold mb-1">Europe Itinerary</h2>
        <p className="text-sm mb-4 text-gray-600">
          11 Days European Pathways Community Trip - France, Netherlands, Germany, Czechia
        </p>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email ID *
          </label>
          <Input
            type="email"
            placeholder="abc@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <Button
          onClick={handleDownload}
          className="w-full bg-gray-600 text-white hover:bg-gray-700 font-semibold"
          disabled={submitted}
        >
          {submitted ? "Downloading..." : "📥 Download Itinerary"}
        </Button>

        {submitted && (
          <p className="text-xs text-green-600 mt-2">
            Your itinerary is downloading!
          </p>
        )}
      </div>
    </div>
  );
};

export default DownloadModal;
