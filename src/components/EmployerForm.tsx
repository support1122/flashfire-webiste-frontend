import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { Building2, Users, MapPin, Calendar, MessageSquare, Send, X } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  employeeCount: string;
  locations: string;
  hiresCount: string;
  heardAbout: string[];
  additionalDetails: string;
}

export default function EmployerForm({ employerFormVisibility, setEmployerFormVisibility }: {
  employerFormVisibility: boolean;
  setEmployerFormVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    employeeCount: '',
    locations: '',
    hiresCount: '',
    heardAbout: [],
    additionalDetails: '',
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      heardAbout: prev.heardAbout.includes(value)
        ? prev.heardAbout.filter((item) => item !== value)
        : [...prev.heardAbout, value],
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/employerform`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Form submitted successfully:", result);
        setEmployerFormVisibility(false); // close modal
      } else {
        console.error("Submission failed:", await response.text());
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    if (employerFormVisibility) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [employerFormVisibility]);

  return (
    <div className="fixed top-4 right-8 rounded-2xl z-[9999] h-[99vh] w-[90vw] bg-black/50 flex justify-center overflow-y-scroll border-2" >
      <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-6 rounded-3xl shadow-2xl overflow-y-auto w-full h-full" >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition"
          onClick={() => setEmployerFormVisibility(false)}
        >
          <X className="w-6 h-6" />
        </button>

        <div className="max-w-6xl mx-auto font-sans">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Partner with Us</h1>
            <p className="text-xl text-gray-600 max-w-lg mx-auto">
              Connect with top talent and grow your team with FlashFire’s AI-driven recruitment
            </p>
          </div>

          {/* ✅ Form starts here */}
          <form className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden" onSubmit={handleSubmit}>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
              <h2 className="text-2xl font-semibold text-white">Employer Information</h2>
              <p className="text-blue-100 mt-2">Tell us about your company and hiring needs</p>
            </div>

            <div className="p-8 space-y-8">
              {/* First & Last Name */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  placeholder="your.email@company.com"
                />
              </div>

              {/* Company Name */}
              <div className="space-y-2">
                <label htmlFor="companyName" className="block text-sm font-semibold text-gray-700">Company Name *</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  placeholder="Your company name"
                />
              </div>

              {/* Employee Count */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  <Users className="inline w-4 h-4 mr-2 text-gray-500" />
                  Number of employees? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['1-50', '50-100', '100-500', '500-5000', '5000+'].map((option) => (
                    <label key={option} className="flex items-center p-3 border border-gray-200 rounded-xl hover:bg-blue-50 cursor-pointer">
                      <input
                        type="radio"
                        name="employeeCount"
                        value={option}
                        checked={formData.employeeCount === option}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-3 text-sm text-gray-700">{option} employees</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Hiring Locations */}
              <div className="space-y-2">
                <label htmlFor="locations" className="block text-sm font-semibold text-gray-700">
                  <MapPin className="inline w-4 h-4 mr-2 text-gray-500" />
                  Which locations are you hiring in? *
                </label>
                <select
                  id="locations"
                  name="locations"
                  value={formData.locations}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                >
                  <option value="">Select location</option>
                  <option value="remote">Remote</option>
                  <option value="us">United States</option>
                  <option value="europe">Europe</option>
                  <option value="asia">Asia</option>
                  <option value="global">Global</option>
                </select>
              </div>

              {/* Hires Count */}
              <div className="space-y-2">
                <label htmlFor="hiresCount" className="block text-sm font-semibold text-gray-700">
                  <Calendar className="inline w-4 h-4 mr-2 text-gray-500" />
                  Hires in next 6-12 months? *
                </label>
                <input
                  type="number"
                  id="hiresCount"
                  name="hiresCount"
                  value={formData.hiresCount}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  placeholder="Number of positions"
                />
              </div>

              {/* Heard About */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">How did you hear about us? *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'LinkedIn',
                    'Google Search',
                    'From a friend',
                    'TikTok/Instagram',
                    'Received applications',
                    'Used FlashFire as job seeker',
                    'Other'
                  ].map((option) => (
                    <label key={option} className="flex items-center p-3 border border-gray-200 rounded-xl hover:bg-blue-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.heardAbout.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-3 text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Details */}
              <div className="space-y-2">
                <label htmlFor="additionalDetails" className="block text-sm font-semibold text-gray-700">
                  <MessageSquare className="inline w-4 h-4 mr-2 text-gray-500" />
                  Any additional details?
                </label>
                <textarea
                  id="additionalDetails"
                  name="additionalDetails"
                  value={formData.additionalDetails}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  placeholder="Tell us about your needs, team culture, or anything else..."
                />
              </div>

              {/* ✅ Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Submit Application</span>
                </button>
              </div>

              <div className="text-center text-sm text-gray-500 pt-4">
                By submitting, you agree to our Terms and Privacy Policy.
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
