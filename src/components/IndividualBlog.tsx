<<<<<<< HEAD
// import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import blogPosts from '../BLogsData.ts';

// function IndividualBlog() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const selectedBlog = blogPosts.find((blog) => blog.id == id);

//   if (!selectedBlog) return <div className="text-center text-red-500 mt-10">Blog not found.</div>;

//   const { title, image, category, categoryColor, date, readTime, author, content, excerpt } = selectedBlog;

//   return (
//     <div className="bg-gray-50 min-h-screen font-['Inter']">
//       <div className="max-w-4xl mx-auto px-4 py-8">
//         {/* Blog Header */}
//         <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
//           <img
//             src={image.startsWith('/') ? window.location.origin + image : image}
//             alt={title}
//             className="w-full h-auto max-h-[600px] object-contain mx-auto rounded-t-lg"
//           />
//           <div className="p-8">
//             <div className="flex items-center mb-4">
//               <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColor}`}>
//                 {category}
//               </span>
//             </div>
//             <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
//             <div className="flex items-center text-gray-600 space-x-6 text-sm">
//               <div className="flex items-center">
//                 <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
//                 </svg>
//                 {date}
//               </div>
//               <div className="flex items-center">
//                 <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
//                 </svg>
//                 {readTime}
//               </div>
//               <div className="flex items-center">
//                 <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                 </svg>
//                 {author}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="bg-white rounded-lg shadow-lg p-8">
//           <div className="content prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
//         </div>

//         {/* Back Button */}
//         <div className="mt-8 text-center">
//           <button
//             onClick={() => window.close()}
//             className="back-btn text-white px-8 py-3 rounded-full font-semibold shadow-lg bg-gradient-to-r from-orange-400 to-orange-600 hover:translate-y-[-2px] hover:shadow-orange-200 transition-all"
//           >
//             Close Article
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// export default IndividualBlog;

import React, { useEffect, useRef } from 'react';
=======
import React, { useEffect } from 'react';
>>>>>>> 0d713dc75898843afcb03d079ced38899d85276b
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import blogPosts from '../BLogsData.ts';
import Navigation from './Navigation';
import Footer from './Footer';
import SignupForm from './SignupForm.tsx';
import CalendlyModal from './CalendlyModal.tsx';

function IndividualBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
<<<<<<< HEAD
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Access modal state from parent App component
  const { setSignupFormVisibility, setCalendlyModalVisibility } = useOutletContext<{
    setSignupFormVisibility: React.Dispatch<React.SetStateAction<boolean>>,
    setCalendlyModalVisibility: React.Dispatch<React.SetStateAction<boolean>>,
  }>();
=======
  const { signupFormVisibility, calendlyModalVisibility, setSignupFormVisibility, setCalendlyModalVisibility } = useOutletContext<{
    signupFormVisibility: boolean,
    calendlyModalVisibility: boolean,
    setSignupFormVisibility: React.Dispatch<React.SetStateAction<boolean>>,
    setCalendlyModalVisibility: React.Dispatch<React.SetStateAction<boolean>>,
  }>();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
>>>>>>> 0d713dc75898843afcb03d079ced38899d85276b

  const selectedBlog = blogPosts.find((blog) => blog.id === parseInt(id || '0'));

  if (!selectedBlog) return <div className="text-center text-red-500 mt-10">Blog not found.</div>;

  const { title, image, category, categoryColor, date, readTime, author, content, excerpt } = selectedBlog;

  // Add event listeners to buttons after content is rendered
  useEffect(() => {
    if (contentRef.current) {
      // Find all buttons with gradient backgrounds
      const buttons = contentRef.current.querySelectorAll('a[style*="background"]');
      
      console.log(`Found ${buttons.length} buttons in blog content`);
      
      buttons.forEach((button, index) => {
        const buttonText = button.textContent?.toLowerCase() || '';
        console.log(`Button ${index + 1}: "${button.textContent}"`);
        
        // Remove existing event listeners to prevent duplicates
        const newButton = button.cloneNode(true) as HTMLAnchorElement;
        button.parentNode?.replaceChild(newButton, button);
        
        // Add new event listener
        newButton.addEventListener('click', (e) => {
          e.preventDefault();
          console.log(`Button clicked: "${buttonText}"`);
          
          if (buttonText.includes('sign up') || buttonText.includes('free trial') || buttonText.includes('start')) {
            console.log('Opening signup modal');
            setSignupFormVisibility(true);
          } else if (buttonText.includes('book') || buttonText.includes('schedule') || buttonText.includes('consultation') || buttonText.includes('demo')) {
            console.log('Opening Calendly modal');
            setCalendlyModalVisibility(true);
          } else {
            console.log('Unknown button type, defaulting to signup modal');
            setSignupFormVisibility(true);
          }
        });
      });
    }
  }, [content, setSignupFormVisibility, setCalendlyModalVisibility]);

  return (
    <div className="bg-gray-50 min-h-screen font-['Inter']">
      <Navigation setCalendlyModalVisibility={setCalendlyModalVisibility} setSignupFormVisibility={setSignupFormVisibility} />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Blog Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <img
            src={image.startsWith('/') ? window.location.origin + image : image}
            alt={title}
            className="w-full h-auto max-h-[600px] object-contain mx-auto rounded-t-lg"
          />
          <div className="p-8">
            <div className="flex items-center mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColor}`}>
                {category}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
            <div className="flex items-center text-gray-600 space-x-6 text-sm">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                {date}
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {readTime}
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                {author}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div ref={contentRef} className="content prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => window.close()}
            className="back-btn text-white px-8 py-3 rounded-full font-semibold shadow-lg bg-gradient-to-r from-orange-400 to-orange-600 hover:translate-y-[-2px] hover:shadow-orange-200 transition-all"
          >
            Close Article
          </button>
        </div>
      </div>
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
    </div>
  );
}

export default IndividualBlog;



