import React from 'react';
import { Outlet } from 'react-router';
import auth from '../assets/auth.png';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#f9232c]/15 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        <div className="relative flex items-center justify-center bg-black/40">
          <img src={auth} alt="Blood Donation" className="w-3/4 h-auto object-contain z-10" />
          <div className="absolute inset-0 bg-linear-to-br from-black/70 to-red-700/60"></div>
        </div>
        <div className="flex items-center justify-center bg-white/10 backdrop-blur-2xl border border-white/20">
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
