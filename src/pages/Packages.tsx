import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  BadgePercent,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Navigations from "@/components/Navigation";
import PackageContact from "@/components/PackageContact";
import "swiper/css";
import "swiper/css/navigation";
import Features from "@/components/FeaturedComponent";
import { User, Phone } from "lucide-react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaClock,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom"
const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80", // Europe train
    title: "Europe Tour Packages",
    subtitle: "Europe: The Land Of Endless Discoveries – Upto 30% Off",
    price: "Rs. 1,44,990/- Per Person",
    cta: "Request a Callback",
  },
  {
    image:
      "https://images.wanderon.in/gallery/new/2025/05/23/1747988153003-paragliding-turkey.webp", // Lake
    title: "Lake Retreats",
    subtitle: "Serene Views & Luxury – Up to 20% Off",
    price: "Rs. 49,990/- Per Person",
    cta: "Request a Callback",
  },
  {
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80", // Mountains
    title: "Swiss Alps Adventure",
    subtitle: "Breathtaking Alps Journey – Save Big",
    price: "Rs. 2,10,000/- Per Person",
    cta: "Request a Callback",
  },
];
const ABOUT_SUMMARY = `How long have you been planning a Europe Trip, and struggling with choosing the right Europe Tour Packages from India? If it’s been too long, then it’s time to stop worrying about the hassles in planning your perfect Europe travel package, because now you have WanderOn to the rescue, with luxury as well as budget tours Europe adventures, as well as some other European trip packages as well.`;

const ABOUT_DETAILS = `Book your dream Europe trips with WanderOn’s Europe Tour Packages from India and tick off this continent from your ultimate travel bucket list. Our exciting Europe Packages allow you to explore enchanting cities, breathtaking landscapes, and rich cultural heritage. We have diverse Europe Trip Packages designed to suit every traveller's preferences, allowing you to choose hand-picked Europe vacation packages, with prices starting as low as INR 98990. With such low prices, your European tour packages will not burn a hole in your pocket, and the best part? You will be exploring the countries of Europe, so yay!

Whether you're drawn to the romantic charm of Paris, the historical grandeur of Rome, or the picturesque landscapes of Switzerland, our Europe packages offer a seamless travel experience. With accommodations, transportation, and guided tours included, you can immerse yourself in the beauty and charm of Europe tours with the well-curated European Trip Packages with WanderOn.

Indulge in delectable cuisines, wander through cobblestone streets, and marvel at iconic landmarks such as the Eiffel Tower, the Colosseum, and the Swiss Alps with our best Europe trip packages. From adventurous excursions to leisurely sightseeing, our European tour packages from India cater to all interests, ensuring an unforgettable journey across this mesmerizing continent with our carefully curated European Travel Packages.`;

const activities = [
  {
    country: "Switzerland",
    activity: "Hiking",
    duration: "4 hours approx",
    img: "https://images.wanderon.in/gallery/new/2025/05/23/1747988104917-rock-climbing-italy.webp",
    desc: "Hiking in Switzerland offers breathtaking alpine vistas. Explore pristine trails through lush valleys and towering peaks, a true outdoor paradise.",
  },
  {
    country: "Austria",
    activity: "Snowboarding",
    duration: "2 hours approx",
    img: "https://images.wanderon.in/gallery/new/2025/05/23/1747988129877-white-water-rafting-montenegro.webp",
    desc: "Snowboarding in Austria offers world-class slopes and apres-ski culture. Experience thrilling descents amidst the stunning Alpine scenery and vibrant resorts.",
  },
  {
    country: "France",
    activity: "Mountain Biking",
    duration: "4 hours approx",
    img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
    desc: "Mountain biking in France offers diverse trails through picturesque landscapes, from the Alps to Provence. Thrilling rides await amid stunning scenery.",
  },
  {
    country: "Austria",
    activity: "Snowboarding",
    duration: "2 hours approx",
    img: "https://images.wanderon.in/gallery/new/2025/05/23/1747988129877-white-water-rafting-montenegro.webp",
    desc: "Snowboarding in Austria offers world-class slopes and apres-ski culture. Experience thrilling descents amidst the stunning Alpine scenery and vibrant resorts.",
  },
];
const VisitActivities = [
  {
    country: "Italy",
    activity: "Hiking",
    duration: "4 hours approx",
    img: "https://images.wanderon.in/gallery/new/2025/05/23/1747988104917-rock-climbing-italy.webp",
    desc: "Hiking in Switzerland offers breathtaking alpine vistas. Explore pristine trails through lush valleys and towering peaks, a true outdoor paradise.",
  },
  {
    country: "France",
    activity: "Snowboarding",
    duration: "2 hours approx",
    img: "https://images.wanderon.in/gallery/new/2025/05/23/1747987881375-france.webp",
    desc: "Snowboarding in Austria offers world-class slopes and apres-ski culture. Experience thrilling descents amidst the stunning Alpine scenery and vibrant resorts.",
  },
  {
    country: "Prague",
    activity: "Mountain Biking",
    duration: "4 hours approx",
    img: "https://images.wanderon.in/gallery/new/2025/05/23/1747987904182-prague.webp",
    desc: "Mountain biking in France offers diverse trails through picturesque landscapes, from the Alps to Provence. Thrilling rides await amid stunning scenery.",
  },
  {
    country: "Switzerland",
    activity: "Snowboarding",
    duration: "2 hours approx",
    img: "https://images.wanderon.in/gallery/new/2025/05/23/1747987927310-switzerland.webp",
    desc: "Snowboarding in Austria offers world-class slopes and apres-ski culture. Experience thrilling descents amidst the stunning Alpine scenery and vibrant resorts.",
  },
];
const ShopActivities = [
  {
    country: "Champ Elysees",
    activity: "Hiking",
    duration: "4 hours approx",
    img: "https://images.wanderon.in/SEO%20Images%20Europe/Places%20To%20Shop%20In%20Europe/champs-elysees.jpg?updatedAt=1707812620009",
    desc: "Hiking in Switzerland offers breathtaking alpine vistas. Explore pristine trails through lush valleys and towering peaks, a true outdoor paradise.",
  },
  {
    country: "Via Montenapoleone",
    activity: "Snowboarding",
    duration: "2 hours approx",
    img: "https://images.wanderon.in/SEO%20Images%20Europe/Places%20To%20Shop%20In%20Europe/via-montenapoleone.jpg?updatedAt=1707812625629",
    desc: "Snowboarding in Austria offers world-class slopes and apres-ski culture. Experience thrilling descents amidst the stunning Alpine scenery and vibrant resorts.",
  },
  {
    country: "Madrid",
    activity: "Mountain Biking",
    duration: "4 hours approx",
    img: "https://images.wanderon.in/SEO%20Images%20Europe/Places%20To%20Shop%20In%20Europe/gran-v%C3%ADa.jpg?updatedAt=1707812625417",
    desc: "Mountain biking in France offers diverse trails through picturesque landscapes, from the Alps to Provence. Thrilling rides await amid stunning scenery.",
  },
  {
    country: "Grand Bazaar",
    activity: "Snowboarding",
    duration: "2 hours approx",
    img: "https://images.wanderon.in/SEO%20Images%20Europe/Places%20To%20Shop%20In%20Europe/grand-bazaar.jpg?updatedAt=1707812615889",
    desc: "Snowboarding in Austria offers world-class slopes and apres-ski culture. Experience thrilling descents amidst the stunning Alpine scenery and vibrant resorts.",
  },
];
const faqs = [
  {
    question: "When is the best time to visit Europe?",
    answer:
      "The best time to visit Europe depends on your preferences. Generally, late spring (May–June) and early autumn (September–October) offer pleasant weather, fewer crowds, and beautiful scenery across most destinations.",
  },
  {
    question: "What should I carry on my Europe Tour?",
    answer:
      "It's recommended to carry layered clothing, comfortable shoes, travel adapters, your passport and travel documents, a universal charger, local currency, and any specific medications or essentials you may need.",
  },
  {
    question: "What is the average price for a 7-day trip to Europe?",
    answer:
      "A 7-day Europe trip typically ranges from $1,200 to $3,000 per person, depending on destinations, accommodation type, travel style, and inclusions such as guided tours and meals.",
  },
  {
    question: "What is the best Europe itinerary for a first-time visitor?",
    answer:
      "A classic itinerary for first-timers includes Paris, Amsterdam, and Rome or London, Paris, and Venice. This gives you a mix of iconic cities, culture, and landmarks within one week.",
  },
  {
    question: "Can I customize my Europe Travel Itinerary?",
    answer:
      "Absolutely! We offer fully customizable itineraries so you can select destinations, activities, hotels, and experiences tailored to your interests and budget.",
  },
];
const packages = [
  "Europe Tour Packages from Chennai",
  "Europe Tour Packages from Ahmedabad",
  "Europe Tour Packages from Bangalore",
  "Europe Tour Packages from Mumbai",
  "Europe Honeymoon Packages",
  "Europe Tour Packages From Delhi",
];
const packages2 = [
  "International Tour Packages",
  "Bali Tour package",
  "Bhutan Tour Packages",
  "Vietnam Tour Packages",
  "Thailand Tour Packages",
  "Dubai Tour Packages",
  "Sri Lanka Tour Packages",
  "Maldives Tour Packages",
  "Singapore Tour Packages",
  "Malaysia Tour Packages",
  "Mauritius Tour Packages",
  "India Tour Packages",
];
const packages3 = [
  "Kashmir Tour Packages",
  "Andaman Tour Packages",
  "Meghalaya Tour Packages",
  "Spiti Tour Packages",
  "Kerala Tour Packages",
  "Sikkim Tour Packages",
  "Himachal Tour Packages",
  "Uttarakhand Tour Packages",
];
const otherPackages = ["Honeymoon Tour Packages", "Corporate Tour Packages"];
const blogData = [
  {
    title: "Piazza Navona Rome: Your Ultimate Guide 2025",
    date: "May 20, 2025",
    time: "5 Min Read",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Travel Around Europe On A Budget",
    date: "May 19, 2025",
    time: "5 Min Read",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Santa Maria Maggiore Complete Guide 2025",
    date: "May 16, 2025",
    time: "5 Min Read",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
  },
];

const featured = {
  title: "National Roman Museum: Your Complete Guide",
  date: "May 12, 2025",
  time: "5 Min Read",
  image:
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
};

const reviews = [
  {
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=300&q=80",
    ],
    text: "I'm grateful to the whole wander on team for a great customised experience in Europe this summer. Especially thank you to Anand and Akash for their constant support and cooperation. Looking forward to organising more trips with you all!",
    name: "Niketa Sharma",
  },
  {
    images: [
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80",
    ],
    text: "I planned a trip to UK and Europe through wanderon and really had an amazing time of my life. My first solo trip and I was like hope everything is planned well and I was very happy the way the team took care of everything and Akash was available on Whatsapp incase I needed help and supported me all the time if I wanted anything.",
    name: "Priya Neetu",
  },
  {
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=300&q=80",
    ],
    text: "This was our family’s best trip ever! Team Wanderon handled everything perfectly. Will recommend to friends and family.",
    name: "Rahul Bajaj",
  },
  {
    images: [
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80",
    ],
    text: "Great team, wonderful service! Europe trip was memorable. Thanks to all guides and coordinators.",
    name: "Sunita Rao",
  },
  {
    images: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=300&q=80",
    ],
    text: "Awesome experience. Highly professional and friendly staff. I’ll definitely travel again!",
    name: "Arjun Patel",
  },
];

export default function Package() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [openIdx, setOpenIdx] = useState<null | number>(null);
  const [bestSellingTrips, setBestSellingTrips] = useState([]);
  const [loadingTrips, setLoadingTrips] = useState(true);
  const prevBestSellingRef = useRef(null);
  const nextBestSellingRef = useRef(null);

  const prevSummerDealsRef = useRef(null);
  const nextSummerDealsRef = useRef(null);

  const prevAffordableRef = useRef(null);
  const nextAffordableRef = useRef(null);

  const prevUKRef = useRef(null);
  const nextUKRef = useRef(null);

  const prevActivityRef = useRef(null);
  const nextActivityRef = useRef(null);

  const prevVisitRef = useRef(null);
  const nextVisitRef = useRef(null);

  const prevShopRef = useRef(null);
  const nextShopRef = useRef(null);

  const prevReviewRef = useRef(null);
  const nextReviewRef = useRef(null);

  const [summerDeals, setSummerDeals] = useState([]);
  const [loadingSummerDeals, setLoadingSummerDeals] = useState(true);
  const [affordablePackages, setAffordablePackages] = useState([]);
  const [loadingAffordable, setLoadingAffordable] = useState(true);
  const [europeWithUK, setEuropeWithUK] = useState([]);
  const [loadingEuropeWithUK, setLoadingEuropeWithUK] = useState(true);
  const [trips, setTrips] = useState([]);
  const [loadingAllPackages, setLoadingAllPackages] = useState(true);

  useEffect(() => {
    setLoadingTrips(true);
    fetch(`${import.meta.env.VITE_API_URL}/packages/best-selling-community-trips`)
      .then((res) => res.json())
      .then((data) => {
        setBestSellingTrips(Array.isArray(data) ? data : []);
        setLoadingTrips(false);
      })
      .catch(() => {
        setBestSellingTrips([]);
        setLoadingTrips(false);
      });
  }, []);

  useEffect(() => {
    setLoadingSummerDeals(true);
    fetch(`${import.meta.env.VITE_API_URL}/packages/summer-deals`)
      .then((res) => res.json())
      .then((data) => {
        setSummerDeals(Array.isArray(data) ? data : []);
        setLoadingSummerDeals(false);
      })
      .catch(() => {
        setSummerDeals([]);
        setLoadingSummerDeals(false);
      });
  }, []);

  useEffect(() => {
    setLoadingAffordable(true);
    fetch(`${import.meta.env.VITE_API_URL}/packages/affordable-packages`)
      .then((res) => res.json())
      .then((data) => {
        setAffordablePackages(Array.isArray(data) ? data : []);
        setLoadingAffordable(false);
      })
      .catch(() => {
        setAffordablePackages([]);
        setLoadingAffordable(false);
      });
  }, []);

  useEffect(() => {
    setLoadingEuropeWithUK(true);
    fetch(`${import.meta.env.VITE_API_URL}/packages/europe-with-uk`)
      .then((res) => res.json())
      .then((data) => {
        setEuropeWithUK(Array.isArray(data) ? data : []);
        setLoadingEuropeWithUK(false);
      })
      .catch(() => {
        setEuropeWithUK([]);
        setLoadingEuropeWithUK(false);
      });
  }, []);

  useEffect(() => {
    setLoadingAllPackages(true);
    fetch(`${import.meta.env.VITE_API_URL}/packages`)
      .then((res) => res.json())
      .then((data) => {
        setTrips(Array.isArray(data) ? data : []);
        setLoadingAllPackages(false);
      })
      .catch(() => {
        setTrips([]);
        setLoadingAllPackages(false);
      });
  }, []);

  return (
    <>
      <div className="min-h-screen bg-background">
        <Navigations onContactClick={() => setIsContactModalOpen(true)} />
        <section className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              nextEl: ".hero-swiper-next",
              prevEl: ".hero-swiper-prev",
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            loop
            className="w-full h-[420px] md:h-[540px] lg:h-[650px]"
          >
            {slides.map((slide, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative w-full h-[420px] md:h-[540px] lg:h-[650px]">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10"></div>
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-24 max-w-2xl">
                    <h2 className="text-white text-2xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-4 leading-tight drop-shadow-lg">
                      {slide.title}
                    </h2>
                    <div className="text-gray-100 text-base md:text-xl font-medium mb-5 drop-shadow">
                      {slide.subtitle}
                    </div>
                    <div className="flex items-center gap-2 mb-5">
                      <BadgePercent className="text-yellow-300" size={22} />
                      <span className="text-white text-lg">
                        Starting Price:
                      </span>
                      <span className="text-yellow-300 font-semibold text-xl ml-1">
                        {slide.price}
                      </span>
                    </div>
                    <button
                      className="bg-yellow-400 hover:bg-yellow-300 text-black rounded-full px-7 py-3 mt-2 font-semibold text-base shadow-lg transition"
                      onClick={() => setIsContactModalOpen(true)}
                    >
                      {slide.cta}
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            {/* Navigation Arrows */}
            <button className="hidden md:block hero-swiper-prev absolute z-10 top-1/2 left-4 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 md:p-3 transition">
              <ChevronLeft size={28} />
            </button>
            <button className="hidden md:block hero-swiper-next absolute z-10 top-1/2 right-4 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 md:p-3 transition">
              <ChevronRight size={28} />
            </button>
          </Swiper>

          {/* Custom Dots (optional, use Swiper default if preferred) */}
          {/* ... */}
        </section>
        <section className="py-10 px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="max-w-[1400px] mx-auto mt-8 mb-6 rounded-xl border border-[#f3f6fd] bg-white shadow-sm p-7">
            <div className="flex justify-between items-start">
              <h2 className="text-[22px] font-bold text-gray-900 mb-1">
                About Europe Tour Packages
              </h2>
              {expanded && (
                <button
                  className="ml-4 bg-[#27478b] hover:bg-[#183364] text-white text-sm px-5 py-1.5 rounded transition font-semibold"
                  onClick={() => setExpanded(false)}
                >
                  Read Less
                </button>
              )}
            </div>
            {!expanded ? (
              <div className="flex flex-col sm:flex-row justify-between items-start mt-2">
                <p className="text-[#6c6c6c] text-base font-normal leading-[1.7] mb-0 flex-1">
                  {ABOUT_SUMMARY}
                </p>
                <button
                  onClick={() => setExpanded(true)}
                  className="ml-0 sm:ml-3 mt-2 sm:mt-0 text-[#183364] text-[16px] font-semibold hover:underline cursor-pointer self-end"
                  style={{ minWidth: 110 }}
                  tabIndex={0}
                >
                  Read More...
                </button>
              </div>
            ) : (
              <div className="mt-4">
                <p className="text-[#6c6c6c] text-base font-normal leading-[1.7] whitespace-pre-line">
                  {ABOUT_SUMMARY}
                  {"\n\n"}
                  {ABOUT_DETAILS}
                </p>
              </div>
            )}
          </div>
        </section>
        <section className="bg-white pt-8 pb-12">
          <div className="max-w-[1400px] mx-auto px-4">
            {/* Header */}
            <h2 className="text-3xl md:text-[2rem] font-bold text-[#34586a] mb-1">
              Best-Selling Community Trips
            </h2>
            <p className="text-lg text-gray-500 mb-6">
              Discover Europe with WanderOn: Epic Journeys, New Bonds, Unforgettable Memories!
            </p>
            {/* Slider */}
            <div className="relative">
              <button
                ref={prevBestSellingRef}
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
                <FaArrowLeft className="text-[#87bdd8] text-3xl" />
              </button>
              <button
                ref={nextBestSellingRef}
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
                <FaArrowRight className="text-[#87bdd8] text-3xl" />
              </button>

              {loadingTrips ? (
                <div className="py-8 text-center text-lg text-gray-400">Loading...</div>
              ) : bestSellingTrips.length === 0 ? (
                <div className="py-8 text-center text-lg text-gray-400">
                  No best-selling packages found.
                </div>
              ) : (
                <Swiper
                  modules={[Navigation]}
                  slidesPerView={1}
                  spaceBetween={24}
                  breakpoints={{
                    700: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1300: { slidesPerView: 4 },
                  }}
                  navigation={{
                    prevEl: prevBestSellingRef.current,
                    nextEl: nextBestSellingRef.current,
                  }}
                  onInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevBestSellingRef.current;
                    swiper.params.navigation.nextEl = nextBestSellingRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }}
                  className="py-4"
                >
                  {bestSellingTrips.map((trip, i) => (
                    <SwiperSlide key={i}>
                      <Link to={`/packages/${trip.slug}`}>
                        <div className="relative h-[500px] rounded-[15px] overflow-hidden group shadow border bg-black/80">
                          {/* BG Image */}
                          <img
                            src={trip.image}
                            alt={trip.title}
                            className="w-full h-full object-cover"
                          />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                          {/* Price badge */}
                          <div className="absolute top-5 left-5 z-20">
                            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-300/95 text-gray-900 font-semibold text-[15px] shadow min-w-[140px] justify-center">
                              <span className="line-through text-gray-600 text-sm">
                                {trip.price?.original ? "₹" + trip.price.original.toLocaleString() : ""}
                              </span>
                              <span className="font-bold ml-2">
                                {trip.price?.current ? "₹" + trip.price.current.toLocaleString() : ""}
                              </span>
                              <span className="text-xs ml-1">{trip.price?.label || "onwards"}</span>
                            </div>
                          </div>
                          {/* Tag */}
                          <div className="absolute left-5 top-[62px] z-30">
                            <span
                              className={`text-xs font-bold px-3 py-1 rounded-md ${trip.isRecommended ? "bg-yellow-400" : "bg-green-300"
                                } text-gray-800 shadow`}
                            >
                              {trip.isRecommended ? "Recommended" : "Popular"}
                            </span>
                          </div>
                          {/* Card Content */}
                          <div className="absolute bottom-0 left-0 w-full px-5 pb-5 pt-3 z-10 text-white bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                            <div className="font-bold text-[1.08rem] leading-tight mb-1 min-h-[48px] line-clamp-2">
                              {trip.title}
                            </div>
                            <div className="text-xs bg-white/15 rounded px-2 py-1 mb-2 max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                              {trip.subtitle}
                            </div>
                            <div className="flex items-center justify-between text-xs text-white/90 gap-4 mb-1">
                              <span className="flex items-center font-bold">
                                <FaClock className="text-[#00AFD1] text-base mr-2" />
                                <span className="text-white">
                                  {trip.nights}N/{trip.days}D
                                </span>
                              </span>
                              <span className="flex items-center font-bold">
                                <FaMapMarkerAlt className="text-[#00AFD1] text-base mr-2" />
                                <span className="text-white">{trip.startLocation}</span>
                              </span>
                            </div>
                            <div className="flex items-center text-xs mt-1">
                              <span className="flex items-center font-bold mr-2">
                                <FaCalendarAlt className="text-[#00AFD1] text-base mr-2" />
                                <span className="text-white">
                                  {Array.isArray(trip.departureDates)
                                    ? trip.departureDates.join(", ")
                                    : trip.departureDates || ""}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </div>
        </section>

        <section className="bg-white pt-8 pb-12">
          <div className="max-w-[1400px] mx-auto px-4">
            {/* Header */}
            <h2 className="text-3xl md:text-[2rem] font-bold text-[#34586a] mb-1">
              Exclusive Europe Summer Deals 2025
            </h2>
            <p className="text-lg text-gray-500 mb-6">
              Spend a perfect summer soaking in the scenic landscapes of Europe
              with our best deals on Europe Summer packages. Combined with best
              experiences, outdoor activities, city tours and adventures, these
              trips are perfect for a memorable summer vacation.
            </p>

            {/* Slider */}
            <div className="relative">
              {/* Navigation */}
              <button
                ref={prevSummerDealsRef}
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
                <FaArrowLeft className="text-[#87bdd8] text-3xl" />
              </button>

              <button
                ref={nextSummerDealsRef}
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
                <FaArrowRight className="text-[#87bdd8] text-3xl" />
              </button>

              {loadingSummerDeals ? (
                <div className="py-8 text-center text-lg text-gray-400">Loading...</div>
              ) : summerDeals.length === 0 ? (
                <div className="py-8 text-center text-lg text-gray-400">
                  No summer deals found.
                </div>
              ) : (
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
                    prevEl: prevSummerDealsRef.current,
                    nextEl: nextSummerDealsRef.current,
                  }}
                  onInit={(swiper) => {
                    // @ts-ignore
                    swiper.params.navigation.prevEl = prevSummerDealsRef.current;
                    // @ts-ignore
                    swiper.params.navigation.nextEl = nextSummerDealsRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }}
                  className="py-4"
                >
                  {summerDeals.map((trip, i) => (
                    <SwiperSlide key={trip._id || i}>
                      <Link to={`/packages/${trip.slug}`}>
                        <div className="relative h-[500px] rounded-[15px] overflow-hidden group shadow border bg-black/80">
                          {/* BG Image */}
                          <img
                            src={trip.image}
                            alt={trip.title}
                            className="w-full h-full object-cover"
                          />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                          {/* Price badge */}
                          <div className="absolute top-5 left-5 z-20">
                            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-300/95 text-gray-900 font-semibold text-[15px] shadow min-w-[140px] justify-center">
                              <span className="line-through text-gray-600 text-sm">
                                {trip.price?.original ? "₹" + trip.price.original.toLocaleString() : ""}
                              </span>
                              <span className="font-bold ml-2">
                                {trip.price?.current ? "₹" + trip.price.current.toLocaleString() : ""}
                              </span>
                              <span className="text-xs ml-1">{trip.price?.label || "onwards"}</span>
                            </div>
                          </div>
                          {/* Tag */}
                          <div className="absolute left-5 top-[62px] z-30">
                            <span
                              className={`text-xs font-bold px-3 py-1 rounded-md ${trip.isRecommended ? "bg-yellow-400" : "bg-green-300"
                                } text-gray-800 shadow`}
                            >
                              {trip.isRecommended ? "Recommended" : "Popular"}
                            </span>
                          </div>
                          {/* Card Content */}
                          <div className="absolute bottom-0 left-0 w-full px-5 pb-5 pt-3 z-10 text-white bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                            <div className="font-bold text-[1.08rem] leading-tight mb-1 min-h-[48px] line-clamp-2">
                              {trip.title}
                            </div>
                            <div className="text-xs bg-white/15 rounded px-2 py-1 mb-2 max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                              {trip.subtitle}
                            </div>
                            <div className="flex items-center justify-between text-xs text-white/90 gap-4 mb-1">
                              <span className="flex items-center font-bold">
                                <FaClock className="text-[#00AFD1] text-base mr-2" />
                                <span className="text-white">
                                  {trip.nights}N/{trip.days}D
                                </span>
                              </span>
                              <span className="flex items-center font-bold">
                                <FaMapMarkerAlt className="text-[#00AFD1] text-base mr-2" />
                                <span className="text-white">{trip.startLocation}</span>
                              </span>
                            </div>
                            <div className="flex items-center text-xs mt-1">
                              <span className="flex items-center font-bold mr-2">
                                <FaCalendarAlt className="text-[#00AFD1] text-base mr-2" />
                                <span className="text-white">
                                  {Array.isArray(trip.departureDates)
                                    ? trip.departureDates.join(", ")
                                    : trip.departureDates || ""}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </div>
        </section>

        <section className="bg-white pt-8 pb-12">
          <div className="max-w-[1400px] mx-auto px-4">
            {/* Header */}
            <h2 className="text-3xl md:text-[2rem] font-bold text-[#34586a] mb-1">
              Affordable Packages
            </h2>
            <p className="text-lg text-gray-500 mb-6">
              Spend a perfect summer soaking in the scenic landscapes of Europe
              with our best deals on Europe Summer packages. Combined with best
              experiences, outdoor activities, city tours and adventures, these
              trips are perfect for a memorable summer vacation.
            </p>

            {/* Slider */}
            <div className="relative">
              {/* Navigation */}
              <button
                ref={prevAffordableRef}
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
                <FaArrowLeft className="text-[#87bdd8] text-3xl" />
              </button>

              <button
                ref={nextAffordableRef}
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
                <FaArrowRight className="text-[#87bdd8] text-3xl" />
              </button>

              {loadingAffordable ? (
                <div className="py-8 text-center text-lg text-gray-400">Loading...</div>
              ) : affordablePackages.length === 0 ? (
                <div className="py-8 text-center text-lg text-gray-400">
                  No affordable packages found.
                </div>
              ) : (
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
                    prevEl: prevAffordableRef.current,
                    nextEl: nextAffordableRef.current,
                  }}
                  onInit={(swiper) => {
                    // @ts-ignore
                    swiper.params.navigation.prevEl = prevAffordableRef.current;
                    // @ts-ignore
                    swiper.params.navigation.nextEl = nextAffordableRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }}
                  className="py-4"
                >
                  {affordablePackages.map((trip, i) => (
                    <SwiperSlide key={trip._id || i}>
                      <Link to={`/packages/${trip.slug}`}>
                        <div className="relative h-[500px] rounded-[15px] overflow-hidden group shadow border bg-black/80">
                          {/* BG Image */}
                          <img
                            src={trip.image}
                            alt={trip.title}
                            className="w-full h-full object-cover"
                          />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                          {/* Price badge */}
                          <div className="absolute top-5 left-5 z-20">
                            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-300/95 text-gray-900 font-semibold text-[15px] shadow min-w-[140px] justify-center">
                              {/* Old Price */}
                              <span className="line-through text-gray-600 text-sm">
                                {trip.price?.original
                                  ? "₹" + trip.price.original.toLocaleString()
                                  : ""}
                              </span>
                              {/* Current Price */}
                              <span className="font-bold ml-2">
                                {trip.price?.current
                                  ? "₹" + trip.price.current.toLocaleString()
                                  : ""}
                              </span>
                              {/* Label */}
                              <span className="text-xs ml-1">
                                {trip.price?.label || "onwards"}
                              </span>
                            </div>
                          </div>
                          {/* Tag */}
                          <div className="absolute left-5 top-[62px] z-30">
                            <span
                              className={`text-xs font-bold px-3 py-1 rounded-md ${trip.isRecommended ? "bg-yellow-400" : "bg-green-300"
                                } text-gray-800 shadow`}
                            >
                              {trip.isRecommended ? "Recommended" : "Popular"}
                            </span>
                          </div>
                          {/* Card Content */}
                          <div className="absolute bottom-0 left-0 w-full px-5 pb-5 pt-3 z-10 text-white bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                            <div className="font-bold text-[1.08rem] leading-tight mb-1 min-h-[48px] line-clamp-2">
                              {trip.title}
                            </div>
                            <div className="text-xs bg-white/15 rounded px-2 py-1 mb-2 max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                              {trip.subtitle}
                            </div>
                            <div className="flex items-center justify-between text-xs text-white/90 gap-4 mb-1">
                              <span className="flex items-center font-bold">
                                <FaClock className="text-[#00AFD1] text-base mr-2" />
                                <span className="text-white">
                                  {trip.nights}N/{trip.days}D
                                </span>
                              </span>
                              <span className="flex items-center font-bold">
                                <FaMapMarkerAlt className="text-[#00AFD1] text-base mr-2" />
                                <span className="text-white">{trip.startLocation}</span>
                              </span>
                            </div>
                            <div className="flex items-center text-xs mt-1">
                              <span className="flex items-center font-bold mr-2">
                                <FaCalendarAlt className="text-[#00AFD1] text-base mr-2" />
                                <span className="text-white">
                                  {Array.isArray(trip.departureDates)
                                    ? trip.departureDates.join(", ")
                                    : trip.departureDates || ""}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </div>
        </section>
        <section className="bg-white pt-8 pb-12">
          <div className="max-w-[1400px] mx-auto px-4">
            {/* Header */}
            <h2 className="text-3xl md:text-[2rem] font-bold text-[#34586a] mb-1">
              Europe with UK
            </h2>
            <p className="text-lg text-gray-500 mb-6">
              Explore Timeless Europe, Embrace Royal UK – One Epic Journey Awaits!
            </p>

            {/* Slider */}
            <div className="relative">
              {/* Navigation */}
              {europeWithUK.length >= 4 && (
                <button
                  ref={prevUKRef}
                  className="absolute left-[-35px] top-1/2 -translate-y-1/2 z-10 w-[54px] h-[54px] bg-white rounded-full flex items-center justify-center shadow border border-gray-200 hover:bg-blue-100 transition-all"
                  aria-label="Previous"
                  style={{ boxShadow: "0 2px 18px rgba(32,60,132,0.12)" }}
                >
                  <FaArrowLeft className="text-[#87bdd8] text-3xl" />
                </button>
              )}
              {europeWithUK.length >= 4 && (
                <button
                  ref={nextUKRef}
                  className="absolute right-[-35px] top-1/2 -translate-y-1/2 z-10 w-[54px] h-[54px] bg-white rounded-full flex items-center justify-center shadow border border-gray-200 hover:bg-blue-100 transition-all"
                  aria-label="Next"
                  style={{ boxShadow: "0 2px 18px rgba(32,60,132,0.12)" }}
                >
                  <FaArrowRight className="text-[#87bdd8] text-3xl" />
                </button>
              )}

              {loadingEuropeWithUK ? (
                <div className="py-8 text-center text-lg text-gray-400">Loading...</div>
              ) : europeWithUK.length === 0 ? (
                <div className="py-8 text-center text-lg text-gray-400">
                  No Europe with UK packages found.
                </div>
              ) : (
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
                    prevEl: prevUKRef.current,
                    nextEl: nextUKRef.current,
                  }}
                  onInit={(swiper) => {
                    // @ts-ignore
                    swiper.params.navigation.prevEl = prevUKRef.current;
                    // @ts-ignore
                    swiper.params.navigation.nextEl = nextUKRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }}
                  className="py-4"
                >
                  {europeWithUK.map((trip, i) => (
                    <SwiperSlide key={trip._id || i}>
                      <Link to={`/packages/${trip.slug}`}>
                        <div className="relative h-[500px] rounded-[15px] overflow-hidden group shadow border bg-black/80">
                          {/* BG Image */}
                          <img
                            src={trip.img || trip.image}
                            alt={trip.title}
                            className="w-full h-full object-cover"
                          />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                          {/* Price badge */}
                          <div className="absolute top-5 left-5 z-20">
                            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-300/95 text-gray-900 font-semibold text-[15px] shadow min-w-[175px] justify-center">
                              {/* Old Price */}
                              <span className="line-through text-gray-600 text-sm">
                                {trip.oldPrice ||
                                  (trip.price?.original
                                    ? "₹" + trip.price.original.toLocaleString()
                                    : "")}
                              </span>
                              {/* Current Price */}
                              <span className="font-bold ml-2">
                                {trip.priceText ||
                                  (trip.price?.current
                                    ? "₹" + trip.price.current.toLocaleString()
                                    : trip.price?.current === 0
                                      ? "₹0"
                                      : trip.price?.current
                                        ? trip.price.current
                                        : "")}
                              </span>
                              {/* Label */}
                              <span className="text-xs ml-1">
                                {trip.price?.label || trip.priceText || "onwards"}
                              </span>
                            </div>
                          </div>
                          {/* Tag */}
                          <div className="absolute left-5 top-[62px] z-30">
                            <span
                              className={`text-xs font-bold px-3 py-1 rounded-md ${trip.tagColor || (trip.isRecommended ? "bg-yellow-400" : "bg-green-300")} text-gray-800 shadow`}
                            >
                              {trip.tagText || (trip.isRecommended ? "Recommended" : "Popular")}
                            </span>
                          </div>
                          {/* Card Content */}
                          <div className="absolute bottom-0 left-0 w-full px-5 pb-5 pt-3 z-10 text-white bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                            <div className="font-bold text-[1.08rem] leading-tight mb-1 min-h-[48px] line-clamp-2">
                              {trip.title}
                            </div>
                            <div className="text-xs bg-white/15 rounded px-2 py-1 mb-2 max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                              {trip.subtitle}
                            </div>
                            <div className="flex items-center justify-between text-xs text-white/90 gap-4 mb-1">
                              <span className="flex items-center font-bold">
                                <FaClock className="text-[#00AFD1] text-base mr-2" />
                                <span className="text-white">
                                  {trip.nights && trip.days
                                    ? `${trip.nights}N/${trip.days}D`
                                    : trip.days || ""}
                                </span>
                              </span>
                              <span className="flex items-center font-bold">
                                <FaMapMarkerAlt className="text-[#00AFD1] text-base mr-2" />
                                <span className="text-white">
                                  {trip.startLocation || trip.airport || ""}
                                </span>
                              </span>
                            </div>
                            <div className="flex items-center text-xs mt-1">
                              <span className="flex items-center font-bold mr-2">
                                <FaCalendarAlt className="text-[#00AFD1] text-base mr-2" />
                                <span className="text-white">
                                  {Array.isArray(trip.departureDates)
                                    ? trip.departureDates.join(", ")
                                    : trip.start ||
                                    trip.departureDates ||
                                    ""}
                                </span>
                              </span>
                              {trip.batch && (
                                <span className="text-green-400 font-bold ml-1">
                                  {trip.batch}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </div>
        </section>


        <section className="bg-white py-10">
          <div className="max-w-[1400px] mx-auto px-4">
            <h2 className="text-3xl md:text-[2rem] font-bold text-[#34586a] mb-8">
              All Packages
            </h2>
            {loadingAllPackages ? (
              <div className="py-8 text-center text-lg text-gray-400">Loading...</div>
            ) : trips.length === 0 ? (
              <div className="py-8 text-center text-lg text-gray-400">
                No packages found.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7 gap-y-9">
                  {trips.map((trip, i) => (
                    <SwiperSlide key={trip._id || i}>
                      <Link to={`/packages/${trip.slug}`}>
                        <div className="relative h-[500px] rounded-[15px] overflow-hidden group shadow border bg-black/80">
                          {/* BG Image */}
                          <img
                            src={trip.img || trip.image}
                            alt={trip.title}
                            className="w-full h-full object-cover"
                          />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                          {/* Price badge */}
                          <div className="absolute top-5 left-5 z-20">
                            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-300/95 text-gray-900 font-semibold text-[15px] shadow min-w-[175px] justify-center">
                              {/* Old Price */}
                              <span className="line-through text-gray-600 text-sm">
                                {trip.oldPrice ||
                                  (trip.price?.original
                                    ? "₹" + trip.price.original.toLocaleString()
                                    : "")}
                              </span>
                              {/* Current Price */}
                              <span className="font-bold ml-2">
                                {trip.priceText ||
                                  (trip.price?.current
                                    ? "₹" + trip.price.current.toLocaleString()
                                    : trip.price?.current === 0
                                      ? "₹0"
                                      : trip.price?.current
                                        ? trip.price.current
                                        : "")}
                              </span>
                              {/* Label */}
                              <span className="text-xs ml-1">
                                {trip.price?.label || trip.priceText || "onwards"}
                              </span>
                            </div>
                          </div>
                          {/* Tag */}
                          <div className="absolute left-5 top-[62px] z-30">
                            <span
                              className={`text-xs font-bold px-3 py-1 rounded-md ${trip.tagColor || (trip.isRecommended ? "bg-yellow-400" : "bg-green-300")} text-gray-800 shadow`}
                            >
                              {trip.tagText || (trip.isRecommended ? "Recommended" : "Popular")}
                            </span>
                          </div>
                          {/* Card Content */}
                          <div className="absolute bottom-0 left-0 w-full px-5 pb-5 pt-3 z-10 text-white bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                            <div className="font-bold text-[1.08rem] leading-tight mb-1 min-h-[48px] line-clamp-2">
                              {trip.title}
                            </div>
                            <div className="text-xs bg-white/15 rounded px-2 py-1 mb-2 max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                              {trip.subtitle}
                            </div>
                            <div className="flex items-center justify-between text-xs text-white/90 gap-4 mb-1">
                              <span className="flex items-center font-bold">
                                <FaClock className="text-[#00AFD1] text-base mr-2" />
                                <span className="text-white">
                                  {trip.nights && trip.days
                                    ? `${trip.nights}N/${trip.days}D`
                                    : trip.days || ""}
                                </span>
                              </span>
                              <span className="flex items-center font-bold">
                                <FaMapMarkerAlt className="text-[#00AFD1] text-base mr-2" />
                                <span className="text-white">
                                  {trip.startLocation || trip.airport || ""}
                                </span>
                              </span>
                            </div>
                            <div className="flex items-center text-xs mt-1">
                              <span className="flex items-center font-bold mr-2">
                                <FaCalendarAlt className="text-[#00AFD1] text-base mr-2" />
                                <span className="text-white">
                                  {Array.isArray(trip.departureDates)
                                    ? trip.departureDates.join(", ")
                                    : trip.start ||
                                    trip.departureDates ||
                                    ""}
                                </span>
                              </span>
                              {trip.batch && (
                                <span className="text-green-400 font-bold ml-1">
                                  {trip.batch}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
              </div>
            )}
          </div>
          <div className="flex justify-center mt-10">
            <button
              className="
        px-8 py-3
        rounded-md
        border border-[#2e6273]
        text-[#2e6273]
        font-semibold
        text-xl
        bg-white
        hover:bg-[#f7fbfc]
        transition
        shadow-sm
      "
              style={{ minWidth: 220 }}
            >
              Explore More
            </button>
          </div>
        </section>

        <section className="max-w-[1400px] mx-auto px-4 pt-10 pb-12">
          <div className="mb-7">
            <h2
              className="text-[2rem] font-bold text-[#34586a] mb-2"
              style={{ letterSpacing: "-0.5px" }}
            >
              Must-Do Activities for an Unforgettable Europe Experience
            </h2>
            <p className="text-gray-500 text-lg">
              From skiing in the Alps to hiking ancient trails, Europe offers
              diverse adventure activities in stunning settings. Explore
              thrilling experiences across the continent.
            </p>
          </div>
          <div className="relative">
            {/* Custom Left Arrow */}
            <button
              ref={prevActivityRef}
              className="hidden md:block absolute z-20 -left-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-[#ffff] shadow-lg rounded-full border-4 border-white hover:bg-white-400 transition-all"
              style={{ boxShadow: "0 1.5px 10px rgba(0,0,0,.12)" }}
            >
              <ChevronLeft className="text-black" size={33} />
            </button>

            {/* Custom Right Arrow */}
            <button
              ref={nextActivityRef}
              className="hidden md:block absolute z-20 -right-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-[#ffff] shadow-lg rounded-full border-4 border-white hover:bg-white-400 transition-all"
              style={{ boxShadow: "0 1.5px 10px rgba(0,0,0,.12)" }}
            >
              <ChevronRight className="text-black" size={33} />
            </button>
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: prevActivityRef.current,
                nextEl: nextActivityRef.current,
              }}
              onInit={(swiper) => {
                // Attach navigation refs after mount
                (swiper.params.navigation as any).prevEl = prevActivityRef.current;
                (swiper.params.navigation as any).nextEl = nextActivityRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              slidesPerView={3}
              spaceBetween={28}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 18 },
                600: { slidesPerView: 1.25, spaceBetween: 18 },
                900: { slidesPerView: 2, spaceBetween: 22 },
                1200: { slidesPerView: 3, spaceBetween: 28 },
              }}
            //   className="!px-10"
            >
              {activities.map((item, i) => (
                <SwiperSlide key={i}>
                  <div className="bg-white rounded-2xl overflow-hidden flex flex-col h-full min-h-[320px]">
                    {/* Image with overlay */}
                    <div className="relative h-[220px] w-full">
                      <img
                        src={item.img}
                        alt={item.activity}
                        className="w-full h-full object-cover rounded-t-2xl"
                        draggable={false}
                      />
                      {/* Black label overlay */}
                      <div className="absolute bottom-3 left-3 bg-black/80 rounded px-2 py-1 text-white text-xs font-semibold shadow min-w-[110px]">
                        <span className="block text-xs font-medium mb-0.5">
                          📍 {item.country}
                        </span>
                        <span className="block bg-black font-bold rounded px-1 py-0.5 mt-0.5 text-sm">
                          {item.activity}
                        </span>
                        <span className="block mt-1 font-normal">
                          {item.duration}
                        </span>
                      </div>
                    </div>
                    {/* Description */}
                    <div className="text-[15px] text-gray-600 text-[#49768f] px-4 py-4 font-normal leading-relaxed">
                      {item.desc}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
        <section className="max-w-[1400px] mx-auto px-4 pt-10 pb-12">
          <div className="mb-7">
            <h2
              className="text-[2rem] font-bold text-[#34586a] mb-2"
              style={{ letterSpacing: "-0.5px" }}
            >
              Must-Visit Places in Europe for a Dream Vacation
            </h2>
            <p className="text-gray-500 text-lg">
              Discover Europe's diverse beauty and rich history. Explore our
              curated list of must-visit destinations, from historic cities to
              scenic landscapes, and plan your unforgettable European adventure.
            </p>
          </div>
          <div className="relative">
            {/* Custom Left Arrow */}
            <button
              ref={prevVisitRef}
              className="hidden md:block absolute z-20 -left-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-[#ffff] shadow-lg rounded-full border-4 border-white hover:bg-white-400 transition-all"
              style={{ boxShadow: "0 1.5px 10px rgba(0,0,0,.12)" }}
            >
              <ChevronLeft className="text-black" size={33} />
            </button>

            {/* Custom Right Arrow */}
            <button
              ref={nextVisitRef}
              className="hidden md:block absolute z-20 -right-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-[#ffff] shadow-lg rounded-full border-4 border-white hover:bg-white-400 transition-all"
              style={{ boxShadow: "0 1.5px 10px rgba(0,0,0,.12)" }}
            >
              <ChevronRight className="text-black" size={33} />
            </button>

            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: prevVisitRef.current,
                nextEl: nextVisitRef.current,
              }}
              onInit={(swiper) => {
                // Attach navigation refs after mount
                // @ts-ignore
                swiper.params.navigation.prevEl = prevVisitRef.current;
                // @ts-ignore
                swiper.params.navigation.nextEl = nextVisitRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              slidesPerView={3}
              spaceBetween={28}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 18 },
                600: { slidesPerView: 1.25, spaceBetween: 18 },
                900: { slidesPerView: 2, spaceBetween: 22 },
                1200: { slidesPerView: 3, spaceBetween: 28 },
              }}
            //   className="!px-10"
            >
              {VisitActivities.map((item, i) => (
                <SwiperSlide key={i}>
                  <div className="bg-white rounded-2xl overflow-hidden flex flex-col h-full min-h-[320px]">
                    {/* Image with overlay */}
                    <div className="relative h-[220px] w-full">
                      <img
                        src={item.img}
                        alt={item.activity}
                        className="w-full h-full object-cover rounded-t-2xl"
                        draggable={false}
                      />
                      {/* Black label overlay */}
                      <div className="absolute bottom-3 left-3 bg-black/80 rounded px-2 py-1 text-white text-xs font-semibold shadow min-w-[110px]">
                        <span className="block text-xs font-medium mb-0.5">
                          📍 {item.country}
                        </span>
                        <span className="block bg-black font-bold rounded px-1 py-0.5 mt-0.5 text-sm">
                          {item.activity}
                        </span>
                        <span className="block mt-1 font-normal">
                          {item.duration}
                        </span>
                      </div>
                    </div>
                    {/* Description */}
                    <div className="text-[15px] text-gray-600 text-[#49768f] px-4 py-4 font-normal leading-relaxed">
                      {item.desc}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
        <section className="max-w-[1400px] mx-auto px-4 pt-10 pb-12">
          <div className="mb-7">
            <h2
              className="text-[2rem] font-bold text-[#34586a] mb-2"
              style={{ letterSpacing: "-0.5px" }}
            >
              Shop till you drop: Best shopping destinations in Europe
            </h2>
            <p className="text-gray-500 text-lg">
              European Shopping Escapades: Explore the continent's diverse
              retail landscape, from iconic fashion capitals to quaint markets.
              Discover Europe's unique shopping experiences and hidden
              treasures.
            </p>
          </div>
          <div className="relative">
            {/* Custom Left Arrow */}
            <button
              ref={prevShopRef}
              className="hidden md:block absolute z-20 -left-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-[#ffff] shadow-lg rounded-full border-4 border-white hover:bg-white-400 transition-all"
              style={{ boxShadow: "0 1.5px 10px rgba(0,0,0,.12)" }}
            >
              <ChevronLeft className="text-black" size={33} />
            </button>

            {/* Custom Right Arrow */}
            <button
              ref={nextShopRef}
              className="hidden md:block absolute z-20 -right-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-[#ffff] shadow-lg rounded-full border-4 border-white hover:bg-white-400 transition-all"
              style={{ boxShadow: "0 1.5px 10px rgba(0,0,0,.12)" }}
            >
              <ChevronRight className="text-black" size={33} />
            </button>

            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: prevShopRef.current,
                nextEl: nextShopRef.current,
              }}
              onInit={(swiper) => {
                (swiper.params.navigation as any).prevEl = prevShopRef.current;
                (swiper.params.navigation as any).nextEl = nextShopRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              slidesPerView={3}
              spaceBetween={28}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 18 },
                600: { slidesPerView: 1.2, spaceBetween: 18 },
                900: { slidesPerView: 2, spaceBetween: 22 },
                1200: { slidesPerView: 3, spaceBetween: 28 },
              }}
            >
              {ShopActivities.map((item, i) => (
                <SwiperSlide key={i}>
                  <div className="bg-white rounded-2xl overflow-hidden flex flex-col h-full min-h-[320px]">
                    {/* Image with overlay */}
                    <div className="relative h-[220px] w-full">
                      <img
                        src={item.img}
                        alt={item.activity}
                        className="w-full h-full object-cover rounded-t-2xl"
                        draggable={false}
                      />
                      {/* Black label overlay */}
                      <div className="absolute bottom-3 left-3 bg-black/80 rounded px-2 py-1 text-white text-xs font-semibold shadow min-w-[110px]">
                        <span className="block text-xs font-medium mb-0.5">
                          📍 {item.country}
                        </span>
                        <span className="block bg-black font-bold rounded px-1 py-0.5 mt-0.5 text-sm">
                          {item.activity}
                        </span>
                        <span className="block mt-1 font-normal">
                          {item.duration}
                        </span>
                      </div>
                    </div>
                    {/* Description */}
                    <div className="text-[15px] text-gray-600 text-[#49768f] px-4 py-4 font-normal leading-relaxed">
                      {item.desc}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
        <section className="w-full py-16 bg-white">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#34586a] mb-2">
                Frequently Asked Questions
              </h2>
              <div className="text-[#6bc3e3] text-lg font-medium flex flex-col items-center">
                <span>Your right to Know!</span>
                <span className="mt-1 h-[3px] w-32 bg-[#f4f37a] rounded-full"></span>
              </div>
            </div>

            {/* FAQ List */}
            <div className="flex flex-col gap-4">
              {faqs.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-300 rounded-md"
                >
                  <button
                    className="w-full flex items-center justify-between px-5 py-4 cursor-pointer focus:outline-none transition hover:shadow-md"
                    onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                    aria-expanded={openIdx === idx}
                  >
                    <span className="text-gray-700 text-base text-left">
                      <span className="font-medium mr-2">Q:</span>
                      {item.question}
                    </span>
                    <ChevronRight
                      className={`text-gray-400 transition-transform duration-200 ${openIdx === idx ? "rotate-90" : ""
                        }`}
                      size={24}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-200 px-5 ${openIdx === idx ? "max-h-40 py-3" : "max-h-0 py-0"
                      }`}
                    style={{
                      background: openIdx === idx ? "#f9fafb" : "white",
                    }}
                  >
                    <div className="text-gray-600 text-[15px]">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="px-4 pt-10 pb-12 flex justify-center">
          <div className="w-[1400px]">
            {/* Heading */}
            <div className="flex items-center mb-4">
              <span className="h-7 w-1.5 bg-yellow-400 mr-3 rounded-sm" />
              <h2 className="text-[#34586a] text-2xl sm:text-2xl font-bold">
                Europe Travel Guidelines
              </h2>
            </div>
            {/* List */}
            <div className="bg-white shadow-[0_2px_18px_rgba(32,60,132,0.07)] rounded-lg px-6 py-6">
              <ol className="list-decimal pl-5 text-[17px] text-[#385162] leading-relaxed">
                <li>
                  While applying for a Schengen Visa, your passport should be
                  valid 6 months post the date of travel.
                </li>
                <li>
                  Your passport should have at least 2 blank pages with all the
                  previous Visa applications through the same passport.
                </li>
                <li>
                  It is advised to activate an International roaming plan as per
                  the countries you are visiting, before departing from India.
                </li>
                <li>
                  Currency exchange rates at airports are comparatively higher.
                  Rather exchange your currency from your city in India for
                  better deals. You can also use an International travel card
                  which is widely accepted in Europe.
                </li>
                <li>
                  Purchase tickets for major monuments in advance to save time.
                </li>
              </ol>
            </div>
          </div>
        </section>
        <section className="w-full flex justify-center items-center py-8">
          <div className="w-[1400px] bg-white rounded-xl shadow-[0_2px_18px_rgba(32,60,132,0.07)] px-6 py-7">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Europe Tour Packages
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-4">
              {packages.map((name, idx) => (
                <button
                  key={idx}
                  className="border border-sky-500 text-sky-700 bg-white px-5 py-2 rounded-md font-medium text-base hover:bg-sky-50 transition min-w-[270px] text-left"
                  style={{ boxShadow: "none" }}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </section>
        <section className="py-10 w-full bg-white">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-3xl font-bold text-[#34586a] mb-2">
              Our Blogs
            </h2>
            <span className="text-lg text-[#6ea7c5] font-semibold mb-1">
              Some good reads to help you travel better!
            </span>
            <span className="block w-40 h-1 rounded bg-yellow-300 mb-2" />
          </div>

          {/* Responsive Flex: column on mobile, row on md+ */}
          <div className="flex flex-col md:flex-row gap-6 md:w-[1400px] w-full mx-auto px-2 md:px-4">
            {/* Left: List of Blogs */}
            <div className="flex flex-col gap-4 flex-1 min-w-0 md:min-w-[340px]">
              {blogData.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col md:flex-row bg-white border p-5 md:p-7 border-sky-200 rounded-md overflow-hidden transition hover:shadow-md"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[170px] md:w-[220px] md:h-[110px] object-cover rounded-md"
                  />
                  <div className="pl-0 pt-3 md:pl-4 md:py-4 flex flex-col justify-center w-full">
                    <h3 className="font-bold text-lg md:text-[1.7rem] leading-tight text-[#29323d] mb-2">
                      {item.title}
                    </h3>
                    <div className="text-gray-500 text-sm md:text-base">
                      {item.date} | {item.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Right: Featured Blog */}
            <div className="flex-1 min-w-0 md:min-w-[380px]">
              <div className="h-full bg-white border border-sky-200 rounded-md overflow-hidden flex flex-col transition hover:shadow-md">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-[200px] md:h-[330px] object-cover"
                />
                <div className="flex flex-col flex-1 px-4 md:px-5 py-4 md:py-5 relative">
                  <h3 className="font-bold text-xl md:text-3xl text-[#29323d] leading-snug mb-3">
                    {featured.title}
                  </h3>
                  <div className="text-gray-500 text-sm md:text-base mb-5">
                    {featured.date} | {featured.time}
                  </div>
                  <div className="absolute bottom-4 right-6 flex items-center hidden md:flex">
                    <a
                      href="#"
                      className="text-sky-700 font-semibold text-lg flex items-center gap-1 hover:underline"
                    >
                      Read Full <ArrowRight className="ml-0.5 w-5 h-5" />
                    </a>
                  </div>
                  {/* Show 'Read Full' below on mobile */}
                  <div className="mt-3 flex md:hidden">
                    <a
                      href="#"
                      className="text-sky-700 font-semibold text-base flex items-center gap-1 hover:underline"
                    >
                      Read Full <ArrowRight className="ml-0.5 w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Features />
        <section className="w-full py-14 bg-white">
          <div className="max-w-[1200px] mx-auto">
            <div className="relative mb-6 flex items-center justify-center">
              <div className="flex-1 border-t border-gray-300" />
              <span
                className="text-[22px] tracking-[0.18em] text-gray-500 font-[500] px-6"
                style={{ letterSpacing: "0.17em" }}
              >
                UNFILTERED REVIEWS
              </span>
              <div className="flex-1 border-t border-gray-300" />
            </div>

            <div className="relative flex items-center">
              {/* Left Arrow */}
              <button
                ref={prevReviewRef}
                className="hidden md:block absolute left-[-35px] z-10 bg-white border-2 border-gray-700 w-12 h-12 rounded-full flex items-center justify-center transition hover:bg-gray-100"
                style={{ top: "42%" }}
                aria-label="Previous"
              >
                <ChevronLeft className="w-7 h-7 text-gray-800" />
              </button>

              <div className="w-full">
                <Swiper
                  modules={[Navigation]}
                  navigation={{
                    prevEl: prevReviewRef.current,
                    nextEl: nextReviewRef.current,
                  }}
                  onInit={(swiper) => {
                    (swiper.params.navigation as any).prevEl = prevReviewRef.current;
                    (swiper.params.navigation as any).nextEl = nextReviewRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }}
                  slidesPerView={2}
                  spaceBetween={48}
                  breakpoints={{
                    0: { slidesPerView: 1, spaceBetween: 24 },
                    900: { slidesPerView: 2, spaceBetween: 48 },
                  }}
                  className="px-1"
                >
                  {reviews.map((review, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="flex flex-col items-center h-full px-2 py-7">
                        {/* Collage (not overlapping, neatly staggered) */}
                        <div className="relative mb-3 h-[120px] w-[185px] flex items-end">
                          {/* First Image */}
                          <img
                            src={review.images[0]}
                            className="absolute left-0 top-0 w-[95px] h-[120px] object-cover rounded shadow border-2 border-white z-10"
                            alt=""
                          />
                          {/* Tape */}
                          <span
                            className="absolute left-[62px] top-[-15px] w-20 h-4 bg-yellow-100 rotate-[-23deg] z-30"
                            style={{ opacity: 0.89 }}
                          />
                          {/* Second Image */}
                          <img
                            src={review.images[1]}
                            className="absolute left-[62px] top-[24px] w-[120px] h-[85px] object-cover rounded shadow border-2 border-white z-20"
                            alt=""
                          />
                        </div>
                        {/* Review Text (consistent length) */}
                        <div
                          className="text-gray-800 text-[16px] leading-snug text-left w-full mb-7 font-[400] min-h-[70px] max-w-[420px] line-clamp-3"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            minHeight: "70px",
                            maxHeight: "72px",
                          }}
                        >
                          {review.text}
                        </div>
                        {/* Continue reading + name */}
                        <div className="flex justify-between w-full items-end">
                          <span className="font-bold text-[18px] text-black pl-1">
                            continue reading …
                          </span>
                          <span className="font-medium text-sky-800 pr-1">
                            {review.name}
                          </span>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Right Arrow */}
              <button
                ref={nextRef}
                className="absolute right-[-35px] z-10 bg-white border-2 border-gray-700 w-12 h-12 rounded-full flex items-center justify-center transition hover:bg-gray-100"
                style={{ top: "42%" }}
                aria-label="Next"
              >
                <ChevronRight className="w-7 h-7 text-gray-800" />
              </button>
            </div>
          </div>
        </section>
        <section>
          <div className="w-full flex justify-center py-12 bg-[#fafcfd]">
            <div
              className="w-[1100px] bg-[#E3FAFF] border border-sky-300 rounded-2xl shadow-md py-8 px-6 flex flex-col gap-2 items-start"
              style={{ boxShadow: "0 3px 18px 0 rgba(32,60,132,0.07)" }}
            >
              {/* Heading */}
              <div className="mb-2 ml-1 text-[20px] font-semibold text-[#34586a] flex items-center">
                Don’t Just Dream, Travel!{" "}
                <span className="ml-2 text-lg">🔥</span>
              </div>
              {/* Form */}
              <form className="w-full flex items-center gap-5">
                {/* Name Input */}
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <User className="w-5 h-5" />
                  </span>
                  <input
                    type="text"
                    className="pl-11 pr-4 py-3 rounded-md border border-sky-200 bg-white w-full focus:outline-none focus:border-sky-400 transition text-[16px]"
                    placeholder="Enter your name*"
                    style={{ backgroundColor: "#F0FDFF" }}
                  />
                </div>
                {/* Phone Input */}
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Phone className="w-5 h-5" />
                  </span>
                  <input
                    type="tel"
                    className="pl-11 pr-4 py-3 rounded-md border border-sky-200 bg-white w-full focus:outline-none focus:border-sky-400 transition text-[16px]"
                    placeholder="Enter your phone number*"
                    style={{ backgroundColor: "#F0FDFF" }}
                  />
                </div>
                {/* Button */}
                <button
                  type="submit"
                  className="flex-1 hover:bg-[#5e9ec0] text-white font-semibold text-[17px] py-3 rounded-full transition-all duration-150 shadow"
                  style={{ maxWidth: 360, backgroundColor: "#00AFD1" }}
                >
                  ENQUIRE NOW
                </button>
              </form>
            </div>
          </div>
        </section>
        <section className="w-full flex justify-center items-center py-8">
          <div className="w-[1400px] bg-white rounded-xl shadow-[0_2px_18px_rgba(32,60,132,0.07)] px-6 py-7">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              International Tour Packages
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-4">
              {packages2.map((name, idx) => (
                <button
                  key={idx}
                  className="border border-sky-500 text-sky-700 bg-white px-5 py-2 rounded-md font-medium text-base hover:bg-sky-50 transition min-w-[270px] text-left"
                  style={{ boxShadow: "none" }}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full flex justify-center items-center py-8">
          <div className="w-[1400px] bg-white rounded-xl shadow-[0_2px_18px_rgba(32,60,132,0.07)] px-6 py-7">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              India Tour Packages
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-4">
              {packages3.map((name, idx) => (
                <button
                  key={idx}
                  className="border border-sky-500 text-sky-700 bg-white px-5 py-2 rounded-md font-medium text-base hover:bg-sky-50 transition min-w-[270px] text-left"
                  style={{ boxShadow: "none" }}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full flex justify-center items-center py-8">
          <div className="w-[1400px] bg-white rounded-xl shadow-[0_2px_18px_rgba(32,60,132,0.07)] px-6 py-7">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Other Packages
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-4">
              {otherPackages.map((name, idx) => (
                <button
                  key={idx}
                  className="border border-sky-500 text-sky-700 bg-white px-5 py-2 rounded-md font-medium text-base hover:bg-sky-50 transition min-w-[270px] text-left"
                  style={{ boxShadow: "none" }}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer setIsContactModalOpen={setIsContactModalOpen} />

      <PackageContact
        open={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        destination="Europe"
      />
    </>
  );
}
