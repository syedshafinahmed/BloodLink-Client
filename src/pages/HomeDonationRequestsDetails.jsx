import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

import {
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaUserInjured,
} from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { MdAddModerator } from "react-icons/md";

const DetailsSkeleton = () => (
  <div className="max-w-4xl mx-auto mt-10 px-6 animate-pulse">
    <div className="bg-base-200 rounded-2xl p-8 space-y-6 border border-base-300">
      <div className="flex justify-between items-center">
        <div className="h-10 w-48 bg-base-300 rounded" />
        <div className="h-5 w-24 bg-base-300 rounded-full" />
      </div>

      <div className="space-y-2">
        <div className="h-4 w-32 bg-base-300 rounded" />
        <div className="h-4 w-full bg-base-300 rounded" />
        <div className="h-4 w-5/6 bg-base-300 rounded" />
      </div>

      <div className="flex flex-wrap gap-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-8 w-44 bg-base-300 rounded-full"
          />
        ))}
      </div>

      <div className="flex justify-end">
        <div className="h-9 w-24 bg-base-300 rounded" />
      </div>
    </div>
  </div>
);

const HomeDonationRequestsDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get(`/donation-requests/${id}`)
      .then((res) => setRequest(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id, axiosSecure]);

  const handleDonateClick = async () => {
    if (!user) {
      const result = await Swal.fire({
        title: "Login required",
        text: "You need to log in to donate blood.",
        icon: "warning",
        confirmButtonText: "Go to Login",
      });

      if (result.isConfirmed) {
        window.location.href = "/login";
      }
      return;
    }

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will change status to IN PROGRESS!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, proceed",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/donation-requests/${id}`, {
        donationStatus: "inprogress",
      });

      setRequest((prev) => ({
        ...prev,
        donationStatus: "inprogress",
      }));

      Swal.fire("Updated!", "Status changed to IN PROGRESS", "success");
    } catch {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  if (loading) return <DetailsSkeleton />;
  if (!request) return null;

  const STATUS_BADGE = {
    pending: "badge-warning",
    inprogress: "badge-info",
    done: "badge-success",
    canceled: "badge-error",
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto mt-30 mb-20 px-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.div
        className="p-8 bg-base-100 rounded-2xl shadow-xl border border-base-300"
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          {/* <h1 className="text-5xl font-black text-base-content">
            {request.bloodGroup}{" "}
            <span className="text-sm font-medium text-base-content/60">
              blood needed
            </span>
          </h1> */}
          <div className="flex gap-2 items-baseline-last">
            <p className=" h-20 w-20 rounded-2xl flex items-center justify-center bg-[#f9232c]/15 text-[#f9232c] text-4xl font-black">
              {request.bloodGroup} <br />
            </p>
            <span className="block text-md font-medium text-base-content/60">
              blood needed
            </span>
          </div>
          <span
            className={`badge badge-sm capitalize ${STATUS_BADGE[request.donationStatus]
              }`}
          >
            {request.donationStatus}
          </span>
        </div>

        {/* Message */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-1 text-base-content">
            Request Message
          </h3>
          <p className="text-base-content/80 leading-relaxed text-justify">
            {request.requestMessage}
          </p>
        </div>

        {/* Info Badges */}
        <div className="flex flex-wrap gap-3">
          <InfoBadge icon={<FaUserInjured />} label="Patient">
            {request.recipientName}
          </InfoBadge>

          <InfoBadge icon={<FaRegCalendarAlt />} label="Date">
            {request.donationDate}
          </InfoBadge>

          <InfoBadge icon={<FaMapMarkerAlt />} label="Hospital">
            {request.hospitalName}
          </InfoBadge>

          <InfoBadge icon={<IoCall />} label="Contact">
            {request.contact}
          </InfoBadge>

          <InfoBadge icon={<MdAddModerator />} label="Requested By">
            {request.requesterName}
          </InfoBadge>
        </div>

        {/* CTA */}
        {request.donationStatus === "pending" && (
          <div className="flex justify-end mt-6">
            <button
              onClick={handleDonateClick}
              className="btn btn-sm bg-[#f9232c] text-white hover:scale-105 transition"
            >
              Donate
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const InfoBadge = ({ icon, label, children }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="flex items-center gap-2 bg-base-200 px-4 py-2 rounded-full border border-base-300 text-xs"
  >
    <span className="text-base-content">{icon}</span>
    <span className="text-base-content/70">
      {label}: <strong className="text-base-content">{children}</strong>
    </span>
  </motion.div>
);

export default HomeDonationRequestsDetails;
