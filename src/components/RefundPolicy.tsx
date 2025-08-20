// import React from 'react';
// import { ArrowLeft, RefreshCw } from 'lucide-react';

// const RefundPolicy = () => {
//   const handleBackClick = () => {
//     window.history.pushState({}, '', '/');
//     window.dispatchEvent(new CustomEvent('routechange', { detail: { path: '/' } }));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
//           {/* <button
//             onClick={handleBackClick}
//             className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 mb-4 transition-colors duration-200"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             <span>Back to Home</span>
//           </button> */}
          
//           <div className="flex items-center space-x-3 mb-4">
//             <div className="p-2 bg-green-100 rounded-lg">
//               <RefreshCw className="w-6 h-6 text-green-600" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Refund Policy</h1>
//               <p className="text-gray-600">Last updated: July 2025</p>
//             </div>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="bg-white rounded-lg shadow-sm p-8">
//           <div className="prose prose-lg max-w-none">
//             <p className="text-gray-700 mb-8">
//               At Flashfire, we are committed to your satisfaction and success in finding your dream job. This Refund Policy outlines the terms and conditions under which refunds may be provided for our AI-powered job application automation services.
//             </p>

//             <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Eligibility</h2>
            
//             <h3 className="text-xl font-semibold text-gray-900 mb-3">Prorated Refund Structure</h3>
//             <p className="text-gray-700 mb-4">
//               We offer prorated refunds based on the services already provided. Our refund calculation works as follows:
//             </p>
//             <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
//               <li>A one-time fee of $150 covers resume building, dashboard setup, and administrative costs (non-refundable)</li>
//               <li>The remaining amount (up to $200 total) is refunded based on the number of job applications already processed</li>
//               <li>You only pay for what you receive, ensuring fair value for services rendered</li>
//             </ul>

//             <h3 className="text-xl font-semibold text-gray-900 mb-3">Premium Plan Guarantee</h3>
//             <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
//               <p className="text-gray-700">
//                 <strong>Exclusive to Premium Plan users:</strong> If you don't receive any interview calls by the end of your plan period, we will send 100+ additional applications and provide a free resume update at no extra cost.
//               </p>
//             </div>

//             <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Request Process</h2>
            
//             <h3 className="text-xl font-semibold text-gray-900 mb-3">How to Request a Refund</h3>
//             <ol className="list-decimal list-inside text-gray-700 mb-6 space-y-2">
//               <li>Contact our support team at support@flashfirejobs.com</li>
//               <li>Include your account details and reason for the refund request</li>
//               <li>Provide any relevant documentation or feedback</li>
//               <li>Our team will review your request within 2-3 business days</li>
//             </ol>

//             <h3 className="text-xl font-semibold text-gray-900 mb-3">Required Information</h3>
//             <p className="text-gray-700 mb-4">When requesting a refund, please provide:</p>
//             <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
//               <li>Your full name and email address associated with the account</li>
//               <li>Order/transaction ID or payment confirmation</li>
//               <li>Detailed reason for the refund request</li>
//               <li>Any supporting documentation</li>
//             </ul>

//             <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Timeline</h2>
//             <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
//               <li><strong>Review Period:</strong> 2-3 business days for initial review</li>
//               <li><strong>Processing Time:</strong> 5-7 business days once approved</li>
//               <li><strong>Payment Method:</strong> Refunds will be processed to the original payment method</li>
//               <li><strong>Bank Processing:</strong> Additional 3-5 business days depending on your bank</li>
//             </ul>

//             <h2 className="text-2xl font-bold text-gray-900 mb-4">Non-Refundable Services</h2>
//             <p className="text-gray-700 mb-4">The following services are non-refundable:</p>
//             <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
//               <li>Resume building and optimization (covered under $150 setup fee)</li>
//               <li>Dashboard setup and account configuration</li>
//               <li>LinkedIn profile optimization (once completed)</li>
//               <li>Administrative and processing costs</li>
//               <li>Services used beyond the refund request date</li>
//             </ul>

//             <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Conditions</h2>
            
//             <h3 className="text-xl font-semibold text-gray-900 mb-3">Eligible Circumstances</h3>
//             <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
//               <li>Technical issues preventing service delivery</li>
//               <li>Failure to meet agreed-upon service standards</li>
//               <li>Cancellation within the first 7 days of service activation</li>
//               <li>Duplicate charges or billing errors</li>
//             </ul>

//             <h3 className="text-xl font-semibold text-gray-900 mb-3">Ineligible Circumstances</h3>
//             <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
//               <li>Change of mind after services have been delivered</li>
//               <li>Failure to receive job offers (we facilitate applications, not hiring decisions)</li>
//               <li>External factors beyond our control (market conditions, employer preferences)</li>
//               <li>Requests made after 30 days from service completion</li>
//             </ul>

//             <h2 className="text-2xl font-bold text-gray-900 mb-4">Partial Refunds</h2>
//             <p className="text-gray-700 mb-6">
//               Partial refunds may be provided based on the extent of services already delivered. Our team will calculate the refund amount based on the number of applications submitted, resume optimizations completed, and other services provided.
//             </p>

//             <h2 className="text-2xl font-bold text-gray-900 mb-4">Dispute Resolution</h2>
//             <p className="text-gray-700 mb-6">
//               If you disagree with our refund decision, you may escalate the matter by contacting our management team. We are committed to finding fair solutions and will work with you to resolve any concerns.
//             </p>

//             <h2 className="text-2xl font-bold text-gray-900 mb-4">Modifications to This Policy</h2>
//             <p className="text-gray-700 mb-6">
//               Flashfire reserves the right to modify this Refund Policy at any time. Changes will be posted on our website and will apply to future transactions. Existing customers will be notified of significant changes via email.
//             </p>

//             <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
//             <p className="text-gray-700 mb-4">
//               For refund requests or questions about this policy, please contact us:
//             </p>
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <p className="text-gray-700"><strong>Email:</strong> support@Flashfirejobs.com</p>
//               <p className="text-gray-700"><strong>Subject Line:</strong> "Refund Request - [Your Name]"</p>
//               <p className="text-gray-700"><strong>Response Time:</strong> Within 24 hours during business days</p>
//             </div>

//             <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
//               <p className="text-green-800 font-medium">
//                 We value your trust in Flashfire and are committed to ensuring your satisfaction with our services. Our goal is to help you succeed in your job search while maintaining fair and transparent business practices.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RefundPolicy;
