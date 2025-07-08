import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import "./style.css";

const API_URL = import.meta.env.VITE_API_URL; // Make sure this is set in your env

export default function EffectCardTwo() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setLoading(true);
    setErr(null);

    fetch(`${API_URL}/trips/explore-india`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load trips");
        return res.json();
      })
      .then((data) => {
        setTrips(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((e) => {
        setErr(e.message);
        setLoading(false);
      });
  }, []);

  return (
    <div id="app" className="block md:hidden bg-[#FFECE2] px-0 pt-3 pb-5 mt-10">
      {/* Heading + SVG row */}
      <div className="flex flex-row items-center w-full px-2 mb-4">
        <h2 className="font-bold text-[1.18rem] text-[#2e3839] flex-shrink-0 pr-2">
          Explore India
        </h2>
        <img
          src="https://images.wanderon.in/new-homepage-data/assets/india-image"
          alt="International SVG"
          className="ml-auto w-[60px] h-[60px] object-contain"
        />
      </div>
      {/* Centered swiper */}
      <div className="flex justify-center">
        {loading ? (
          <div className="w-full flex items-center justify-center h-[340px] text-lg">
            Loading...
          </div>
        ) : err ? (
          <div className="w-full flex items-center justify-center h-[340px] text-red-600 text-lg">
            {err}
          </div>
        ) : trips.length === 0 ? (
          <div className="w-full flex items-center justify-center h-[340px] text-lg">
            No trips found.
          </div>
        ) : (
          <Swiper
            effect="cards"
            grabCursor={true}
            modules={[EffectCards]}
            className="card-swiper"
          >
            {trips.map((trip, idx) => (
              <SwiperSlide
                key={trip._id || idx}
                className="card-swiper-slide relative overflow-hidden"
              >
                {/* Background image */}
                <img
                  src={trip.image || trip.img}
                  alt={trip.title}
                  className="absolute inset-0 w-full h-full object-cover z-0 rounded-[18px]"
                />
                {/* Top Info */}
                <div className="absolute top-7 left-0 w-full z-10 text-center px-2">
                  <div className="text-xs text-white font-medium tracking-wide">
                    {trip.subtitle || "The Canvas of Your Dreams"}
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
                      Starting Price Rs. {trip.price?.current || trip.price || "-"}
                    </span>
                  </div>
                </div>
                {/* Badge (optional) */}
                {/* {trip.badge && (
                  <div className="absolute bottom-2 right-4 z-30">
                    <span className="bg-yellow-300 rounded-xl px-4 py-2 text-xs font-bold shadow border border-yellow-100 text-[#35789c]">
                      {trip.badge}
                    </span>
                  </div>
                )} */}
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}
