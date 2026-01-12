import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Tooltip } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FiTrash } from "react-icons/fi";

import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const TableSkeleton = () => (
  <>
    {[...Array(5)].map((_, i) => (
      <tr key={i} className="animate-pulse">
        {Array.from({ length: 7 }).map((__, idx) => (
          <td key={idx} className="py-4 px-3">
            <div className="h-4 bg-base-300 rounded w-full" />
          </td>
        ))}
      </tr>
    ))}
  </>
);

const DonationRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    axiosSecure
      .get(`/donation-requests/user/${user.email}`)
      .then((res) => setRequests(res.data))
      .catch(() =>
        Swal.fire("Error", "Failed to load donation requests", "error")
      )
      .finally(() => setLoading(false));
  }, [user?.email, axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This request will be permanently deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/donation-requests/${id}`).then(() => {
          setRequests((prev) => prev.filter((r) => r._id !== id));
          Swal.fire("Deleted", "Request removed", "success");
        });
      }
    });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRequests = requests.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(requests.length / itemsPerPage);

  return (
    <div className="px-6 pb-10">
      <div className="flex justify-center">
        <span
          className="inline-block mb-4 px-4 py-1.5 rounded-full
        bg-[#f9232c]/10 text-[#f9232c]
        text-xs font-extrabold uppercase tracking-[0.3em]
        border border-[#f9232c]/30"
        >
          My Donation Requests
        </span>
      </div>
      <motion.h1
        className="text-center text-xl font-black mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        See how your requests are progressing and who’s supporting you
      </motion.h1>

      <div className="overflow-x-auto rounded-xl border border-base-300 bg-base-100">
        <table className="table w-full text-sm">
          <thead className="bg-base-300 text-base-content text-center">
            <tr className="text-center">
              <th>Recipient</th>
              <th>Blood</th>
              <th>Hospital</th>
              <th>Location</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading && <TableSkeleton />}

            {!loading &&
              currentRequests.map((req) => (
                <tr
                  key={req._id}
                  className="hover:bg-base-200 transition"
                >
                  <td className="text-center py-4 px-3">{req.recipientName}</td>
                  <td className="text-center py-4 px-3 font-semibold">
                    {req.bloodGroup}
                  </td>
                  <td className="text-center py-4 px-3">{req.hospitalName}</td>
                  <td className="text-center py-4 px-3">
                    {req.recipientUpazila}, {req.recipientDistrict}
                  </td>
                  <td className="text-center py-4 px-3">{req.donationDate}</td>

                  {/* LEFT-ALIGNED BADGE */}
                  <td className="py-4 px-3">
                    <span
                      className={`badge badge-sm capitalize ${req.donationStatus === "pending"
                        ? "badge-warning"
                        : req.donationStatus === "inprogress"
                          ? "badge-info"
                          : req.donationStatus === "done"
                            ? "badge-success"
                            : "badge-error"
                        }`}
                    >
                      {req.donationStatus}
                    </span>
                  </td>

                  {/* ACTIONS – FIXED HEIGHT */}
                  <td className="py-4 px-3">
                    <div className="flex justify-center items-center gap-5">
                      <Tooltip title="View">
                        <FaArrowUpRightFromSquare
                          className="cursor-pointer hover:text-error"
                          onClick={() =>
                            navigate(
                              `/dashboard/donation-request/${req._id}`
                            )
                          }
                        />
                      </Tooltip>

                      <Tooltip title="Edit">
                        <FaEdit
                          className="cursor-pointer hover:text-error"
                          onClick={() =>
                            navigate(
                              `/dashboard/donation-request/edit/${req._id}`
                            )
                          }
                        />
                      </Tooltip>

                      <Tooltip title="Delete">
                        <FiTrash
                          className="cursor-pointer hover:text-error"
                          onClick={() => handleDelete(req._id)}
                        />
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {!loading && requests.length === 0 && (
          <p className="text-center py-10 text-base-content/60">
            No donation requests found
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${page === currentPage
                ? "bg-[#f9232c] text-white"
                : "border-base-300"
                }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationRequests;
