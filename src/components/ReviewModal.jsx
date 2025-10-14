// src/components/ReviewModal.jsx
import React, { useState, useEffect } from 'react';
import { FiX, FiStar } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ReviewModal = ({ isOpen, onClose, order, onSubmit }) => {
  const [riderRating, setRiderRating] = useState(0);
  const [riderComment, setRiderComment] = useState('');
  const [itemRatings, setItemRatings] = useState({});
  const [itemComments, setItemComments] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Initialize item ratings when order changes
  useEffect(() => {
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

  const handleRiderRatingChange = (rating) => {
    setRiderRating(rating);
  };

  const handleItemRatingChange = (itemId, rating) => {
    setItemRatings(prev => ({
      ...prev,
      [itemId]: rating
    }));
  };

  const handleItemCommentChange = (itemId, comment) => {
    setItemComments(prev => ({
      ...prev,
      [itemId]: comment
    }));
  };

  const handleSubmit = async () => {
    // Validate that at least one rating is provided
    if (riderRating === 0 && Object.values(itemRatings).every(rating => rating === 0)) {
      toast.error('Please provide at least one rating');
      return;
    }

    setSubmitting(true);
    
    try {
      const reviews = {
        orderId: order.id,
        customerEmail: order.customerInfo?.email,
        riderId: order.riderInfo?.id,
        riderReview: {
          rating: riderRating,
          comment: riderComment
        },
        itemReviews: order.items.map(item => ({
          itemId: item.id || item._id,
          itemName: item.name,
          rating: itemRatings[item.id || item._id] || 0,
          comment: itemComments[item.id || item._id] || ''
        }))
      };

      await onSubmit(reviews);
      toast.success('Thank you for your feedback!');
      onClose();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const StarRating = ({ rating, onChange, size = 'md' }) => {
    const starSize = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5';
    
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={`star-${star}`}
            type="button"
            className={`${starSize} ${star > 1 ? 'ml-1' : ''} focus:outline-none`}
            onClick={() => onChange(star)}
          >
            <FiStar
              className={`${starSize} ${
                star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70 flex items-center justify-center p-4">
      <div 
        className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl leading-6 font-medium text-gray-900">Rate Your Experience</h3>
            <button type="button" className="text-gray-400 hover:text-gray-500 focus:outline-none" onClick={onClose}>
              <span className="sr-only">Close</span>
              <FiX className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-4">
              Order #{order.id} - Delivered on {new Date(order.updatedAt).toLocaleDateString()}
            </p>
          </div>

          {/* Rider Review Section */}
          {order.riderInfo && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-lg font-medium text-gray-900 mb-3">Rate Your Delivery</h4>
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
              <div className="mb-3">
                <p className="text-sm text-gray-700 mb-2">How was your delivery experience?</p>
                <StarRating rating={riderRating} onChange={handleRiderRatingChange} size="lg" />
              </div>
              <div>
                <label htmlFor="rider-comment" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional comments (optional)
                </label>
                <textarea
                  id="rider-comment"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Share your experience with the delivery..."
                  value={riderComment}
                  onChange={(e) => setRiderComment(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Menu Items Review Section */}
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-900 mb-3">Rate Your Food</h4>
            <div className="space-y-4">
              {order.items && order.items.map((item) => (
                <div key={`item-${item.id || item._id}`} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start mb-3">
                    <img
                      className="h-12 w-12 rounded-md object-cover mr-3"
                      src={item.image || 'https://via.placeholder.com/48'}
                      alt={item.name}
                    />
                    <div className="flex-grow">
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity || 1}</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm text-gray-700 mb-2">How did you like this item?</p>
                    <StarRating 
                      rating={itemRatings[item.id || item._id] || 0} 
                      onChange={(rating) => handleItemRatingChange(item.id || item._id, rating)} 
                    />
                  </div>
                  <div>
                    <label htmlFor={`item-comment-${item.id || item._id}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Additional comments (optional)
                    </label>
                    <textarea
                      id={`item-comment-${item.id || item._id}`}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Share your thoughts on this item..."
                      value={itemComments[item.id || item._id] || ''}
                      onChange={(e) => handleItemCommentChange(item.id || item._id, e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={onClose}
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;