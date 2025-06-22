import React, { useState } from 'react';

const FAQSection = () => {
  const faqs = [
    {
      question: "What is EventMappr?",
      answer: "EventMappr is an interactive map-based platform that helps you discover and share local community events happening around you."
    },
    {
      question: "How do I add an event to the map?",
      answer: "Simply click on the location on the map where your event will take place, and fill out the event details in the form that appears."
    },
    {
      question: "Is EventMappr free to use?",
      answer: "Yes, EventMappr is completely free for both event organizers and attendees."
    },
    {
      question: "Can I filter events by category?",
      answer: "Absolutely! You can filter events by various categories like Music, Tech, Volunteering, Markets, and Art events."
    },
    {
      question: "Does EventMappr work on mobile devices?",
      answer: "Yes, EventMappr is fully responsive and works great on smartphones, tablets, and desktop computers."
    },
    {
      question: "How accurate is the location data?",
      answer: "Our location data is based on Google Maps, providing accurate geolocation for all events. You can also manually adjust the pin location when adding an event."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq" id="faq">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div 
            className={`faq-item ${activeIndex === index ? 'active' : ''}`} 
            key={index}
          >
            <div 
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="faq-icon">{activeIndex === index ? '−' : '+'}</span>
            </div>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection; 