import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Detailspf = () => {
  const [formData, setFormData] = useState({
    incomeRange: '',
    investmentPreferences: '',
    financialGoals: '',
    riskTolerance: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const selectOptions = {
    incomeRange: ['$0 - $50,000', '$50,000 - $100,000', '$100,000+'],
    investmentPreferences: ['Conservative', 'Moderate', 'Aggressive'],
    financialGoals: ['Retirement', 'Buy a House', 'Education', 'Emergency Fund'],
    riskTolerance: ['Low', 'Medium', 'High']
  };

  const socialIcons = [
    {
      platform: 'twitter',
      url: 'https://twitter.com',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.2737 10.1635L23.2023 0H21.0872L13.3313 8.82305L7.14125 0H0L9.3626 13.3433L0 24H2.11504L10.3002 14.6806L16.8388 24H23.98M2.8784 1.5619H6.12769L13.6067 12.0384L21.0856 22.5148H17.8355" fill="currentColor"/>
        </svg>
      )
    },
    {
      platform: 'youtube',
      url: 'https://youtube.com',
      icon: (
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_92_1254)">
            <path d="M20.595 3.18388C16.991 2.93788 8.96398 2.93888 5.36498 3.18388C1.46798 3.44988 1.00898 5.80388 0.97998 11.9999C1.00898 18.1849 1.46398 20.5489 5.36498 20.8159C8.96498 21.0609 16.991 21.0619 20.595 20.8159C24.492 20.5499 24.951 18.1959 24.98 11.9999C24.951 5.81488 24.496 3.45088 20.595 3.18388ZM9.97998 15.9999V7.99988L17.98 11.9929L9.97998 15.9999Z" fill="currentColor"/>
          </g>
          <defs>
            <clipPath id="clip0_92_1254">
              <rect width="24" height="24" fill="white" transform="translate(0.97998)"/>
            </clipPath>
          </defs>
        </svg>
      )
    },
    {
      platform: 'instagram',
      url: 'https://instagram.com',
      icon: (
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_92_1252)">
            <path d="M12.98 2.163C16.184 2.163 16.564 2.175 17.83 2.233C21.082 2.381 22.601 3.924 22.749 7.152C22.807 8.417 22.818 8.797 22.818 12.001C22.818 15.206 22.806 15.585 22.749 16.85C22.6 20.075 21.085 21.621 17.83 21.769C16.564 21.827 16.186 21.839 12.98 21.839C9.77598 21.839 9.39598 21.827 8.13098 21.769C4.87098 21.62 3.35998 20.07 3.21198 16.849C3.15398 15.584 3.14198 15.205 3.14198 12C3.14198 8.796 3.15498 8.417 3.21198 7.151C3.36098 3.924 4.87598 2.38 8.13098 2.232C9.39698 2.175 9.77598 2.163 12.98 2.163ZM12.98 0C9.72098 0 9.31298 0.014 8.03298 0.072C3.67498 0.272 1.25298 2.69 1.05298 7.052C0.99398 8.333 0.97998 8.741 0.97998 12C0.97998 15.259 0.99398 15.668 1.05198 16.948C1.25198 21.306 3.66998 23.728 8.03198 23.928C9.31298 23.986 9.72098 24 12.98 24C16.239 24 16.648 23.986 17.928 23.928C22.282 23.728 24.71 21.31 24.907 16.948C24.966 15.668 24.98 15.259 24.98 12C24.98 8.741 24.966 8.333 24.908 7.053C24.712 2.699 22.291 0.273 17.929 0.073C16.648 0.014 16.239 0 12.98 0ZM12.98 5.838C9.57698 5.838 6.81798 8.597 6.81798 12C6.81798 15.403 9.57698 18.163 12.98 18.163C16.383 18.163 19.142 15.404 19.142 12C19.142 8.597 16.383 5.838 12.98 5.838ZM12.98 16C10.771 16 8.97998 14.21 8.97998 12C8.97998 9.791 10.771 8 12.98 8C15.189 8 16.98 9.791 16.98 12C16.98 14.21 15.189 16 12.98 16ZM19.386 4.155C18.59 4.155 17.945 4.8 17.945 5.595C17.945 6.39 18.59 7.035 19.386 7.035C20.181 7.035 20.825 6.39 20.825 5.595C20.825 4.8 20.181 4.155 19.386 4.155Z" fill="currentColor"/>
          </g>
          <defs>
            <clipPath id="clip0_92_1252">
              <rect width="24" height="24" fill="white" transform="translate(0.97998)"/>
            </clipPath>
          </defs>
        </svg>
      )
    },
    {
      platform: 'linkedin',
      url: 'https://linkedin.com',
      icon: (
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.98 0H5.97998C3.21898 0 0.97998 2.239 0.97998 5V19C0.97998 21.761 3.21898 24 5.97998 24H19.98C22.742 24 24.98 21.761 24.98 19V5C24.98 2.239 22.742 0 19.98 0ZM8.97998 19H5.97998V8H8.97998V19ZM7.47998 6.732C6.51398 6.732 5.72998 5.942 5.72998 4.968C5.72998 3.994 6.51398 3.204 7.47998 3.204C8.44598 3.204 9.22998 3.994 9.22998 4.968C9.22998 5.942 8.44698 6.732 7.47998 6.732ZM20.98 19H17.98V13.396C17.98 10.028 13.98 10.283 13.98 13.396V19H10.98V8H13.98V9.765C15.376 7.179 20.98 6.988 20.98 12.241V19Z" fill="currentColor"/>
        </svg>
      )
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-secondary to-white">
      {/* Navigation */}
      <nav className="flex justify-center gap-8 px-4 py-4 border-b border-gray-200 bg-white shadow-sm">
        {['Overview', 'Investing', 'Retirement', 'Cash', 'Credit', 'Tax'].map((item) => (
          <a 
            key={item} 
            href="#" 
            className="text-gray-700 hover:text-primary font-medium transition duration-200"
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          {/* Progress Bar */}
          <div className="mb-6 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full w-2/5 bg-primary rounded-full transition-all duration-500"></div>
          </div>

          {/* Step Indicator */}
          <div className="text-center mb-4">
            <p className="text-sm font-medium text-primary">Step 2 of 5</p>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
            Tell us about yourself.
          </h2>

          {/* Subtitle */}
          <h3 className="text-lg font-semibold text-primary text-center mb-4">
            Personal Information
          </h3>

          {/* Description */}
          <p className="text-center text-gray-600 text-sm mb-6">
            Help us get to know you better by providing your personal details.
          </p>

          {/* Form */}
          <form id="form" onSubmit={handleSubmit} className="space-y-4">
            {[ 
              { name: 'firstName', label: 'First Name', type: 'text' },
              { name: 'lastName', label: 'Last Name', type: 'text' },
              { name: 'email', label: 'Email Address', type: 'email' },
              { name: 'phone', label: 'Phone Number', type: 'tel' },
              { name: 'address', label: 'Home Address', type: 'text' }
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor={field.name}>
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  placeholder={field.label}
                />
              </div>
            ))}

            <button 
              onClick={() => window.location.href = '/detailpg'}
              className="w-full mt-6 bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition duration-200"
            >
              Save and continue
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex justify-center gap-6 px-4 py-6 border-t border-gray-200 bg-white">
        {socialIcons.map(({ platform, url, icon }) => (
          <a 
            key={platform} 
            href={url}
            className="text-gray-600 hover:text-primary transition duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            {icon}
          </a>
        ))}
      </footer>
    </div>
  );
};

export default Detailspf;