"use client";

import { useState, useEffect } from 'react';
import { FiDownload, FiCheck } from 'react-icons/fi';

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const isAppInstalled = () => {
      return window.matchMedia('(display-mode: standalone)').matches ||
             window.navigator.standalone;
    };

    if (isAppInstalled()) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
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
      
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } catch (error) {
      console.error('Installation failed:', error);
    }
  };

  if (isInstalled) {
    return (
      <button
        disabled
        className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg opacity-75 cursor-not-allowed"
      >
        <FiCheck className="h-4 w-4" />
        Installed
      </button>
    );
  }

  if (!deferredPrompt) return null;

  return (
    <button
      onClick={handleInstall}
      className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
    >
      <FiDownload className="h-4 w-4" />
      Install App
    </button>
  );
};

export default InstallButton;