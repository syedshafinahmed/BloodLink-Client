import React, { useEffect, useState } from 'react';
import { FaHourglassEnd, FaUser, FaUsers } from 'react-icons/fa';
import { IoLogOut } from "react-icons/io5";
import { MdAddToPhotos, MdDashboard } from "react-icons/md";
import { BiSolidDonateBlood } from "react-icons/bi";
import { Link, Outlet } from 'react-router';
import logo from "../assets/BloodLink.png";
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState(null);
  const [status, setStatus] = useState(null);

  const handleLogout = () => {
    logOut().then().catch();
  };

  // role & status
  useEffect(() => {
    if (!user?.email) return;

    const fetchRole = async () => {
      try {
        const res = await axiosSecure.get(`/users?email=${user.email}`);
        if (res.data?.length > 0) {
          setRole(res.data[0].role);
          setStatus(res.data[0].status);
        }
      } catch (err) {
        console.error("Failed to fetch role:", err);
      }
    };

    fetchRole();
  }, [user?.email, axiosSecure]);

  return (
    <div className="drawer lg:drawer-open h-screen overflow-hidden bg-base-200">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col h-screen">
        <nav className="navbar w-full bg-base-200 shrink-0">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
        </nav>

        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <div className="flex flex-col sticky top-0 transition-all duration-300 h-screen bg-gray-900 is-drawer-close:w-14 is-drawer-open:w-52">
          <ul className="menu w-full grow text-primary">
            <li>
              <Link to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Home">
                <img src={logo} className="w-32 pb-5" alt="Logo" />
              </Link>
            </li>

            <li>
              <Link to="dhome" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Dashboard">
                <MdDashboard />
                <span className="is-drawer-close:hidden font-black text-xs">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link to="profile" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Profile">
                <FaUser />
                <span className="is-drawer-close:hidden font-black text-xs">Profile</span>
              </Link>
            </li>

            {/* admin */}
            {(role === 'admin') && (
              <>
                <li>
                  <Link to="all-users" className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="All Users">
                    <FaUsers />
                    <span className="is-drawer-close:hidden font-black text-xs">All Users</span>
                  </Link>
                </li>
              </>
            )}

            {/* admin */}
            {(role === 'admin' || role === 'volunteer') && (
              <>
                <li>
                  <Link to="all-donation-requests" className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="All Donation Requests">
                    <BiSolidDonateBlood />
                    <span className="is-drawer-close:hidden font-black text-xs">
                      All Donation Requests
                    </span>
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to="donation-requests" className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Donation Requests">
                <FaHourglassEnd />
                <span className="is-drawer-close:hidden font-black text-xs">My Donation Requests</span>
              </Link>
            </li>

            {status === "active" && (
              <li>
                <Link to="create-donation-request" className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Create Donation Request">
                  <MdAddToPhotos />
                  <span className="is-drawer-close:hidden font-black text-xs">
                    Create Donation Request
                  </span>
                </Link>
              </li>
            )}

            <li>
              <button onClick={handleLogout} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Logout">
                <IoLogOut />
                <span className="is-drawer-close:hidden font-black text-xs">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
