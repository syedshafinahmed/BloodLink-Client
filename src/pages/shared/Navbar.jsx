import React from 'react';
import { NavLink } from 'react-router';
import logo from '../../assets/BloodLink.png'
const Navbar = () => {
  const links =
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/donation-request">Donation Requests</NavLink></li>
      <li><NavLink to="/funding">Funding</NavLink></li>
    </>
  return (
    <div className='w-full sticky top-0 z-50 backdrop-blur-xl bg-white/40 shadow-sm'>
      <div className='max-w-7xl mx-auto'>
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow">
                {links}
              </ul>
            </div>
            <img className='w-20' src={logo} alt="" />
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {links}
            </ul>
          </div>
          <div className="navbar-end">
            <a className="btn btn-outline btn-primary">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;