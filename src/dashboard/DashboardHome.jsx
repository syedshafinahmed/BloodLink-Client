import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Loading from '../loading/Loading';
import { motion } from 'framer-motion';
import { GoArrowUpRight } from "react-icons/go";
import CountUp from 'react-countup';
import { Link, useNavigate } from 'react-router';
import { Tooltip } from '@mui/material';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';
import DashboardSkeleton from './DashboardSkeleton';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, ChartTooltip, Legend);

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
  const [statusCounts, setStatusCounts] = useState({
    pending: 0,
    inprogress: 0,
    done: 0,
    canceled: 0,
  });
  const [dailyFundings, setDailyFundings] = useState([]);
  const [chartLoading, setChartLoading] = useState(true);

  // Fetch role
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

  // Donor requests
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

  // Admin stats
  useEffect(() => {
    if (role !== 'admin' && role !== 'volunteer') return;

    setChartLoading(true);
    const fetchStats = async () => {
      try {
        const usersRes = await axiosSecure.get('/users');
        setTotalUsers(usersRes.data.length);

        const fundingsRes = await axiosSecure.get('/fundings');
        const totalAmount = fundingsRes.data.reduce((sum, item) => sum + item.amount, 0);
        setTotalFundings(totalAmount);

        const dailyMap = {};
        fundingsRes.data.forEach((fund) => {
          if (!fund.createdAt) return;
          const date = new Date(fund.createdAt);
          const key = date.toISOString().slice(0, 10);
          dailyMap[key] = (dailyMap[key] || 0) + fund.amount;
        });
        const sortedDaily = Object.entries(dailyMap)
          .sort((a, b) => new Date(a[0]) - new Date(b[0]))
          .slice(-14)
          .map(([key, amount]) => ({
            label: new Date(key).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
            amount,
          }));
        setDailyFundings(sortedDaily);

        const requestsRes = await axiosSecure.get('/donation-requests');
        setTotalRequests(requestsRes.data.length);
        const statusCounter = requestsRes.data.reduce(
          (acc, req) => {
            const status = req.donationStatus || 'pending';
            acc[status] = (acc[status] || 0) + 1;
            return acc;
          },
          { pending: 0, inprogress: 0, done: 0, canceled: 0 }
        );
        setStatusCounts(statusCounter);
      } catch (err) {
        console.error("Failed to fetch admin stats:", err);
      } finally {
        setChartLoading(false);
      }
    };
    fetchStats();
  }, [role, axiosSecure]);

  if (loading || !role) {
    return <DashboardSkeleton />;
  }

  // Admin cards
  const cardData = [
    {
      title: "Total Users",
      tooltip: "View All Users",
      value: totalUsers,
      route: "/dashboard/all-users",
      allowedRoles: ["admin"]
    },
    {
      title: "Total Fundings",
      tooltip: "View All Fundings",
      value: totalFundings,
      route: "/fundings",
      format: (val) => `৳ ${val.toLocaleString()}`,
      allowedRoles: ["admin", "volunteer"]
    },
    {
      title: "Total Blood Donation Requests",
      tooltip: "View All Donation Requests",
      value: totalRequests,
      route: "/dashboard/all-donation-requests",
      allowedRoles: ["admin", "volunteer"]
    },
  ];

  const statusChartData = {
    labels: ["Pending", "In Progress", "Done", "Canceled"],
    datasets: [
      {
        label: "Requests",
        data: [
          statusCounts.pending || 0,
          statusCounts.inprogress || 0,
          statusCounts.done || 0,
          statusCounts.canceled || 0,
        ],
        backgroundColor: ["#fbbf24", "#38bdf8", "#22c55e", "#f9232c"],
        borderWidth: 1,
      },
    ],
  };

  const fundingChartData = {
    labels: dailyFundings.map((item) => item.label),
    datasets: [
      {
        label: "৳ Funded",
        data: dailyFundings.map((item) => item.amount),
        backgroundColor: "#f9232c",
        borderRadius: 8,
      },
    ],
  };

  return (
    <div>
      <div className='flex justify-center'>
        <span className="inline-block mx-auto px-4 py-1.5 rounded-full bg-[#f9232c]/10 text-[#f9232c] text-xs font-extrabold uppercase tracking-[0.3em] border border-[#f9232c]/30 text-center mb-4">
          {(role === 'admin' || role === 'volunteer' ? role : 'Donor').toUpperCase()} DASHBOARD
        </span>
      </div>
      <motion.section
        className="pb-5 px-4 md:px-10 dark:bg-base-900 transition-colors duration-300"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >

        {/* Heading */}
        <motion.h1 className="text-center font-bold text-base-content text-2xl md:text-5xl mb-2 transition-colors">
          Welcome, <span className="text-[#f9232c]">{user.displayName}</span>
        </motion.h1>
        <motion.p className="text-center text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 transition-colors">
          Your generosity helps save lives everyday.
        </motion.p>

        {/* Admin Cards */}
        {(role === 'admin' || role === 'volunteer') && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mt-6">
            {cardData.map((card, index) => {
              const canNavigate = card.allowedRoles?.includes(role);
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  className="bg-base-100 dark:bg-base-800/80 backdrop-blur-3xl border border-[#f9232c]/20 hover:bg-linear-to-br hover:from-[#f9232c]/50 hover:via-[#f9232c]/20 hover:to-transparent rounded-2xl shadow-lg p-6 transition-colors"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-black text-base-content transition-colors">{card.title}</h3>
                    <Tooltip title={canNavigate ? card.tooltip : "Access restricted"}>
                      <span
                        onClick={() => canNavigate && navigate(card.route)}
                        className={`transition ${canNavigate
                          ? "text-base-content hover:text-[#f9232c] cursor-pointer"
                          : "text-gray-400 dark:text-gray-500 cursor-not-allowed"
                          }`}
                      >
                        <GoArrowUpRight size={20} />
                      </span>
                    </Tooltip>
                  </div>
                  <h2 className="text-4xl font-bold text-[#f9232c] transition-colors">
                    <CountUp
                      end={card.value}
                      duration={1.5}
                      separator=","
                      formattingFn={card.format || ((val) => val)}
                    />
                  </h2>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Admin Charts */}
        {role === 'admin' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 mt-10">
            {/* Status Chart */}
            <div className="rounded-2xl p-6 h-[360px] transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-[#f9232c] transition-colors">Donation Requests by Status</h3>
                <span className="text-xs text-gray-600 dark:text-gray-400 transition-colors">Last synced: live</span>
              </div>
              {chartLoading ? (
                <div className="flex items-center justify-center h-[260px]"><Loading /></div>
              ) : Object.values(statusCounts).some((val) => val > 0) ? (
                <Doughnut
                  key={`status-${Object.values(statusCounts).join('-')}`}
                  data={statusChartData}
                  options={{
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom', labels: { color: 'inherit' } } },
                    animation: { duration: 900, easing: 'easeOutExpo', animateRotate: true, animateScale: true },
                  }}
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-300 text-sm">No request data yet.</p>
              )}
            </div>

            {/* Funding Chart */}
            <div className="rounded-2xl  p-6 h-[360px] transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-[#f9232c] transition-colors">Funding (Last 14 Days)</h3>
                <span className="text-xs text-gray-600 dark:text-gray-400 transition-colors">৳ Total: {totalFundings.toLocaleString()}</span>
              </div>
              {chartLoading ? (
                <div className="flex items-center justify-center h-[260px]"><Loading /></div>
              ) : dailyFundings.length > 0 ? (
                <Bar
                  key={`fund-${dailyFundings.map((d) => `${d.label}-${d.amount}`).join('|')}`}
                  data={fundingChartData}
                  options={{
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    animation: { duration: 950, easing: 'easeOutExpo' },
                    scales: { y: { ticks: { beginAtZero: true, color: 'inherit' } }, x: { ticks: { color: 'inherit' } } },
                  }}
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-300 text-sm">No funding data yet.</p>
              )}
            </div>
          </div>
        )}

        {/* Donor Table */}
        {role === 'donor' && (
          <>
            <h2 className="text-xl mb-4 text-left text-gray-900 dark:text-base-200 transition-colors">Your Recent Donation Requests</h2>
            <div className="overflow-x-auto rounded-lg border border-base-300 dark:border-base-700 bg-base-200 dark:bg-base-900 transition-colors">
              <table className="w-full text-center text-gray-900 dark:text-base-200 transition-colors">
                <thead className="bg-gray-200 dark:bg-base-800 transition-colors">
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
                    <tr key={req._id} className="border-b border-base-300 dark:border-base-700 hover:bg-gray-300 dark:hover:bg-base-700 transition-colors">
                      <td className="p-3 text-base-content">{req.recipientName}</td>
                      <td className="p-3 text-base-content font-semibold">{req.bloodGroup}</td>
                      <td className="p-3 text-base-content">{req.hospitalName}</td>
                      <td className="p-3 text-base-content">{req.recipientUpazila}, {req.recipientDistrict}</td>
                      <td className="p-3 text-base-content">{req.donationDate}</td>
                      <td className="p-3 text-base-content">
                        <span className={`badge badge-sm rounded-full ${req.donationStatus === "pending" ? "badge-warning" : req.donationStatus === "inprogress" ? "badge-info" : req.donationStatus === "done" ? "badge-success" : req.donationStatus === "canceled" ? "badge-error" : "bg-gray-500"}`}>
                          {req.donationStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Link to='/dashboard/donation-requests' className='flex justify-end'>
              <button className='btn bg-[#f9232c] btn-sm text-base-200 mt-10'>View All</button>
            </Link>
          </>
        )}
      </motion.section>
    </div>
  );
};

export default DashboardHome;
