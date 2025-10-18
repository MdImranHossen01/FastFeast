'use client';

import { useState, useEffect } from 'react';

const LiveTraffic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [trafficData, setTrafficData] = useState({
    activeUsers: 0,
    loggedInUsers: 0,
    anonymousUsers: 0,
    ordersInProgress: 0,
    deliveriesActive: 0,
    popularItems: []
  });
  const [isOnline, setIsOnline] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTrafficData = async () => {
    if (!isOnline) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/live-traffic');
      const result = await response.json();
      
      if (result.success) {
        setTrafficData(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch traffic data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Track user session
  const trackSession = async () => {
    try {
      // Generate or get session ID
      let sessionId = localStorage.getItem('sessionId');
      if (!sessionId) {
        sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('sessionId', sessionId);
      }

      await fetch('/api/track-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });
    } catch (error) {
      console.error('Failed to track session:', error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchTrafficData();
    trackSession();

    // Set up interval for real-time updates
    const trafficInterval = setInterval(fetchTrafficData, 30000); // Update every 30 seconds
    const sessionInterval = setInterval(trackSession, 60000); // Track session every 60 seconds

    return () => {
      clearInterval(trafficInterval);
      clearInterval(sessionInterval);
    };
  }, [isOnline]);

  // Check online status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      fetchTrafficData(); // Refresh data when coming online
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="fixed top-20 right-6 z-40"> {/* Changed to top-right below navbar */}
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? 'bg-red-500' : 'bg-green-500 hover:bg-green-600'
        } text-white`}
        disabled={isLoading}
      >
        {/* Live indicator */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
        
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        )}
      </button>

      {/* Traffic Panel - Opens downward */}
      {isOpen && (
        <div className="absolute top-14 right-0 w-80 bg-white rounded-lg shadow-xl border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-t-lg text-white">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">Live Traffic</h3>
              <div className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-300' : 'bg-red-300'}`}></span>
                <span className="text-sm">{isOnline ? 'Live' : 'Offline'}</span>
              </div>
            </div>
            <p className="text-sm opacity-90 mt-1">Real-time platform activity</p>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            {/* Total Active Users */}
            <TrafficItem
              icon={
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
              label="Total Active Users"
              value={trafficData.activeUsers}
              color="blue"
              subtext={`${trafficData.loggedInUsers} logged-in, ${trafficData.anonymousUsers} guests`}
            />

            {/* Orders in Progress */}
            <TrafficItem
              icon={
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              }
              label="Orders in Progress"
              value={trafficData.ordersInProgress}
              color="orange"
            />

            {/* Active Deliveries */}
            <TrafficItem
              icon={
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
              label="Active Deliveries"
              value={trafficData.deliveriesActive}
              color="green"
            />

            {/* Popular Items */}
            <div className="pt-3 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-600 mb-2">Trending Now</p>
              <div className="flex flex-wrap gap-2">
                {trafficData.popularItems.map((item, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                  >
                    {item}
                  </span>
                ))}
                {trafficData.popularItems.length === 0 && (
                  <span className="text-sm text-gray-500">No trending items</span>
                )}
              </div>
            </div>

            {/* Last Updated */}
            <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-200">
              Updated {new Date().toLocaleTimeString()}
              {isLoading && ' (Updating...)'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper component for traffic items
const TrafficItem = ({ icon, label, value, color = 'blue', subtext }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    orange: 'bg-orange-100 text-orange-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600'
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 ${colorClasses[color]} rounded-full flex items-center justify-center`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="font-bold text-xl">{value}</p>
          {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}
        </div>
      </div>
    </div>
  );
};

export default LiveTraffic;