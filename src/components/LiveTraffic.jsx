'use client';

import { useState, useEffect, useLayoutEffect, useRef } from 'react';

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
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const updateCountRef = useRef(0);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const buttonRef = useRef(null);
  const panelRef = useRef(null);
  
  // Prevent multiple API calls
  const hasFetchedRef = useRef(false);
  const hasTrackedSessionRef = useRef(false);
  const isComponentMountedRef = useRef(false);

  // Get or create session ID
  const getSessionId = () => {
    if (typeof window === 'undefined') return null;
    
    let sessionId = localStorage.getItem('ff_sessionId');
    if (!sessionId) {
      sessionId = 'ff_' + Math.random().toString(36).substr(2, 16) + '_' + Date.now();
      localStorage.setItem('ff_sessionId', sessionId);
    }
    return sessionId;
  };

  // Fetch live data - ONLY REAL DATA
  const fetchTrafficData = async () => {
    if (!isOnline || !isComponentMountedRef.current) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/live-traffic?t=${Date.now()}`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const result = await response.json();
      
      if (result.success) {
        setTrafficData(result.data);
        setLastUpdate(new Date());
        updateCountRef.current += 1;
      }
    } catch (error) {
      console.error('Failed to fetch traffic data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Track user session
  const trackSession = async () => {
    if (!isComponentMountedRef.current) return;
    
    try {
      const sessionId = getSessionId();
      if (!sessionId) return;

      await fetch('/api/track-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      });
    } catch (error) {
      console.error('Failed to track session:', error);
    }
  };

  // Smooth open/close handler
  const handleTogglePanel = () => {
    if (!isDragging) {
      if (!isOpen) {
        // Opening - set state and fetch data
        setIsOpen(true);
        setIsAnimating(true);
        fetchTrafficData();
        trackSession();
        
        // Reset animation state after opening
        setTimeout(() => setIsAnimating(false), 300);
      } else {
        // Closing - start animation then close
        setIsAnimating(true);
        setTimeout(() => {
          setIsOpen(false);
          setIsAnimating(false);
        }, 200);
      }
    }
  };

  // ✅ Initial position before first paint (no flicker)
  useLayoutEffect(() => {
    const setInitialPosition = () => {
      const buttonWidth = 40;
      const margin = 20;
      const navbarHeight = 64;
      setPosition({
        x: window.innerWidth - buttonWidth - margin,
        y: navbarHeight + margin
      });
      setIsReady(true);
    };
    setInitialPosition();
    window.addEventListener('resize', setInitialPosition);
    return () => window.removeEventListener('resize', setInitialPosition);
  }, []);

  // --- Dragging Logic ---
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStartPos.current.x;
    const newY = e.clientY - dragStartPos.current.y;

    const buttonWidth = buttonRef.current?.offsetWidth || 40;
    const buttonHeight = buttonRef.current?.offsetHeight || 40;
    const maxX = window.innerWidth - buttonWidth;
    const maxY = window.innerHeight - buttonHeight;
    const navbarHeight = 64;

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(navbarHeight + 10, Math.min(newY, maxY))
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'grabbing';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isDragging]);

  // Component mount/unmount tracking
  useEffect(() => {
    isComponentMountedRef.current = true;
    
    return () => {
      isComponentMountedRef.current = false;
    };
  }, []);

  // --- Data Updates - FIXED (Prevent multiple calls) ---
  useEffect(() => {
    // Only fetch once on initial mount when component is visible
    if (!hasFetchedRef.current && isComponentMountedRef.current) {
      fetchTrafficData();
      hasFetchedRef.current = true;
    }
    
    // Only track session once on initial mount  
    if (!hasTrackedSessionRef.current && isComponentMountedRef.current) {
      trackSession();
      hasTrackedSessionRef.current = true;
    }
  }, []); // Empty dependency array

  // Fetch data only when panel opens
  useEffect(() => {
    if (isOpen && isComponentMountedRef.current) {
      fetchTrafficData();
      trackSession();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (isOpen && isComponentMountedRef.current) {
        fetchTrafficData();
        trackSession();
      }
    };
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isOpen]);

  // --- Render ---
  return (
    <>
      {isReady && (
        <div
          ref={buttonRef}
          className="fixed z-[60] cursor-move"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: isDragging ? 'scale(1.1)' : 'scale(1)',
            transition: isDragging
              ? 'none'
              : 'transform 0.2s ease, left 0.2s ease, top 0.2s ease'
          }}
        >
          {/* Floating Button */}
          <button
            onMouseDown={handleMouseDown}
            onClick={handleTogglePanel}
            className={`relative flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition-all duration-300 ${
              isOpen ? 'bg-red-500' : 'bg-green-500 hover:bg-green-600'
            } ${
              isDragging ? 'shadow-2xl cursor-grabbing' : 'cursor-pointer'
            } text-white group`}
          >
            {/* Live indicator */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span
                className={`relative inline-flex rounded-full h-3 w-3 ${
                  isLoading ? 'bg-yellow-500' : 'bg-red-500'
                }`}
              ></span>
            </span>

            {/* Drag handle icon */}
            <div className={`absolute -bottom-1 -left-1 text-white opacity-60 transition-opacity ${
              isDragging ? 'opacity-100' : 'group-hover:opacity-100 opacity-0'
            }`}>
              <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z"/>
              </svg>
            </div>

            {/* Active Users - REAL DATA ONLY */}
            <div className="text-center">
              <div
                className={`text-sm font-bold ${
                  isLoading ? 'animate-pulse' : ''
                }`}
              >
                {isLoading ? '...' : trafficData.activeUsers}
              </div>
              <div className="text-[8px] leading-tight mt-[-1px] opacity-90">
                Online
              </div>
            </div>

            {/* Tooltip */}
            <div className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {isDragging
                ? 'Dragging...'
                : `Click to ${isOpen ? 'close' : 'open'} • Drag to move`}
            </div>
          </button>

          {/* Smooth Traffic Panel */}
          {(isOpen || isAnimating) && (
            <div
              ref={panelRef}
              className={`absolute top-12 right-0 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden ${
                isAnimating
                  ? isOpen
                    ? 'animate-in slide-in-from-top-2 fade-in duration-300 ease-out'
                    : 'animate-out slide-out-to-top-2 fade-out duration-200 ease-in'
                  : 'animate-in slide-in-from-top-2 fade-in duration-300 ease-out'
              }`}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-t-lg text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">Live Traffic</h3>
                    <p className="text-sm opacity-90 mt-1">
                      Real-time platform activity
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={fetchTrafficData}
                      className={`p-1 hover:bg-white/20 rounded transition-colors ${
                        isLoading ? 'animate-spin' : ''
                      }`}
                      title="Refresh data"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    </button>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isLoading
                            ? 'bg-yellow-300'
                            : isOnline
                            ? 'bg-green-300'
                            : 'bg-red-300'
                        }`}
                      ></span>
                      <span className="text-sm">
                        {isLoading
                          ? 'Updating...'
                          : isOnline
                          ? 'Live'
                          : 'Offline'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                {/* Active Users */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-lg text-blue-800">
                      Active Users
                    </h4>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-blue-600">Live</span>
                    </div>
                  </div>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-blue-700 mb-1 transition-all duration-300">
                      {isLoading ? '...' : trafficData.activeUsers}
                    </div>
                    <div className="text-sm text-blue-600">
                      Currently Online
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="bg-white rounded-lg p-2 border border-blue-100 transition-all duration-300 hover:scale-105">
                      <div className="text-lg font-bold text-green-600">
                        {isLoading ? '...' : trafficData.loggedInUsers}
                      </div>
                      <div className="text-xs text-gray-600">Logged In</div>
                    </div>
                    <div className="bg-white rounded-lg p-2 border border-blue-100 transition-all duration-300 hover:scale-105">
                      <div className="text-lg font-bold text-purple-600">
                        {isLoading ? '...' : trafficData.anonymousUsers}
                      </div>
                      <div className="text-xs text-gray-600">Guest Users</div>
                    </div>
                  </div>
                </div>

                {/* Platform Activity */}
                <div className="space-y-3">
                  <h4 className="font-bold text-gray-700 text-sm uppercase tracking-wide">
                    Platform Activity
                  </h4>
                  <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                        <span className="text-lg">📦</span>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">
                          Orders in Progress
                        </div>
                        <div className="text-xl font-bold text-orange-700 transition-all duration-300">
                          {isLoading ? '...' : trafficData.ordersInProgress}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full transition-all duration-300 hover:scale-105">
                      Active
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                        <span className="text-lg">🚚</span>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">
                          Active Deliveries
                        </div>
                        <div className="text-xl font-bold text-green-700 transition-all duration-300">
                          {isLoading ? '...' : trafficData.deliveriesActive}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full transition-all duration-300 hover:scale-105">
                      On Route
                    </div>
                  </div>
                </div>

                {/* Trending */}
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-gray-700 text-sm uppercase tracking-wide">
                      Trending Now
                    </h4>
                    <span
                      className={`text-xs ${
                        isLoading
                          ? 'text-yellow-500 animate-pulse'
                          : 'text-gray-500'
                      }`}
                    >
                      {isLoading ? 'Updating...' : 'Live'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {trafficData.popularItems.map((item, index) => (
                      <span
                        key={index}
                        className={`px-3 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-lg text-sm font-medium border border-purple-200 transition-all duration-300 hover:scale-105 hover:shadow-md ${
                          isLoading ? 'opacity-70' : ''
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                    {trafficData.popularItems.length === 0 && (
                      <span className="text-sm text-gray-500">
                        No trending items
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Stats */}
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>
                      {isLoading
                        ? 'Updating...'
                        : `Updated ${lastUpdate.toLocaleTimeString()}`}
                    </span>
                    <span>Update #{updateCountRef.current}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                    <div className="bg-gray-50 rounded p-2 transition-all duration-300 hover:shadow-sm">
                      <div className="text-xs text-gray-500">Users</div>
                      <div className="text-sm font-bold text-gray-700">
                        {isLoading ? '...' : trafficData.activeUsers}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded p-2 transition-all duration-300 hover:shadow-sm">
                      <div className="text-xs text-gray-500">Orders</div>
                      <div className="text-sm font-bold text-gray-700">
                        {isLoading ? '...' : trafficData.ordersInProgress}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded p-2 transition-all duration-300 hover:shadow-sm">
                      <div className="text-xs text-gray-500">Deliveries</div>
                      <div className="text-sm font-bold text-gray-700">
                        {isLoading ? '...' : trafficData.deliveriesActive}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-center">
                    <span className="text-xs text-gray-400">
                      💡 Drag the button to move it anywhere
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default LiveTraffic;