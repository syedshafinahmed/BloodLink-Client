import { useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import { CheckCircle } from "lucide-react";

const FundingSuccess = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get("session_id");

    if (sessionId) {
      axios
        .patch("/fundings", {
          stripeSessionId: sessionId,
          paid: true,
        })
        .then(() => console.log("Funding updated as paid"))
        .catch((err) => console.error(err));
    }
  }, [location]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-green-50 to-base-200 dark:from-green-900 dark:to-base-900 transition-colors">
      <div className="max-w-md w-full bg-base-100 dark:bg-base-800 shadow-xl rounded-2xl p-8 text-center transition-colors">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-20 h-20 text-green-500 dark:text-green-400" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Payment Successful
        </h1>

        {/* Subtitle */}
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Thank you for your generous donation. Your support helps save lives.
        </p>

        {/* Divider */}
        <div className="border-t border-base-content/20 dark:border-base-content/40 my-6"></div>

        {/* Message */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          A confirmation has been recorded in our system.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <a
            href="/fundings"
            className="w-full py-2 rounded-lg bg-green-600 dark:bg-green-500 text-base-200 dark:text-base-100 font-semibold hover:bg-green-700 dark:hover:bg-green-600 transition"
          >
            View Funding History
          </a>

          <a
            href="/"
            className="w-full py-2 rounded-lg border border-base-content/30 dark:border-base-content/60 text-base-content dark:text-base-200 hover:bg-base-200 dark:hover:bg-base-700 transition"
          >
            Go to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default FundingSuccess;
