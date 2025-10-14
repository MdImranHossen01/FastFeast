// src/components/ReviewModal.jsx
import React, { useState, useEffect } from 'react';
import { FiX, FiStar } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ReviewModal = ({ isOpen, onClose, order, onSubmit }) => {
  const [riderRating, setRiderRating] = useState(0);
  const [riderComment, setRiderComment] = useState('');
  const [itemRatings, setItemRatings] = useState({});
  const [itemComments, setItemComments] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper function to get a stable item ID
  const getItemId = (item, index) => {
    // Try all possible ID fields, fallback to index if none found
    return item.menuItemId || item._id || item.id || `item-${index}`;
  };

  // Initialize item ratings when order changes
  useEffect(() => {
    if (order && order.items) {
      const initialRatings = {};
      const initialComments = {};
      
      console.log('Order items for review:', order.items); // Debug log
      
      order.items.forEach((item, index) => {
        const itemId = getItemId(item, index);
        initialRatings[itemId] = 0;
        initialComments[itemId] = '';
        console.log(`Initialized item ${itemId}:`, item.name); // Debug log
      });
      
      setItemRatings(initialRatings);
      setItemComments(initialComments);
      
      console.log('Initialized ratings:', initialRatings); // Debug log
    }
  }, [order]);

  const handleStarClick = (rating, type, itemId = null) => {
    console.log('Star clicked:', { rating, type, itemId }); // Debug log
    
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
    
    // Debug: Check current state before validation
    console.log('Current state before submission:', {
      riderRating,
      itemRatings,
      itemComments,
      orderItems: order?.items
    });
    
    // Validate that at least one rating is provided
    const hasRiderRating = riderRating > 0;
    const hasItemRatings = Object.values(itemRatings).some(rating => rating > 0);
    
    console.log('Validation results:', { hasRiderRating, hasItemRatings }); // Debug log
    
    if (!hasRiderRating && !hasItemRatings) {
      toast.error('Please provide at least one rating');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare item reviews - use the same ID logic as initialization
      const itemReviewsData = order.items.map((item, index) => {
        const itemId = getItemId(item, index);
        const rating = itemRatings[itemId] || 0;
        const comment = itemComments[itemId] || '';
        
        console.log(`Processing item ${itemId} (${item.name}):`, { 
          rating, 
          comment,
          hasRating: rating > 0
        }); // Debug log
        
        return {
          itemId,
          rating,
          comment,
          itemName: item.name // Include item name for debugging
        };
      }).filter(item => item.rating > 0); // Only include items that were actually rated

      console.log('Final itemReviews to submit:', itemReviewsData); // Debug log
      
      // Prepare review data
      const reviewData = {
        riderReview: hasRiderRating ? {
          rating: riderRating,
          comment: riderComment
        } : null,
        itemReviews: itemReviewsData
      };
      
      console.log('Complete review data being submitted:', JSON.stringify(reviewData, null, 2)); // Debug log
      
      // Call the onSubmit prop function
      await onSubmit(reviewData);
      toast.success('Review submitted successfully!');
      
      // Reset form
      setRiderRating(0);
      setRiderComment('');
      
      // Re-initialize item ratings and comments
      const resetRatings = {};
      const resetComments = {};
      order.items.forEach((item, index) => {
        const itemId = getItemId(item, index);
        resetRatings[itemId] = 0;
        resetComments[itemId] = '';
      });
      setItemRatings(resetRatings);
      setItemComments(resetComments);
      
      onClose();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error(error.message || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to check if an item has a rating
  const hasItemRating = (itemId) => {
    return (itemRatings[itemId] || 0) > 0;
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
                        key={`rider-star-${star}`}
                        type="button"
                        className="text-gray-300 hover:text-yellow-400 focus:outline-none transition-colors"
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
                  {riderRating > 0 && (
                    <span className="ml-2 text-sm text-gray-600">({riderRating}/5)</span>
                  )}
                </div>
                
                <div>
                  <label htmlFor="riderComment" className="block text-sm font-medium text-gray-700 mb-1">
                    Comment (optional)
                  </label>
                  <textarea
                    id="riderComment"
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
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
                  {order.items.map((item, index) => {
                    const itemId = getItemId(item, index);
                    const currentRating = itemRatings[itemId] || 0;
                    
                    return (
                      <div key={itemId} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center mb-3">
                          <img
                            className="h-12 w-12 rounded-md object-cover mr-3"
                            src={item.image || 'https://via.placeholder.com/48'}
                            alt={item.name}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/48';
                            }}
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-500">
                              ৳{item.price} {item.quantity > 1 && `× ${item.quantity}`}
                            </p>
                          </div>
                          {currentRating > 0 && (
                            <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                              Rated {currentRating}/5
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center mb-3">
                          <span className="mr-3 text-gray-700 text-sm">Your Rating:</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={`${itemId}-star-${star}`}
                                type="button"
                                className="text-gray-300 hover:text-yellow-400 focus:outline-none transition-colors mr-1"
                                onClick={() => handleStarClick(star, 'item', itemId)}
                              >
                                <FiStar
                                  className={`h-5 w-5 ${
                                    star <= currentRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
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
                <p className="text-gray-500 text-center py-4">No items in this order</p>
              )}
            </div>
            
            {/* Submission Summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-blue-900 mb-2">Review Summary</h4>
              <div className="text-sm text-blue-800">
                <p>• Rider: {riderRating > 0 ? `${riderRating}/5 stars` : 'Not rated'}</p>
                <p>• Items: {Object.values(itemRatings).filter(rating => rating > 0).length} of {order.items?.length || 0} rated</p>
                <p className="mt-1 text-xs">
                  {riderRating > 0 || Object.values(itemRatings).some(rating => rating > 0) 
                    ? 'Ready to submit!' 
                    : 'Please rate at least one item or the rider'
                  }
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                disabled={isSubmitting || (riderRating === 0 && !Object.values(itemRatings).some(rating => rating > 0))}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Review'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;