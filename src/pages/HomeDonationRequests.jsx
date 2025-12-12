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
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const HomeDonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure
      .get("/donation-requests")
      .then((res) => setRequests(res.data))
      .catch((err) => console.error(err));
  }, [axiosSecure]);

  if (!requests.length)
    return (
      <p className="text-center mt-10 text-gray-500">
        No donation requests found.
      </p>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto py-30">
      <h2 className="text-4xl font-black text-center mb-15 text-black">
        All Donation Requests: {requests.length}
      </h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {requests.map((req) => (
          <motion.div
            key={req._id}
            variants={cardVariants}
            className="relative p-6 rounded-2xl shadow-lg cursor-pointer bg-red-100 text-gray-900 flex flex-col justify-between border border-red-200"
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 15px 30px rgba(0,0,0,0.2)",
            }}
          >
            <div className="flex justify-between items-start mb-4">
              <p className="text-3xl font-bold">
                {req.bloodGroup}{" "}
                <span className="text-xs font-light">blood needed</span>
              </p>
              <button
                onClick={() => navigate(`/donation-requests/${req._id}`)}
                className="text-gray-700 hover:text-red-600"
              >
                <Tooltip title="View Donation Request">
                  <GoArrowUpRight size={24} />
                </Tooltip>
              </button>
            </div>

            {/* Request Message */}
            <p className="mb-4 line-clamp-2">
              {req.requestMessage || "No message provided."}
            </p>

            {/* Location & Contact */}
            <div className="flex flex-col text-xs gap-2 mt-auto text-gray-700">
              <div className="flex items-center gap-2">
                <FaUserInjured />
                <span className="text-xs">{req.recipientName}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt />
                <span className="text-xs">{req.hospitalName}</span>
              </div>
              <div className="flex items-center gap-2">
                <IoCall />
                <span className="text-xs">{req.contact}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HomeDonationRequests;
