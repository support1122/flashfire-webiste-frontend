import React, { useEffect } from 'react';

const AutoModalTrigger = () => {
  // Automatically open signup modal after 15 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && window.openSignupModal) {
        window.openSignupModal(1);
      }
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  // This component renders nothing visible
  return null;
};

export default AutoModalTrigger;