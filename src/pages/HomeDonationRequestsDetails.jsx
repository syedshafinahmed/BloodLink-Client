import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaMapMarkerAlt, FaRegCalendarAlt, FaUserInjured } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { MdAddModerator } from "react-icons/md";
import Loading from "../loading/Loading";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const HomeDonationRequestsDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    axiosSecure
      .get(`/donation-requests/${id}`)
      .then((res) => setRequest(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  // const handleDonateClick = async () => {
  //   try {
  //     const result = await Swal.fire({
  //       title: "Are you sure?",
  //       text: "This will change status to IN PROGRESS!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonText: "Yes, proceed",
  //       cancelButtonText: "Cancel",
  //     });

  //     if (result.isConfirmed) {
  //       const res = await axiosSecure.patch(`/donation-requests/${id}`, {
  //         donationStatus: "inprogress",
  //       });

  //       if (res.data?.message) {
  //         setRequest({ ...request, donationStatus: "inprogress" });

  //         Swal.fire(
  //           "Updated!",
  //           "Donation status changed to IN PROGRESS",
  //           "success"
  //         );
  //       }
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     Swal.fire("Error", "Failed to update status", "error");
  //   }
  // };

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

    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This will change status to IN PROGRESS!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, proceed",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/donation-requests/${id}`, {
          donationStatus: "inprogress",
        });

        if (res.data?.message) {
          setRequest({ ...request, donationStatus: "inprogress" });

          Swal.fire(
            "Updated!",
            "Donation status changed to IN PROGRESS",
            "success"
          );
        }
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update status", "error");
    }
  };


  if (!request) return <Loading></Loading>;

  return (
    <motion.div
      className="max-w-4xl mx-auto py-30 mt-10 px-7 md:px-0"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="p-8 bg-red-100/50 rounded-2xl shadow-lg border border-red-200 relative"
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

          <span className={`badge badge-sm rounded-full ${request.donationStatus === "pending"
            ? "badge-warning" : request.donationStatus === "inprogress" ? "badge-info" : request.donationStatus === "done"
              ? "badge-success" : request.donationStatus === "canceled" ? "badge-error" : "bg-primary"}`}>
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

        <div className="flex justify-end mt-5">
          {request.donationStatus === "pending" &&
            <>
              <button onClick={handleDonateClick} className="btn text-base-200 btn-sm rounded bg-primary hover:scale-110 transition-transform duration-300">Donate</button>
            </>}
        </div>

      </motion.div>
    </motion.div>
  );
};

export default HomeDonationRequestsDetails;
