import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Router from './components/Router.tsx';
import './index.css';
import {RouterProvider, createBrowserRouter, BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import ReactDom from 'react-dom/client';
import App from './App.tsx'
import PaymentPolicy from './components/PaymentPolicy';
import RefundPolicy from './components/RefundPolicy';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import Home from './components/Home'

const routes=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children :[
      { path: '/', element: <Home /> },
      { path: '/paymentpolicy', element: <PaymentPolicy /> },
      { path: '/refundpolicy', element: <RefundPolicy /> },
      { path: '/privacypolicy', element: <PrivacyPolicy /> },
      { path: '/termsofservice', element: <TermsOfService /> },
     
    ]
  },
  
  
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <Router /> */}
    <RouterProvider router={routes} />
  </StrictMode>
);
