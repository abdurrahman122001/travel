import React, { useState } from "react";

// If you have a Navigations component, import it like this:
import Navigations from "@/components/Navigation";
// Import your Footer from your local components (not react-day-picker)
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
export default function PrivacyPolicy() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <Navigations onContactClick={() => setIsContactModalOpen(true)} />

      <main className="bg-white min-h-screen py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#066980] text-center mb-2">
            Privacy Policy
          </h1>
          <div className="flex justify-center mt-3 mb-10">
            <span className="block w-24 h-1 bg-yellow-400 rounded"></span>
          </div>

          <section className="mb-10">
            <p className="mb-4">
              At <b>Breakout Wanderers</b>, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.
            </p>

            <h2 className="text-lg font-semibold text-[#12a5c4] mt-6 mb-2">Information We Collect</h2>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>
                We may collect personal data such as your name, email address, and location when you:
                <ul className="list-disc pl-5 mt-1">
                  <li>Subscribe to our newsletter</li>
                  <li>Submit a contact form</li>
                  <li>Book or inquire about travel services</li>
                </ul>
              </li>
              <li>
                We also collect non-personal data through cookies to improve user experience and website performance.
              </li>
            </ul>

            <h2 className="text-lg font-semibold text-[#12a5c4] mt-6 mb-2">How We Use Your Information</h2>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Send updates, offers, or newsletters (if subscribed)</li>
              <li>Respond to inquiries or provide customer support</li>
              <li>Improve our website and services</li>
              <li>We do not sell or share your personal information with third parties unless required by law.</li>
            </ul>

            <h2 className="text-lg font-semibold text-[#12a5c4] mt-6 mb-2">Cookies</h2>
            <p className="mb-4">
              Our site may use cookies to track visitor behavior. You can disable cookies in your browser settings.
            </p>

            <h2 className="text-lg font-semibold text-[#12a5c4] mt-6 mb-2">Third-Party Links</h2>
            <p className="mb-4">
              Our website may include links to external websites. We are not responsible for the privacy practices of these websites.
            </p>

            <h2 className="text-lg font-semibold text-[#12a5c4] mt-6 mb-2">Your Consent</h2>
            <p className="mb-4">
              By using our website, you agree to our privacy policy.
            </p>

            <h2 className="text-lg font-semibold text-[#12a5c4] mt-6 mb-2">Contact Us</h2>
            <p className="mb-4">
              If you have any questions, contact us at:{" "}
              <a href="mailto:breakoutwanderers@gmail.com" className="text-blue-700 underline">
                breakoutwanderers@gmail.com
              </a>
            </p>
          </section>
        </div>
      </main>

      <Footer onContactClick={() => setIsContactModalOpen(true)} />

      {/* Example Contact Modal (optional) */}
      {isContactModalOpen && (
        <ContactModal onClose={() => setIsContactModalOpen(false)} />
      )}
    </>
  );
}
