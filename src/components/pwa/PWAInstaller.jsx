"use client";

import { useState, useEffect } from 'react';
import { FiDownload, FiX, FiSmartphone, FiCheck } from 'react-icons/fi';

const PWAInstaller = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    const isAppInstalled = () => {
      return window.matchMedia('(display-mode: standalone)').matches ||
             window.navigator.standalone ||
             document.referrer.includes('android-app://');
    };

    if (isAppInstalled()) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Show prompt after short delay
      setTimeout(() => {
        const dismissed = localStorage.getItem('pwaPromptDismissed');
        const dismissedTime = dismissed ? parseInt(dismissed) : 0;
        const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
        
        if (!dismissed || dismissedTime < oneWeekAgo) {
          setShowPrompt(true);
        }
      }, 3000);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      localStorage.removeItem('pwaPromptDismissed');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      console.log(`User ${outcome} the install prompt`);
      
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setShowPrompt(false);
        localStorage.removeItem('pwaPromptDismissed');
      }
    } catch (error) {
      console.error('Installation failed:', error);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Don't show again for 7 days
    localStorage.setItem('pwaPromptDismissed', Date.now().toString());
  };

  if (isInstalled || !showPrompt) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center sm:p-0 bg-black bg-opacity-50 animate-fade-in">
      <div className="relative bg-white rounded-2xl shadow-xl max-w-sm w-full mx-auto overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-6 text-white text-center">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
            <FiSmartphone className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold">Install FastFeast</h3>
          <p className="text-orange-100 mt-1">Get the full app experience</p>
        </div>

        {/* Features List */}
        <div className="p-6">
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FiCheck className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-sm text-gray-700">Fast loading & offline access</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FiCheck className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-sm text-gray-700">Home screen shortcut</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FiCheck className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-sm text-gray-700">App-like experience</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleDismiss}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Later
            </button>
            <button
              onClick={handleInstall}
              className="flex-1 py-3 px-4 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
            >
              <FiDownload className="h-4 w-4" />
              Install
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-white hover:text-orange-200 transition-colors"
        >
          <FiX className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default PWAInstaller;