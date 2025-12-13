import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FiTrash } from "react-icons/fi";
import { Tooltip } from "@mui/material";
import Loading from "../loading/Loading";
import { motion } from "framer-motion";

const DonationRequests = () => {
  const { user, loading, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(requests.length / itemsPerPage);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/donation-requests/user/${user.email}`)
      .then((res) => {
        setRequests(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load your donation requests!",
        });
        setLoading(false);
      });
  }, [user?.email, setLoading, axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This request will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/donation-requests/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "The donation request has been removed.", "success");
            setRequests((prev) => prev.filter((r) => r._id !== id));
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete the request.", "error");
          });
      }
    });
  };

  if (loading) {
    return <Loading />;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRequests = requests.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white/10 pb-10 px-6">
      <motion.h1
        className="text-center font-black mb-10 text-3xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Donation Requests
      </motion.h1>

      {!loading && requests.length === 0 && (
        <p className="text-gray-400">You have not created any donation requests yet.</p>
      )}

      {!loading && requests.length > 0 && (
        <>
          <div className="h-[500px] md:h-[450px] lg:h-80">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="overflow-x-auto rounded-lg border border-gray-700 bg-base-200"
            >
              <table className="w-full text-center text-gray-900">
                <thead className="bg-gray-900 text-base-200">
                  <tr>
                    <th className="p-3">Recipient</th>
                    <th className="p-3">Blood Group</th>
                    <th className="p-3">Hospital</th>
                    <th className="p-3">Location</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>

                <tbody className="text-xs md:text-sm">
                  {currentRequests.map((req) => (
                    <tr
                      key={req._id}
                      className="border-b border-gray-700 hover:bg-gray-300 transition"
                    >
                      <td className="p-3">{req.recipientName}</td>
                      <td className="p-3 font-semibold">{req.bloodGroup}</td>
                      <td className="p-3">{req.hospitalName}</td>
                      <td className="p-3">
                        {req.recipientUpazila}, {req.recipientDistrict}
                      </td>
                      <td className="p-3">{req.donationDate}</td>

                      <td className="p-3">
                        <span
                          className={`badge badge-sm rounded text-white ${req.donationStatus === "pending"
                            ? "bg-yellow-600"
                            : req.donationStatus === "approved"
                              ? "bg-green-600"
                              : "bg-red-600"
                            }`}
                        >
                          {req.donationStatus}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="flex items-center justify-center px-3 mt-4 gap-5 text-gray-900">
                        {/* View Details */}
                        <Tooltip title="View Request">
                          <FaArrowUpRightFromSquare
                            className="cursor-pointer hover:text-primary"
                            onClick={() => navigate(`/dashboard/donation-request/${req._id}`)}
                          />
                        </Tooltip>

                        {/* Edit */}
                        <Tooltip title="Edit Request">
                          <FaEdit
                            className="cursor-pointer hover:text-primary"
                            onClick={() => navigate(`/dashboard/donation-request/edit/${req._id}`)}
                          />
                        </Tooltip>

                        {/* Delete */}
                        <Tooltip title="Delete Request">
                          <FiTrash
                            className="cursor-pointer hover:text-primary"
                            size={15}
                            onClick={() => handleDelete(req._id)}
                          />
                        </Tooltip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded border ${page === currentPage
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-white text-gray-900 border-gray-400"
                  }`}
              >
                {page}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DonationRequests;
