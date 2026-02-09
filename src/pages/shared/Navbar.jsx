import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import logo from '../../assets/BloodLink.png'
import useAuth from '../../hooks/useAuth';
import { MdDashboard } from 'react-icons/md';
import { IoLogOut } from 'react-icons/io5';
import Switch from '../../toggle/Switch';

const Navbar = () => {
  const { user, logOut } = useAuth();

  const [blur, setBlur] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const triggerPoint = window.innerHeight * 0.05;
      setBlur(window.scrollY >= triggerPoint);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [theme, setTheme] = useState(localStorage.getItem('theme') || "light");
  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  useEffect(() => {
    const html = document.querySelector('html');
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogout = () => {
    logOut().then().catch();
  };

  const links = (
    <>
      <li><NavLink className="text-[#f9232c] mr-0 md:mr-3 text-xs md:text-sm font-bold" to="/">Home</NavLink></li>
      <li><NavLink className="text-[#f9232c] mr-0 md:mr-3 text-xs md:text-sm font-bold" to="/about-us">About Us</NavLink></li>
      <li><NavLink className="text-[#f9232c] mr-0 md:mr-3 text-xs md:text-sm font-bold" to="/services">Services</NavLink></li>
      <li><NavLink className="text-[#f9232c] mr-0 md:mr-3 text-xs md:text-sm font-bold" to="/donors">Donors</NavLink></li>
      <li><NavLink className="text-[#f9232c] mr-0 md:mr-3 text-xs md:text-sm font-bold" to="/donation-requests">Donation Requests</NavLink></li>
      <li><NavLink className="text-[#f9232c] mr-0 md:mr-3 text-xs md:text-sm font-bold" to="/fundings">Funding</NavLink></li>
      {user && (
        <li>
          <NavLink className="text-[#f9232c] text-sm font-bold" to="/dashboard/dhome">
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div
      className={`w-full fixed top-0 z-50 transition-all duration-300
      ${blur ? 'backdrop-blur-xl bg-base-100/10 shadow-sm' : 'bg-transparent'}`}
    >
      <div className='max-w-7xl mx-auto'>
        <div className="navbar">

          {/* START */}
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-base-content">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-200 text-base-content rounded-box z-1 mt-3 w-40 p-2 shadow">
                {links}
              </ul>
            </div>
            <img className='w-15' src={logo} alt="" />
          </div>

          {/* CENTER */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {links}
            </ul>
          </div>

          {/* END */}
          <div className="navbar-end gap-5">
            <Switch theme={theme} handleTheme={handleTheme} />

            {user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded border border-[#f9232c]">
                    <img
                      src={user.photoURL}
                      referrerPolicy="no-referrer"
                      alt="user"
                    />
                  </div>
                </div>

                <ul
                  tabIndex={-1}
                  className="menu menu-sm dropdown-content bg-base-200 text-base-content rounded-box w-36 p-2 shadow mt-3"
                >
                  <li className="pointer-events-none text-lg mb-2 font-bold pl-2">
                    {user.displayName || 'User'}
                  </li>
                  <li>
                    <NavLink to="/dashboard/dhome">
                      <MdDashboard /> Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="text-error">
                      <IoLogOut /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <NavLink to='/login'>
                <button className="btn bg-[#f9232c] text-base-200 border-none btn-sm font-bold">
                  Login
                </button>
              </NavLink>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
