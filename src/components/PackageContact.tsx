import { FaTimes, FaUser, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function PackageContact({ open, onClose, destination = "Europe" }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-[#e6fbff] rounded-2xl shadow-2xl w-full max-w-md relative">
        {/* Image with title overlay */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=700&q=80"
            alt={destination}
            className="w-full h-40 object-cover rounded-t-2xl"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              style={{ fontFamily: "Cinzel, serif", textShadow: "2px 2px 10px #222" }}
              className="text-4xl md:text-5xl font-bold text-yellow-300 drop-shadow"
            >
              {destination}
            </span>
          </div>
          <button
            className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white rounded-full p-2"
            onClick={onClose}
          >
            <FaTimes size={18} />
          </button>
        </div>
        {/* Modal Body */}
        <div className="py-7 px-6 md:px-8 flex flex-col items-center">
          <div className="text-center mb-2">
            <div className="font-bold text-lg text-[#066980]">
              Don't Just Dream, Travel <span role="img" aria-label="fire">🔥</span>
            </div>
            <div className="text-gray-600 text-base mt-1 mb-5">
              Let Us Plan Your Dream {destination} Trip!
            </div>
          </div>
          <form className="w-full flex flex-col gap-4">
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
              <FaUser className="text-gray-400 mr-2" />
              <input
                className="w-full bg-transparent outline-none"
                placeholder="Enter your name*"
                type="text"
                required
              />
            </div>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
              <FaPhoneAlt className="text-gray-400 mr-2" />
              <input
                className="w-full bg-transparent outline-none"
                placeholder="Enter your phone number*"
                type="tel"
                required
              />
            </div>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                className="w-full bg-transparent outline-none"
                placeholder="Enter your email"
                type="email"
              />
            </div>
            <button
              type="submit"
              className="mt-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-full py-3 text-base shadow-md transition"
            >
              ENQUIRE NOW
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
