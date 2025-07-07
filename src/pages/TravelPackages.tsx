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
} from "lucide-react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaClock,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import DownloadModal from "@/components/DownloadModal";
import Navigations from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BANNER_IMAGE =
  "https://images.wanderon.in/gallery/new/2024/12/24/prague-evening-cruise.AVIF";

const tabList = [
  { label: "Overview & Highlights", key: "overview" },
  { label: "Itinerary", key: "itinerary" },
  { label: "Inclusions", key: "inclusions" },
  { label: "Exclusions", key: "exclusions" },
  { label: "Other Info", key: "otherinfo" },
];
  const images = [
    {
      src: "https://images.wanderon.in/new-homepage-data/Gallery/vietnam%202",
      label: "Vietnam",
    },
    {
      src: "https://images.wanderon.in/new-homepage-data/Gallery/dubai%20re%2001?updatedAt=1711452484035/images/slide2.jpg",
      label: "Dubai",
    },
    {
      src: "https://images.wanderon.in/new-homepage-data/Gallery/bhutan%204",
      label: "Bhutan",
    },
    {
      src: "https://images.wanderon.in/new-homepage-data/Gallery/kerala-trips-1",
      label: "Kerala",
    },
    {
      src: "https://images.wanderon.in/new-homepage-data/Gallery/meghalaya%201?updatedAt=1711451040355",
      label: "Meghalaya",
    },
    {
      src: "https://images.wanderon.in/new-homepage-data/Gallery/uttarakhand-re-2?updatedAt=1711452678546",
      label: "Uttarakhand",
    },
  ];

const scrollToRef = (ref) => {
  ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const PackageDetailsPage = () => {
  // Params
  const { id } = useParams();

  // State
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trips, setTrips] = useState([]);
  const [loadingTrips, setLoadingTrips] = useState(true);

  // Section refs
  const overviewRef = useRef(null);
  const itineraryRef = useRef(null);
  const inclusionsRef = useRef(null);
  const exclusionsRef = useRef(null);
  const otherInfoRef = useRef(null);
  const prevBestRef = useRef(null);
  const nextBestRef = useRef(null);

  // UI state
  const [activeTab, setActiveTab] = useState(tabList[0].key);
  const [openItineraryIndexes, setOpenItineraryIndexes] = useState([0]);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [formStatus, setFormStatus] = useState("idle");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [formError, setFormError] = useState(""); // For error message

  // Swiper navigation refs
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

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
      // POST to booking API with packageId and title
      await axios.post(`${import.meta.env.VITE_API_URL || ""}/bookings`, {
        packageId: packageDetails._id,
        packageTitle: packageDetails.title,
        fullName: form.name,
        phone: form.phone,
        email: form.email,
      });
      setFormStatus("submitted");
      setForm({ name: "", phone: "", email: "" }); // reset
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

  // Fetch package by id
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL || ""}/packages/${id}`)
      .then((res) => setPackageDetails(res.data))
      .catch(() => setPackageDetails(null))
      .finally(() => setLoading(false));
  }, [id]);

  // Fetch best-selling trips (you can replace this endpoint)
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

  // Helper: show tags
  const getTagColor = (isRecommended) =>
    isRecommended ? "bg-yellow-400" : "bg-green-300";
  const getTagText = (isRecommended) =>
    isRecommended ? "Recommended" : "Popular";

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

  return (
    <div className="bg-[#f6fbfd] min-h-screen pb-8">
      <Navigations onContactClick={() => setIsContactModalOpen(true)} />
      <div className="relative w-full h-[430px] md:h-[440px] lg:h-[500px] flex items-end justify-center overflow-hidden">
        <img
          src={BANNER_IMAGE}
          alt="cover"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ minHeight: 320, filter: "brightness(0.70)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent z-10" />
        <Button
          onClick={() => setIsModalOpen(true)}
          className="mt-5 bg-[#FEE60E] hover:bg-yellow-400 text-black font-bold rounded-full shadow-md px-8 py-3 text-base transition absolute left-1/2 -translate-x-1/2 bottom-6 md:bottom-8 z-30"
          style={{ boxShadow: "0 8px 24px 0 rgba(0,0,0,0.12)" }}
        >
          <span className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-download"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            Download Itinerary
          </span>
        </Button>
        <DownloadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>

      {/* Trip Summary */}
      <div className="w-full max-w-[1480px] mx-auto flex flex-col md:flex-row gap-6 px-4 pt-16 pb-2 items-start relative z-10">
        <div className="flex-1">
          {/* Title */}
          <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4">
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

          {/* Overview & Highlights */}
          <div ref={overviewRef} className="scroll-mt-24">
            <h2 className="flex items-center text-lg font-bold text-sky-700 mb-1">
              <span className="border-l-4 border-sky-500 pl-2 mr-2" />
              Overview & Highlights
            </h2>
            <div className="bg-white rounded-lg shadow p-5 mb-8">
              <div className="mb-2">
                {(packageDetails.features || []).map((hl, idx) => (
                  <div
                    key={idx}
                    className="inline-block text-xs bg-sky-50 border border-sky-200 rounded px-3 py-1 mr-2 mb-2 text-sky-900 font-semibold"
                  >
                    {hl}
                  </div>
                ))}
              </div>
              <p className="text-gray-700 text-sm whitespace-pre-line">
                {packageDetails.itinerary ||
                  packageDetails.tripBreakdown ||
                  "No overview available."}
              </p>
            </div>
          </div>

          {/* Itinerary Accordion */}
          <div ref={itineraryRef} className="bg-white rounded-lg shadow mb-8">
            <div className="space-y-4">
              {/* If itinerary is rich text: display, else show as list */}
              {Array.isArray(packageDetails.itinerary) &&
                packageDetails.itinerary.length > 0
                ? packageDetails.itinerary.map((day, idx) => {
                  const isOpen = openItineraryIndexes.includes(idx);
                  return (
                    <div
                      key={idx}
                      className={`border-b last:border-0 ${isOpen ? "bg-blue-50" : ""}`}
                    >
                      <button
                        onClick={() => toggleDay(idx)}
                        className={`flex items-center justify-between w-full px-5 py-4 focus:outline-none text-left
                ${isOpen ? "bg-blue-50" : "bg-sky-50"}
                hover:bg-sky-100 transition`}
                      >
                        <span className="flex items-center">
                          <span className="bg-[#09c2e7] text-white rounded px-3 py-1 mr-2 text-xs font-bold inline-block">
                            Day {idx + 1}
                          </span>
                          <span className="text-base font-semibold">
                            {day.title || day}
                          </span>
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-6 h-6 text-sky-600" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-sky-600" />
                        )}
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-200 px-5
                ${isOpen ? "max-h-96 py-3 bg-blue-50" : "max-h-0 py-0 bg-white"}`}
                      >
                        {isOpen && day.details && Array.isArray(day.details) ? (
                          <ul className="list-disc ml-8 text-sm text-gray-700 space-y-2">
                            {day.details.map((detail, i) => (
                              <li key={i}>{detail}</li>
                            ))}
                          </ul>
                        ) : isOpen && day.details ? (
                          <div className="text-sm text-gray-700">
                            {day.details}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                })
                : packageDetails.itinerary && (
                  <div className="p-5 text-gray-600">
                    {packageDetails.itinerary}
                  </div>
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
              Other Info
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
              Wanderlust Calling?
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

      {/* Best-Selling Community Trips */}
      <div className="container mx-auto py-12">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1 tracking-tight">
            JOURNEY IN FRAMES
          </h2>
          <p className="text-lg text-gray-500">Pictures Perfect Moments</p>
        </div>

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
            {images.map((dest, index) => (
              <SwiperSlide key={index}>
                <div className="journey-frame-slide">
                  <img
                    src={dest.src}
                    alt={dest.label}
                    className="journey-frame-img"
                  />
                  <div className="journey-frame-label">
                    <MapPin
                      size={16}
                      style={{ marginRight: 4, marginBottom: 1 }}
                    />
                    {dest.label}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            ref={prevRef}
            className="swiper-button-custom absolute left-0 top-1/2 transform -translate-y-1/2 z-20"
          >
            ‹
          </button>
          <button
            ref={nextRef}
            className="swiper-button-custom absolute right-0 top-1/2 transform -translate-y-1/2 z-20"
          >
            ›
          </button>
        </section>

      </div>
      <Footer setIsContactModalOpen={setIsContactModalOpen} />
    </div>
  );
};

export default PackageDetailsPage;
