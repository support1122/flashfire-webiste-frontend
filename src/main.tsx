import { StrictMode, useState } from 'react';
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
// import Home from './components/Home'
import IndividualBlog from './components/IndividualBlog.tsx';
import Hero from './components/Hero.tsx';
import Blog from './components/Blog.tsx';
import Contact from './components/Contact.tsx';
import Features from './components/Features.tsx';
import Testimonials from './components/Testimonials.tsx';
import Pricing from './components/Pricing.tsx';
import FAQ from './components/FAQ.tsx';
import Home from './components/Home.tsx';
import HowItWorks from './components/HowItWorks.tsx';

const routes=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children :[
      { path: '/', element: <Home /> },
      // {path: '/home', element: <Hero />},
      {path: '/features', element: <Features />},
      {path: '/testimonials', element: <Testimonials />},
      {path: '/pricing', element: <Pricing />},
      {path : '/FAQ', element: <FAQ />},
      {path: '/contact', element: <Contact />},
      {path: '/blog', element: <Blog />},
      { path: '/paymentpolicy', element: <PaymentPolicy /> },
      { path: '/refundpolicy', element: <RefundPolicy /> },
      { path: '/privacypolicy', element: <PrivacyPolicy /> },
      { path: '/termsofservice', element: <TermsOfService /> },
      {path : '/blogs/:id' , element: <IndividualBlog />},
      {path : '/howitworks', element : <HowItWorks />}
     
    ]
  },
  
  
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <Router /> */}
    <RouterProvider router={routes} />
  </StrictMode>
);
