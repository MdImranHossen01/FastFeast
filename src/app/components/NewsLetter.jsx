"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiMail, FiCheck, FiAlertCircle, FiArrowRight } from "react-icons/fi";
import newsletterimage from '../../../public/newsLetter.jpg';

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bgImageLoaded, setBgImageLoaded] = useState(false);

  // Load any dynamic client-only values here to avoid hydration mismatch
  useEffect(() => {
    setBgImageLoaded(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!email) {
      setMessage("Please enter an email address");
      setIsSubmitting(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setMessage("Subscribed successfully! You'll receive our food updates soon.");
      setEmail("");
    } catch (error) {
      setMessage("Subscription failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-100 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1.5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500 text-white mb-4"
          >
            <FiMail className="text-2xl" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Never Miss a <span className="text-orange-500">Delicious</span> Update
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our foodie community and get exclusive access to new restaurant openings, special discounts, and culinary insights.
          </p>
        </div>

        {/* Main content */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full">
          <div className="md:flex">
            {/* Visual Section */}
            <div className="md:w-3/5 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-600/10 z-10"></div>
              {bgImageLoaded && (
                <img
                  src={newsletterimage.src}
                  alt="Delicious food selection"
                  className="w-full h-64 md:h-full object-cover"
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20 bg-gradient-to-t from-black/70 to-transparent">
                <h2 className="text-2xl font-bold mb-2">Foodie Community</h2>
                <p className="text-sm opacity-90">Join thousands of food lovers who get exclusive offers</p>
                <div className="flex mt-4">
                  <div className="flex -space-x-2 mr-2">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="w-8 h-8 rounded-full bg-white border-2 border-white"></div>
                    ))}
                  </div>
                  <div className="text-xs bg-white text-gray-800 px-2 py-1 rounded-full">
                    +5k subscribers
                  </div>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="md:w-3/5 p-8 md:p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-gray-600 mb-6">
                Get the latest food delivery updates, exclusive offers, and tasty blogs straight to your inbox!
              </p>

              {/* Benefits list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {[
                  "Exclusive discounts",
                  "New restaurant alerts",
                  "Weekly food guides",
                  "Priority delivery slots",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                      <FiCheck className="text-green-500 text-sm" />
                    </div>
                    <span className="text-sm text-gray-600">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mb-6">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1">
                    <label htmlFor="email" className="sr-only">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition text-base"
                      disabled={isSubmitting}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing
                      </>
                    ) : (
                      <>
                        Subscribe <FiArrowRight className="ml-2" />
                      </>
                    )}
                  </motion.button>
                </div>
              </form>

              {/* Message */}
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-lg mb-6 flex items-start ${
                    message.includes("successfully") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                  }`}
                >
                  {message.includes("successfully") ? (
                    <FiCheck className="mt-0.5 mr-2 flex-shrink-0" />
                  ) : (
                    <FiAlertCircle className="mt-0.5 mr-2 flex-shrink-0" />
                  )}
                  <span className="text-sm">{message}</span>
                </motion.div>
              )}

              {/* Privacy Note */}
              <div className="border-t pt-6">
                <p className="text-xs text-gray-500 text-center">
                  We respect your privacy. Unsubscribe at any time. 
                  By subscribing, you agree to our <a href="#" className="text-orange-500 hover:underline">Terms</a> and <a href="#" className="text-orange-500 hover:underline">Privacy Policy</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
