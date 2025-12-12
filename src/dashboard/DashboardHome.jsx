import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Loading from '../loading/Loading';
import { motion } from 'framer-motion';

const DashboardHome = () => {
  const { user, loading, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);

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

  if (loading) {
    return <Loading />;
  }

  return (
    <motion.section
      className="pb-5 px-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-center font-bold text-gray-900 text-2xl md:text-5xl mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Welcome, <span className="text-primary">{user.displayName}</span>
      </motion.h1>
      <motion.p
        className="text-center text-lg md:text-xl text-gray-600 mb-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Your generosity helps save lives everyday.
      </motion.p>

      <motion.h2
        className="text-xl mb-4 text-left"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Your Recent Donation Requests
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
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
            </tr>
          </thead>

          <tbody className="text-xs md:text-sm">
            {requests.slice(0, 3).map((req) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.section>
  );
};

export default DashboardHome;
