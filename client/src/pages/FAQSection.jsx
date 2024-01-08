import React, { useState } from "react";

const FAQSection = () => {
  const accordionSections = [
    {
      title: "Refund Policy",
      content:
        "Payment will be refunded 50% in case of reservation cancellation",
    },
    {
      title: "Report bugs and error",
      content: "Mail on dev@gmail.com",
    },
    {
      title: "100% refund policy",
      content:
        "100% will be refunded only if cancellation is done before a week or reserved date",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="flex grid mt-8">
      <h2 className="font-bold text-2xl">FAQs</h2>
      {/* Accordion Section */}
      {accordionSections.map((section, index) => (
        <div key={index} className="my-4">
          <button
            onClick={() => handleAccordionClick(index)}
            className={`accordion w-full py-2 bg-primary text-white rounded-md ${
              activeIndex === index ? "active" : ""
            }`}
          >
            {section.title}
          </button>
          {activeIndex === index && (
            <div className="panel pl-10 py-4 mt-4 bg-gray-200">
              <p className="text-gray-700">{section.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQSection;
