import React, { useState, useRef, useEffect } from 'react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! 👋 How can I help you with EventMappr today?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = { text: inputValue, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Show bot is typing
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
      setIsTyping(false);
    }, 1000);
  };

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! How can I help you with EventMappr today?";
    } else if (input.includes('event') && (input.includes('add') || input.includes('create'))) {
      return "To add an event, go to the Explore page and click on the map where your event will be held. Then fill out the event details in the form that appears.";
    } else if (input.includes('map')) {
      return "You can find our interactive map on the Explore page. It shows all events in your area!";
    } else if (input.includes('sign') || input.includes('login') || input.includes('account')) {
      return "You can sign in or create an account by clicking the 'Sign In' button in the top right corner of the navigation bar.";
    } else if (input.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with?";
    } else if (input.includes('contact') || input.includes('support')) {
      return "For support, please visit our Contact page or email us at support@eventmappr.com";
    } else if (input.includes('about')) {
      return "EventMappr is a platform that helps you discover and share local events on an interactive map. Learn more on our About page!";
    } else {
      return "I'm not sure I understand. Could you rephrase your question? You can ask about adding events, using the map, signing in, or contact information.";
    }
  };

  return (
    <div className={`chatbot ${isOpen ? 'open' : ''}`}>
      <button 
        className="chatbot-toggle" 
        onClick={toggleChat}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? '✕' : '💬'}
      </button>
      
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h3>EventMappr Assistant</h3>
            <span className="chatbot-status">Online</span>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.isBot ? 'bot' : 'user'}`}
              >
                {message.text}
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot typing">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <form className="chatbot-input" onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type a message..."
              aria-label="Type a message"
            />
            <button type="submit" aria-label="Send message">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none">
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
            </button>
          </form>
        </div>
      )}
      
      <style jsx>{`
        .chatbot {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
        }
        
        .chatbot-toggle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: var(--primary);
          color: white;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease, background-color 0.3s ease;
        }
        
        .chatbot-toggle:hover {
          transform: scale(1.05);
          background-color: var(--primary-dark);
        }
        
        .chatbot-container {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 350px;
          height: 500px;
          background-color: var(--background);
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          animation: slideUp 0.3s ease;
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .chatbot-header {
          padding: 1rem;
          background-color: var(--primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .chatbot-header h3 {
          margin: 0;
          font-size: 1.1rem;
        }
        
        .chatbot-status {
          display: flex;
          align-items: center;
          font-size: 0.8rem;
        }
        
        .chatbot-status::before {
          content: '';
          display: inline-block;
          width: 8px;
          height: 8px;
          background-color: #4CAF50;
          border-radius: 50%;
          margin-right: 5px;
        }
        
        .chatbot-messages {
          flex: 1;
          padding: 1rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        
        .message {
          padding: 0.8rem 1rem;
          border-radius: 18px;
          max-width: 80%;
          word-break: break-word;
        }
        
        .message.bot {
          background-color: var(--background-alt);
          color: var(--text);
          align-self: flex-start;
          border-bottom-left-radius: 4px;
        }
        
        .message.user {
          background-color: var(--primary);
          color: white;
          align-self: flex-end;
          border-bottom-right-radius: 4px;
        }
        
        .message.typing {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.8rem;
          width: 60px;
        }
        
        .dot {
          width: 8px;
          height: 8px;
          background-color: var(--text-light);
          border-radius: 50%;
          margin: 0 3px;
          animation: bounce 1.5s infinite ease-in-out;
        }
        
        .dot:nth-child(1) {
          animation-delay: 0s;
        }
        
        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        @keyframes bounce {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-5px);
          }
        }
        
        .chatbot-input {
          display: flex;
          padding: 0.8rem;
          border-top: 1px solid var(--border);
        }
        
        .chatbot-input input {
          flex: 1;
          padding: 0.8rem;
          border: 1px solid var(--border);
          border-radius: 20px;
          font-size: 0.9rem;
          background-color: var(--background);
          color: var(--text);
        }
        
        .chatbot-input input:focus {
          outline: none;
          border-color: var(--primary);
        }
        
        .chatbot-input button {
          background-color: var(--primary);
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-left: 0.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s ease;
        }
        
        .chatbot-input button:hover {
          background-color: var(--primary-dark);
        }
        
        @media (max-width: 576px) {
          .chatbot-container {
            width: calc(100vw - 40px);
            height: 450px;
            bottom: 70px;
          }
          
          .chatbot-toggle {
            width: 50px;
            height: 50px;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatBot; 