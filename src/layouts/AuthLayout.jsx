import React from 'react';
import { Outlet } from 'react-router';
import auth from '../assets/auth.jpg';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        <div className="relative flex items-center justify-center bg-black/40 h-[300px] md:h-[571px]">
          <img src={auth} alt="Blood Donation" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-br from-black/90 via-black/50 to-[#f9232c]/80"></div>
        </div>
        <div className="flex items-center justify-center bg-base-200/10 backdrop-blur-2xl border border-base-200/20">
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
