import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Calendar,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  X,
  Download,
  Phone,
} from "lucide-react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaClock,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import Navigations from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ContactModal from "@/components/ContactModal";

// Fallback banner image in case package image is not available
const FALLBACK_BANNER_IMAGE =
  "https://images.wanderon.in/gallery/new/2024/12/24/prague-evening-cruise.AVIF";

// Dynamic tab list that will be updated based on package data
const getTabList = (overviewTitle = "Overview & Highlights") => [
  { label: overviewTitle, key: "overview" },
  { label: "Itinerary", key: "itinerary" },
  { label: "Inclusions", key: "inclusions" },
  { label: "Exclusions", key: "exclusions" },
  { label: "Other Info", key: "otherinfo" },
];

const scrollToRef = (ref) => {
  ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
};

// Download Modal Component with Phone Number
const DownloadModal = ({ isOpen, onClose, onDownload, loading }) => {
  const [formData, setFormData] = useState({ email: "", phone: "" });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation (optional but if provided, validate)
    if (formData.phone && !/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onDownload(formData.email, formData.phone || "");
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Download Itinerary
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-gray-600 mb-4">
          Enter your details to download the detailed itinerary PDF. We'll also send you travel updates and offers.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="your@email.com"
              className="w-full"
              disabled={loading}
              required
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="tel"
                value={formData.phone}
                placeholder="Enter Your Phone No"
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full pl-10"
                disabled={loading}
              />
            </div>
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            <p className="text-xs text-gray-500 mt-1">
              We'll use this to send you important travel updates via WhatsApp
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              className="flex-1 bg-[#01AFD1] hover:bg-cyan-600"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Preparing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Download size={16} />
                  Download PDF
                </div>
              )}
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            By providing your details, you agree to receive travel updates and special offers.
          </p>
        </form>
      </div>
    </div>
  );
};

const PackageDetailsPage = () => {
  // Params
  const { slug } = useParams();

  // State
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trips, setTrips] = useState([]);
  const [loadingTrips, setLoadingTrips] = useState(true);
  const [tabList, setTabList] = useState(getTabList());

  // Dynamic homepage data state (same as Index component)
  const [homepageData, setHomepageData] = useState(null);
  const [loadingHomepage, setLoadingHomepage] = useState(true);

  // Section refs
  const overviewRef = useRef(null);
  const itineraryRef = useRef(null);
  const inclusionsRef = useRef(null);
  const exclusionsRef = useRef(null);
  const otherInfoRef = useRef(null);

  // UI state
  const [activeTab, setActiveTab] = useState(tabList[0].key);
  const [openItineraryIndexes, setOpenItineraryIndexes] = useState([0]);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [formStatus, setFormStatus] = useState("idle");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [downloading, setDownloading] = useState(false);

  // Swiper navigation refs
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Main content ref for PDF generation
  const contentRef = useRef(null);

  // Default data as fallback (same as Index component)
  const defaultHomepageData = {
    journeyFrames: [
      {
        src: "https://images.wanderon.in/new-homepage-data/Gallery/vietnam%202",
        label: "Vietnam"
      },
      {
        src: "https://images.wanderon.in/new-homepage-data/Gallery/dubai%20re%2001?updatedAt=1711452484035/images/slide2.jpg",
        label: "Dubai"
      },
      {
        src: "https://images.wanderon.in/new-homepage-data/Gallery/bhutan%204",
        label: "Bhutan"
      },
      {
        src: "https://images.wanderon.in/new-homepage-data/Gallery/kerala-trips-1",
        label: "Kerala"
      },
      {
        src: "https://images.wanderon.in/new-homepage-data/Gallery/meghalaya%201?updatedAt=1711451040355",
        label: "Meghalaya"
      },
      {
        src: "https://images.wanderon.in/new-homepage-data/Gallery/uttarakhand-re-2?updatedAt=1711452678546",
        label: "Uttarakhand"
      }
    ]
  };

  // Fetch homepage data (same as Index component)
  const fetchHomepageData = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/homepage`);
      if (res.ok) {
        const data = await res.json();
        setHomepageData(data);
      } else {
        // If no data exists, use default structure
        setHomepageData(defaultHomepageData);
      }
    } catch (error) {
      console.error('Error fetching homepage data:', error);
      // Use default data if fetch fails
      setHomepageData(defaultHomepageData);
    } finally {
      setLoadingHomepage(false);
    }
  };

  // Tab switch
  const handleTabClick = (key) => {
    setActiveTab(key);
    switch (key) {
      case "overview":
        scrollToRef(overviewRef);
        break;
      case "itinerary":
        scrollToRef(itineraryRef);
        break;
      case "inclusions":
        scrollToRef(inclusionsRef);
        break;
      case "exclusions":
        scrollToRef(exclusionsRef);
        break;
      case "otherinfo":
        scrollToRef(otherInfoRef);
        break;
      default:
        break;
    }
  };

  // Itinerary toggle
  const toggleDay = (idx) => {
    setOpenItineraryIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  // Contact form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("submitting");
    setFormError("");

    try {
      await axios.post(`${import.meta.env.VITE_API_URL || ""}/bookings`, {
        packageId: packageDetails._id,
        packageTitle: packageDetails.title,
        fullName: form.name,
        phone: form.phone,
        email: form.email,
      });
      setFormStatus("submitted");
      setForm({ name: "", phone: "", email: "" });
      setTimeout(() => setFormStatus("idle"), 2000);
    } catch (err) {
      setFormStatus("error");
      setFormError(
        err.response?.data?.message ||
        "Submission failed. Please try again."
      );
      setTimeout(() => setFormStatus("idle"), 2500);
    }
  };

  // Open download modal
  const handleDownloadClick = () => {
    setIsDownloadModalOpen(true);
  };

  // Track download details in database
  const trackDownloadDetails = async (email, phone, packageDetails) => {
    try {
      if (email && packageDetails?._id) {
        await axios.post(`${import.meta.env.VITE_API_URL}/download-emails/track`, {
          email: email.toLowerCase().trim(),
          phone: phone ? phone.replace(/\D/g, '') : "", // Clean phone number
          packageId: packageDetails._id,
          packageTitle: packageDetails.title,
          packageSlug: packageDetails.slug
        });
        console.log('Download tracked successfully for:', email);
      }
    } catch (trackError) {
      console.error('Failed to track download:', trackError);
      // Don't stop PDF generation if tracking fails
    }
  };

  // Generate and download PDF
  const generateAndDownloadPDF = async (email = "", phone = "") => {
    setDownloading(true);

    try {
      // Track download if email is provided
      if (email) {
        await trackDownloadDetails(email, phone, packageDetails);
      }

      const element = contentRef.current;
      if (!element) {
        throw new Error("Content not found");
      }

      // Create a temporary element with optimized styling for PDF
      const tempElement = document.createElement('div');
      tempElement.style.width = '210mm';
      tempElement.style.padding = '20mm';
      tempElement.style.background = 'white';
      tempElement.style.color = 'black';
      tempElement.style.fontFamily = 'Arial, Helvetica, sans-serif';
      tempElement.style.lineHeight = '1.4';

      // Header section
      const headerHTML = `
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #01AFD1; padding-bottom: 20px;">
          <h1 style="color: #01AFD1; font-size: 28px; margin: 0 0 10px 0; font-weight: bold;">${packageDetails.title}</h1>
          <div style="display: flex; justify-content: center; gap: 30px; margin-top: 15px; flex-wrap: wrap;">
            <div style="text-align: center;">
              <div style="font-size: 12px; color: #666; font-weight: bold;">DURATION</div>
              <div style="font-size: 14px; font-weight: bold; color: #333;">
                ${showDuration(packageDetails.nights, packageDetails.days, packageDetails.durationLabel)}
              </div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 12px; color: #666; font-weight: bold;">PICKUP & DROP</div>
              <div style="font-size: 14px; font-weight: bold; color: #333;">
                ${packageDetails.startLocation || packageDetails.pickupDrop || "-"}
              </div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 12px; color: #666; font-weight: bold;">STARTING FROM</div>
              <div style="font-size: 14px; font-weight: bold; color: #333;">
                ${formatPrice(packageDetails.price?.current)}
              </div>
            </div>
          </div>
        </div>
      `;

      // Overview section - using dynamic title
      const overviewTitle = packageDetails.overviewTitle || "Overview & Highlights";
      const overviewHTML = `
        <div style="margin-bottom: 25px;">
          <h2 style="color: #01AFD1; font-size: 20px; border-left: 4px solid #01AFD1; padding-left: 10px; margin-bottom: 15px; font-weight: bold;">
            ${overviewTitle}
          </h2>
          <div style="margin-bottom: 15px;">
            ${(packageDetails.features || []).map(feature =>
        `<span style="display: inline-block; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 15px; padding: 6px 12px; margin: 0 8px 8px 0; font-size: 11px; color: #0369a1; font-weight: bold;">${feature}</span>`
      ).join('')}
          </div>
          <p style="font-size: 14px; line-height: 1.6; color: #333; text-align: justify;">
            ${packageDetails.overview || packageDetails.itinerary || packageDetails.tripBreakdown || "No overview available."}
          </p>
        </div>
      `;

      // Itinerary section
      let itineraryHTML = '';
      if (Array.isArray(packageDetails.itinerary) && packageDetails.itinerary.length > 0) {
        itineraryHTML = `
          <div style="margin-bottom: 25px;">
            <h2 style="color: #01AFD1; font-size: 20px; border-left: 4px solid #01AFD1; padding-left: 10px; margin-bottom: 15px; font-weight: bold;">
              Detailed Itinerary
            </h2>
            ${packageDetails.itinerary.map((day, idx) => `
              <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #e5e7eb; border-radius: 8px; background: #fafafa;">
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                  <span style="background: #09c2e7; color: white; border-radius: 20px; padding: 6px 15px; margin-right: 12px; font-size: 12px; font-weight: bold;">
                    DAY ${idx + 1}
                  </span>
                  <span style="font-size: 16px; font-weight: bold; color: #111827;">
                    ${day.title || `Day ${idx + 1}`}
                  </span>
                </div>
                ${day.description ? `<p style="font-size: 14px; line-height: 1.6; color: #374151; margin-bottom: 12px; background: white; padding: 10px; border-radius: 4px;">${day.description}</p>` : ''}
                ${day.activities && Array.isArray(day.activities) && day.activities.length > 0 ? `
                  <div style="margin-bottom: 12px;">
                    <h4 style="font-size: 14px; font-weight: bold; color: #111827; margin-bottom: 8px;">🏃‍♂️ ACTIVITIES:</h4>
                    <ul style="margin: 0; padding-left: 20px; background: white; padding: 15px; border-radius: 4px;">
                      ${day.activities.map(activity => `<li style="font-size: 13px; line-height: 1.5; color: #374151; margin-bottom: 6px;">${activity}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}
                ${day.details && Array.isArray(day.details) && day.details.length > 0 ? `
                  <div style="margin-bottom: 12px;">
                    <h4 style="font-size: 14px; font-weight: bold; color: #111827; margin-bottom: 8px;">📝 DETAILS:</h4>
                    <ul style="margin: 0; padding-left: 20px; background: white; padding: 15px; border-radius: 4px;">
                      ${day.details.map(detail => `<li style="font-size: 13px; line-height: 1.5; color: #374151; margin-bottom: 6px;">${detail}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}
                ${(day.meals || day.accommodation) ? `
                  <div style="background: white; padding: 12px; border-radius: 6px; border-left: 4px solid #10b981;">
                    ${day.meals ? `<div style="font-size: 12px; color: #059669; margin-bottom: 4px;"><strong>🍽️ MEALS:</strong> ${day.meals}</div>` : ''}
                    ${day.accommodation ? `<div style="font-size: 12px; color: #059669;"><strong>🏨 ACCOMMODATION:</strong> ${day.accommodation}</div>` : ''}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        `;
      }

      // Inclusions section
      const inclusionsHTML = `
        <div style="margin-bottom: 25px;">
          <h2 style="color: #10b981; font-size: 20px; border-left: 4px solid #10b981; padding-left: 10px; margin-bottom: 15px; font-weight: bold;">
            ✅ Inclusions
          </h2>
          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border: 1px solid #bbf7d0;">
            <ul style="margin: 0; padding-left: 20px;">
              ${(packageDetails.inclusions || []).map(inc => `
                <li style="font-size: 14px; line-height: 1.6; color: #374151; margin-bottom: 8px;">
                  <span style="color: #10b981; margin-right: 8px;">✓</span>${inc}
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      `;

      // Exclusions section
      const exclusionsHTML = `
        <div style="margin-bottom: 25px;">
          <h2 style="color: #ef4444; font-size: 20px; border-left: 4px solid #ef4444; padding-left: 10px; margin-bottom: 15px; font-weight: bold;">
            ❌ Exclusions
          </h2>
          <div style="background: #fef2f2; padding: 20px; border-radius: 8px; border: 1px solid #fecaca;">
            <ul style="margin: 0; padding-left: 20px;">
              ${(packageDetails.exclusions || []).map(exc => `
                <li style="font-size: 14px; line-height: 1.6; color: #374151; margin-bottom: 8px;">
                  <span style="color: #ef4444; margin-right: 8px;">✗</span>${exc}
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      `;

      // Footer with downloader info
      const footerHTML = `
        <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; color: #6b7280; font-size: 12px;">
          <p style="margin: 0 0 8px 0; font-weight: bold;">Generated from Breakout Wanderers</p>
          <p style="margin: 0 0 8px 0;">📅 ${new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p style="margin: 0;">📞 Contact: +91-XXXXXXXXXX | ✉️ support@breakoutwanderers.com</p>
          ${email ? `
            <div style="margin: 8px 0 0 0; padding: 8px; background: #f8fafc; border-radius: 4px; border-left: 4px solid #01AFD1;">
              <p style="margin: 0; font-style: italic; font-weight: bold;">Downloaded by:</p>
              <p style="margin: 4px 0 0 0;">📧 ${email}</p>
              ${phone ? `<p style="margin: 2px 0 0 0;">📱 ${phone}</p>` : ''}
            </div>
          ` : ''}
        </div>
      `;

      // Combine all sections
      tempElement.innerHTML = headerHTML + overviewHTML + itineraryHTML + inclusionsHTML + exclusionsHTML + footerHTML;

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();

      // Add content to PDF
      await pdf.html(tempElement, {
        margin: [15, 15, 15, 15],
        html2canvas: {
          scale: 0.6,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
        },
        callback: function (pdf) {
          // Save the PDF
          const fileName = `${packageDetails.title.replace(/\s+/g, '_')}_Itinerary.pdf`;
          pdf.save(fileName);

          // Close modal after successful download
          setIsDownloadModalOpen(false);
        },
        x: 0,
        y: 0,
        width: pageWidth - 30,
        windowWidth: 800,
      });

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to download itinerary. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  // Handle download with email and phone
  const handleDownloadWithDetails = (email, phone) => {
    generateAndDownloadPDF(email, phone);
  };

  // Get banner image from package data
  const getBannerImage = () => {
    // Priority order for banner images
    if (packageDetails?.image) return packageDetails.image;
    if (packageDetails?.image?.[0]) return packageDetails.image[0];
    if (packageDetails?.image?.[0]) return packageDetails.image[0];
    return FALLBACK_BANNER_IMAGE;
  };

  // Fetch homepage data
  useEffect(() => {
    fetchHomepageData();
  }, []);

  // Fetch package by slug
  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL || ""}/packages/slug/${slug}`)
      .then((res) => {
        setPackageDetails(res.data);
        // Update tab list with dynamic overview title
        const overviewTitle = res.data.overviewTitle || "Overview & Highlights";
        setTabList(getTabList(overviewTitle));
      })
      .catch(() => setPackageDetails(null))
      .finally(() => setLoading(false));
  }, [slug]);

  // Fetch best-selling trips
  useEffect(() => {
    setLoadingTrips(true);
    axios
      .get(`${import.meta.env.VITE_API_URL || ""}/packages?limit=8`)
      .then((res) => setTrips(res.data))
      .catch(() => setTrips([]))
      .finally(() => setLoadingTrips(false));
  }, []);

  // Helper: format price
  const formatPrice = (num) =>
    num ? `₹${num.toLocaleString("en-IN")}` : "";

  // Helper: show duration (nights/days)
  const showDuration = (n, d, label) =>
    label
      ? label
      : n && d
        ? `${n}N/${d}D`
        : n
          ? `${n} Nights`
          : d
            ? `${d} Days`
            : "";

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center text-lg text-gray-400">
        Loading...
      </div>
    );
  if (!packageDetails)
    return (
      <div className="w-full h-screen flex items-center justify-center text-lg text-gray-400">
        Package not found.
      </div>
    );

  const bannerImage = getBannerImage();

  return (
    <>
      {/* Main Page Content */}
      <div className="bg-[#f6fbfd] min-h-screen pb-8" ref={contentRef}>
        <Navigations onContactClick={() => setIsContactModalOpen(true)} />

        {/* Banner Section with Dynamic Package Image */}
        <div className="relative w-full h-[430px] md:h-[440px] lg:h-[500px] flex items-end justify-center overflow-hidden">
          <img
            src={bannerImage}
            alt={packageDetails.title}
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{ minHeight: 320, filter: "brightness(0.70)" }}
            onError={(e) => {
              // If the package image fails to load, fallback to default
              if (e.target.src !== FALLBACK_BANNER_IMAGE) {
                e.target.src = FALLBACK_BANNER_IMAGE;
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent z-10" />

          {/* Package Title Overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center text-white px-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
                {packageDetails.title}
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto drop-shadow">
                {packageDetails.tagline || packageDetails.shortDescription || "Experience the journey of a lifetime"}
              </p>
            </div>
          </div>

          <Button
            onClick={handleDownloadClick}
            disabled={downloading}
            className="mt-5 bg-[#FEE60E] hover:bg-yellow-400 text-black font-bold rounded-full shadow-md px-8 py-3 text-base transition absolute left-1/2 -translate-x-1/2 bottom-6 md:bottom-8 z-30"
            style={{ boxShadow: "0 8px 24px 0 rgba(0,0,0,0.12)" }}
          >
            <span className="flex items-center gap-2">
              <Download size={18} />
              {downloading ? "Generating PDF..." : "Download Itinerary"}
            </span>
          </Button>
        </div>

        {/* Trip Summary */}
        <div className="w-full max-w-[1480px] mx-auto flex flex-col md:flex-row gap-6 px-4 pt-16 pb-2 items-start relative z-10">
          <div className="flex-1">
            {/* Title (Hidden here since it's now in the banner) */}
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4 sr-only">
              {packageDetails.title}
            </div>
            {/* Pickup & Drop, Duration Badges */}
            <div className="flex flex-wrap gap-4 mb-4">
              {/* Pickup & Drop */}
              <div
                className="flex items-center bg-[#f6f7fa] px-5 py-3 rounded-md shadow-sm"
                style={{ minWidth: 220 }}
              >
                <MapPin className="w-5 h-5 text-sky-400 mr-2" />
                <div>
                  <div className="text-xs text-gray-500">Pickup & Drop</div>
                  <div className="text-sm font-semibold text-slate-800">
                    {packageDetails.startLocation ||
                      packageDetails.pickupDrop ||
                      "-"}
                  </div>
                </div>
              </div>
              {/* Duration */}
              <div
                className="flex items-center bg-[#f6f7fa] px-5 py-3 rounded-md shadow-sm"
                style={{ minWidth: 160 }}
              >
                <Calendar className="w-5 h-5 text-sky-400 mr-2" />
                <div>
                  <div className="text-xs text-gray-500">Duration</div>
                  <div className="text-sm font-semibold text-slate-800">
                    {showDuration(
                      packageDetails.nights,
                      packageDetails.days,
                      packageDetails.durationLabel
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Section */}
        <div className="w-full max-w-[1480px] mx-auto flex flex-col md:flex-row mt-4 gap-8 px-4">
          {/* LEFT: Main Content with Tabs */}
          <div className="flex-1 min-w-0">
            {/* Tab Bar */}
            <div className="flex bg-white rounded-lg shadow border border-gray-100 w-full mb-6 overflow-x-auto">
              {tabList.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => handleTabClick(tab.key)}
                  className={`flex-1 min-w-[180px] py-3 px-4 font-semibold text-base transition
                    border-b-2 ${activeTab === tab.key
                      ? "border-sky-400 text-sky-500 bg-[#f3fdff]"
                      : "border-transparent text-slate-700 hover:bg-slate-50"
                    } rounded-lg first:rounded-l-lg last:rounded-r-lg`}
                  style={{ outline: "none" }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Overview & Highlights - Dynamic Title */}
            <div ref={overviewRef} className="scroll-mt-24">
              <h2 className="flex items-center text-lg font-bold text-sky-700 mb-1">
                <span className="border-l-4 border-sky-500 pl-2 mr-2" />
                {packageDetails.overviewTitle || "Overview & Highlights"}
              </h2>

              <div className="bg-white rounded-lg shadow p-5 mb-8">

                {/* Overview Section */}
                {packageDetails.overview && (
                  <div className="border-b border-gray-200 pb-6 mb-6">
                    <div className="flex items-center mb-4">
                      <span className="bg-[#09c2e7] text-white rounded px-3 py-1 mr-3 text-sm font-bold">
                        OVERVIEW
                      </span>
                      <span className="text-base font-semibold text-gray-800">
                        Package Overview
                      </span>
                    </div>
                    <div className="pl-14">
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {packageDetails.overview}
                      </p>
                    </div>
                  </div>
                )}

                {/* Features Section */}
                {packageDetails.features && packageDetails.features.length > 0 && (
                  <div className="border-b border-gray-200 pb-6 mb-6">
                    <div className="flex items-center mb-4">
                      <span className="bg-[#09c2e7] text-white rounded px-3 py-1 mr-3 text-sm font-bold">
                        FEATURES
                      </span>
                      <span className="text-base font-semibold text-gray-800">
                        Key Highlights
                      </span>
                    </div>
                    <div className="pl-14">
                      <div className="mb-4">
                        {packageDetails.features.map((hl, idx) => (
                          <div
                            key={idx}
                            className="inline-block text-xs bg-sky-50 border border-sky-200 rounded px-3 py-1 mr-2 mb-2 text-sky-900 font-semibold"
                          >
                            {hl}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Fallback if no content */}
                {!packageDetails.overview &&
                  !packageDetails.features?.length &&
                  !packageDetails.tripBreakdown &&
                  !packageDetails.itinerary && (
                    <div className="text-center py-8">
                      <p className="text-gray-500 text-sm">
                        No overview content available.
                      </p>
                    </div>
                  )}
              </div>
            </div>

            {/* Itinerary */}
            <div ref={itineraryRef} className="scroll-mt-24">
              <h2 className="flex items-center text-lg font-bold text-sky-700 mb-1">
                <span className="border-l-4 border-sky-500 pl-2 mr-2" />
                Itinerary
              </h2>
              <div className="bg-white rounded-lg shadow p-5 mb-8">
                {Array.isArray(packageDetails.itinerary) && packageDetails.itinerary.length > 0 ? (
                  <div className="space-y-6">
                    {packageDetails.itinerary.map((day, idx) => {
                      const isOpen = openItineraryIndexes.includes(idx);
                      return (
                        <div key={idx} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                          <button
                            onClick={() => toggleDay(idx)}
                            className="flex items-center justify-between w-full text-left focus:outline-none"
                          >
                            <div className="flex items-center">
                              <span className="bg-[#09c2e7] text-white rounded px-3 py-1 mr-3 text-sm font-bold">
                                Day {idx + 1}
                              </span>
                              <span className="text-base font-semibold text-gray-800">
                                {day.title || `Day ${idx + 1}`}
                              </span>
                            </div>
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-sky-600" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-sky-600" />
                            )}
                          </button>

                          {isOpen && (
                            <div className="mt-4 pl-14">
                              {day.description && (
                                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                                  {day.description}
                                </p>
                              )}

                              {day.activities && Array.isArray(day.activities) && day.activities.length > 0 && (
                                <div className="space-y-3">
                                  <h4 className="font-semibold text-gray-800 text-sm mb-2">Activities:</h4>
                                  <ul className="space-y-2">
                                    {day.activities.map((activity, activityIdx) => (
                                      <li key={activityIdx} className="flex items-start text-sm text-gray-700">
                                        <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <span>{activity}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {day.details && Array.isArray(day.details) && day.details.length > 0 && (
                                <div className="space-y-3 mt-4">
                                  <h4 className="font-semibold text-gray-800 text-sm mb-2">Details:</h4>
                                  <ul className="space-y-2">
                                    {day.details.map((detail, detailIdx) => (
                                      <li key={detailIdx} className="flex items-start text-sm text-gray-700">
                                        <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <span>{detail}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {day.details && typeof day.details === 'string' && (
                                <p className="text-gray-700 text-sm leading-relaxed">
                                  {day.details}
                                </p>
                              )}

                              {(day.meals || day.accommodation) && (
                                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                  {day.meals && (
                                    <div className="text-xs text-gray-600 mb-1">
                                      <span className="font-semibold">Meals:</span> {day.meals}
                                    </div>
                                  )}
                                  {day.accommodation && (
                                    <div className="text-xs text-gray-600">
                                      <span className="font-semibold">Accommodation:</span> {day.accommodation}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : packageDetails.itinerary && typeof packageDetails.itinerary === 'string' ? (
                  <p className="text-gray-700 text-sm whitespace-pre-line">
                    {packageDetails.itinerary}
                  </p>
                ) : (
                  <p className="text-gray-500 text-sm">No itinerary available.</p>
                )}
              </div>
            </div>

            {/* Inclusions */}
            <div ref={inclusionsRef} className="scroll-mt-24">
              <h2 className="flex items-center text-lg font-bold text-green-700 mb-1">
                <span className="border-l-4 border-green-400 pl-2 mr-2" />
                Inclusions
              </h2>
              <div className="bg-white rounded-lg shadow p-5 mb-8">
                <ul className="space-y-2">
                  {(packageDetails.inclusions || []).map((inc, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <CheckCircle2 className="h-4 w-4 text-green-500" /> {inc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Exclusions */}
            <div ref={exclusionsRef} className="scroll-mt-24">
              <h2 className="flex items-center text-lg font-bold text-red-700 mb-1">
                <span className="border-l-4 border-red-400 pl-2 mr-2" />
                Exclusions
              </h2>
              <div className="bg-white rounded-lg shadow p-5 mb-8">
                <ul className="space-y-2">
                  {(packageDetails.exclusions || []).map((exc, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <span className="w-4 h-4 border border-red-300 rounded"></span>
                      {exc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Other Info */}
            <div ref={otherInfoRef} className="scroll-mt-24">
              <h2 className="flex items-center text-lg font-bold text-gray-700 mb-1">
                <span className="border-l-4 border-gray-300 pl-2 mr-2" />
                Terms & Conditions
              </h2>
              <div className="bg-white rounded-lg shadow p-5 mb-8">
                <p className="text-sm text-gray-500">
                  {packageDetails.terms ||
                    packageDetails.otherInfo ||
                    "For more information, please contact our support team."}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Sticky Contact Form */}
          <div className="md:w-[340px] w-full md:sticky md:top-24 h-fit shrink-0">
            <div className="md:w-[340px] w-full">
              <div className="bg-white rounded-lg border border-sky-200 shadow p-5 flex flex-col items-center text-center">
                <span className="block text-xs text-gray-500 mb-1">
                  Starting from
                </span>
                <span className="text-2xl font-bold text-sky-700 mb-1">
                  {formatPrice(packageDetails.price?.current)}
                </span>
                <span className="text-xs text-gray-500 mb-3">
                  {packageDetails.price?.label || "per person"}
                </span>
                <Button className="w-full bg-[#01AFD1] hover:bg-cyan-500 text-white font-semibold rounded-full transition">
                  Dates & Costing
                </Button>
              </div>
            </div>
            <div className="bg-[#eafdff] border border-sky-200 rounded-lg shadow p-5">
              <h3 className="font-bold text-sky-700 mb-2 text-sm">
                Breakout Wanderers Calling?
                <br />
                Allow Us to Call You Back!
              </h3>
              <form className="space-y-3" onSubmit={handleFormSubmit}>
                <div>
                  <label className="block text-xs font-medium text-sky-900 mb-1">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    required
                    placeholder="e.g. John Smith"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-sky-900 mb-1">
                    Phone No. *
                  </label>
                  <Input
                    type="tel"
                    required
                    placeholder="Enter your 10 digit number"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    pattern="[0-9]{10,}"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-sky-900 mb-1">
                    Email ID *
                  </label>
                  <Input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                  />
                </div>
                <Button
                  className="w-full rounded-full bg-[#FEE60E] hover:bg-yellow-400 text-black font-bold mt-2"
                  type="submit"
                  disabled={formStatus === "submitting" || formStatus === "submitted"}
                >
                  {formStatus === "submitting"
                    ? "Submitting..."
                    : formStatus === "submitted"
                      ? "Submitted!"
                      : "Submit"}
                </Button>
                {formStatus === "error" && (
                  <div className="text-xs text-red-600 mt-2">{formError}</div>
                )}
                {formStatus === "submitted" && (
                  <div className="text-xs text-green-700 mt-2">We received your request!</div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Journey Frames Section - Dynamically Loaded */}
        <div className="container mx-auto py-12">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1 tracking-tight">
              JOURNEY IN FRAMES
            </h2>
            <p className="text-lg text-gray-500">Pictures Perfect Moments</p>
          </div>

          {loadingHomepage ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <section className="relative custom-swiper-slider">
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={16}
                slidesPerView={4}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
                onInit={(swiper) => {
                  // @ts-ignore
                  swiper.params.navigation.prevEl = prevRef.current;
                  // @ts-ignore
                  swiper.params.navigation.nextEl = nextRef.current;
                  swiper.navigation.init();
                  swiper.navigation.update();
                }}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 4 },
                }}
              >
                {(homepageData?.journeyFrames || defaultHomepageData.journeyFrames).map((dest, index) => (
                  <SwiperSlide key={index}>
                    <div className="journey-frame-slide">
                      <img
                        src={dest.src}
                        alt={dest.label}
                        className="journey-frame-img w-full h-64 object-cover rounded-lg"
                      />
                      <div className="journey-frame-label mt-2 flex items-center justify-center text-gray-700 font-medium">
                        <MapPin
                          size={16}
                          className="mr-1"
                        />
                        {dest.label}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <button
                ref={prevRef}
                className="swiper-button-custom absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
              >
                ‹
              </button>
              <button
                ref={nextRef}
                className="swiper-button-custom absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
              >
                ›
              </button>
            </section>
          )}
        </div>

        <Footer setIsContactModalOpen={setIsContactModalOpen} />
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />
      </div>

      {/* Download Modal */}
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        onDownload={handleDownloadWithDetails}
        loading={downloading}
      />
    </>
  );
};

export default PackageDetailsPage;