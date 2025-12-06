import React from 'react';
import logo from '../../assets/BloodLink.png'
import { NavLink } from 'react-router';
import { FaCaretRight, FaGithub, FaGlobe, FaLinkedin } from 'react-icons/fa';
import { PiPhoneCallFill } from 'react-icons/pi';
import { IoMdMail } from 'react-icons/io';
import { FaMapLocationDot } from 'react-icons/fa6';
const Footer = () => {
  return (
    <div className='w-full border-t-2 border-primary'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-7 py-5 items-center'>
          <div className='flex flex-row md:flex-col items-center md:items-start'>
            <img src={logo} className='w-32' alt="" />
            <p className='text-justify px-4 text-base md:text-xs mt-4'>BloodLink connects blood donors with recipients in need. It ensures fast access to verified donors, making the donation process simple and dependable.</p>
          </div>
          <div className='px-5 md:px-0'>
            <h1 className='font-black text-primary text-2xl pb-2'>Quick Links</h1>
            <ul className='space-y-2 flex flex-col'>
              <NavLink className='flex items-center hover:text-primary hover:font-semibold' to="/"><FaCaretRight color='#f9232c'></FaCaretRight> Home</NavLink>
              <NavLink className='flex items-center hover:text-primary hover:font-semibold' to="/donation-request"><FaCaretRight color='#f9232c'></FaCaretRight> Donation Requests</NavLink>
              <NavLink className='flex items-center hover:text-primary hover:font-semibold' to="/funding"><FaCaretRight color='#f9232c'></FaCaretRight> Funding</NavLink>
            </ul>
          </div>
          <div className='px-5 md:px-0'>
            <h1 className='font-black text-primary text-2xl pb-2'>Contact Us</h1>
            <ul className='flex flex-col space-y-2'>
              <span className='flex items-center gap-2'><PiPhoneCallFill size={25} color='#f9232c' /> +8801630216932</span>
              <span className='flex items-center gap-2'><IoMdMail size={25} color='#f9232c' /> shafinahmed.cse@gmail.com</span>
              <span className='flex items-center gap-2'><FaMapLocationDot size={25} color='#f9232c' /> Mirpur, Dhaka</span>
            </ul>
          </div>
          <div className='px-5 md:px-0'>
            <h1 className='font-black text-primary text-2xl pb-2'>NewsLetter</h1>
            <p className='text-xs pb-2'>Subscribe to Our Newsletter to receive the newest updates and info.</p>
            <div className='flex items-center px-1'>
              <input type="email" placeholder='  Email' className='py-1 rounded-sm outline outline-primary' />
              <button className='btn btn-primary btn-sm'>Subscribe</button>
            </div>
          </div>
        </div>
        <hr className='text-primary' />
        <div className='flex justify-between px-5 py-5'>
          <p className='text-sm'>&copy; 2025 <strong>BloodLink</strong> — All Rights Reserved</p>
          <div className='flex gap-4'>
            <a href="https://github.com/syedshafinahmed" className="hover:scale-110 hover:text-[#f9232c] transition-transform duration-200">
              <FaGithub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/syed-shafin-ahmed/" className="hover:scale-110 hover:text-[#f9232c] transition-transform duration-200">
              <FaLinkedin size={20} />
            </a>
            <a href="https://syedshafinahmed.pages.dev/" className="hover:scale-110 hover:text-[#f9232c] transition-transform duration-200">
              <FaGlobe size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;