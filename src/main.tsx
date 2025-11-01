import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import App from './App.tsx'
import PaymentPolicy from './components/PaymentPolicy';
import RefundPolicy from './components/RefundPolicy';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import BlogPage from './components/BlogPage.tsx';
import IndividualBlog from './components/IndividualBlog.tsx';
import { PostHogProvider } from 'posthog-js/react'
import Home from './components/Home.tsx';
import EmployerPage from './components/EmployerPage.tsx';
import ProtectedCampaignManager from './components/ProtectedCampaignManager.tsx';
// Canadian components
import HomeCA from './components/Canada/Home.tsx';
import { bootstrapCountryRedirectBeforeRender } from './utils/CountryRedirect.ts';

const routes=createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {path : '/', index: true, element: <Home /> },                 // <-- this
      {path : '/home', element : <Home />},
      { path: 'paymentpolicy', element: <PaymentPolicy /> },
      { path: 'refundpolicy', element: <RefundPolicy /> },
      { path: 'privacypolicy', element: <PrivacyPolicy /> },
      { path: 'termsofservice', element: <TermsOfService /> },
      { path: 'blogs', element: <BlogPage /> },
      { path: '/signup', element : <Home /> },
      { path: '/get-me-interview', element : <Home /> },
      { path: '/get-a-demo', element : <Home /> },
      { path: '/get-started-now', element : <Home /> },
      { path: '/testimonials', element : <Home /> },
      { path : '/employers', element : <Home />},
      { path : '/faq', element: <Home />},
      {path : '/pricing', element : <Home />},
      {path : '/features', element : <Home />},
      {path : '/book-free-demo', element : <Home />}
    ],
  },
  // Canadian routes
  {
    path: '/en-ca',
    element: <App />,
    children: [
      {path : '/en-ca', index: true, element: <HomeCA /> },
      {path : '/en-ca/home', element : <HomeCA />},
      { path: '/en-ca/paymentpolicy', element: <PaymentPolicy /> },
      { path: '/en-ca/refundpolicy', element: <RefundPolicy /> },
      { path: '/en-ca/privacypolicy', element: <PrivacyPolicy /> },
      { path: '/en-ca/termsofservice', element: <TermsOfService /> },
      { path: '/en-ca/blogs', element: <BlogPage /> },
      { path: '/en-ca/signup', element : <HomeCA /> },
      { path: '/en-ca/get-a-demo', element : <HomeCA /> },
      { path: '/en-ca/testimonials', element : <HomeCA /> },
      { path : '/en-ca/employers', element : <HomeCA />},
      { path : '/en-ca/faq', element: <HomeCA />},
      {path : '/en-ca/pricing', element : <HomeCA />},
      {path : '/en-ca/features', element : <HomeCA />},
      {path : '/en-ca/book-free-demo', element : <HomeCA />}
    ],
  },
  // Standalone blog reader pages (no navigation, no footer - clean reading experience)
  {
    path: '/blog/:slug',
    element: <IndividualBlog />
  },
  {
    path: '/blogs/:id',
    element: <IndividualBlog /> 
  },
  {
    path: '/employer-registration',
    element: <EmployerPage />
  },
  {
    path: '/campaign',
    // Gate access behind password prompt inside ProtectedCampaignManager
    element: <ProtectedCampaignManager />
  }

]);

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  autocapture: true,
  capture_pageview: true,
  capture_pageleave: true,
  person_profiles: 'identified_only' as const,
  // Enable heatmaps for click tracking and visual analytics
  enable_heatmaps: true,
  // Enable session recording for user behavior analysis
  session_recording: {
    maskAllInputs: false, // Set to true if you want to mask sensitive input fields
    recordCrossOriginIframes: false,
    recordCanvas: false, // Set to true if you have canvas elements
  },
  // Enhanced tracking options
  capture_performance: true,
  capture_console_logs: false, // Set to true for debugging
  // Feature flags for A/B testing
  bootstrap: {
    featureFlags: {}
  }
}


async function startApp() {
  await bootstrapCountryRedirectBeforeRender();
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <PostHogProvider apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY} options={options}>
        <RouterProvider router={routes} />
      </PostHogProvider>
    </StrictMode>
  );
}

startApp();
