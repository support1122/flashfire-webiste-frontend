import { useEffect } from 'react';

interface CalendlyPreloaderProps {
  onReady?: () => void;
}

const CalendlyPreloader: React.FC<CalendlyPreloaderProps> = ({ onReady }) => {
  useEffect(() => {
    let scriptLoaded = false;
    let styleLoaded = false;

    const checkAllLoaded = () => {
      if (scriptLoaded && styleLoaded) {
        console.log('✅ Calendly preloaded successfully');
        onReady?.();
      }
    };

    // Preload Calendly script
    const existingScript = document.querySelector('script[src*="assets.calendly.com"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => {
        scriptLoaded = true;
        checkAllLoaded();
      };
      script.onerror = () => {
        console.warn('Calendly script preload failed, will load on demand');
        scriptLoaded = true;
        checkAllLoaded();
      };
      document.head.appendChild(script);
    } else {
      scriptLoaded = true;
    }

    // Preload Calendly styles
    const existingStyle = document.querySelector('link[href*="assets.calendly.com"]');
    if (!existingStyle) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      link.onload = () => {
        styleLoaded = true;
        checkAllLoaded();
      };
      link.onerror = () => {
        console.warn('Calendly styles preload failed');
        styleLoaded = true;
        checkAllLoaded();
      };
      document.head.appendChild(link);
    } else {
      styleLoaded = true;
    }

    // Add DNS prefetch and preconnect for faster loading
    const addResourceHint = (rel: string, href: string) => {
      const existing = document.querySelector(`link[rel="${rel}"][href="${href}"]`);
      if (!existing) {
        const link = document.createElement('link');
        link.rel = rel;
        link.href = href;
        document.head.appendChild(link);
      }
    };

    addResourceHint('dns-prefetch', 'https://calendly.com');
    addResourceHint('dns-prefetch', 'https://assets.calendly.com');
    addResourceHint('preconnect', 'https://calendly.com');
    addResourceHint('preconnect', 'https://assets.calendly.com');

    checkAllLoaded();

    // Cleanup not needed as these resources should persist
  }, [onReady]);

  return null;
};

export default CalendlyPreloader;
