import { useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";

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

  return <div className="min-h-screen mt-40">Thank you for your donation!</div>;
};

export default FundingSuccess;
