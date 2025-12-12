import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaHospital, FaUser, FaMapMarkerAlt, FaCalendarAlt, FaEnvelopeOpenText, FaTint } from "react-icons/fa";
import { motion } from "framer-motion";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    axiosSecure.get(`/donation-requests/${id}`)
      .then((res) => setRequest(res.data))
      .catch((err) => console.error(err));
  }, [id, axiosSecure]);

  if (!request) return (
    <motion.p
      className="text-gray-500 text-center mt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      Loading...
    </motion.p>
  );

  const statusColor = {
    pending: "bg-yellow-500",
    approved: "bg-green-500",
    rejected: "bg-red-500",
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.h2
        className="text-4xl font-bold mb-8 text-center text-gray-800"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Donation Request Details
      </motion.h2>

      <motion.div
        className="bg-white shadow-2xl rounded-3xl p-8 space-y-6 border border-gray-100 hover:shadow-3xl transition-shadow duration-500"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Recipient */}
        <motion.div className="flex items-center gap-4" whileHover={{ scale: 1.02 }}>
          <FaUser className="text-gray-900 text-2xl" />
          <p className="font-semibold text-gray-700 w-36">Recipient:</p>
          <p className="text-gray-900">{request.recipientName}</p>
        </motion.div>

        {/* Blood Group */}
        <motion.div className="flex items-center gap-4" whileHover={{ scale: 1.02 }}>
          <FaTint className="text-gray-900 text-2xl" />
          <p className="font-semibold text-gray-700 w-36">Blood Group:</p>
          <p className="text-gray-900">{request.bloodGroup}</p>
        </motion.div>

        {/* Hospital */}
        <motion.div className="flex items-center gap-4" whileHover={{ scale: 1.02 }}>
          <FaHospital className="text-gray-900 text-2xl" />
          <p className="font-semibold text-gray-700 w-36">Hospital:</p>
          <p className="text-gray-900">{request.hospitalName}</p>
        </motion.div>

        {/* Location */}
        <motion.div className="flex items-center gap-4" whileHover={{ scale: 1.02 }}>
          <FaMapMarkerAlt className="text-gray-900 text-2xl" />
          <p className="font-semibold text-gray-700 w-36">Location:</p>
          <p className="text-gray-900">{request.recipientDistrict}, {request.recipientUpazila}</p>
        </motion.div>

        {/* Date */}
        <motion.div className="flex items-center gap-4" whileHover={{ scale: 1.02 }}>
          <FaCalendarAlt className="text-gray-900 text-2xl" />
          <p className="font-semibold text-gray-700 w-36">Date:</p>
          <p className="text-gray-900">{request.donationDate}</p>
        </motion.div>

        {/* Status */}
        <motion.div className="flex items-center gap-4" whileHover={{ scale: 1.02 }}>
          <p className={`px-4 py-1 rounded-full font-semibold text-white ${statusColor[request.donationStatus]}`}>
            {request.donationStatus.toUpperCase()}
          </p>
        </motion.div>

        {/* Message */}
        <motion.div className="flex items-start gap-4" whileHover={{ scale: 1.02 }}>
          <FaEnvelopeOpenText className="text-gray-900 mt-1" size={100} />
          <div>
            <p className="font-bold text-gray-700 mb-3">Message:</p>
            <p className="text-gray-900">{request.requestMessage || "No message provided."}</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DonationRequestDetails;
