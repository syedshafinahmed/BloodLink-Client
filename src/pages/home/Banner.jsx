import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from "framer-motion";
import banner from '../../assets/banner.jpg'
const Banner = () => {
  const navigate = useNavigate();
  return (
    <section className="relative w-full h-[70vh] overflow-hidden mt-2">
      <img
        src={banner}
        alt="Blood Donation"
        className="absolute inset-0 w-full h-full object-cover brightness-50"
      />

      <div className="absolute inset-0 bg-linear-to-r from-black/90 to-[#f9232c]/20" />

      <div className="relative z-10 h-full flex flex-col justify-center items-start px-10 md:px-20">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-base-200 max-w-2xl leading-tight"
        >
          Saving Lives Made Simple
          <span className="text-[#f9232c]"><br /> — Join or Find Donors Instantly</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-base-200 mt-4 text-lg max-w-xl"
        >
          BloodLink connects donors and recipients fast, reliably, and securely.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-8 flex gap-4"
        >
          <button
            onClick={() => navigate("/register")}
            className="btn btn-primary px-6 py-7 text-base-200 font-semibold text-lg rounded-lg shadow-xl backdrop-blur-lg transition-all hover:scale-105"
          >
            Join as a Donor
          </button>

          <button
            onClick={() => navigate("/search")}
            className="btn btn-outline px-6 py-7 text-base-200 font-semibold text-lg rounded-lg transition-all hover:scale-105 hover:bg-transparent hover:border-[#f9232c] hover:text-[#f9232c] shadow-none"
          >
            Search Donors
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;