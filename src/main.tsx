import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Router from './components/Router.tsx';
import './index.css';
import {RouterProvider, createBrowserRouter, BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import ReactDom from 'react-dom/client';
import App from './App.tsx'
import PaymentPolicy from './components/PaymentPolicy.tsx';
import RefundPolicy from './components/RefundPolicy.tsx';
import PrivacyPolicy from './components/PrivacyPolicy.tsx';
import TermsOfService from './components/TermsOfService.tsx';


const routes=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children :[
      {
        path : '/paymentpolicy',
        element : <PaymentPolicy />
      },
      {
        path : '/refundpolicy',
        element : <RefundPolicy />
      },
      {
        path : '/privacypolicy',
        element : <PrivacyPolicy />
      },
      {
        path : '/termsofservice',
        element : <TermsOfService />
      },
     
    ]
  },
  
  
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <Router /> */}
    <RouterProvider router={routes} />
  </StrictMode>
);
