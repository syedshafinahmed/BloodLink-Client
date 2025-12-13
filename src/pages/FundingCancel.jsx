import React from "react";
import { XCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router";

const FundingCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-base-200 rounded-2xl shadow-xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <XCircle className="w-20 h-20 text-primary" />
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Payment Cancelled
        </h2>

        <p className="text-gray-600 mb-8">
          Your funding payment was not completed.  
          No money has been deducted from your account.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/funding"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-base-200 rounded-lg hover:bg-red-700 transition"
          >
            <ArrowLeft size={18} />
            Back to Funding Page
          </Link>

          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-gray-700 transition"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FundingCancel;
