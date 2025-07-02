import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
        <p className="text-indigo-600 text-lg font-medium animate-pulse">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loader;
