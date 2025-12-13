import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Loading from '../loading/Loading';
import { motion } from 'framer-motion';
import { GoArrowUpRight } from "react-icons/go";
import CountUp from 'react-countup';
import { useNavigate } from 'react-router';
import { Tooltip } from '@mui/material';

const DashboardHome = () => {
  const { user, loading, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [role, setRole] = useState(null);

  // Admin 
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalFundings, setTotalFundings] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);

  // role
  useEffect(() => {
    if (!user?.email) return;

    const fetchRole = async () => {
      try {
        const res = await axiosSecure.get(`/users?email=${user.email}`);
        if (res.data.length > 0) setRole(res.data[0].role);
      } catch (err) {
        console.error("Failed to fetch role:", err);
      }
    };

    fetchRole();
  }, [user?.email, axiosSecure]);

  // Donor 
  useEffect(() => {
    if (!user?.email || role !== 'donor') return;

    axiosSecure
      .get(`/donation-requests/user/${user.email}`)
      .then((res) => {
        setRequests(res.data);
        setLoading(false);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load your donation requests!",
        });
        setLoading(false);
      });
  }, [user?.email, role, setLoading, axiosSecure]);

  // Admin 
  useEffect(() => {
    if (role !== 'admin') return;

    const fetchStats = async () => {
      try {
        const usersRes = await axiosSecure.get('/users');
        setTotalUsers(usersRes.data.length);

        const fundingsRes = await axiosSecure.get('/fundings');
        const totalAmount = fundingsRes.data.reduce(
          (sum, item) => sum + item.amount,
          0
        );
        setTotalFundings(totalAmount);

        const requestsRes = await axiosSecure.get('/donation-requests');
        setTotalRequests(requestsRes.data.length);
      } catch (err) {
        console.error("Failed to fetch admin stats:", err);
      }
    };

    fetchStats();
  }, [role, axiosSecure]);

  if (loading) return <Loading />;

  // Admin card 
  const cardData = [
    {
      title: "Total Users",
      tooltip: "View All Users",
      value: totalUsers,
      route: null,
    },
    {
      title: "Total Fundings",
      tooltip: "View All Fundings",
      value: totalFundings,
      route: "/fundings",
      format: (val) => `৳ ${val.toLocaleString()}`,
    },
    {
      title: "Total Blood Donation Requests",
      tooltip: "View All Donation Requests",
      value: totalRequests,
      route: "/donation-requests",
    },
  ];

  return (
    <motion.section
      className="pb-5 px-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-center font-bold text-gray-900 text-2xl md:text-5xl mb-2"
      >
        Welcome, <span className="text-primary">{user.displayName}</span>
      </motion.h1>

      <motion.p
        className="text-center text-lg md:text-xl text-gray-600 mb-10"
      >
        Your generosity helps save lives everyday.
      </motion.p>

      {/* admin  */}
      {role === 'admin' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-15">
          {cardData.map((card, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="bg-linear-to-r from-gray-100 via-gray-200 to-gray-300 border-l-10 border-l-gray-900 border border-gray-300 rounded-2xl shadow-lg p-6 transition"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-black text-gray-900">
                  {card.title}
                </h3>

                <Tooltip title={card.tooltip}>
                  <button
                    disabled={!card.route}
                    onClick={() => card.route && navigate(card.route)}
                    className={`transition ${card.route
                      ? "text-gray-900 hover:text-primary"
                      : "text-gray-400 cursor-not-allowed"
                      }`}
                  >
                    <GoArrowUpRight size={20} />
                  </button>
                </Tooltip>
              </div>

              {/* Value */}
              <h2 className="text-4xl font-bold text-gray-900">
                <CountUp
                  end={card.value}
                  duration={1.5}
                  separator=","
                  formattingFn={card.format || ((val) => val)}
                />
              </h2>
            </motion.div>
          ))}
        </div>
      )}

      {/* donor  */}
      {role === 'donor' && (
        <>
          <h2 className="text-xl mb-4 text-left">
            Your Recent Donation Requests
          </h2>

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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </motion.section>
  );
};

export default DashboardHome;
