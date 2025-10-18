import { useState, useEffect } from 'react';

export const useLiveTraffic = () => {
  const [trafficData, setTrafficData] = useState({
    activeUsers: 0,
    ordersInProgress: 0,
    deliveriesActive: 0,
    popularItems: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTrafficData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/live-traffic');
      const result = await response.json();
      
      if (result.success) {
        setTrafficData(result.data);
      } else {
        setError('Failed to fetch traffic data');
      }
    } catch (err) {
      setError('Network error: Unable to fetch traffic data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrafficData();
    
    const interval = setInterval(fetchTrafficData, 30000);
    return () => clearInterval(interval);
  }, []);

  return { trafficData, isLoading, error, refetch: fetchTrafficData };
};