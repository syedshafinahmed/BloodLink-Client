import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { Tooltip } from "@mui/material";
import { motion } from "framer-motion";

const STATUS_COLORS = {
  pending: "badge-warning",
  inprogress: "badge-info",
  done: "badge-success",
  canceled: "badge-error",
};

const STATUS_OPTIONS = ["all", "pending", "inprogress", "done", "canceled"];

const TableSkeleton = ({ rows = 7 }) => (
  <div className="animate-pulse space-y-4">
    {[...Array(rows)].map((_, i) => (
      <div
        key={i}
        className="h-14 rounded-lg bg-base-300/60 dark:bg-base-700/50"
      />
    ))}
  </div>
);

const AllDonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [statusFilter, setStatusFilter] = useState("all");

  const totalPages = Math.ceil(requests.length / itemsPerPage) || 1;

  useEffect(() => {
    if (!user?.email) return;
    axiosSecure.get(`/users?email=${user.email}`).then((res) => {
      if (res.data?.length) setRole(res.data[0].role);
    });
  }, [user?.email, axiosSecure]);

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get(`/donation-requests/status/${statusFilter}`)
      .then((res) => {
        setRequests(res.data);
        setCurrentPage(1);
      })
      .finally(() => setLoading(false));
  }, [statusFilter, axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This donation request will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f9232c",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/donation-requests/${id}`).then(() => {
          setRequests((prev) => prev.filter((r) => r._id !== id));
          Swal.fire("Deleted", "Request removed", "success");
        });
      }
    });
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axiosSecure.patch(`/donation-requests/${id}`, {
        donationStatus: status,
      });
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, donationStatus: status } : r))
      );
      Swal.fire("Updated", "Status updated", "success");
    } catch {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRequests = requests.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <section className="px-6 py-6">
      <span className="inline-block mb-4 px-4 py-1.5 rounded-full
        bg-[#f9232c]/10 text-[#f9232c] text-xs font-extrabold
        uppercase tracking-[0.3em] border border-[#f9232c]/30">
        Donation Requests
      </span>

      <motion.div
        className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h1 className="text-3xl font-black text-base-content">
          All Requests: {requests.length}
        </h1>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="select select-sm bg-base-100 dark:bg-base-900
            border-base-300 dark:border-base-700"
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </motion.div>

      <div className="overflow-x-auto rounded-xl border
        border-base-300 dark:border-base-700
        bg-base-100 dark:bg-base-900">

        {loading ? (
          <div className="p-6">
            <TableSkeleton />
          </div>
        ) : (
          <table className="w-full text-center text-base-content">
            <thead className="bg-base-200 dark:bg-base-800">
              <tr className="h-16">
                <th className="align-middle">Recipient</th>
                <th className="align-middle">Requester</th>
                <th className="align-middle">Blood</th>
                <th className="align-middle">Hospital</th>
                <th className="align-middle">Location</th>
                <th className="align-middle">Status</th>
                {role === "admin" && <th className="align-middle">Actions</th>}
              </tr>
            </thead>

            <tbody className="text-sm">
              {currentRequests.map((req) => (
                <tr
                  key={req._id}
                  className="h-16 border-b border-base-300
                    dark:border-base-700 hover:bg-base-200
                    dark:hover:bg-base-800 transition"
                >
                  <td className="align-middle">{req.recipientName}</td>
                  <td className="align-middle">{req.requesterName}</td>
                  <td className="align-middle font-semibold">
                    {req.bloodGroup}
                  </td>
                  <td className="align-middle">{req.hospitalName}</td>
                  <td className="align-middle">
                    {req.recipientUpazila}, {req.recipientDistrict}
                  </td>

                  <td className="align-middle">
                    {role === "admin" && (
                      <span
                        className={`badge badge-sm rounded-full ${STATUS_COLORS[req.donationStatus]}`}
                      >
                        {req.donationStatus}
                      </span>
                    )}

                    {role === "volunteer" && (
                      <select
                        value={req.donationStatus}
                        onChange={(e) =>
                          handleStatusChange(req._id, e.target.value)
                        }
                        className="select select-xs bg-base-100
                          dark:bg-base-900 border-base-300"
                      >
                        <option value="pending">Pending</option>
                        <option value="inprogress">In Progress</option>
                        <option value="done">Done</option>
                        <option value="canceled">Canceled</option>
                      </select>
                    )}
                  </td>

                  {role === "admin" && (
                    <td className="align-middle">
                      <div className="flex justify-center items-center gap-4">
                        <Tooltip title="View">
                          <FaArrowUpRightFromSquare
                            className="cursor-pointer hover:text-[#f9232c]"
                            onClick={() =>
                              navigate(`/dashboard/donation-request/${req._id}`)
                            }
                          />
                        </Tooltip>

                        <Tooltip title="Edit">
                          <FaEdit
                            className="cursor-pointer hover:text-blue-500"
                            onClick={() =>
                              navigate(`/dashboard/donation-request/edit/${req._id}`)
                            }
                          />
                        </Tooltip>

                        <Tooltip title="Delete">
                          <FiTrash
                            className="cursor-pointer hover:text-[#f9232c]"
                            onClick={() => handleDelete(req._id)}
                          />
                        </Tooltip>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded border transition
              ${page === currentPage
                ? "bg-[#f9232c] text-white border-[#f9232c]"
                : "bg-base-100 dark:bg-base-900 border-base-300"
              }`}
          >
            {page}
          </button>
        ))}
      </div>
    </section>
  );
};

export default AllDonationRequests;
