import Blog from "./Blog";
import Navigation from './Navigation';
import Footer from './Footer';
import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import SignupForm from './SignupForm.tsx';
import CalendlyModal from './CalendlyModal.tsx';

export default function BlogPage() {
  const { signupFormVisibility, calendlyModalVisibility, setSignupFormVisibility, setCalendlyModalVisibility } = useOutletContext<{
    signupFormVisibility: boolean,
    calendlyModalVisibility: boolean,
    setSignupFormVisibility: React.Dispatch<React.SetStateAction<boolean>>,
    setCalendlyModalVisibility: React.Dispatch<React.SetStateAction<boolean>>,
  }>();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div>
      <Navigation setCalendlyModalVisibility={setCalendlyModalVisibility} setSignupFormVisibility={setSignupFormVisibility} />
      <main className="pt-28">
        <Blog />
        <Footer />
        {signupFormVisibility && (
          <SignupForm
            setSignupFormVisibility={setSignupFormVisibility}
            setCalendlyModalVisibility={setCalendlyModalVisibility}
          />
        )}
        {calendlyModalVisibility && (
          <CalendlyModal setCalendlyModalVisibility={setCalendlyModalVisibility} />
        )}
      </main>
    </div>
  );
}