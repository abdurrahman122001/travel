import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Always check this is loaded!
const API_URL = import.meta.env.VITE_API_URL;

const getDeviceType = () =>
  /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop";

const getBrowser = () => {
  const ua = navigator.userAgent;
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
  if (ua.includes("Firefox")) return "Firefox";
  return "Other";
};

const VisitorCounter = () => {
  const location = useLocation();

  useEffect(() => {
    // DEBUG: Remove after confirming .env loads correctly
    console.log("API_URL:", API_URL);

    if (!API_URL) {
      // Fail gracefully if .env not set
      console.error("VITE_API_URL is not set in your .env file!");
      return;
    }

    // Only count valid pages (skip 404 pages)
    if (location.pathname !== "*") {
      fetch(`${API_URL}/visitors/count`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: location.pathname,
          device: getDeviceType(),
          browser: getBrowser(),
        }),
      }).catch((err) => {
        // Optionally log error
        // console.error("Visitor count failed:", err);
      });
    }
  }, [location.pathname]);

  return null;
};

export default VisitorCounter;
