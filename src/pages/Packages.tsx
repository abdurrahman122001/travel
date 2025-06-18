import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { BadgePercent, ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Navigations from "@/components/Navigation";
import PackageContact from "@/components/PackageContact";
const slides = [
    {
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80", // Europe train
        title: "Europe Tour Packages",
        subtitle: "Europe: The Land Of Endless Discoveries – Upto 30% Off",
        price: "Rs. 1,44,990/- Per Person",
        cta: "Request a Callback"
    },
    {
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80", // Lake
        title: "Lake Retreats",
        subtitle: "Serene Views & Luxury – Up to 20% Off",
        price: "Rs. 49,990/- Per Person",
        cta: "Request a Callback"
    },
    {
        image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80", // Mountains
        title: "Swiss Alps Adventure",
        subtitle: "Breathtaking Alps Journey – Save Big",
        price: "Rs. 2,10,000/- Per Person",
        cta: "Request a Callback"
    }
];

export default function Package() {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    return (
<>
    <div className="min-h-screen bg-background">
        <Navigations onContactClick={() => setIsContactModalOpen(true)} />
        <section className="relative">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation={{
                    nextEl: ".hero-swiper-next",
                    prevEl: ".hero-swiper-prev"
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
                                    <span className="text-white text-lg">Starting Price:</span>
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
                <button className="hero-swiper-prev absolute z-10 top-1/2 left-4 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 md:p-3 transition">
                    <ChevronLeft size={28} />
                </button>
                <button className="hero-swiper-next absolute z-10 top-1/2 right-4 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 md:p-3 transition">
                    <ChevronRight size={28} />
                </button>
            </Swiper>

            {/* Custom Dots (optional, use Swiper default if preferred) */}
            {/* ... */}
        </section>
    </div>
    <PackageContact
        open={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        destination="Europe"
    />
</>
    );
}
