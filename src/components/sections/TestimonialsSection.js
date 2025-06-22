import React, { useState, useEffect } from 'react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Community Organizer",
      text: "EventMappr has transformed how we organize local events. The map interface makes it so easy to see what's happening and where.",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Event Attendee",
      text: "I've discovered so many cool events in my neighborhood that I never knew about before. This app has really helped me connect with my community.",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      id: 3,
      name: "Aisha Patel",
      role: "Local Business Owner",
      text: "As a small business owner, I've seen a significant increase in foot traffic since listing our events on EventMappr. It's been a game changer.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="testimonials" id="testimonials">
      <h2>What People Are Saying</h2>
      <div className="testimonials-container">
        <div className="testimonial-card">
          <div className="testimonial-avatar">
            <img src={testimonials[currentTestimonial].avatar} alt={testimonials[currentTestimonial].name} />
          </div>
          <div className="testimonial-content">
            <p className="testimonial-text">"{testimonials[currentTestimonial].text}"</p>
            <p className="testimonial-author">{testimonials[currentTestimonial].name}</p>
            <p className="testimonial-role">{testimonials[currentTestimonial].role}</p>
          </div>
        </div>
        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <span 
              key={index} 
              className={`dot ${index === currentTestimonial ? 'active' : ''}`}
              onClick={() => setCurrentTestimonial(index)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 