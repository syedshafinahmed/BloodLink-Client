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
import Loading from "../../loading/Loading";

const STATUS_COLORS = {
  pending: "badge-warning",
  inprogress: "badge-info",
  done: "badge-success",
  canceled: "badge-error",
};

const STATUS_OPTIONS = ["all", "pending", "inprogress", "done", "canceled"];

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

  // fetch user role
  useEffect(() => {
    if (!user?.email) return;

    axiosSecure.get(`/users?email=${user.email}`).then((res) => {
      if (res.data?.length > 0) {
        setRole(res.data[0].role);
      }
    });
  }, [user?.email, axiosSecure]);

  // fetch requests by status
  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get(`/donation-requests/status/${statusFilter}`)
      .then((res) => {
        setRequests(res.data);
        setCurrentPage(1);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [statusFilter, setLoading, axiosSecure]);

  // delete donation request
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
        axiosSecure.delete(`/donation-requests/${id}`).then(() => {
          Swal.fire("Deleted!", "Donation request removed.", "success");
          setRequests((prev) => prev.filter((r) => r._id !== id));
        });
      }
    });
  };

  // volunteer status change
  const handleStatusChange = async (id, status) => {
    try {
      await axiosSecure.patch(`/donation-requests/${id}`, { donationStatus: status });
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, donationStatus: status } : r))
      );
      Swal.fire("Updated", "Status updated successfully", "success");
    } catch {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  if (loading) return <Loading />;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRequests = requests.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-base-200/10 px-6">
      <motion.div className="flex flex-col md:flex-row gap-6 md:gap-0 justify-between items-center mb-6">
        <motion.h1
          className="text-start font-black text-3xl"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          All Donation Requests: {requests.length}
        </motion.h1>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="select select-sm bg-base-200 border-gray-400"
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </motion.div>

      <motion.div className="overflow-x-auto rounded-lg border border-gray-700 bg-base-200">
        <table className="w-full text-center text-gray-900">
          <thead className="bg-gray-900 text-base-200">
            <tr>
              <th className="p-3">Recipient</th>
              <th className="p-3">Requester</th>
              <th className="p-3">Blood Group</th>
              <th className="p-3">Hospital</th>
              <th className="p-3">Location</th>
              <th className="p-3">Status</th>
              {role === "admin" && <th className="p-3">Actions</th>}
            </tr>
          </thead>
          <tbody className="text-xs md:text-sm">
            {currentRequests.map((req) => (
              <tr key={req._id} className="border-b border-gray-700 hover:bg-gray-300">
                <td className="p-3">{req.recipientName}</td>
                <td className="p-3">{req.requesterName}</td>
                <td className="p-3 font-semibold">{req.bloodGroup}</td>
                <td className="p-3">{req.hospitalName}</td>
                <td className="p-3">
                  {req.recipientUpazila}, {req.recipientDistrict}
                </td>

                <td className="p-3">
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
                      onChange={(e) => handleStatusChange(req._id, e.target.value)}
                      className="select select-sm bg-base-200 border-gray-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="inprogress">In Progress</option>
                      <option value="done">Done</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  )}
                </td>

                {role === "admin" && (
                  <td className="flex justify-center gap-5 mt-4">
                    <Tooltip title="View Details">
                      <FaArrowUpRightFromSquare
                        onClick={() => navigate(`/dashboard/donation-request/${req._id}`)}
                      />
                    </Tooltip>

                    <Tooltip title="Edit Request">
                      <FaEdit
                        onClick={() =>
                          navigate(`/dashboard/donation-request/edit/${req._id}`)
                        }
                      />
                    </Tooltip>

                    <Tooltip title="Delete Request">
                      <FiTrash onClick={() => handleDelete(req._id)} />
                    </Tooltip>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <div className="flex justify-center mt-10 gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded border ${page === currentPage
              ? "bg-[#f9232c] text-base-200 border-[#f9232c]"
              : "bg-base-200 text-gray-900 border-gray-400"
              }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllDonationRequests;
