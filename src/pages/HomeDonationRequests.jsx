import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaUserInjured } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import { useNavigate } from "react-router";
import { IoCall } from "react-icons/io5";
import { Tooltip } from "@mui/material";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};


const RequestSkeleton = () => (
  <div className="rounded-2xl border border-base-content/10 bg-base-200 p-6 animate-pulse">
    <div className="h-6 w-1/2 bg-base-content/20 rounded mb-4" />
    <div className="h-3 w-full bg-base-content/20 rounded mb-2" />
    <div className="h-3 w-5/6 bg-base-content/20 rounded mb-4" />

    <div className="h-4 w-24 bg-base-content/20 rounded mb-5" />

    <div className="space-y-3">
      <div className="h-3 w-2/3 bg-base-content/20 rounded" />
      <div className="h-3 w-3/4 bg-base-content/20 rounded" />
      <div className="h-3 w-1/2 bg-base-content/20 rounded" />
    </div>
  </div>
);

const HomeDonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 20;
  const totalPages = Math.ceil(requests.length / itemsPerPage);

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get("/donation-requests")
      .then((res) => {
        setRequests(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [axiosSecure]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRequests = requests.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="py-28 bg-base-100">
      <div className="relative max-w-7xl mx-auto px-6 md:px-0">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#f9232c]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f9232c]/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-flex px-4 py-1.5 rounded-full bg-[#f9232c]/10 text-[#f9232c] text-xs font-extrabold uppercase tracking-[0.3em] border border-[#f9232c]/30">
            Live Requests
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-black text-base-content">
            Blood <span className="text-[#f9232c]">Donation Requests</span>
          </h2>

          <p className="mt-4 text-base-content/70">
            Urgent blood requests posted by patients and hospitals. Your help
            can save lives.
          </p>
        </motion.div>

        {/* Grid  */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
          variants={containerVariants}
          // initial="hidden"
          // whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
              <RequestSkeleton key={i} />
            ))
            : currentRequests.map((req) => (
              <motion.div
                key={req._id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="
                    relative flex flex-col
                    rounded-2xl p-6
                    bg-base-200/70 backdrop-blur
                    border border-[#f9232c]/20
                    shadow-md
                    hover:shadow-xl hover:shadow-[#f9232c]/15
                    transition
                  "
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-2 items-baseline-last">
                    <p className=" h-13 w-13 rounded-2xl flex items-center justify-center bg-[#f9232c]/15 text-[#f9232c] text-xl font-black">
                      {req.bloodGroup} <br />
                    </p>
                    <span className="block text-xs font-medium text-base-content/60">
                      blood needed
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/donation-requests/${req._id}`)
                    }
                    className="text-base-content/60 hover:text-[#f9232c]"
                  >
                    <Tooltip title="View Request">
                      <GoArrowUpRight size={22} />
                    </Tooltip>
                  </button>
                </div>

                {/* <p className="mb-4 text-sm text-base-content/70 line-clamp-2">
                  {req.requestMessage || "No message provided."}
                </p> */}

                <span
                  className={`badge badge-xs mb-5 rounded-full
                      ${req.donationStatus === "pending" && "badge-warning"}
                      ${req.donationStatus === "inprogress" && "badge-info"}
                      ${req.donationStatus === "done" && "badge-success"}
                      ${req.donationStatus === "canceled" && "badge-error"}
                    `}
                >
                  {req.donationStatus}
                </span>

                <div className="mt-auto space-y-2 text-xs text-base-content/70">
                  <div className="flex items-center gap-2">
                    <FaUserInjured />
                    <span>{req.recipientName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt />
                    <span className="line-clamp-1">{req.hospitalName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoCall />
                    <span>{req.contact}</span>
                  </div>
                </div>
              </motion.div>
            ))}
        </motion.div>

        {/* Pagination  */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center mt-20 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-lg border text-sm font-semibold transition
                  ${currentPage === page
                    ? "bg-[#f9232c] text-white border-[#f9232c]"
                    : "bg-base-100 text-base-content border-base-content/20 hover:bg-base-200"
                  }
                `}
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

export default HomeDonationRequests;
