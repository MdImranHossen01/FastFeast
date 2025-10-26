"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

// Enhanced AI Response Function - PUT THIS INSIDE THE COMPONENT FILE
const getAIResponse = (userMessage) => {
  const lowerMessage = userMessage.toLowerCase();
  
  // Menu & Food Questions
  if (lowerMessage.includes('menu') || lowerMessage.includes('food') || lowerMessage.includes('dish') || lowerMessage.includes('what can i order')) {
    return "We have a wide variety of cuisines! 🍽️\n• Indian: Curries, Biryani, Tandoori\n• Thai: Pad Thai, Tom Yum, Green Curry\n• Italian: Pizza, Pasta, Risotto\n• Chinese: Noodles, Fried Rice, Dim Sum\n• Japanese: Sushi, Ramen, Tempura\n• And much more! Browse our menu to see everything.";
  }
  
  if (lowerMessage.includes('indian')) {
    return "We have delicious Indian cuisine! 🍛\nPopular dishes: Butter Chicken, Palak Paneer, Biryani, Samosas, Naan bread. Many vegetarian options available!";
  }
  
  if (lowerMessage.includes('thai')) {
    return "Love Thai food! 🍜\nWe offer: Pad Thai, Tom Yum Soup, Green/Red Curry, Satay, Papaya Salad. Perfect balance of sweet, sour, and spicy!";
  }
  
  if (lowerMessage.includes('pizza') || lowerMessage.includes('italian')) {
    return "Our pizzas are amazing! 🍕\nWe have Margherita, Pepperoni, BBQ Chicken, Vegetarian, and Supreme. All pizzas come with crispy crust and fresh toppings!";
  }
  
  // Delivery & Timing
  if (lowerMessage.includes('delivery') || lowerMessage.includes('time') || lowerMessage.includes('how long')) {
    return "🚚 Delivery times:\n• Standard: 30-45 minutes\n• Peak hours: 45-60 minutes\n• Express delivery available for +৳50 (25-35 minutes)\nWe'll send real-time tracking updates!";
  }
  
  if (lowerMessage.includes('area') || lowerMessage.includes('location') || lowerMessage.includes('deliver to')) {
    return "📍 We deliver to: Dhanmondi, Mirpur, Uttara, Banani, Gulshan, and surrounding areas. Enter your address at checkout to confirm delivery availability!";
  }
  
  // Pricing & Offers
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('expensive') || lowerMessage.includes('how much')) {
    return "💰 Price ranges:\n• Appetizers: ৳150-৳300\n• Main dishes: ৳250-৳500\n• Combos: ৳400-৳700\n• Desserts: ৳100-৳250\nCheck our 'Special Offers' for great discounts!";
  }
  
  if (lowerMessage.includes('discount') || lowerMessage.includes('offer') || lowerMessage.includes('promo') || lowerMessage.includes('coupon')) {
    return "🎁 Current offers:\n• 20% off on first order\n• Free delivery over ৳500\n• Combo meal discounts\n• Happy hour specials (3 PM - 6 PM)\n• Weekend family deals";
  }
  
  // Dietary & Special Requirements
  if (lowerMessage.includes('vegetarian') || lowerMessage.includes('veg')) {
    return "🌱 Vegetarian options:\n• Palak Paneer, Veg Biryani, Paneer Butter Masala\n• Margherita Pizza, Veg Pasta\n• Thai Veg Curry, Tofu dishes\n• Salads, Soups, Appetizers\nLook for the 'Vegetarian' tag on menu items!";
  }
  
  if (lowerMessage.includes('vegan')) {
    return "🌿 Vegan options available!\n• Dal Tadka, Veg Curry, Rice dishes\n• Thai Veg dishes (request no fish sauce)\n• Salads, Soups, Spring Rolls\n• Specify 'vegan' in order notes for customization";
  }
  
  if (lowerMessage.includes('spicy') || lowerMessage.includes('hot')) {
    return "🌶️ Spice levels:\n• Mild: Little to no spice\n• Medium: Balanced flavor\n• Hot: Authentic spicy\n• Extra Hot: Very spicy\nYou can specify your preferred spice level when ordering!";
  }
  
  // Order Process
  if (lowerMessage.includes('order') || lowerMessage.includes('how to order') || lowerMessage.includes('place order')) {
    return "📱 How to order:\n1. Browse menu & add items to cart\n2. Choose delivery address\n3. Select payment method\n4. Confirm order\n5. Track delivery in real-time!\nMinimum order: ৳200";
  }
  
  if (lowerMessage.includes('track') || lowerMessage.includes('where is my order') || lowerMessage.includes('status')) {
    return "📦 Order tracking:\n• Go to 'My Orders' in your profile\n• View real-time delivery status\n• See estimated delivery time\n• Contact rider directly if needed\nNeed help with a specific order?";
  }
  
  // Payment Methods
  if (lowerMessage.includes('payment') || lowerMessage.includes('pay') || lowerMessage.includes('card') || lowerMessage.includes('cash')) {
    return "💳 Payment options:\n• Cash on Delivery\n• Credit/Debit Cards\n• bKash, Nagad, Rocket\n• Bank Transfer\nAll online payments are secure!";
  }
  
  // Customer Service
  if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('number') || lowerMessage.includes('help')) {
    return "📞 Customer support:\n• Phone: +880 XXXX-XXXXXX\n• Email: support@fastfeast.com\n• Live chat: Available 9 AM - 11 PM\n• Emergency: 24/7 for order issues";
  }
  
  if (lowerMessage.includes('complaint') || lowerMessage.includes('problem') || lowerMessage.includes('issue')) {
    return "😔 Sorry to hear you're having issues! Please contact our support team directly at +880 XXXX-XXXXXX or email support@fastfeast.com for immediate assistance.";
  }
  
  // Greetings
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "👋 Hello! Welcome to FastFeast! I'm here to help you with:\n• Menu recommendations\n• Delivery information\n• Pricing & offers\n• Dietary requirements\n• Order tracking\nWhat would you like to know?";
  }
  
  if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
    return "You're welcome! 😊 Happy to help! Is there anything else you'd like to know about our food or delivery service?";
  }
  
  if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
    return "Goodbye! 👋 Enjoy your meal and feel free to chat again if you need anything!";
  }
  
  // Default response for unknown queries
  return "I'm here to help with your food delivery needs! 🍕 You can ask me about:\n• Menu items & cuisines\n• Delivery times & areas\n• Pricing & special offers\n• Vegetarian/vegan options\n• How to place orders\n• Payment methods\n• Order tracking\nWhat would you like to know?";
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your FastFeast assistant. How can I help you with food ordering today?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message) => {
    // Add user message
    const userMessage = {
      id: Date.now(),
      text: message,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Use the enhanced AI response function
      const aiResponse = getAIResponse(message);
      
      // Simulate typing delay for better UX
      setTimeout(() => {
        const botMessage = {
          id: Date.now() + 1,
          text: aiResponse,
          isUser: false,
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000); // 1 second delay
      
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm sorry, I'm having trouble responding right now. Please try again later.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your FastFeast assistant. How can I help you with food ordering today?",
        isUser: false,
        timestamp: new Date(),
      }
    ]);
  };

  return (
    <>
      {/* Chatbot Toggle Button - Made Smaller */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-orange-500 hover:bg-orange-600 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300" // Changed from w-14 h-14 to w-12 h-12
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> {/* Changed from h-6 w-6 to h-5 w-5 */}
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> {/* Changed from h-6 w-6 to h-5 w-5 */}
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </motion.button>

      {/* Chatbot Window - Made Smaller */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-6 z-50 w-72 h-80 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200" // Changed from w-80 h-96 to w-72 h-80, adjusted bottom position
          >
            {/* Header */}
            <div className="bg-orange-500 px-3 py-2 flex items-center justify-between"> {/* Reduced padding */}
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div> {/* Smaller dot */}
                <h3 className="text-white font-semibold text-sm">FastFeast Assistant</h3> {/* Smaller text */}
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={clearChat}
                  className="text-white hover:text-orange-200 transition-colors"
                  title="Clear chat"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"> {/* Smaller icon */}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-orange-200 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"> {/* Smaller icon */}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-3 bg-gray-50"> {/* Reduced padding */}
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              
              {isTyping && (
                <div className="flex items-center space-x-2 mb-3"> {/* Reduced margin */}
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center"> {/* Smaller container */}
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce"></div> {/* Smaller dot */}
                  </div>
                  <div className="bg-gray-200 rounded-2xl px-3 py-1.5 max-w-xs"> {/* Reduced padding */}
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse"></div> {/* Smaller dots */}
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-2 bg-white"> {/* Reduced padding */}
              <ChatInput onSendMessage={handleSendMessage} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;