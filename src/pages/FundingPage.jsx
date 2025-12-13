import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";

const FundingPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading, setLoading } = useAuth();
  const [fundings, setFundings] = useState([]);
  const [amount, setAmount] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(fundings.length / itemsPerPage);

  useEffect(() => {
    axiosSecure
      .get("/fundings")
      .then((res) => {
        setFundings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching fundings:", err);
        setLoading(false);
      });
  }, []);

  const handleFund = async () => {
    if (!user || !user.email) {
      window.location.href = "/login";
      return;
    }

    if (amount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    try {
      const userEmail = user.email;
      const userName = user.displayName || user.name || "Anonymous";

      const { data } = await axiosSecure.post("/create-payment-intent", {
        amount,
        userEmail,
        userName,
      });

      window.location.href = data.url;
    } catch (err) {
      console.error("Payment error:", err);
      alert("Failed to initiate payment. Please try again.");
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFundings = fundings.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="max-w-7xl min-h-screen mx-auto mt-40 p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Funding History</h2>

        <div className="flex gap-2">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter amount"
            className="px-4 py-2 border rounded-lg"
            min={1}
          />
          <button
            onClick={handleFund}
            className="px-6 py-2 bg-primary text-base-200 rounded-lg hover:bg-red-700 transition"
          >
            Give Fund
          </button>
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded"></div>
          ))}
        </div>
      ) : fundings.length === 0 ? (
        <p>No fundings found.</p>
      ) : (
        <>
          <div className="h-72">
            <motion.table
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full border-collapse text-center text-sm rounded-lg overflow-hidden shadow-md"
            >
              <thead className="bg-gray-900 text-base-200">
                <tr>
                  <th className="p-3">User Name</th>
                  <th className="p-3">User Email</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Payment Method</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {currentFundings.map((fund) => (
                  <tr
                    key={fund._id}
                    className="border-b hover:bg-gray-100"
                  >
                    <td className="p-3">{fund.userName || "Anonymous"}</td>
                    <td className="p-3">{fund.userEmail}</td>
                    <td className="p-3">
                      <strong>৳ {fund.amount}</strong>
                    </td>
                    <td className="p-3">
                      <span className="badge badge-base badge-success">
                        card
                      </span>
                    </td>
                    <td className="p-3">
                      {new Date(fund.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </motion.table>
          </div>

          <div className="flex justify-center mt-10 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded border ${currentPage === page
                      ? "bg-primary text-base-200 border-primary"
                      : "bg-base-200 text-gray-900 border-gray-400"
                    }`}
                >
                  {page}
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FundingPage;
