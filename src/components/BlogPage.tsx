import Blog from "./Blog";
import Navigation from './Navigation';
import Footer from './Footer';
import React from 'react';
import { useOutletContext } from 'react-router-dom';

export default function BlogPage() {
  const { setSignupFormVisibility, setCalendlyModalVisibility } = useOutletContext<{
    setSignupFormVisibility: React.Dispatch<React.SetStateAction<boolean>>,
    setCalendlyModalVisibility: React.Dispatch<React.SetStateAction<boolean>>,
  }>();

  return (
    <div>
      <Navigation setCalendlyModalVisibility={setCalendlyModalVisibility} setSignupFormVisibility={setSignupFormVisibility} />
      <main className="pt-28">
        <Blog />
        {/* <Footer /> */}
      </main>
    </div>
  );
}