// src/components/ReviewModal.jsx
import React, { useState } from 'react';
import { FiX, FiStar } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ReviewModal = ({ isOpen, onClose, order, onSubmit }) => {
  const [riderRating, setRiderRating] = useState(0);
  const [riderComment, setRiderComment] = useState('');
  const [itemRatings, setItemRatings] = useState({});
  const [itemComments, setItemComments] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize item ratings when order changes
  React.useEffect(() => {
    if (order && order.items) {
      const initialRatings = {};
      const initialComments = {};
      
      order.items.forEach(item => {
        initialRatings[item.id || item._id] = 0;
        initialComments[item.id || item._id] = '';
      });
      
      setItemRatings(initialRatings);
      setItemComments(initialComments);
    }
  }, [order]);

  const handleStarClick = (rating, type, itemId = null) => {
    if (type === 'rider') {
      setRiderRating(rating);
    } else if (type === 'item' && itemId) {
      setItemRatings(prev => ({
        ...prev,
        [itemId]: rating
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate that at least one rating is provided
    const hasRiderRating = riderRating > 0;
    const hasItemRatings = Object.values(itemRatings).some(rating => rating > 0);
    
    if (!hasRiderRating && !hasItemRatings) {
      toast.error('Please provide at least one rating');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare review data
      const reviewData = {
        orderId: order.id,
        customerEmail: order.customerInfo?.email,
        riderReview: hasRiderRating ? {
          rating: riderRating,
          comment: riderComment
        } : null,
        itemReviews: order.items.map(item => {
          const itemId = item.id || item._id;
          return {
            itemId,
            rating: itemRatings[itemId] || 0,
            comment: itemComments[itemId] || ''
          };
        }).filter(item => item.rating > 0) // Only include items with ratings
      };
      
      await onSubmit(reviewData);
      toast.success('Review submitted successfully!');
      
      // Reset form
      setRiderRating(0);
      setRiderComment('');
      setItemRatings({});
      setItemComments({});
      
      onClose();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error(error.message || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Rate Your Order</h2>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* Rider Review Section */}
            {order.riderInfo && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Rate Delivery Rider</h3>
                <div className="flex items-center mb-3">
                  <img
                    className="h-10 w-10 rounded-full object-cover mr-3"
                    src={order.riderInfo.photoUrl || `https://avatar.vercel.sh/${order.riderInfo.email}`}
                    alt={order.riderInfo.name}
                  />
                  <div>
                    <p className="font-medium text-gray-800">{order.riderInfo.name}</p>
                    <p className="text-sm text-gray-500">Delivery Rider</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-3">
                  <span className="mr-3 text-gray-700">Rating:</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="text-gray-300 hover:text-yellow-400 focus:outline-none"
                        onClick={() => handleStarClick(star, 'rider')}
                      >
                        <FiStar
                          className={`h-6 w-6 ${
                            star <= riderRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="riderComment" className="block text-sm font-medium text-gray-700 mb-1">
                    Comment (optional)
                  </label>
                  <textarea
                    id="riderComment"
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={riderComment}
                    onChange={(e) => setRiderComment(e.target.value)}
                    placeholder="Share your experience with the delivery rider..."
                  ></textarea>
                </div>
              </div>
            )}
            
            {/* Food Items Review Section */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Rate Food Items</h3>
              {order.items && order.items.length > 0 ? (
                <div className="space-y-4">
                  {order.items.map((item) => {
                    const itemId = item.id || item._id;
                    return (
                      <div key={itemId} className="border rounded-lg p-4">
                        <div className="flex items-center mb-3">
                          <img
                            className="h-12 w-12 rounded-md object-cover mr-3"
                            src={item.image || 'https://via.placeholder.com/48'}
                            alt={item.name}
                          />
                          <div>
                            <p className="font-medium text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-500">৳{item.price} × {item.quantity || 1}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center mb-3">
                          <span className="mr-3 text-gray-700">Rating:</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                className="text-gray-300 hover:text-yellow-400 focus:outline-none"
                                onClick={() => handleStarClick(star, 'item', itemId)}
                              >
                                <FiStar
                                  className={`h-6 w-6 ${
                                    star <= itemRatings[itemId] ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor={`itemComment-${itemId}`} className="block text-sm font-medium text-gray-700 mb-1">
                            Comment (optional)
                          </label>
                          <textarea
                            id={`itemComment-${itemId}`}
                            rows="2"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={itemComments[itemId] || ''}
                            onChange={(e) => setItemComments(prev => ({
                              ...prev,
                              [itemId]: e.target.value
                            }))}
                            placeholder="Share your thoughts on this item..."
                          ></textarea>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500">No items in this order</p>
              )}
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;