import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import "./style.css";

const trips = [
  {
    img: "https://images.wanderon.in/europe_card?updatedAt=1690541894161",
    title: "Europe",
    subtitle: "The Canvas of Your Dreams",
    price: "1,49,999",
    badge: "THIS SUMMER SEASON",
  },
  {
    img: "https://images.wanderon.in/Georgia-card?updatedAt=173148908290",
    title: "Europe",
    subtitle: "The Canvas of Your Dreams",
    price: "1,49,999",
    badge: "THIS SUMMER SEASON",
  },
  {
    img: "https://images.wanderon.in/bali_card?updatedAt=1690541894161",
    title: "Europe",
    subtitle: "The Canvas of Your Dreams",
    price: "1,49,999",
    badge: "THIS SUMMER SEASON",
  },
  {
    img: "https://images.wanderon.in/vietnam_card?updatedAt=1690541894161",
    title: "Europe",
    subtitle: "The Canvas of Your Dreams",
    price: "1,49,999",
    badge: "THIS SUMMER SEASON",
  },
  {
    img: "https://images.wanderon.in/thailand_card?updatedAt=1690541894161",
    title: "Europe",
    subtitle: "The Canvas of Your Dreams",
    price: "1,49,999",
    badge: "THIS SUMMER SEASON",
  },
  {
    img: "https://wanderon-sales.s3.ap-south-1.amazonaws.com/Spain+card.webp",
    title: "Europe",
    subtitle: "The Canvas of Your Dreams",
    price: "1,49,999",
    badge: "THIS SUMMER SEASON",
  },
];

export default function EffectCard() {
  return (
<div id="app" className="block md:hidden bg-[#fffbe0] px-0 pt-3 pb-5">
      {/* Heading + SVG row */}
      <div className="flex flex-row items-center w-full px-2 mb-4">
        <h2 className="font-bold text-[1.18rem] text-[#2e3839] flex-shrink-0 pr-2">
          International Trips
        </h2>
        <img
          src="https://images.wanderon.in/new-homepage-data/assets/international-image"
          alt="International SVG"
          className="ml-auto w-[150px] h-[80px] object-contain"
        />
      </div>
      {/* Centered swiper */}
      <div className="flex justify-center">
        <Swiper
          effect="cards"
          grabCursor={true}
          modules={[EffectCards]}
          className="card-swiper"
        >
          {trips.map((trip, idx) => (
            <SwiperSlide
              key={idx}
              className="card-swiper-slide relative overflow-hidden"
            >
              {/* Background image */}
              <img
                src={trip.img}
                alt={trip.title}
                className="absolute inset-0 w-full h-full object-cover z-0 rounded-[18px]"
              />
              {/* Top Info */}
              <div className="absolute top-7 left-0 w-full z-10 text-center px-2">
                <div className="text-xs text-white font-medium tracking-wide">
                  {trip.subtitle}
                </div>
                <div className="text-4xl font-bold text-yellow-200 leading-snug drop-shadow-sm">
                  {/* {trip.title} */}
                </div>
              </div>
              {/* Black layer at bottom */}
              <div className="absolute left-0 right-0 bottom-0 z-20">
                <div className="bg-black/90 rounded-b-[18px] px-5 pt-3 pb-5 flex flex-col">
                  <span className="font-extrabold text-lg text-white mb-1">
                    {trip.title}
                  </span>
                  <span className="text-white text-sm font-medium">
                    Starting Price Rs. {trip.price}/-
                  </span>
                </div>
              </div>
              {/* Badge */}
              {/* <div className="absolute bottom-2 right-4 z-30">
                <span className="bg-yellow-300 rounded-xl px-4 py-2 text-xs font-bold shadow border border-yellow-100 text-[#35789c]">
                  {trip.badge}
                </span>
              </div> */}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
