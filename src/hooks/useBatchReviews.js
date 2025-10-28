import { useState, useEffect } from 'react';

export const useBatchReviews = (menuIds) => {
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!menuIds || menuIds.length === 0) {
      setLoading(false);
      return;
    }

    const fetchBatchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/menus/reviews/batch', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ menuIds }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setRatings(data.ratings);
            // Cache the results
            Object.keys(data.ratings).forEach(menuId => {
              sessionStorage.setItem(`rating-${menuId}`, JSON.stringify(data.ratings[menuId]));
            });
          }
        }
      } catch (error) {
        console.error('Error fetching batch reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBatchReviews();
  }, [menuIds]);

  return { ratings, loading };
};