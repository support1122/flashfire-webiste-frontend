import React, { useEffect } from 'react';

const AutoModalTrigger = () => {
  // Automatically open signup modal after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && window.openSignupModal) {
        // Check if modal is already open before triggering
        const modal = document.getElementById('signup-modal');
        const isModalOpen = modal && !modal.classList.contains('hidden');
        
        // Only open the modal if it's not already open
        if (!isModalOpen) {
          window.openSignupModal(1);
        }
      }
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  // This component renders nothing visible
  return null;
};

export default AutoModalTrigger;