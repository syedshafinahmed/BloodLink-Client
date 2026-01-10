import React from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import banner from "../../assets/banner.jpg";
import useAuth from "../../hooks/useAuth";
import CountUp from "react-countup";

const Banner = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section className="relative h-screen overflow-hidden bg-base-100 pt-15">

      {/* Dark overlay — dark mode ONLY */}
      <div className="absolute inset-0 hidden dark:block bg-black/80" />

      {/* Gradient accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_90%,rgba(249,35,44,0.45),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(255,255,255,0.1),transparent_55%)]" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-50 bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-size-[40px_40px]" />


      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto w-full px-10 md:px-0 grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col justify-center"
          >
            <span
              className="inline-flex w-fit items-center px-4 py-1.5 rounded-full bg-[#f9232c]/10 text-[#f9232c] text-xs mb-3 font-extrabold uppercase tracking-[0.3em] border border-[#f9232c]/30 shadow-sm whitespace-nowrap"
            >
              BloodLink Platform
            </span>



            <h1 className="text-4xl font-black text-base-content">
              Saving Lives Made Simple
              <span className="block text-[#f9232c] mt-3">Join or Find Donors Instantly</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-base-content/70 max-w-xl">
              A centralized blood donation ecosystem designed to connect donors,
              recipients, and organizations with speed, trust, and transparency.
            </p>

            <div className="mt-10 flex gap-5">
              <button
                onClick={() => navigate("/register")}
                disabled={!!user}
                className={`px-8 py-4 rounded-xl font-semibold transition-all
                  ${user
                    ? "bg-[#f9232c]/40 text-white/60 cursor-not-allowed"
                    : "bg-[#f9232c] text-white hover:scale-105 hover:shadow-[0_0_40px_rgba(249,35,44,0.5)]"
                  }`}
              >
                Join as a Donor
              </button>

              <button
                onClick={() => navigate("/search")}
                className="px-8 py-4 rounded-xl font-semibold border border-base-content/30 text-base-content
                hover:border-[#f9232c] hover:text-[#f9232c] hover:scale-105 transition-all"
              >
                Search Donors
              </button>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-[600px] h-[460px]">

              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 rounded-3xl conic-spin" />
              </div>

              <div className="absolute inset-1 rounded-3xl overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
                <img
                  src={banner}
                  alt="Blood Donation"
                  className="w-full h-full object-cover rounded-3xl hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="absolute bottom-4 left-30 sm:-bottom-5 sm:-left-20 backdrop-blur-3xl bg-white/10 border border-[#f9232c]/30 rounded-2xl p-3 sm:p-4 shadow-2xl w-44">
                <h3 className="text-gray-900 dark:text-white font-bold text-lg">Lives Saved</h3>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-[#f9232c]">
                    <CountUp end={12500} duration={2.5} separator="," />
                  </span>
                </div>

                <p className="text-xs text-gray-900 dark:text-white mt-1 sm:mt-2">
                  Successfully connected donors and recipients.
                </p>
              </div>


            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Banner;
