import React, { useState } from "react";

const Accordion = ({ sections }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="mt-8">
      {sections.map((section, index) => (
        <div key={index} className="mb-4">
          <button
            onClick={() => handleAccordionClick(index)}
            className={`accordion bg-gray-500 text-white p-2 rounded-md w-full ${
              activeIndex === index ? "active" : ""
            }`}
          >
            {section.title}
          </button>
          {activeIndex === index && (
            <div className="panel p-4 bg-white">
              <p className="text-gray-700">{section.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
