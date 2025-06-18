import React from "react";

const Features = () => {
  const features = [
    {
      title: "No Third Party Mess",
      desc: "100 percent in-house operations for all trips! No third parties involved, hence no fishy claims!",
      bg: "https://wanderon.in/assets/images/sauceBg1.svg", // Unique background for this card
    },
    {
      title: "Transparency & Security",
      desc: "Real time monitoring of all trips by ground team! All routes and weather conditions are accurately updated!",
      bg: "https://wanderon.in/assets/images/sauceBg2.svg",
    },
    {
      title: "Co-Travelers Filtering",
      desc: "Multi-step filtering to bring only like-minded people together! That’s our key to have fuss-free trips!",
      bg: "https://wanderon.in/assets/images/sauceBg3.svg",
    },
    {
      title: "One Stop Hassle Free Experience",
      desc: "Comfortable stays, trained drivers, hospitable staff and friendly trip leaders put together that one memorable trip for you!",
      bg: "https://wanderon.in/assets/images/sauceBg4.svg",
    },
  ];
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <div className="text-[#12a5c4] font-semibold text-lg mb-1">
            Why WanderOn?
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#066980]">
            WanderOn’s Secret Sauce
          </h2>
          <div className="flex justify-center mt-4">
            <span className="block w-32 h-1 bg-yellow-400 rounded"></span>
          </div>
        </div>
        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {features.map((item, idx) => (
            <div
              key={item.title}
              className="relative rounded-2xl border border-blue-200 bg-white p-6 pt-8 pb-24 min-h-[340px] shadow-sm hover:shadow-lg transition-shadow flex flex-col"
              style={{
                backgroundImage: `url('${item.bg}')`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left bottom",
                backgroundSize: "contain",
              }}
            >
              <h3 className="text-[#12a5c4] text-xl font-bold mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-base mb-4">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Features;