import React from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  MapPin,
  Star,
  Users,
  Calendar,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ContactModal from "@/components/ContactModal";
import Navigations from "@/components/Navigation";
import PackageCard from "@/components/PackageCard";
import TestimonialCard from "@/components/TestimonialCard";
import Footer from "@/components/Footer";
import abc from "../../public/abc.png";
import uct from "../../public/ucl.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import "swiper/swiper.min.css";
// import "swiper/swiper.scss"; // core Swiper
const Index = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const carouselRef = useRef<{ next: () => void } | null>(null);
  const AUTO_SLIDE_INTERVAL = 3000;
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const heroSlides = [
    {
      image:
        "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1920&q=80",
      title: "Discover Amazing Destinations",
      subtitle:
        "Explore the world's most beautiful places with our curated travel packages",
    },
    {
      image:
        "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1920&q=80",
      title: "Adventure Awaits You",
      subtitle: "Experience breathtaking landscapes and unforgettable memories",
    },
    {
      image:
        "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1920&q=80",
      title: "Paradise Found",
      subtitle: "Relax on pristine beaches and enjoy luxury accommodations",
    },
  ];

  const featuredPackages = [
    {
      id: 1,
      title: "Bali Paradise",
      description:
        "Experience the magic of Bali with pristine beaches and cultural wonders",
      image:
        "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=500&q=80",
      price: 1299,
      duration: "7 Days",
      location: "Bali, Indonesia",
      rating: 4.8,
      reviews: 156,
    },
    {
      id: 2,
      title: "Swiss Alps Adventure",
      description: "Breathtaking mountain views and alpine adventures await",
      image:
        "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=500&q=80",
      price: 1899,
      duration: "10 Days",
      location: "Switzerland",
      rating: 4.9,
      reviews: 203,
    },
    {
      id: 3,
      title: "African Safari",
      description: "Witness incredible wildlife in their natural habitat",
      image:
        "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&w=500&q=80",
      price: 2499,
      duration: "12 Days",
      location: "Kenya & Tanzania",
      rating: 4.7,
      reviews: 98,
    },
    {
      id: 4,
      title: "Patagonia Expedition",
      description: "Explore the untamed wilderness of South America",
      image:
        "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=500&q=80",
      price: 2199,
      duration: "14 Days",
      location: "Argentina & Chile",
      rating: 4.6,
      reviews: 87,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      text: "Our Bali trip was absolutely incredible! Every detail was perfectly planned and the experiences were unforgettable.",
    },
    {
      name: "Michael Chen",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      text: "The Swiss Alps adventure exceeded all expectations. The views were breathtaking and the service was impeccable.",
    },
    {
      name: "Emma Williams",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      text: "Amazing safari experience! We saw all the Big 5 and the guides were incredibly knowledgeable.",
    },
    {
      name: "David Rodriguez",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      text: "Patagonia was a dream come true! The landscapes were stunning and our guide was fantastic.",
    },
    {
      name: "Lisa Park",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      text: "Perfect honeymoon destination! The beaches were pristine and the accommodations were luxurious.",
    },
  ];
  const features = [
    {
      title: "No Third Party Mess",
      desc: "100 percent in-house operations for all trips! No third parties involved, hence no fishy claims!",
      bg: "https://wanderon.in/assets/images/sauceBg1.svg", // Unique background for this card
    },
    {
      title: "Transparency & Security",
      desc: "Real time monitoring of all trips by ground team! All routes and weather conditions are accurately updated!",
      bg: "https://wanderon.in/assets/images/sauceBg2.svg",
    },
    {
      title: "Co-Travelers Filtering",
      desc: "Multi-step filtering to bring only like-minded people together! That’s our key to have fuss-free trips!",
      bg: "https://wanderon.in/assets/images/sauceBg3.svg",
    },
    {
      title: "One Stop Hassle Free Experience",
      desc: "Comfortable stays, trained drivers, hospitable staff and friendly trip leaders put together that one memorable trip for you!",
      bg: "https://wanderon.in/assets/images/sauceBg4.svg",
    },
  ];
  const reviews = [
    {
      name: "Google",
      href: "https://www.google.com/search?gs_ssp=eJzj4tVP1zc0TE_Pzc0qsbAwYLRSNagwtjRITjVONbI0TDNJMU9JszKoMDVLMgYKpRkYGKWmJCUbeXGUJ-alpBbl5wEAV6UTSw&q=wanderon",
      rating: "4.9",
      count: "13080",
      icon: "https://ik.imagekit.io/workcations/gallery/landing-pages/social/google.png",
    },
    {
      name: "Tripadvisor",
      href: "https://www.tripadvisor.in/Attraction_Review-g304551-d15013133-Reviews-WanderOn-New_Delhi_National_Capital_Territory_of_Delhi.html",
      rating: "5.0",
      count: "3660",
      icon: "https://ik.imagekit.io/workcations/gallery/landing-pages/social/tripadvisor.png",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/wander.on/reviews/",
      rating: "4.9",
      count: "1031",
      icon: "https://ik.imagekit.io/workcations/gallery/landing-pages/social/facebook.png",
    },
  ];
  const StarIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="none"
    >
      <path
        d="M6.02686 4.71162C6.40117 3.77788 6.58832 3.31102 6.89238 3.24631C6.97233 3.2293 7.05496 3.2293 7.13491 3.24631C7.43898 3.31102 7.62613 3.77788 8.00043 4.71162C8.21329 5.24261 8.31972 5.50811 8.51887 5.68869C8.57473 5.73934 8.63537 5.78445 8.69993 5.82339C8.9301 5.96221 9.21744 5.98796 9.79212 6.03946C10.7649 6.12664 11.2514 6.17023 11.3999 6.44775C11.4307 6.50522 11.4516 6.56745 11.4618 6.63185C11.511 6.94278 11.1534 7.26832 10.4383 7.91939L10.2397 8.10019C9.90531 8.40457 9.73813 8.55677 9.64143 8.7467C9.58343 8.86064 9.54453 8.98334 9.52631 9.1099C9.49593 9.32088 9.54489 9.54167 9.6428 9.98325L9.67778 10.141C9.85336 10.9329 9.94116 11.3289 9.83156 11.5235C9.73312 11.6983 9.55179 11.8102 9.35149 11.8198C9.12849 11.8304 8.81428 11.5742 8.18586 11.0619C7.77184 10.7243 7.56482 10.5555 7.33501 10.4895C7.125 10.4293 6.90229 10.4293 6.69228 10.4895C6.46247 10.5555 6.25546 10.7243 5.84143 11.0619C5.21301 11.5742 4.8988 11.8304 4.67581 11.8198C4.4755 11.8102 4.29417 11.6983 4.19573 11.5235C4.08614 11.3289 4.17393 10.9329 4.34952 10.141L4.3845 9.98325C4.48241 9.54167 4.53137 9.32088 4.50099 9.1099C4.48276 8.98334 4.44387 8.86064 4.38586 8.7467C4.28917 8.55677 4.12199 8.40457 3.78763 8.10019L3.58903 7.91939C2.87386 7.26832 2.51627 6.94278 2.56552 6.63185C2.57572 6.56745 2.59663 6.50522 2.6274 6.44775C2.77593 6.17023 3.26235 6.12664 4.23518 6.03946C4.80985 5.98796 5.09719 5.96221 5.32737 5.82339C5.39193 5.78445 5.45256 5.73934 5.50842 5.68869C5.70757 5.50811 5.814 5.24261 6.02686 4.71162Z"
        fill="#FEA500"
        stroke="#FEA500"
        strokeWidth="2"
      />
    </svg>
  );
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };
  useEffect(() => {
    const interval = setInterval(() => {
      // Assuming your Carousel exposes a "next" method via ref
      if (carouselRef.current && carouselRef.current.next) {
        carouselRef.current.next();
      }
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, []);
  const typingTexts = [
    "Create Your Own Journey, Your Own Story...",
    "Find Adventures That Match Your Soul...",
    "Travel With Purpose And People You Love...",
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let charIndex = 0;
    let currentText = typingTexts[currentTextIndex];
    let typingTimeout: NodeJS.Timeout;
    let deletingTimeout: NodeJS.Timeout;

    const type = () => {
      if (charIndex <= currentText.length) {
        setDisplayText(currentText.slice(0, charIndex));
        charIndex++;
        typingTimeout = setTimeout(type, 80);
      } else {
        setTimeout(() => {
          deleteText();
        }, 1500);
      }
    };
    const deleteText = () => {
      if (charIndex >= 0) {
        setDisplayText(currentText.slice(0, charIndex));
        charIndex--;
        deletingTimeout = setTimeout(deleteText, 40);
      } else {
        setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length);
      }
    };

    if (typing) type();

    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(deletingTimeout);
    };
  }, [currentTextIndex, typing]);

  const InternattionalDestinations = [
    {
      title: "Europe",
      price: "1,49,999",
      image:
        "https://images.wanderon.in/new-homepage-data/Explore%20India/kerala",
    },
    {
      title: "Georgia",
      price: "58,999",
      image:
        "https://images.wanderon.in/new-homepage-data/Explore%20India/ladakh",
    },
    {
      title: "Bali",
      price: "49,999",
      image:
        "https://images.wanderon.in/new-homepage-data/Explore%20India/rajasthan",
    },
    {
      title: "Vietnam",
      price: "59,999",
      image:
        "https://images.wanderon.in/new-homepage-data/Explore%20India/andaman",
    },
    {
      title: "Thailand",
      price: "44,999",
      image:
        "https://images.wanderon.in/new-homepage-data/Explore%20India/ladakh",
    },
    {
      title: "Kashmir",
      price: "29,999",
      image:
        "https://images.wanderon.in/new-homepage-data/romantic%20escapes/kashmir-romantic-02",
    },
    {
      title: "Leh-Ladakh",
      price: "39,999",
      image:
        "https://images.wanderon.in/new-homepage-data/Explore%20India/ladakh",
    },
    {
      title: "Spiti Valley",
      price: "34,999",
      image:
        "https://images.wanderon.in/new-homepage-data/Explore%20India/spiti",
    },
    {
      title: "Meghalaya",
      price: "33,999",
      image:
        "https://images.wanderon.in/new-homepage-data/Explore%20India/meghalaya",
    },
  ];

  const RomanticTrips = [
    {
      title: "Europe",
      price: "1,49,999",
      image:
        "https://images.wanderon.in/new-homepage-data/Explore%20India/kerala",
    },
    {
      title: "Georgia",
      price: "58,999",
      image:
        "https://images.wanderon.in/new-homepage-data/Explore%20India/ladakh",
    },
    {
      title: "Bali",
      price: "49,999",
      image:
        "https://images.wanderon.in/new-homepage-data/Explore%20India/rajasthan",
    },
    {
      title: "Vietnam",
      price: "59,999",
      image:
        "https://images.wanderon.in/new-homepage-data/Explore%20India/andaman",
    },
    {
      title: "Thailand",
      price: "44,999",
      image:
        "https://images.wanderon.in/new-homepage-data/Explore%20India/ladakh",
    },
    {
      title: "Kashmir",
      price: "29,999",
      image:
        "https://images.wanderon.in/new-homepage-data/romantic%20escapes/kashmir-romantic-02",
    },
    {
      title: "Leh-Ladakh",
      price: "39,999",
      image:
        "https://images.wanderon.in/new-homepage-data/Explore%20India/ladakh",
    },
    {
      title: "Spiti Valley",
      price: "34,999",
      image:
        "https://images.wanderon.in/new-homepage-data/Explore%20India/spiti",
    },
    {
      title: "Meghalaya",
      price: "33,999",
      image:
        "https://images.wanderon.in/new-homepage-data/Explore%20India/meghalaya",
    },
  ];

  const LocalDestination = [
    {
      title: "Kerala",
      price: "1,49,999",
      image:
        "https://images.wanderon.in/new-homepage-data/Explore%20India/kerala",
    },
    {
      title: "Ladakh",
      price: "58,999",
      image:
        "https://images.wanderon.in/new-homepage-data/Explore%20India/ladakh",
    },
    {
      title: "Rajasthan",
      price: "49,999",
      image:
        "https://images.wanderon.in/new-homepage-data/Explore%20India/rajasthan",
    },
    {
      title: "Andaman",
      price: "59,999",
      image:
        "https://images.wanderon.in/new-homepage-data/Explore%20India/andaman",
    },
    {
      title: "Himachal",
      price: "44,999",
      image:
        "https://images.wanderon.in/new-homepage-data/Explore%20India/ladakh",
    },
    {
      title: "Kashmir",
      price: "29,999",
      image:
        "https://images.wanderon.in/new-homepage-data/romantic%20escapes/kashmir-romantic-02",
    },
    {
      title: "Leh-Ladakh",
      price: "39,999",
      image:
        "https://images.wanderon.in/new-homepage-data/Explore%20India/ladakh",
    },
    {
      title: "Spiti Valley",
      price: "34,999",
      image:
        "https://images.wanderon.in/new-homepage-data/Explore%20India/spiti",
    },
    {
      title: "Meghalaya",
      price: "33,999",
      image:
        "https://images.wanderon.in/new-homepage-data/Explore%20India/meghalaya",
    },
  ];
  const months = [
    "JUN '25",
    "JUL '25",
    "AUG '25",
    "SEP '25",
    "OCT '25",
    "NOV '25",
    "DEC '25",
  ];

  const trips = [
    {
      img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      oldPrice: "₹42,999",
      price: "₹37,499",
      title: "11 Days Ladakh Tour Package with Umling La | Manali Leh Srinagar",
      days: "10N/11D",
      location: "Delhi/Chandigarh - Srinagar",
      date: "18 Jun, 25 Jun",
      icon: "🇮🇳",
    },
    {
      img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      oldPrice: "₹3,61,990",
      price: "₹3,20,990",
      title: "15 Days Summer Special European Grandeur Tour Package",
      days: "14N/15D",
      location: "London Airport - Rome Airport",
      date: "28 Jun",
      icon: "🇪🇺",
    },
    {
      img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
      oldPrice: "₹2,99,990",
      price: "₹2,74,990",
      title: "13 Days Splendid Europe Tour Package | Summer Special",
      days: "12N/13D",
      location: "Paris Airport - Rome Airport",
      date: "18 Jun, 19 Jun, 21 Jun +2 Batches",
      icon: "🇳🇱",
    },
    {
      img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
      oldPrice: "₹2,89,990",
      price: "₹2,43,990",
      title: "Summer Deals: 11 Days Amazing Europe Tour",
      days: "10N/11D",
      location: "Paris Airport - Rome Airport",
      date: "23 Jun, 28 Jun",
      icon: "🇮🇹",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <style>
        {`
          .typing-cursor::after {
            content: '|';
            animation: blink 0.7s infinite;
          }

          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}
      </style>
      <Navigations onContactClick={() => setIsContactModalOpen(true)} />

      {/* Hero Section with Slider */}
      <section className="min-h-[380px] xs:min-h-[430px] sm:min-h-[520px] md:min-h-[600px] lg:min-h-[680px] w-full">
        <Carousel className="h-full">
          <CarouselContent>
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="relative h-screen">
                  <img
                    src={slide.image}
                    alt="hero"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center text-white px-4 max-w-4xl">
                      <h1
                        style={{ fontFamily: "roboto" }}
                        className="text-3xl md:text-7xl font-bold mb-4"
                      >
                        Global Community for Travelers
                      </h1>
                      <p
                        style={{ fontFamily: "roboto" }}
                        className="text-yellow-400 text-xl md:text-3xl font-medium typing-cursor"
                      >
                        {displayText}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious className="hidden sm:block bg-blue-600 hover:bg-blue-700 text-white border-blue-600" /> */}
          {/* <CarouselNext className="hidden sm:block bg-blue-600 hover:bg-blue-700 text-white border-blue-600" /> */}
        </Carousel>
      </section>
      <section
        className="py-5 flex items-center justify-center"
        style={{ backgroundColor: "#F1FDFF" }}
      >
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl w-full px-4">
          {reviews.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 border border-gray-200 shadow-sm p-4 rounded-lg transition hover:shadow-md bg-white w-full sm:w-auto"
            >
              <img
                src={item.icon}
                alt={item.name}
                className="w-10 h-10 object-contain"
              />
              <div>
                <div className="flex items-center gap-1 text-yellow-500 font-bold text-lg">
                  <StarIcon /> {item.rating}
                </div>
                <p className="text-sm text-gray-500">({item.count} reviews)</p>
              </div>
            </a>
          ))}
        </div>
      </section>
      <section className="py-20 px-4 flex items-center justify-center">
        <div className="w-[80%] mx-auto text-center">
          <img src={abc} alt="WanderOn Logo" className="w-full" />
        </div>
      </section>

      <section className="py-20 px-4 flex items-center justify-center">
        <div className="w-[80%] mx-auto text-center">
          <img src={uct} alt="WanderOn Logo" className="w-full" />
        </div>
      </section>
      <section className="py-12 bg-[#FFFBEF] relative">
        <div className="max-w-[1500px] mx-auto px-4 flex flex-col items-center">
          {/* --- Hero Banner --- */}
          <div
            className="w-full bg-cover bg-center rounded-2xl mb-[-60px] relative"
            style={{
              backgroundImage:
                "url('https://images.wanderon.in/new-homepage-data/cta%20homepage%20-%20desktop.png')",
              minHeight: "370px",
              maxWidth: "1400px",
            }}
          >
            <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
            <div className="relative z-10 flex flex-col justify-center h-full px-12 py-12 md:px-24 md:py-20">
              <h1
                className="text-white text-5xl md:text-6xl font-bold mb-6"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                International Trips
              </h1>
              <p
                className="text-white text-lg md:text-2xl mb-8 font-medium"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Discover the world, one destination at a time
              </p>
              <button
                className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold rounded-md px-12 py-3 text-lg shadow-md border border-yellow-400 transition-all duration-150 focus:outline-none"
                style={{ width: 180 }}
              >
                Explore
              </button>
            </div>
          </div>

          {/* --- Swiper Slider --- */}
          <div className="relative w-full max-w-7xl">
            {/* LEFT ARROW */}
            <button
              ref={prevRef}
              className="swiper-button-custom absolute left-0 top-1/2 -translate-y-1/2 z-10"
              aria-label="Previous"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M15.5 19L8.5 12L15.5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* RIGHT ARROW */}
            <button
              ref={nextRef}
              className="swiper-button-custom absolute right-0 top-1/2 -translate-y-1/2 z-10"
              aria-label="Next"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M8.5 5L15.5 12L8.5 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Swiper: clipped between arrows */}
            <div className="overflow-hidden px-[56px]">
              {/* px-[56px] = 42px (arrow) + 14px (gap), match to your arrow size */}
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={"auto"}
                centeredSlides={false}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination-custom",
                }}
                onInit={(swiper) => {
                  // @ts-ignore
                  swiper.params.navigation.prevEl = prevRef.current;
                  // @ts-ignore
                  swiper.params.navigation.nextEl = nextRef.current;
                  swiper.navigation.init();
                  swiper.navigation.update();
                }}
                className="w-full"
              >
                {InternattionalDestinations.map((item, idx) => (
                  <SwiperSlide
                    key={idx}
                    className="w-[260px] md:w-[300px] flex-shrink-0"
                  >
                    <div className="rounded-xl overflow-hidden shadow-lg border bg-white">
                      <div className="relative h-[350px]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/50 to-transparent">
                          <h3 className="text-white text-center text-2xl font-bold">
                            {item.title}
                          </h3>
                          <p className="text-white text-center text-sm font-medium">
                            Starting Price Rs. {item.price}/-
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {/* Pagination Dots */}
            {/* <div className="swiper-pagination-custom mt-5"></div> */}
          </div>
        </div>

        {/* Swiper custom styles */}
        <style>{`
        .swiper-button-custom {
          background: white;
          border-radius: 50%;
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: box-shadow 0.2s;
        }
        .swiper-button-custom:after { display: none; }
        .swiper-button-custom svg {
          width: 28px;
          height: 28px;
          color: #4bb2e8;
        }
        .swiper-pagination-custom {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 18px;
        }
        .swiper-pagination-bullet {
          width: 44px;
          height: 8px;
          border-radius: 8px;
          background: #e0e6ea;
          opacity: 1;
          transition: background 0.3s;
        }
        .swiper-pagination-bullet-active {
          background: #4bb2e8;
        }
      `}</style>
      </section>
      <section className="py-12 bg-[#FFFBEF] relative">
        <div className="max-w-[1500px] mx-auto px-4 flex flex-col items-center">
          {/* --- Hero Banner --- */}
          <div
            className="w-full bg-cover bg-center rounded-2xl mb-[-60px] relative"
            style={{
              backgroundImage:
                "url('https://images.wanderon.in/new-homepage-data/cta%20homepage%20-%20desktop.png')",
              minHeight: "370px",
              maxWidth: "1400px",
            }}
          >
            <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
            <div className="relative z-10 flex flex-col justify-center h-full px-12 py-12 md:px-24 md:py-20">
              <h1
                className="text-white text-3xl md:text-6xl font-bold mb-6"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Local Trips
              </h1>
              <p
                className="text-white text-md md:text-2xl mb-8 font-medium"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Discover the world, one destination at a time
              </p>
              <button
                className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold rounded-md px-12 py-3 text-lg shadow-md border border-yellow-400 transition-all duration-150 focus:outline-none"
                style={{ width: 180 }}
              >
                Explore
              </button>
            </div>
          </div>

          {/* --- Swiper Slider --- */}
          <div className="relative w-full max-w-7xl">
            {/* LEFT ARROW */}
            <button
              ref={prevRef}
              className="swiper-button-custom absolute left-0 top-1/2 -translate-y-1/2 z-10"
              aria-label="Previous"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M15.5 19L8.5 12L15.5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* RIGHT ARROW */}
            <button
              ref={nextRef}
              className="swiper-button-custom absolute right-0 top-1/2 -translate-y-1/2 z-10"
              aria-label="Next"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M8.5 5L15.5 12L8.5 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Swiper: clipped between arrows */}
            <div className="overflow-hidden px-[56px]">
              {/* px-[56px] = 42px (arrow) + 14px (gap), match to your arrow size */}
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={"auto"}
                centeredSlides={false}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination-custom",
                }}
                onInit={(swiper) => {
                  // @ts-ignore
                  swiper.params.navigation.prevEl = prevRef.current;
                  // @ts-ignore
                  swiper.params.navigation.nextEl = nextRef.current;
                  swiper.navigation.init();
                  swiper.navigation.update();
                }}
                className="w-full"
              >
                {LocalDestination.map((item, idx) => (
                  <SwiperSlide
                    key={idx}
                    className="w-[260px] md:w-[300px] flex-shrink-0"
                  >
                    <div className="rounded-xl overflow-hidden shadow-lg border bg-white">
                      <div className="relative h-[350px]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/50 to-transparent">
                          <h3 className="text-white text-center text-2xl font-bold">
                            {item.title}
                          </h3>
                          <p className="text-white text-center text-sm font-medium">
                            Starting Price Rs. {item.price}/-
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {/* Pagination Dots */}
            {/* <div className="swiper-pagination-custom mt-5"></div> */}
          </div>
        </div>

        {/* Swiper custom styles */}
        <style>{`
        .swiper-button-custom {
          background: white;
          border-radius: 50%;
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: box-shadow 0.2s;
        }
        .swiper-button-custom:after { display: none; }
        .swiper-button-custom svg {
          width: 28px;
          height: 28px;
          color: #4bb2e8;
        }
        .swiper-pagination-custom {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 18px;
        }
        .swiper-pagination-bullet {
          width: 44px;
          height: 8px;
          border-radius: 8px;
          background: #e0e6ea;
          opacity: 1;
          transition: background 0.3s;
        }
        .swiper-pagination-bullet-active {
          background: #4bb2e8;
        }
      `}</style>
      </section>
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Upcoming Community Trips
            </h2>
            <a
              href="#"
              className="text-blue-700 text-base md:text-lg font-semibold flex items-center gap-1 hover:underline"
            >
              View All
              <span className="inline-block ml-1 text-lg">→</span>
            </a>
          </div>

          {/* Month Tabs */}
          <div className="flex items-center gap-3 overflow-x-auto pb-3 mb-2">
            {months.map((m, i) => (
              <button
                key={i}
                className={`whitespace-nowrap rounded-full px-6 py-2 border text-base font-medium transition-all ${i === 0
                  ? "bg-blue-50 border-blue-400 text-blue-800 shadow-sm"
                  : "bg-white border-gray-200 text-gray-600 hover:border-blue-300"
                  }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Slider */}
          <div className="relative mt-4">
            {/* Left Arrow */}
            <button
              ref={prevRef}
              className="absolute z-10 left-[-25px] top-1/2 -translate-y-1/2 bg-white shadow-lg w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-blue-100 transition-all"
            >
              <FaArrowLeft className="text-blue-500 text-lg" />
            </button>
            {/* Right Arrow */}
            <button
              ref={nextRef}
              className="absolute z-10 right-[-25px] top-1/2 -translate-y-1/2 bg-white shadow-lg w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-blue-100 transition-all"
            >
              <FaArrowRight className="text-blue-500 text-lg" />
            </button>
            {/* Cards */}
            <Swiper
              modules={[Navigation]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1.1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              navigation={{
                prevEl: prevRef.current!,
                nextEl: nextRef.current!,
              }}
              onInit={(swiper) => {
                // @ts-ignore
                swiper.params.navigation.prevEl = prevRef.current;
                // @ts-ignore
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }}
            >
              {trips.map((trip, idx) => (
                <SwiperSlide key={idx}>
                  <div
                    className="relative group rounded-2xl overflow-hidden h-[420px] flex flex-col justify-end"
                    style={{
                      backgroundImage: `url(${trip.img})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {/* Black Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-0" />

                    {/* Price Badge */}
                    <div className="absolute top-5 left-5 z-10">
                      <div className="bg-yellow-300/95 text-gray-900 font-semibold px-4 py-1 rounded-full flex items-center gap-2 text-base shadow">
                        <span className="line-through text-gray-600">{trip.oldPrice}</span>
                        <span className="font-bold">{trip.price}/-</span>
                        <span className="text-xs">Onwards</span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="relative z-10 p-6 pb-4 flex flex-col justify-end">
                      <div className="text-white font-bold text-base leading-snug mb-2 line-clamp-2 drop-shadow">
                        {trip.title}
                      </div>
                      <div className="flex flex-wrap items-center text-white/90 text-xs mb-1 gap-x-4 gap-y-1">
                        <span className="flex items-center gap-1">
                          <span className="text-lg">⏱️</span> {trip.days}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-lg">📍</span> {trip.location}
                        </span>
                      </div>
                      <div className="flex items-center text-white/90 text-xs gap-2">
                        <span className="flex items-center gap-1">
                          <span className="text-lg">📅</span> {trip.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
      <section className="py-12 bg-[#FFFBEF] relative">
        <div className="max-w-[1500px] mx-auto px-4 flex flex-col items-center">
          {/* --- Hero Banner --- */}
          <div
            className="w-full bg-cover bg-center rounded-2xl mb-[-60px] relative"
            style={{
              backgroundImage:
                "url('https://images.wanderon.in/new-homepage-data/cta%20homepage%20-%20desktop.png')",
              minHeight: "370px",
              maxWidth: "1400px",
            }}
          >
            <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
            <div className="relative z-10 flex flex-col justify-center h-full px-12 py-12 md:px-24 md:py-20">
              <h1
                className="text-white text-3xl md:text-6xl font-bold mb-6"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Romantic Escapes
              </h1>
              <p
                className="text-white text-md md:text-2xl mb-8 font-medium"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Where Forever Begins...Together!              </p>
              <button
                className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold rounded-md px-12 py-3 text-lg shadow-md border border-yellow-400 transition-all duration-150 focus:outline-none"
                style={{ width: 180 }}
              >
                Explore
              </button>
            </div>
          </div>

          {/* --- Swiper Slider --- */}
          <div className="relative w-full max-w-7xl">
            {/* LEFT ARROW */}
            <button
              ref={prevRef}
              className="swiper-button-custom absolute left-0 top-1/2 -translate-y-1/2 z-10"
              aria-label="Previous"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M15.5 19L8.5 12L15.5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* RIGHT ARROW */}
            <button
              ref={nextRef}
              className="swiper-button-custom absolute right-0 top-1/2 -translate-y-1/2 z-10"
              aria-label="Next"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M8.5 5L15.5 12L8.5 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Swiper: clipped between arrows */}
            <div className="overflow-hidden px-[56px]">
              {/* px-[56px] = 42px (arrow) + 14px (gap), match to your arrow size */}
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={"auto"}
                centeredSlides={false}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination-custom",
                }}
                onInit={(swiper) => {
                  // @ts-ignore
                  swiper.params.navigation.prevEl = prevRef.current;
                  // @ts-ignore
                  swiper.params.navigation.nextEl = nextRef.current;
                  swiper.navigation.init();
                  swiper.navigation.update();
                }}
                className="w-full"
              >
                {LocalDestination.map((item, idx) => (
                  <SwiperSlide
                    key={idx}
                    className="w-[260px] md:w-[300px] flex-shrink-0"
                  >
                    <div className="rounded-xl overflow-hidden shadow-lg border bg-white">
                      <div className="relative h-[350px]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/50 to-transparent">
                          <h3 className="text-white text-center text-2xl font-bold">
                            {item.title}
                          </h3>
                          <p className="text-white text-center text-sm font-medium">
                            Starting Price Rs. {item.price}/-
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {/* Pagination Dots */}
            {/* <div className="swiper-pagination-custom mt-5"></div> */}
          </div>
        </div>

        {/* Swiper custom styles */}
        <style>{`
        .swiper-button-custom {
          background: white;
          border-radius: 50%;
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: box-shadow 0.2s;
        }
        .swiper-button-custom:after { display: none; }
        .swiper-button-custom svg {
          width: 28px;
          height: 28px;
          color: #4bb2e8;
        }
        .swiper-pagination-custom {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 18px;
        }
        .swiper-pagination-bullet {
          width: 44px;
          height: 8px;
          border-radius: 8px;
          background: #e0e6ea;
          opacity: 1;
          transition: background 0.3s;
        }
        .swiper-pagination-bullet-active {
          background: #4bb2e8;
        }
      `}</style>
      </section>
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-10">
            <div className="text-[#12a5c4] font-semibold text-lg mb-1">
              Why WanderOn?
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#066980]">
              WanderOn’s Secret Sauce
            </h2>
            <div className="flex justify-center mt-4">
              <span className="block w-32 h-1 bg-yellow-400 rounded"></span>
            </div>
          </div>
          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {features.map((item, idx) => (
              <div
                key={item.title}
                className="relative rounded-2xl border border-blue-200 bg-white p-6 pt-8 pb-24 min-h-[340px] shadow-sm hover:shadow-lg transition-shadow flex flex-col"
                style={{
                  backgroundImage: `url('${item.bg}')`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "left bottom",
                  backgroundSize: "contain",
                }}
              >
                <h3 className="text-[#12a5c4] text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-base mb-4">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    <div className="container mx-auto py-8">
      <section className="custom-swiper-slider relative">
        {/* Arrow Buttons */}
        <Swiper
          spaceBetween={10}
          slidesPerView={6}
          modules={[Autoplay, Navigation]}
          autoplay={true}
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
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 4 },  // Show 4 slides from 1024px+
      1280: { slidesPerView: 4 },  // Optional: 4 slides on extra large screens too
    }}
        >
          {Array.from({ length: 20 }).map((_, index) => (
            <SwiperSlide key={index}>
              <img
                alt=""
                src={`https://picsum.photos/seed/picsum${index}/300`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-blue-900">
              Featured Travel Packages
            </h2>
            <p className="text-xl text-blue-700 max-w-2xl mx-auto">
              Discover our handpicked selection of extraordinary travel
              experiences
            </p>
          </div>

          {/* Package Grid */}
          <div className="px-4 py-10">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                0: { slidesPerView: 1 },
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 3 },
              }}
            >
              {featuredPackages.map((pkg) => (
                <SwiperSlide key={pkg.id}>
                  <PackageCard package={pkg} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-blue-900">
              Why Choose Wanderlust
            </h2>
            <p className="text-xl text-blue-700">
              We make your travel dreams come true
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-blue-900">Expert Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-blue-700">
                  Our experienced local guides ensure you get the most authentic
                  and memorable experiences
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-blue-900">
                  Unique Destinations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-blue-700">
                  We take you to hidden gems and exclusive locations that most
                  tourists never discover
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-blue-900">
                  Flexible Planning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-blue-700">
                  Customize your journey with flexible itineraries tailored to
                  your preferences and budget
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-blue-900">
              What Our Travelers Say
            </h2>
            <p className="text-xl text-blue-700">
              Real experiences from real adventurers
            </p>
          </div>

          <Carousel className="w-full" opts={{ align: "start", loop: true }}>
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <TestimonialCard testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:block bg-blue-600 hover:bg-blue-700 text-white border-blue-600" />
            <CarouselNext className="hidden sm:block bg-blue-600 hover:bg-blue-700 text-white border-blue-600" />
          </Carousel>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 opacity-90">
            Subscribe to our newsletter for exclusive deals and travel
            inspiration
          </p>

          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <div className="flex-1">
              <Label htmlFor="email" className="sr-only">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white text-blue-900 border-white"
              />
            </div>
            <Button
              type="submit"
              variant="secondary"
              size="default"
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-16 border-t border-blue-200">
        <Footer setIsContactModalOpen={setIsContactModalOpen} />
      </footer>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
};

export default Index;
