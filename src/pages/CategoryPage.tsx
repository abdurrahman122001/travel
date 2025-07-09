import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FaClock, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const API_BASE = import.meta.env.VITE_API_URL as string;

interface Trip {
  _id: string;
  slug: string;
  title: string;
  subtitle?: string;
  img?: string;
  image?: string;
  price?: { original?: number; current?: number; label?: string };
  priceText?: string;
  oldPrice?: string | number;
  isRecommended?: boolean;
  tagColor?: string;
  tagText?: string;
  nights?: number;
  days?: number;
  startLocation?: string;
  airport?: string;
  departureDates?: string[];
  batch?: string;
  start?: string;
}

interface Category {
  _id: string;
  name: string;
}

const CategoryOrSubcategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    // 2. Fetch packages for this category
    fetch(`${API_BASE}/packages/by-category/${id}`)
      .then(res => res.json())
      .then(data => setTrips(Array.isArray(data) ? data : []))
      .catch(() => setTrips([]))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <Navigation onContactClick={() => {}} />
      <section className="bg-white py-10">
        <div className="max-w-[1400px] mx-auto px-4">
          <h2 className="text-3xl md:text-[2rem] font-bold text-[#34586a] mb-8">
            {category?.name || "All Packages"}
          </h2>
          {loading ? (
            <div className="py-8 text-center text-lg text-gray-400">Loading...</div>
          ) : trips.length === 0 ? (
            <div className="py-8 text-center text-lg text-gray-400">
              No packages found.
            </div>
          ) : (
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="!pb-12"
            >
              {trips.map((trip, i) => (
                <SwiperSlide key={trip._id || i}>
                  <Link to={`/packages/${trip.slug}`}>
                    <div className="relative h-[500px] rounded-[15px] overflow-hidden group shadow border bg-black/80">
                      <img
                        src={trip.img || trip.image}
                        alt={trip.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      <div className="absolute top-5 left-5 z-20">
                        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-300/95 text-gray-900 font-semibold text-[15px] shadow min-w-[175px] justify-center">
                          <span className="line-through text-gray-600 text-sm">
                            {trip.oldPrice ||
                              (trip.price?.original
                                ? "₹" + trip.price.original.toLocaleString()
                                : "")}
                          </span>
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
                          <span className="text-xs ml-1">
                            {trip.price?.label || trip.priceText || "onwards"}
                          </span>
                        </div>
                      </div>
                      <div className="absolute left-5 top-[62px] z-30">
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-md ${
                            trip.tagColor ||
                            (trip.isRecommended
                              ? "bg-yellow-400"
                              : "bg-green-300")
                          } text-gray-800 shadow`}
                        >
                          {trip.tagText ||
                            (trip.isRecommended ? "Recommended" : "Popular")}
                        </span>
                      </div>
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
      </section>
      <Footer setIsContactModalOpen={() => {}} />
    </>
  );
};

export default CategoryOrSubcategoryPage;
