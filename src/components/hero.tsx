import React from "react";

const Hero = () => {
  return (
    <div className="relative bg-[url('/hero.png')] bg-cover bg-center sm:bg-[top_center] lg:bg-center h-[400px] sm:h-[600px] lg:h-[650px]">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Text Content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:top-1/3 lg:left-20 lg:translate-x-0 lg:translate-y-0 text-center lg:text-left text-white px-4 sm:px-8 lg:px-0">
        <h2 className="text-[12px] sm:text-[14px] lg:text-[16px] font-semibold tracking-wide mb-2 sm:mb-3">
          WINTER 2024
        </h2>
        <h1 className="text-[22px] sm:text-[28px] lg:text-[36px] font-bold mb-3 sm:mb-4 lg:mb-5 leading-snug">
          EXCLUSIVE COLLECTION
        </h1>
        <p className="text-[12px] sm:text-[14px] lg:text-[16px] leading-relaxed mb-4 sm:mb-6 lg:mb-8">
          Elevate your style this season <br />
          with timeless designs for everyone.
        </p>
        <button className="px-3 py-2 sm:px-5 sm:py-3 bg-[#2DC071] text-white font-semibold rounded hover:bg-green-600 transition-all">
          DISCOVER NOW
        </button>
      </div>
    </div>
  );
};

export default Hero;
