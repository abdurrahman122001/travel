import React, { useRef, useState } from "react";
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
// --- DEMO DATA ---
import Footer from "@/components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const trips = [
  {
    img: "https://images.wanderon.in/gallery/new/2024/12/13/backpacking-trip-to-europe-10n-11d.avif",
    oldPrice: "₹2,29,990/-",
    price: "₹1,69,990",
    priceText: "onwards",
    tag: "Recommended",
    title:
      "11 Days European Pathways Community Trip - France, Netherlands, Germany, Czechia",
    subtitle: "3N Paris · 3N Amsterdam· 2N Prague",
    days: "10N/11D",
    airport: "Paris Airport - Prague",
    start: "9 Aug, 27 Sep",
    // batch: "+1 batch",
    icon: "fa-solid fa-location-dot",
    badgeColor: "bg-yellow-400",
    tagColor: "bg-yellow-400",
    tagText: "Recommended",
  },
  {
    img: "https://images.wanderon.in/gallery/new/2025/06/10/1749541707344-spain-community-trip-9n-10ds-new.webp",
    oldPrice: "₹2,09,990/-",
    price: "₹1,49,999",
    priceText: "onwards",
    tag: "Popular",
    title: "10 Days Spain Community Trip | La Tomatina Special",
    subtitle: "Barcelona · Ibiza · Valencia · Bunol ",
    days: "9N/10D",
    airport: "Barcelona - Madrid",
    start: "21 Aug",
    batch: "",
    badgeColor: "bg-yellow-400",
    tagColor: "bg-green-300",
    tagText: "Popular",
  },
  {
    img: "https://images.wanderon.in/gallery/new/2025/06/09/1749455995718-oktoberfest-trip-package-10n-11d.webp",
    oldPrice: "₹2,29,990/-",
    price: "₹1,89,990",
    priceText: "onwards",
    tag: "Recommended",
    title: "Live Europe’s Best Moments: 11-Day Oktoberfest Community Trip",
    subtitle: "Amsterdam · Paris · Eiffel Tower",
    days: "10N/11D",
    airport: "Amsterdam Airport - Prague",
    start: "16 Sep",
    batch: "",
    badgeColor: "bg-yellow-400",
    tagColor: "bg-yellow-400",
    tagText: "Recommended",
  },
  {
    img: "https://images.wanderon.in/gallery/new/2024/12/13/europe-community-trip-7n-8d.avif",
    oldPrice: "₹2,09,990/-",
    price: "₹1,44,990",
    priceText: "onwards",
    tag: "Recommended",
    title:
      "8 Days European Trails Community Trip - Netherlands, Germany, Czechia",
    subtitle: "3N Amsterdam · 2N Berlin · 2N Prague",
    days: "7N/8D",
    airport: "Amsterdam Airport - Prague",
    start: "12 Aug, 30 Sep",
    // batch: "+1 batch",
    badgeColor: "bg-yellow-400",
    tagColor: "bg-yellow-400",
    tagText: "Recommended",
  },
  {
    img: "https://images.wanderon.in/gallery/new/2024/12/13/backpacking-trip-to-europe-10n-11d.avif",
    oldPrice: "₹2,29,990/-",
    price: "₹1,69,990",
    priceText: "onwards",
    tag: "Recommended",
    title:
      "11 Days European Pathways Community Trip - France, Netherlands, Germany, Czechia",
    subtitle: "3N Paris · 3N Amsterdam· 2N Prague",
    days: "10N/11D",
    airport: "Paris Airport - Prague",
    start: "9 Aug, 27 Sep",
    // batch: "+1 batch",
    icon: "fa-solid fa-location-dot",
    badgeColor: "bg-yellow-400",
    tagColor: "bg-yellow-400",
    tagText: "Recommended",
  },
  {
    img: "https://images.wanderon.in/gallery/new/2025/06/10/1749541707344-spain-community-trip-9n-10ds-new.webp",
    oldPrice: "₹2,09,990/-",
    price: "₹1,49,999",
    priceText: "onwards",
    tag: "Popular",
    title: "10 Days Spain Community Trip | La Tomatina Special",
    subtitle: "Barcelona · Ibiza · Valencia · Bunol ",
    days: "9N/10D",
    airport: "Barcelona - Madrid",
    start: "21 Aug",
    batch: "",
    badgeColor: "bg-yellow-400",
    tagColor: "bg-green-300",
    tagText: "Popular",
  },
  {
    img: "https://images.wanderon.in/gallery/new/2025/06/09/1749455995718-oktoberfest-trip-package-10n-11d.webp",
    oldPrice: "₹2,29,990/-",
    price: "₹1,89,990",
    priceText: "onwards",
    tag: "Recommended",
    title: "Live Europe’s Best Moments: 11-Day Oktoberfest Community Trip",
    subtitle: "Amsterdam · Paris · Eiffel Tower",
    days: "10N/11D",
    airport: "Amsterdam Airport - Prague",
    start: "16 Sep",
    batch: "",
    badgeColor: "bg-yellow-400",
    tagColor: "bg-yellow-400",
    tagText: "Recommended",
  },
  {
    img: "https://images.wanderon.in/gallery/new/2024/12/13/europe-community-trip-7n-8d.avif",
    oldPrice: "₹2,09,990/-",
    price: "₹1,44,990",
    priceText: "onwards",
    tag: "Recommended",
    title:
      "8 Days European Trails Community Trip - Netherlands, Germany, Czechia",
    subtitle: "3N Amsterdam · 2N Berlin · 2N Prague",
    days: "7N/8D",
    airport: "Amsterdam Airport - Prague",
    start: "12 Aug, 30 Sep",
    // batch: "+1 batch",
    badgeColor: "bg-yellow-400",
    tagColor: "bg-yellow-400",
    tagText: "Recommended",
  },
];
const packageDetails = {
  bannerImage:
    "https://images.wanderon.in/gallery/new/2024/12/24/prague-evening-cruise.AVIF",
  title:
    "11 Days European Pathways Community Trip - France, Netherlands, Germany, Czechia",
  pickupDrop: "Paris Airport - Prague Airport",
  duration: "10N - 11D",
  price: "₹1,69,990/-",
  perPerson: "per person",
  highlights: ["3N Paris", "3N Amsterdam", "2N Berlin", "2N Prague"],
  overview: `Join us as we take you to some of the dreamiest places in the world. We are talking about our amazing Backpacking Trip to Europe, covering Czechia, Germany, the Netherlands, and France in 11 days!
This unforgettable adventure offers the perfect blend of guided tours and leisure time, ensuring you experience the best of each destination. Explore iconic cities with hop-on-hop-off bus tours, giving you a brief look at landmarks like the Eiffel Tower, and Prague’s Astronomical Clock.`,
  itinerary: [
    {
      day: "Day 1",
      title: "Arrival in Paris",
      details: [
        "Meet at Paris Airport",
        "Transfer to hotel, check-in",
        "Welcome dinner and orientation",
      ],
    },
    {
      day: "Day 2",
      title: "Paris Sightseeing",
      details: [
        "Guided city tour including Eiffel Tower",
        "Hop-on-hop-off bus tour",
        "Evening at leisure",
      ],
    },
    {
      day: "Day 3",
      title: "Travel to Amsterdam",
      details: [
        "Morning departure for Amsterdam",
        "Check-in and canal cruise",
        "Free evening to explore",
      ],
    },
  ],
  inclusions: [
    "Accommodation in 3-star hotels",
    "Daily breakfast",
    "All intercity transfers",
    "Guided sightseeing tours",
    "Entry tickets to key attractions",
  ],
  exclusions: [
    "Personal expenses",
    "Lunch and dinner",
    "Visa fees",
    "Travel insurance",
  ],
  otherInfo: `For more information, please contact our support team.`,
};

const tabList = [
  { label: "Overview & Highlights", key: "overview" },
  { label: "Itinerary", key: "itinerary" },
  { label: "Inclusions", key: "inclusions" },
  { label: "Exclusions", key: "exclusions" },
  { label: "Other Info", key: "otherinfo" },
];

const scrollToRef = (ref) => {
  ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
};
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

const PackageDetailsPage = () => {
  // Section refs
  const overviewRef = useRef(null);
  const itineraryRef = useRef(null);
  const inclusionsRef = useRef(null);
  const exclusionsRef = useRef(null);
  const otherInfoRef = useRef(null);

  // Tab state
  const [activeTab, setActiveTab] = useState(tabList[0].key);
  const [openItineraryIndexes, setOpenItineraryIndexes] = useState([0]);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [formStatus, setFormStatus] = useState("idle");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  // Handle scrolling/tab
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

  // Itinerary accordion toggle
  const toggleDay = (idx) => {
    setOpenItineraryIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  // Contact form submission (demo only)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus("submitted");
    setTimeout(() => setFormStatus("idle"), 2000);
  };

  return (
    <div className="bg-[#f6fbfd] min-h-screen pb-8">
      <Navigations onContactClick={() => setIsContactModalOpen(true)} />
      <div className="relative w-full h-[430px] md:h-[440px] lg:h-[500px] flex items-end justify-center overflow-hidden">
        <img
          src={packageDetails.bannerImage}
          alt="cover"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ minHeight: 320, filter: "brightness(0.70)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent z-10" />
        <div className="z-20 w-full px-4 flex flex-col items-center pb-8 relative"></div>
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
                  {packageDetails.pickupDrop}
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
                  {packageDetails.duration}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Pricing Box */}
        {/* <div className="md:w-[340px] w-full">
          <div className="bg-white rounded-lg border border-sky-200 shadow p-5 flex flex-col items-center text-center">
            <span className="block text-xs text-gray-500 mb-1">
              Starting from
            </span>
            <span className="text-2xl font-bold text-sky-700 mb-1">
              {packageDetails.price}
            </span>
            <span className="text-xs text-gray-500 mb-3">
              {packageDetails.perPerson}
            </span>
            <Button className="w-full bg-cyan-400 hover:bg-cyan-500 text-white font-semibold rounded transition">
              Dates & Costing
            </Button>
          </div>
        </div> */}
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

          {/* Main Content Sections */}
          <div ref={overviewRef} className="scroll-mt-24">
            <h2 className="flex items-center text-lg font-bold text-sky-700 mb-1">
              <span className="border-l-4 border-sky-500 pl-2 mr-2" />
              Overview & Highlights
            </h2>
            <div className="bg-white rounded-lg shadow p-5 mb-8">
              <div className="mb-2">
                {packageDetails.highlights.map((hl, idx) => (
                  <div
                    key={idx}
                    className="inline-block text-xs bg-sky-50 border border-sky-200 rounded px-3 py-1 mr-2 mb-2 text-sky-900 font-semibold"
                  >
                    {hl}
                  </div>
                ))}
              </div>
              <p className="text-gray-700 text-sm whitespace-pre-line">
                {packageDetails.overview}
              </p>
            </div>
          </div>

    <div className="bg-white rounded-lg shadow mb-8">
      <div className="space-y-4"> {/* <-- this adds a gap between each FAQ */}
        {packageDetails.itinerary.map((day, idx) => {
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
                    {day.day}
                  </span>
                  <span className="text-base font-semibold">{day.title}</span>
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
                {isOpen && day.details && day.details.length > 0 && (
                  <ul className="list-disc ml-8 text-sm text-gray-700 space-y-2">
                    {day.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
          <div ref={inclusionsRef} className="scroll-mt-24">
            <h2 className="flex items-center text-lg font-bold text-green-700 mb-1">
              <span className="border-l-4 border-green-400 pl-2 mr-2" />
              Inclusions
            </h2>
            <div className="bg-white rounded-lg shadow p-5 mb-8">
              <ul className="space-y-2">
                {packageDetails.inclusions.map((inc, i) => (
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

          <div ref={exclusionsRef} className="scroll-mt-24">
            <h2 className="flex items-center text-lg font-bold text-red-700 mb-1">
              <span className="border-l-4 border-red-400 pl-2 mr-2" />
              Exclusions
            </h2>
            <div className="bg-white rounded-lg shadow p-5 mb-8">
              <ul className="space-y-2">
                {packageDetails.exclusions.map((exc, i) => (
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

          <div ref={otherInfoRef} className="scroll-mt-24">
            <h2 className="flex items-center text-lg font-bold text-gray-700 mb-1">
              <span className="border-l-4 border-gray-300 pl-2 mr-2" />
              Other Info
            </h2>
            <div className="bg-white rounded-lg shadow p-5 mb-8">
              <p className="text-sm text-gray-500">
                {packageDetails.otherInfo}
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
                {packageDetails.price}
              </span>
              <span className="text-xs text-gray-500 mb-3">
                {packageDetails.perPerson}
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
                disabled={formStatus === "submitted"}
              >
                {formStatus === "submitted" ? "Submitted!" : "Submit"}
              </Button>
            </form>
          </div>
        </div>
      </div>
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
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
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
        <section className="bg-white pt-8 pb-12">
          <div className="max-w-[1400px] mx-auto px-4">
            {/* Header */}
            <h2 className="text-3xl md:text-[2rem] font-bold text-[#34586a] mb-1">
              Best-Selling Community Trips
            </h2>
            <p className="text-lg text-gray-500 mb-6">
              Discover Europe with WanderOn: Epic Journeys, New Bonds,
              Unforgettable Memories!
            </p>

            {/* Slider */}
            <div className="relative">
              {/* Navigation */}
              <button
                ref={prevRef}
                className="hidden md:block absolute left-[-35px] top-1/2 -translate-y-1/2 z-10 w-[54px] h-[54px] bg-white rounded-full flex items-center justify-center shadow border border-gray-200 hover:bg-blue-100 transition-all"
                aria-label="Previous"
                style={{
                  boxShadow: "0 2px 18px rgba(32,60,132,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                  lineHeight: 1,
                }}
              >
                <FaArrowLeft
                  className="text-[#87bdd8] text-3xl"
                  style={{
                    display: "block",
                    margin: 0,
                    lineHeight: 1,
                    verticalAlign: "middle",
                    position: "relative",
                    top: "0px", // tweak if needed e.g. "-1px"
                  }}
                />
              </button>

              <button
                ref={nextRef}
                className="hidden md:block absolute right-[-35px] top-1/2 -translate-y-1/2 z-10 w-[54px] h-[54px] bg-white rounded-full flex items-center justify-center shadow border border-gray-200 hover:bg-blue-100 transition-all"
                aria-label="Next"
                style={{
                  boxShadow: "0 2px 18px rgba(32,60,132,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                  lineHeight: 1,
                }}
              >
                <FaArrowRight
                  className="text-[#87bdd8] text-3xl"
                  style={{
                    display: "block",
                    margin: 0,
                    lineHeight: 1,
                    verticalAlign: "middle",
                    position: "relative",
                    top: "0px", // tweak if needed
                  }}
                />
              </button>

              <Swiper
                modules={[Navigation]}
                slidesPerView={1}
                spaceBetween={32}
                breakpoints={{
                  700: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                  1300: { slidesPerView: 4 },
                }}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                onInit={(swiper) => {
                  // @ts-ignore
                  swiper.params.navigation.prevEl = prevRef.current;
                  // @ts-ignore
                  swiper.params.navigation.nextEl = nextRef.current;
                  swiper.navigation.init();
                  swiper.navigation.update();
                }}
                className="py-4"
              >
                {trips.map((trip, i) => (
                  <SwiperSlide key={i}>
                    <div className="relative h-[470px] rounded-[15px] overflow-hidden group shadow border bg-black/80">
                      {/* BG Image */}
                      <img
                        src={trip.img}
                        alt={trip.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      {/* Price badge */}
                      <div className="absolute top-5 left-5 z-20">
                        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-300/95 text-gray-900 font-semibold text-[15px] shadow min-w-[175px] justify-center">
                          <span className="line-through text-gray-600 text-sm">
                            {trip.oldPrice}
                          </span>
                          <span className="font-bold">{trip.price}/-</span>
                          <span className="text-xs">{trip.priceText}</span>
                        </div>
                      </div>
                      {/* Tag */}
                      <div className="absolute left-5 top-[62px] z-30">
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-md ${trip.tagColor} text-gray-800 shadow`}
                        >
                          {trip.tagText}
                        </span>
                      </div>
                      {/* Card Content */}
                      <div className="absolute bottom-0 left-0 w-full px-5 pb-5 pt-3 z-10 text-white">
                        <div className="font-bold text-[1.08rem] leading-tight mb-2 min-h-[48px]">
                          {trip.title}
                        </div>
                        <div className="text-xs bg-white/15 rounded px-2 py-1 mb-2 max-w-full overflow-x-auto whitespace-nowrap">
                          {trip.subtitle}
                        </div>

                        {/* Row 1: Duration & Airport */}
                        <div className="flex items-center justify-between text-xs text-white/90 gap-6 mb-1">
                          <span className="flex items-center font-bold">
                            <FaClock className="text-[#00AFD1] text-base mr-2" />
                            <span className="text-white">{trip.days}</span>
                          </span>
                          <span className="flex items-center font-bold">
                            <FaMapMarkerAlt className="text-[#00AFD1] text-base mr-2" />
                            <span className="text-white">{trip.airport}</span>
                          </span>
                        </div>

                        {/* Row 2: Dates & Batch */}
                        <div className="flex items-center text-xs mt-1">
                          <span className="flex items-center font-bold mr-2">
                            <FaCalendarAlt className="text-[#00AFD1] text-base mr-2" />
                            <span className="text-white">{trip.start}</span>
                          </span>
                          {trip.batch && (
                            <span className="text-green-400 font-bold ml-1">
                              {trip.batch}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>
      </div>
      <Footer setIsContactModalOpen={setIsContactModalOpen} />

    </div>
  );
};

export default PackageDetailsPage;
