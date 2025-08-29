import React, { useState, useEffect, useRef } from 'react';
import { InlineWidget } from 'react-calendly';

interface OptimizedCalendlyWidgetProps {
  url: string;
  prefill?: {
    name?: string;
    email?: string;
  };
  styles?: React.CSSProperties;
  pageSettings?: {
    backgroundColor?: string;
    hideEventTypeDetails?: boolean;
    hideLandingPageDetails?: boolean;
    primaryColor?: string;
    textColor?: string;
  };
  onLoad?: () => void;
  className?: string;
}

const OptimizedCalendlyWidget: React.FC<OptimizedCalendlyWidgetProps> = ({
  url,
  prefill,
  styles,
  pageSettings,
  onLoad,
  className = ''
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use Intersection Observer to load widget only when visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (widgetRef.current) {
      observer.observe(widgetRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleWidgetLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <div 
      ref={widgetRef}
      className={`relative ${className}`}
      style={styles}
    >
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 text-sm">Loading calendar...</p>
          </div>
        </div>
      )}

      {/* Calendly Widget */}
      {isVisible && (
        <InlineWidget
          url={url}
          prefill={prefill}
          styles={{
            height: '100%',
            width: '100%',
            minHeight: '400px',
            ...styles
          }}
          pageSettings={{
            backgroundColor: 'ffffff',
            hideEventTypeDetails: false,
            hideLandingPageDetails: false,
            primaryColor: 'f97316',
            textColor: '374151',
            ...pageSettings
          }}
          onLoad={handleWidgetLoad}
        />
      )}
    </div>
  );
};

export default OptimizedCalendlyWidget;
