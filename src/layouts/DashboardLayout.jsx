import React from 'react';
import { FaUser } from 'react-icons/fa';
import { IoLogOut } from "react-icons/io5";
import { Link, Outlet } from 'react-router';
import logo from "../assets/BloodLink.png"
import useAuth from '../hooks/useAuth';

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const handleLogout = () => {
    logOut()
      .then()
      .catch()
  }
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-green-800">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
            {/* Sidebar toggle icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
          </label>
          <div className="px-4">Navbar Title</div>
        </nav>
        {/* Page content here */}
        <div className="p-4">
          <Outlet></Outlet>
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-blue-800 is-drawer-close:w-14 is-drawer-open:w-40">
          {/* Sidebar content here */}
          <ul className="menu w-full grow text-[#f9232c]">
            {/* List item */}
            <li>
              <Link to='/' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="BLoodLink">
                <img src={logo} className='w-32 pb-5' alt="Logo" />
              </Link>
            </li>


            <li>
              <Link to='profile' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Profile">
                <FaUser />
                <span className="is-drawer-close:hidden">Profile</span>
              </Link>
            </li>

            <li>
              <button onClick={handleLogout} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Logout">
                <IoLogOut />
                <span className="is-drawer-close:hidden">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;