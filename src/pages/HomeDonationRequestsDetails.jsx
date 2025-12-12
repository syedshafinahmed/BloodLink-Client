import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaMapMarkerAlt, FaRegCalendarAlt, FaUserInjured } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { MdAddModerator } from "react-icons/md";

const HomeDonationRequestsDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    axiosSecure
      .get(`/donation-requests/${id}`)
      .then((res) => setRequest(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!request) return <p className="text-center mt-10">Loading...</p>;

  return (
    <motion.div
      className="max-w-4xl mx-auto py-30 mt-10 px-7 md:px-0"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="p-8 bg-red-100 rounded-2xl shadow-lg border border-red-200 relative"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Blood Group + Status */}
        <motion.div
          className="flex justify-between items-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h1 className="text-5xl font-extrabold text-gray-900">
            {request.bloodGroup}{" "}
            <span className="text-sm font-medium">blood needed</span>
          </h1>
  
          <span
            className={`px-4 py-1 rounded-full font-semibold text-sm ${
              request.donationStatus === "pending"
                ? "bg-yellow-500 text-gray-900"
                : request.donationStatus === "approved"
                ? "bg-green-500 text-gray-900"
                : "bg-red-500 text-gray-900"
            }`}
          >
            {request.donationStatus.toUpperCase()}
          </span>
        </motion.div>
  
        {/* Request Message */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h3 className="text-lg font-semibold mb-1">Request Message</h3>
          <p className="text-gray-800 leading-relaxed text-justify">
            {request.requestMessage}
          </p>
        </motion.div>
  
        {/* BADGES SECTION */}
        <motion.div
          className="flex flex-wrap gap-3 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          {/* Patient Name */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-base-200 px-4 py-2 rounded-full shadow-sm border border-gray-300"
          >
            <FaUserInjured className="text-gray-900" />
            <span className="text-gray-700 text-xs font-medium">
              Patient: <strong>{request.recipientName}</strong>
            </span>
          </motion.div>
  
          {/* Donation Date */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-base-200 px-4 py-2 rounded-full shadow-sm border border-gray-300"
          >
            <FaRegCalendarAlt className="text-gray-900" />
            <span className="text-gray-700 text-xs font-medium">
              Date: <strong>{request.donationDate}</strong>
            </span>
          </motion.div>
  
          {/* Hospital / Location */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-base-200 px-4 py-2 rounded-full shadow-sm border border-gray-300"
          >
            <FaMapMarkerAlt className="text-gray-900" />
            <span className="text-gray-700 text-xs font-medium">
              Location: <strong>{request.hospitalName}</strong>
            </span>
          </motion.div>
  
          {/* Contact */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-base-200 px-4 py-2 rounded-full shadow-sm border border-gray-300"
          >
            <IoCall className="text-gray-900" />
            <span className="text-gray-700 text-xs font-medium">
              Contact: <strong>{request.contact}</strong>
            </span>
          </motion.div>
  
          {/* Requested By */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-base-200 px-4 py-2 rounded-full shadow-sm border border-gray-300"
          >
            <MdAddModerator className="text-gray-900" />
            <span className="text-gray-700 text-xs font-medium">
              Requested By: <strong>{request.requesterName}</strong>
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HomeDonationRequestsDetails;
