import React, { useEffect, useState } from 'react';
import { FaClipboardList, FaHourglassEnd, FaUser, FaUsers } from 'react-icons/fa';
import { IoLogOut } from "react-icons/io5";
import { MdAddToPhotos, MdDarkMode, MdDashboard, MdLightMode } from "react-icons/md";
import { NavLink, Outlet } from 'react-router';
import { AiFillHome } from "react-icons/ai";
import logo from "../assets/BloodLink.png";
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Switch from '../toggle/Switch';

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


  const [theme, setTheme] = useState(localStorage.getItem('theme') || "light");
  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  useEffect(() => {
    const html = document.querySelector('html');
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

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

        <div className="flex flex-col sticky top-0 transition-all duration-300 h-screen bg-gray-900 is-drawer-close:w-14 is-drawer-open:w-60">
          <h1 className="text-[#f9232c] is-drawer-close:hidden text-3xl flex items-center justify-start gap-2 font-black p-4"><img src={logo} className="h-8" alt="Logo" />Dashboard</h1>
          <ul className="menu w-full grow text-white text-md font-extralight flex flex-col">
            {/* <li>
              <Link to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Home">
                <img src={logo} className="w-32 pb-5" alt="Logo" />
              </Link>
            </li> */}

            <div className="space-y-1">
              <li>
                <NavLink to="/" className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right
     flex items-center gap-3 px-3 py-2 transition-all
     ${isActive ? "glass-active text-[#f9232c]" : "text-white hover:text-[#f9232c]"}`
                } data-tip="Dashboard">
                  <AiFillHome />
                  <span className="is-drawer-close:hidden">Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="dhome" className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right
     flex items-center gap-3 px-3 py-2 transition-all
     ${isActive ? "glass-active text-[#f9232c]" : "text-white hover:text-[#f9232c]"}`
                } data-tip="Dashboard">
                  <MdDashboard />
                  <span className="is-drawer-close:hidden">Dashboard</span>
                </NavLink>
              </li>



              {/* admin */}
              {(role === 'admin') && (
                <>
                  <li>
                    <NavLink to="all-users" className={({ isActive }) =>
                      `is-drawer-close:tooltip is-drawer-close:tooltip-right
     flex items-center gap-3 px-3 py-2 transition-all
     ${isActive ? "glass-active text-[#f9232c]" : "text-white hover:text-[#f9232c]"}`
                    }
                      data-tip="All Users">
                      <FaUsers />
                      <span className="is-drawer-close:hidden">All Users</span>
                    </NavLink>
                  </li>
                </>
              )}

              {/* admin */}
              {(role === 'admin' || role === 'volunteer') && (
                <>
                  <li>
                    <NavLink to="all-donation-requests" className={({ isActive }) =>
                      `is-drawer-close:tooltip is-drawer-close:tooltip-right
     flex items-center gap-3 px-3 py-2 transition-all
     ${isActive ? "glass-active text-[#f9232c]" : "text-white hover:text-[#f9232c]"}`
                    }
                      data-tip="All Donation Requests">
                      <FaClipboardList />
                      <span className="is-drawer-close:hidden">
                        All Donation Requests
                      </span>
                    </NavLink>
                  </li>
                </>
              )}

              <li>
                <NavLink to="donation-requests" className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right
     flex items-center gap-3 px-3 py-2 transition-all
     ${isActive ? "glass-active text-[#f9232c]" : "text-white hover:text-[#f9232c]"}`
                }
                  data-tip="My Donation Requests">
                  <FaHourglassEnd />
                  <span className="is-drawer-close:hidden">My Donation Requests</span>
                </NavLink>
              </li>

              {status === "active" && (
                <li>
                  <NavLink to="create-donation-request" className={({ isActive }) =>
                    `is-drawer-close:tooltip is-drawer-close:tooltip-right
     flex items-center gap-3 px-3 py-2 transition-all
     ${isActive ? "glass-active text-[#f9232c]" : "text-white hover:text-[#f9232c]"}`
                  }
                    data-tip="Create Donation Request">
                    <MdAddToPhotos />
                    <span className="is-drawer-close:hidden">
                      Create Donation Request
                    </span>
                  </NavLink>
                </li>
              )}
            </div>


            <div className="mt-auto space-y-1">
              <div className="h-0.5 bg-linear-to-r from-transparent mb-4 via-[#f9232c] to-transparent" />
              <li>
                <NavLink to="profile" className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right
     flex items-center px-3 py-2 transition-all justify-items-start gap-3
     ${isActive ? "glass-active text-[#f9232c]" : "text-white hover:text-[#f9232c]"}`
                } data-tip="Profile">
                  <img src={user?.photoURL || "/default-profile.png"} alt="Profile" className="w-4 h-4 rounded-full" />
                  <p className="is-drawer-close:hidden">{user?.displayName || "Profile"}</p>
                </NavLink>
              </li>

              <li>
                <button
                  onClick={() => handleTheme(theme !== "dark")}
                  className="
      is-drawer-close:tooltip is-drawer-close:tooltip-right
      flex items-center gap-3 px-3 py-2 transition-all rounded-[5px]
      text-white hover:text-[#f9232c]
      hover:backdrop-blur-xl
    "
                  data-tip={theme === "dark" ? "Light Mode" : "Dark Mode"}
                >
                  {theme === "dark" ? <MdDarkMode /> : <MdLightMode />}
                  <span className="is-drawer-close:hidden font-light text-md">
                    {theme === "dark" ? "Dark Mode" : "Light Mode"}
                  </span>
                </button>
              </li>

              <li>
                <button onClick={handleLogout} data-tip="Logout"
                  className="
                is-drawer-close:tooltip is-drawer-close:tooltip-right
                flex items-center gap-3 px-3 py-2 transition-all
                text-white hover:text-[#f9232c]
                hover:backdrop-blur-xl
                rounded-[5px]
              ">
                  <IoLogOut />
                  <span className="is-drawer-close:hidden">Logout</span>
                </button>
              </li>
            </div>

          </ul>
        </div>
      </div >
    </div >
  );
};

export default DashboardLayout;
