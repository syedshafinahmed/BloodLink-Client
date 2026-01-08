import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import logo from '../../assets/BloodLink.png'
import useAuth from '../../hooks/useAuth';
import { MdDashboard } from 'react-icons/md';
import { IoLogOut } from 'react-icons/io5';
const Navbar = () => {
  const { user, logOut } = useAuth();

  const [blur, setBlur] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const bannerHeight = window.innerHeight; // h-screen banner
      setBlur(window.scrollY >= bannerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logOut()
      .then()
      .catch()
  }
  const links =
    <>
      <li className='text-primary'><NavLink to="/">Home</NavLink></li>
      <li className='text-primary'><NavLink to="/about-us">About Us</NavLink></li>
      <li className='text-primary'><NavLink to="/services">Services</NavLink></li>
      <li className='text-primary'><NavLink to="/donors">Donors</NavLink></li>
      <li className='text-primary'><NavLink to="/donation-requests">Donation Requests</NavLink></li>
      <li className='text-primary'><NavLink to="/fundings">Funding</NavLink></li>
      {
        user &&
        <>
          <li className='text-primary'><NavLink to="/dashboard/dhome">Dashboard</NavLink></li>
        </>
      }
    </>
  return (
    <div
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${blur ? 'backdrop-blur-xl bg-primary/10 shadow-sm' : 'bg-transparent'
        }`}
    >
      <div className='max-w-7xl mx-auto'>
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-36 p-2 shadow">
                {links}
              </ul>
            </div>
            <img className='w-15' src={logo} alt="" />
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {links}
            </ul>
          </div>
          <div className="navbar-end">
            {user ?
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-30 rounded border border-primary">
                    <img
                      src={user.photoURL}
                      referrerPolicy="no-referrer"
                      alt="user"
                    />
                  </div>
                </div>

                <ul
                  tabIndex={-1}
                  className="menu menu-sm dropdown-content bg-base-200 rounded-box w-36 p-2 shadow mt-3"
                >
                  <li className="pointer-events-none text-xl mb-2 font-black pl-2">
                    {user.displayName || 'User'}
                  </li>
                  <li className='text-gray-900'>
                    <NavLink to="/dashboard/dhome"><MdDashboard></MdDashboard>Dashboard</NavLink>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="text-primary"><IoLogOut></IoLogOut>Logout</button>
                  </li>
                </ul>
              </div>
              :
              <NavLink to='/login'><button className="btn btn-outline font-black btn-primary">Login</button></NavLink>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;