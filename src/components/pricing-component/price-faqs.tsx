import React from "react";
import { FiChevronRight } from "react-icons/fi";

const PriceFaqs = () => {
  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept credit cards, debit cards, PayPal, and bank transfers for all our subscription plans.",
    },
    {
      question: "Can I cancel my subscription at any time?",
      answer:
        "Yes, you can cancel your subscription anytime. Your access will continue until the end of the billing cycle.",
    },
    {
      question: "Is my payment information secure?",
      answer:
        "Absolutely. We use industry-standard encryption to ensure your payment information remains safe and confidential.",
    },
    {
      question: "Do you offer discounts for annual subscriptions?",
      answer:
        "Yes, annual subscriptions come with a significant discount compared to monthly plans. Check our pricing page for details.",
    },
    {
      question: "Can I try the service before purchasing?",
      answer:
        "Yes, we offer a 14-day free trial for all our plans. No credit card is required to sign up.",
    },
    {
      question: "How can I contact support if I have an issue?",
      answer:
        "Our support team is available 24/7 via email, live chat, and phone to assist you with any issues or questions.",
    },
  ];

  return (
    <div className="mt-10 py-10 flex flex-col justify-center items-center">
      <div className="text-center mb-8">
        <h2 className="text-[#252B42] font-bold text-[40px]">Pricing FAQs</h2>
        <p className="text-[#737373] text-[20px] mt-4">
          Common questions about our pricing and services <br />
          to help you make informed decisions.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="p-4 rounded-lg shadow-sm flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <FiChevronRight className="text-[#23A6F0] text-[25px]" />
              <h3 className="text-[#252B42] font-bold text-[16px]">
                {faq.question}
              </h3>
            </div>
            <p className="text-[#737373] text-[14px] mt-2">{faq.answer}</p>
          </div>
        ))}
      </div>
      <p className="text-[#737373] text-[20px] flex justify-center mt-16">
        Haven&apos;t got your answer? Contact our support
      </p>
    </div>
  );
};

export default PriceFaqs;
