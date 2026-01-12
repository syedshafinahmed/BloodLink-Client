import React from "react";
import { XCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router";

const FundingCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-base-100 dark:bg-base-900 transition-colors">
      <div className="max-w-md w-full bg-base-200 dark:bg-base-800 rounded-2xl shadow-xl p-8 text-center transition-colors">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <XCircle className="w-20 h-20 text-[#f9232c] dark:text-red-400" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          Payment Cancelled
        </h2>

        {/* Subtitle */}
        <p className="text-gray-700 dark:text-gray-300 mb-8">
          Your funding payment was not completed. No money has been deducted from your account.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            to="/funding"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#f9232c] dark:bg-red-600 text-base-200 dark:text-base-100 rounded-lg hover:bg-red-700 dark:hover:bg-red-500 transition"
          >
            <ArrowLeft size={18} />
            Back to Funding Page
          </Link>

          <Link
            to="/"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FundingCancel;
