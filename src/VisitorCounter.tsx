// src/VisitorCounter.tsx or inside your App.tsx (where you have VisitorCounter now)
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const getDeviceType = () => /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop";

const getBrowser = () => {
  const ua = navigator.userAgent;
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Safari")) return "Safari";
  if (ua.includes("Firefox")) return "Firefox";
  return "Other";
};

const VisitorCounter = () => {
  const location = useLocation();

  useEffect(() => {
    // Only count public pages, not 404
    if (location.pathname !== "*") {
      fetch(`${API_URL}/visitors/count`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: location.pathname,
          device: getDeviceType(),
          browser: getBrowser(),
          // country and city can be added if you get geolocation or from backend
        }),
      }).catch(() => {});
    }
  }, [location.pathname]);

  return null;
};

export default VisitorCounter;
