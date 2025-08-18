import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FaArrowLeft, FaArrowRight, FaClock, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import Navigations from '@/components/Navigation';
import Footer from '@/components/Footer';
import PackageContact from '@/components/PackageContact';
import 'swiper/css';
import 'swiper/css/navigation';

interface Price {
  original?: number;
  current?: number;
  label?: string;
}

interface Category {
  _id: string;
  name: string;
}

interface Package {
  _id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  destination?: string;
  price?: Price;
  image?: string;
  categories?: Category[];
  subcategories?: Category[];
  status: string;
  nights?: number;
  days?: number;
  durationLabel?: string;
  startLocation?: string;
  departureDates?: string[];
  isRecommended?: boolean;
}

interface Trip extends Package {
  startDate?: string;
  endDate?: string;
  maxGuests?: number;
}

interface SearchResultsData {
  packages?: Package[];
  trips?: Trip[];
  totalPackages?: number;
  totalTrips?: number;
}

const SearchResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query') || '';
  const prevPackagesRef = useRef<HTMLButtonElement>(null);
  const nextPackagesRef = useRef<HTMLButtonElement>(null);
  const prevTripsRef = useRef<HTMLButtonElement>(null);
  const nextTripsRef = useRef<HTMLButtonElement>(null);

  const [results, setResults] = useState<SearchResultsData>({
    packages: [],
    trips: [],
    totalPackages: 0,
    totalTrips: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80';

  const totalResults = (results.totalPackages || 0) + (results.totalTrips || 0);
  const hasPackages = (results.packages?.length || 0) > 0;
  const hasTrips = (results.trips?.length || 0) > 0;
  const showNoResults = !loading && !error && totalResults === 0;

  useEffect(() => {
    if (!query) {
      navigate('/');
      return;
    }

    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get<SearchResultsData>(
          `${import.meta.env.VITE_API_URL}/packages/search?query=${encodeURIComponent(query)}`,
          { timeout: 10000 }
        );

        console.log('API Response:', response.data);

        setResults({
          packages: response.data.packages || [],
          trips: response.data.trips || [],
          totalPackages: response.data.totalPackages || 0,
          totalTrips: response.data.totalTrips || 0,
        });
      } catch (err: any) {
        console.error('Search error:', err);
        let errorMessage = 'Failed to fetch search results';
        if (err.response) {
          errorMessage = err.response.data?.error || errorMessage;
        } else if (err.request) {
          errorMessage = 'Network error - please check your connection';
        } else if (err.code === 'ECONNABORTED') {
          errorMessage = 'Request timed out - please try again';
        }
        setError(errorMessage);
        setResults({
          packages: [],
          trips: [],
          totalPackages: 0,
          totalTrips: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query, navigate]);

  const formatPrice = (price: number | undefined): string => {
    if (!price && price !== 0) return '';
    return '₹' + price.toLocaleString('en-IN');
  };

  const highlightMatches = (text: string) => {
    if (!query || !text) return { __html: text };
    const terms = query.split(/\s+/).filter(term => term.length > 0);
    let highlighted = text;
    terms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlighted = highlighted.replace(regex, '<span class="bg-yellow-200">$1</span>');
    });
    return { __html: highlighted };
  };

  const getValidImageUrl = (imageUrl: string | undefined): string => {
    if (!imageUrl || !/^https?:\/\//.test(imageUrl)) {
      console.warn(`Invalid image URL: ${imageUrl}, using fallback`);
      return FALLBACK_IMAGE;
    }
    return imageUrl;
  };

  const renderSlider = (
    items: (Package | Trip)[],
    title: string,
    prevRef: React.RefObject<HTMLButtonElement>,
    nextRef: React.RefObject<HTMLButtonElement>
  ) => {
    return (
      <div className="bg-white pt-8 pb-12">
        <div className="max-w-[1400px] mx-auto px-4">
          <h2 className="text-3xl md:text-[2rem] font-bold text-[#34586a] mb-1">
            {items[0]?.categories?.[0]?.name || title} ({items.length})
          </h2>
          <p className="text-lg text-gray-500 mb-6">
            Discover your perfect travel package matching "{query}"
          </p>
          <div className="relative">
            {items.length >= 4 && (
              <>
                <button
                  ref={prevRef}
                  className="hidden md:block absolute left-[-35px] top-1/2 -translate-y-1/2 z-10 w-[54px] h-[54px] bg-white rounded-full flex items-center justify-center shadow border border-gray-200 hover:bg-blue-100 transition-all"
                  aria-label="Previous"
                  style={{ boxShadow: '0 2px 18px rgba(32,60,132,0.12)' }}
                >
                  <FaArrowLeft className="text-[#87bdd8] text-3xl" />
                </button>
                <button
                  ref={nextRef}
                  className="hidden md:block absolute right-[-35px] top-1/2 -translate-y-1/2 z-10 w-[54px] h-[54px] bg-white rounded-full flex items-center justify-center shadow border border-gray-200 hover:bg-blue-100 transition-all"
                  aria-label="Next"
                  style={{ boxShadow: '0 2px 18px rgba(32,60,132,0.12)' }}
                >
                  <FaArrowRight className="text-[#87bdd8] text-3xl" />
                </button>
              </>
            )}
            <Swiper
              modules={[Navigation]}
              slidesPerView={1}
              spaceBetween={24}
              breakpoints={{
                700: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1300: { slidesPerView: 4 },
              }}
              navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
              onInit={swiper => {
                // TypeScript workaround for Swiper navigation
                (swiper.params.navigation as any).prevEl = prevRef.current;
                (swiper.params.navigation as any).nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              className="py-4"
            >
              {items.map((item, i) => (
                <SwiperSlide key={item._id || i}>
                  <Link to={`/packages/${item.slug}`}>
                    <div className="relative h-[500px] rounded-[15px] overflow-hidden group shadow border bg-black/80">
                      <img
                        src={getValidImageUrl(item.image)}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={e => {
                          console.warn(`Failed to load image for ${item.title}: ${item.image}`);
                          (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                        }}
                        onLoad={() => console.log(`Successfully loaded image: ${item.image}`)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      <div className="absolute top-5 left-5 z-20">
                        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-300/95 text-gray-900 font-semibold text-[15px] shadow min-w-[175px] justify-center">
                          <span className="line-through text-gray-600 text-sm">
                            {item.price?.original ? formatPrice(item.price.original) : ''}
                          </span>
                          <span className="font-bold ml-2">
                            {item.price?.current ? formatPrice(item.price.current) : ''}
                          </span>
                          <span className="text-xs ml-1">{item.price?.label || 'onwards'}</span>
                        </div>
                      </div>
                      <div className="absolute left-5 top-[62px] z-30">
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-md ${
                            item.isRecommended ? 'bg-yellow-400' : 'bg-green-300'
                          } text-gray-800 shadow`}
                        >
                          {item.isRecommended ? 'Recommended' : 'Popular'}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full px-5 pb-5 pt-3 z-10 text-white bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                        <div
                          className="font-bold text-[1.08rem] leading-tight mb-1 min-h-[48px] line-clamp-2"
                          dangerouslySetInnerHTML={highlightMatches(item.title)}
                        />
                        <div className="text-xs bg-white/15 rounded px-2 py-1 mb-2 max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                          <span dangerouslySetInnerHTML={highlightMatches(item.subtitle || '')} />
                        </div>
                        <div className="flex items-center justify-between text-xs text-white/90 gap-4 mb-1">
                          <span className="flex items-center font-bold">
                            <FaClock className="text-[#00AFD1] text-base mr-2" />
                            <span className="text-white">
                              {item.nights && item.days ? `${item.nights}N/${item.days}D` : item.durationLabel || ''}
                            </span>
                          </span>
                          <span className="flex items-center font-bold">
                            <FaMapMarkerAlt className="text-[#00AFD1] text-base mr-2" />
                            <span className="text-white">{item.startLocation || item.destination || ''}</span>
                          </span>
                        </div>
                        <div className="flex items-center text-xs mt-1">
                          <span className="flex items-center font-bold mr-2">
                            <FaCalendarAlt className="text-[#00AFD1] text-base mr-2" />
                            <span className="text-white">
                              {Array.isArray(item.departureDates)
                                ? item.departureDates.join(', ')
                                : item.startDate
                                ? new Date(item.startDate).toLocaleDateString()
                                : ''}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigations onContactClick={() => setIsContactModalOpen(true)} />
      <main className="max-w-[1400px] mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-[2rem] font-bold text-[#34586a] mb-8">
          Search Results for "{query}"
        </h1>

        {loading && <div className="py-8 text-center text-lg text-gray-400">Loading...</div>}

        {error && (
          <div className="bg-white border border-gray-300 rounded-md p-6 mb-8">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 mr-3 mt-0.5 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="font-medium text-red-700">Search Error</h3>
                <p className="mt-1 text-gray-600">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {hasPackages && renderSlider(results.packages!, 'Packages', prevPackagesRef, nextPackagesRef)}
        {hasTrips && renderSlider(results.trips!, 'Trips', prevTripsRef, nextTripsRef)}

        {showNoResults && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <svg
                className="w-16 h-16 mx-auto text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h2 className="text-2xl font-semibold text-[#34586a] mt-4 mb-2">No results found</h2>
              <p className="text-gray-500 mb-6">
                We couldn't find any matches for "{query}". Try different keywords or browse our packages.
              </p>
              <button
                onClick={() => navigate('/packages')}
                className="px-8 py-3 rounded-md border border-[#2e6273] text-[#2e6273] font-semibold text-xl bg-white hover:bg-[#f7fbfc] transition shadow-sm"
                style={{ minWidth: 220 }}
              >
                Browse All Packages
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer setIsContactModalOpen={setIsContactModalOpen} />
      {isContactModalOpen && (
        <PackageContact
          open={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          destination="Search Results"
        />
      )}
    </div>
  );
};

export default SearchResults;