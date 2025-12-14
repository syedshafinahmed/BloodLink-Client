import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import Loading from "../../loading/Loading";

const AllDonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const totalPages = Math.ceil(requests.length / itemsPerPage);

  useEffect(() => {
    axiosSecure
      .get("/donation-requests")
      .then((res) => {
        setRequests(res.data);
        setLoading(false);
      })
      .catch(() => {
        Swal.fire("Error", "Failed to load donation requests", "error");
        setLoading(false);
      });
  }, [axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This donation request will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/donation-requests/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "Donation request removed.", "success");
            setRequests((prev) => prev.filter((r) => r._id !== id));
          })
          .catch(() => {
            Swal.fire("Error", "Failed to delete request", "error");
          });
      }
    });
  };

  if (loading) return <Loading />;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRequests = requests.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="bg-white/10 px-6">
      <motion.h1
        className="text-start font-black mb-10 text-3xl"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        All Donation Requests: {requests.length}
      </motion.h1>

      {requests.length === 0 && (
        <p className="text-center text-gray-500">
          No donation requests found.
        </p>
      )}

      {requests.length > 0 && (
        <>
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="overflow-x-auto rounded-lg border border-gray-700 bg-base-200"
          >
            <table className="w-full text-center text-gray-900">
              <thead className="bg-gray-900 text-base-200">
                <tr>
                  <th className="p-3">Recipient</th>
                  <th className="p-3">Requester</th>
                  <th className="p-3">Blood Group</th>
                  <th className="p-3">Hospital</th>
                  <th className="p-3">Location</th>
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
                    <td className="p-3">{req.requesterName}</td>
                    <td className="p-3 font-semibold">{req.bloodGroup}</td>
                    <td className="p-3">{req.hospitalName}</td>
                    <td className="p-3">
                      {req.recipientUpazila}, {req.recipientDistrict}
                    </td>
                    <td className="p-3">
                      <span
                        className={`badge badge-sm text-white ${req.donationStatus === "pending"
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
                    <td className="flex justify-center gap-5 mt-4">
                      <Tooltip title="View Details">
                        <FaArrowUpRightFromSquare
                          className="cursor-pointer hover:text-primary"
                          onClick={() =>
                            navigate(
                              `/dashboard/donation-request/${req._id}`
                            )
                          }
                        />
                      </Tooltip>

                      <Tooltip title="Edit Request">
                        <FaEdit
                          className="cursor-pointer hover:text-primary"
                          onClick={() =>
                            navigate(
                              `/dashboard/donation-request/edit/${req._id}`
                            )
                          }
                        />
                      </Tooltip>

                      <Tooltip title="Delete Request">
                        <FiTrash
                          className="cursor-pointer hover:text-primary"
                          onClick={() => handleDelete(req._id)}
                        />
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Pagination */}
          <div className="flex justify-center mt-10 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (page) => (
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
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AllDonationRequests;