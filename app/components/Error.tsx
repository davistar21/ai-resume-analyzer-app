import React from "react";
import { Link } from "react-router";
interface ErrorProps {
  message?: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center min-h-[50vh] mt-10 px-4">
      <div className="bg-white shadow-2xl rounded-xl border border-red-200 p-6 max-w-md w-full text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Oops! Something went wrong.
          </h2>

          <p className="text-gray-600  text-sm">
            {message || "An unexpected error occurred. Please try again later."}
          </p>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => window.location.reload()}
              className="cursor-pointer inline-flex items-center px-4 py-2 bg-red-500 text-white  font-medium rounded-full hover:bg-red-600 transition"
            >
              Refresh Page
            </button>
            <Link
              className=" bg-gray-300 font-medium px-4 py-2 rounded-full hover:underline"
              to="/"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
