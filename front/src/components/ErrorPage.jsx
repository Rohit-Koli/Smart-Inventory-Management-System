import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-gray-600 text-center max-w-md mb-6">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/"
        className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-300"
      >
        Go Back Home
      </Link>

      {error?.statusText || error?.message ? (
        <p className="mt-4 text-sm text-gray-500 text-center">
          <strong>Error:</strong> {error.statusText || error.message}
        </p>
      ) : null}
    </div>
  );
};

export default ErrorPage;
