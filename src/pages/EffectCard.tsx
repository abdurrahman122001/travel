import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { Link } from "react-router-dom";
import "./style.css";

export default function EffectCard() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/trips/international`)
      .then(res => res.json())
      .then(data => setTrips(Array.isArray(data) ? data : []))
      .catch(() => setTrips([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Inline CSS fix to prevent horizontal scroll on mobile */}
      <style>{`
        html, body {
          overflow-x: hidden;
        }
        #app {
          overflow-x: hidden;
        }
        .card-swiper {
          overflow: visible !important;
        }
      `}</style>

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
        <Link to="/packages">
          <div className="flex justify-center">
            <Swiper
              effect="cards"
              grabCursor={true}
              modules={[EffectCards]}
              className="card-swiper"
            >
              {loading ? (
                <SwiperSlide>
                  <div className="flex items-center justify-center h-[330px] text-lg">
                    Loading...
                  </div>
                </SwiperSlide>
              ) : trips.length === 0 ? (
                <SwiperSlide>
                  <div className="flex items-center justify-center h-[330px] text-lg">
                    No International Trips available.
                  </div>
                </SwiperSlide>
              ) : (
                trips.map((trip, idx) => (
                  <SwiperSlide
                    key={trip._id || idx}
                    className="card-swiper-slide relative overflow-hidden"
                  >
                    {/* Background image */}
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="absolute inset-0 w-full h-full object-cover z-0 rounded-[18px]"
                    />

                    {/* Top Info */}
                    <div className="absolute top-7 left-0 w-full z-10 text-center px-2">
                      <div className="text-xs text-white font-medium tracking-wide">
                        {trip.subtitle || ""}
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
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          </div>
        </Link>
      </div>
    </>
  );
}
