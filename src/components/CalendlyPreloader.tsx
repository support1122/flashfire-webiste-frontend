import React, { useEffect, useState } from 'react';

interface CalendlyPreloaderProps {
  onReady?: () => void;
}

const CalendlyPreloader: React.FC<CalendlyPreloaderProps> = ({ onReady }) => {
  const [isPreloaded, setIsPreloaded] = useState(false);

  useEffect(() => {
    const preloadCalendly = () => {
      try {
        // Method 1: Preload Calendly script
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        script.onload = () => {
          setIsPreloaded(true);
          onReady?.();
        };
        document.head.appendChild(script);

        // Method 2: Preload the iframe content
        const preloadIframe = document.createElement('iframe');
        preloadIframe.src = 'https://calendly.com/feedback-flashfire/30min';
        preloadIframe.style.display = 'none';
        preloadIframe.style.position = 'absolute';
        preloadIframe.style.left = '-9999px';
        preloadIframe.onload = () => {
          setIsPreloaded(true);
          onReady?.();
        };
        document.body.appendChild(preloadIframe);

        // Fallback timeout
        setTimeout(() => {
          if (!isPreloaded) {
            setIsPreloaded(true);
            onReady?.();
          }
        }, 2000);

      } catch (error) {
        console.log('Calendly preload error:', error);
        setIsPreloaded(true);
        onReady?.();
      }
    };

    // Only preload if not already done
    if (!isPreloaded) {
      preloadCalendly();
    }

    return () => {
      // Cleanup preload iframe on unmount
      const preloadIframe = document.querySelector('iframe[src*="calendly.com"]');
      if (preloadIframe && preloadIframe.style.display === 'none') {
        preloadIframe.remove();
      }
    };
  }, [isPreloaded, onReady]);

  return null; // This component doesn't render anything visible
};

export default CalendlyPreloader;
