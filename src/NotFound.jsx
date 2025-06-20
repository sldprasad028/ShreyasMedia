import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gray-100">
      <img
        src="/images/desktop-only.png"
        alt="Use desktop for best experience"
        className="w-64 h-auto mb-6"
      />
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
        Please use a desktop device for the best experience.
      </h2>
    </div>
  );
};

export default NotFound;
