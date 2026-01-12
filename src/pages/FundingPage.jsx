import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";

const SkeletonRow = () => (
  <div className="animate-pulse flex justify-between items-center bg-base-200/50 rounded-lg px-4 py-3 mb-2">
    <div className="h-4 w-24 bg-base-content/20 rounded" />
    <div className="h-4 w-32 bg-base-content/20 rounded" />
    <div className="h-4 w-16 bg-base-content/20 rounded" />
    <div className="h-4 w-20 bg-base-content/20 rounded" />
    <div className="h-4 w-24 bg-base-content/20 rounded" />
  </div>
);

const FundingPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading, setLoading } = useAuth();
  const [fundings, setFundings] = useState([]);
  const [amount, setAmount] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(fundings.length / itemsPerPage);

  useEffect(() => {
    setLoading(true);
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
  }, [axiosSecure, setLoading]);

  const handleFund = async () => {
    if (!user || !user.email) return (window.location.href = "/login");
    if (amount <= 0) return alert("Enter a valid donation amount.");

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
  const currentFundings = fundings.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="py-28 bg-base-100 min-h-screen">
      <div className="relative max-w-7xl mx-auto px-6 md:px-0">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#f9232c]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f9232c]/5 rounded-full blur-3xl" />
        </div>
        <span className="inline-flex px-4 py-1.5 rounded-full bg-[#f9232c]/10 text-[#f9232c] text-xs font-extrabold uppercase tracking-[0.3em] border border-[#f9232c]/30 mb-5">
          Support Us
        </span>
        {/* ---------- Header ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4"
        >
          <h2 className="text-3xl md:text-4xl font-black text-base-content">
            Funding <span className="text-[#f9232c]">History</span>
          </h2>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter amount"
              className="px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#f9232c] focus:outline-none w-full sm:w-auto"
              min={1}
            />
            <button
              onClick={handleFund}
              className="px-6 py-2 bg-[#f9232c] text-white rounded-lg hover:bg-red-700 transition"
            >
              Give Fund
            </button>
          </div>
        </motion.div>

        {/* ---------- Table / Skeleton ---------- */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </div>
        ) : fundings.length === 0 ? (
          <p className="text-center text-base-content/70 mt-10">No fundings found.</p>
        ) : (
          <div className="overflow-x-auto">
            <motion.table
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full min-w-[600px] text-sm rounded-lg overflow-hidden shadow-md border border-base-content/20"
            >
              <thead className="bg-base-content text-base-100">
                <tr>
                  <th className="p-3 text-center">User Name</th>
                  <th className="p-3 text-center">User Email</th>
                  <th className="p-3 text-center">Amount</th>
                  <th className="p-3 text-center">Payment Method</th>
                  <th className="p-3 text-center">Date</th>
                </tr>
              </thead>
              <tbody className="bg-base-200">
                {currentFundings.map((fund) => (
                  <tr key={fund._id} className="border-b hover:bg-base-300 transition">
                    <td className="p-3 text-center">{fund.userName || "Anonymous"}</td>
                    <td className="p-3 text-center">{fund.userEmail}</td>
                    <td className="p-3 text-center">
                      <span className="inline-block bg-[#f9232c]/20 text-[#f9232c] px-3 py-1 rounded-full font-semibold">
                        ৳ {fund.amount}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="badge badge-sm badge-success">Card</span>
                    </td>
                    <td className="p-3 text-center">{new Date(fund.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </motion.table>
          </div>
        )}

        {/* ---------- Pagination ---------- */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-lg border text-sm font-semibold transition
                  ${currentPage === page
                    ? "bg-[#f9232c] text-white border-[#f9232c]"
                    : "bg-base-100 text-base-content border-base-content/20 hover:bg-base-200"
                  }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FundingPage;
