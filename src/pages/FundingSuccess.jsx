import { useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import { CheckCircle } from "lucide-react";

const FundingSuccess = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get("session_id");
    const email = params.get("email");
    const name = params.get("name");
    const amount = params.get("amount");

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

  return <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-base-200 px-4">
    <div className="max-w-md w-full bg-base-200 shadow-xl rounded-2xl p-8 text-center">
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <CheckCircle className="w-20 h-20 text-green-500" />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Payment Successful 
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 mb-6">
        Thank you for your generous donation.
        Your support helps save lives.
      </p>

      {/* Divider */}
      <div className="border-t my-6"></div>

      {/* Message */}
      <p className="text-sm text-gray-500 mb-6">
        A confirmation has been recorded in our system.
      </p>

      {/* Buttons */}
      <div className="flex flex-col gap-3">
        <a
          href="/fundings"
          className="w-full py-2 rounded-lg bg-green-600 text-base-200 font-semibold hover:bg-green-700 transition"
        >
          View Funding History
        </a>

        <a
          href="/"
          className="w-full py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        >
          Go to Home
        </a>
      </div>
    </div>
  </div>
    ;
};

export default FundingSuccess;
