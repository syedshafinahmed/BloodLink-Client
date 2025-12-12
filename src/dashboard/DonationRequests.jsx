import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FiTrash } from "react-icons/fi";
import { Tooltip } from "@mui/material";

const DonationRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, [user?.email, axiosSecure]);

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

  return (
    <div className="bg-white/10 pb-10 px-6">
      <h1 className="text-center font-black mb-8 text-3xl">My Donation Requests</h1>

      {loading && <p className="text-gray-400">Loading...</p>}

      {!loading && requests.length === 0 && (
        <p className="text-gray-400">You have not created any donation requests yet.</p>
      )}

      {!loading && requests.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-gray-700 bg-base-200">
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
              {requests.map((req) => (
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
                        className="cursor-pointer hover:text-blue-600"
                        onClick={() => navigate(`/dashboard/donation-request/${req._id}`)}
                      />
                    </Tooltip>

                    {/* Edit */}
                    <Tooltip title="Edit Request">
                      <FaEdit
                        className="cursor-pointer hover:text-green-600"
                        onClick={() => navigate(`/dashboard/donation-request/edit/${req._id}`)}
                      />
                    </Tooltip>

                    {/* Delete */}
                    <Tooltip title="Delete Request">
                      <FiTrash
                        className="cursor-pointer hover:text-red-600" size={15}
                        onClick={() => handleDelete(req._id)}
                      />
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DonationRequests;
