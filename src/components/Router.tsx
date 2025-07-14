import React, { useState, useEffect } from 'react';
import App from '../App';
import TermsOfService from './TermsOfService';
import PrivacyPolicy from './PrivacyPolicy';
import RefundPolicy from './RefundPolicy';
import PaymentPolicy from './PaymentPolicy';

const Router = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleRouteChange = (event: any) => {
      setCurrentPath(event.detail.path);
    };

    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('routechange', handleRouteChange);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('routechange', handleRouteChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const renderComponent = () => {
    switch (currentPath) {
      case '/termsofservice':
        return <TermsOfService />;
      case '/privacypolicy':
        return <PrivacyPolicy />;
      case '/refundpolicy':
        return <RefundPolicy />;
      case '/paymentpolicy':
        return <PaymentPolicy />;
      default:
        return <App />;
    }
  };

  return <>{renderComponent()}</>;
};

export default Router;
