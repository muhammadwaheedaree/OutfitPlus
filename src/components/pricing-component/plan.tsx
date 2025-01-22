"use client";
import Image from "next/image";
import { useState } from "react";
import { FiCheck } from "react-icons/fi";

const Plan = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  const plans = [
    {
      title: "Starter",
      description: "Perfect for individuals starting their e-commerce journey.",
      monthlyPrice: "19.99",
      yearlyPrice: "199.99",
      features: [
        "Sell up to 50 products",
        "Basic analytics",
        "Community support",
        "2GB Cloud storage",
        "Basic themes",
      ],
    },
    {
      title: "Professional",
      description: "Ideal for small businesses scaling their operations.",
      monthlyPrice: "49.99",
      yearlyPrice: "499.99",
      features: [
        "Sell unlimited products",
        "Advanced analytics",
        "Priority support",
        "10GB Cloud storage",
        "Customizable themes",
      ],
    },
    {
      title: "Enterprise",
      description: "Tailored for large businesses with advanced needs.",
      monthlyPrice: "99.99",
      yearlyPrice: "999.99",
      features: [
        "Sell unlimited products",
        "Advanced analytics with AI insights",
        "24/7 dedicated support",
        "Unlimited Cloud storage",
        "Custom themes and integrations",
      ],
    },
  ];

  return (
    <div className="bg-[#FAFAFA] py-12">
      <div className="text-center mt-14">
        <h3 className="text-[#252B42] font-bold text-[40px]">Pricing</h3>
        <p className="text-[#737373] text-[14px] mt-4">
          Choose the best plan to grow your e-commerce business.
        </p>
      </div>

      {/* Toggle Section */}
      <div className="flex items-center justify-center mt-10 gap-4">
        <h3 className="text-[#252B42] font-bold text-[16px]">Monthly</h3>
        <div
          className="w-14 h-7 flex items-center rounded-full p-1 cursor-pointer border border-[#23A6F0]"
          onClick={() => setIsMonthly(!isMonthly)}
        >
          <div
            className={`w-5 h-5 rounded-full shadow-md transform transition-transform ${
              isMonthly ? "translate-x-7 bg-[#2DC071]" : "bg-[#D0D0D0]"
            }`}
          ></div>
        </div>
        <div className="flex items-center gap-2">
          <h3 className="text-[#252B42] font-bold text-[16px]">Yearly</h3>
          <div className="bg-[#B2E3FF] text-[#23A6F0] text-[14px] font-bold px-4 py-3 rounded-full">
            Save 25%
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`border-2 ${
              index === 1 ? "bg-[#252B42] text-white" : "bg-transparent"
            } border-[#23A6F0] rounded-lg p-6 shadow-md h-[664px] flex flex-col justify-between`}
          >
            <div>
              <h3
                className={`font-bold text-[24px] text-center ${
                  index === 1 ? "text-[#FFFFFF]" : "text-[#252B42]"
                }`}
              >
                {plan.title.toUpperCase()}
              </h3>
              <p
                className={`font-bold text-[16px] text-center mt-3 ${
                  index === 1 ? "text-[#FFFFFF]" : "text-[#737373]"
                }`}
              >
                {plan.description}
              </p>
              <p
                className={`font-bold text-[40px] text-center mt-5 ${
                  index === 1 ? "text-[#23A6F0]" : "text-[#252B42]"
                }`}
              >
                {isMonthly ? plan.monthlyPrice : plan.yearlyPrice}
                <span className="text-[24px]">$</span>{" "}
                <span className="text-[#8EC2F2] font-bold text-[14px]">
                  Per {isMonthly ? "Month" : "Year"}
                </span>
              </p>
            </div>
            <ul className="space-y-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div
                    className={`w-[32px] h-[32px] ${
                      index === 1 ? "bg-[#2DC071]" : "bg-[#2DC071]"
                    } rounded-full flex justify-center items-center`}
                  >
                    <FiCheck className="text-white text-[14px]" />
                  </div>
                  <span
                    className={`font-bold text-[14px] ${
                      index === 1 ? "text-[#FFFFFF]" : "text-[#252B42]"
                    }`}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            <button
              className={`font-bold text-[14px] px-8 py-4 flex justify-center items-center rounded-md mx-auto ${
                index === 1
                  ? "bg-[#23A6F0] text-[#FFFFFF] hover:bg-blue-500"
                  : "bg-[#252B42] text-[#FFFFFF] hover:bg-gray-800"
              }`}
            >
              Choose {plan.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plan;
