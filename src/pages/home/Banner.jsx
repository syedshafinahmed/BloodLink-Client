import React from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import banner from "../../assets/banner.jpg";
import useAuth from "../../hooks/useAuth";

const Banner = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Dark base overlay */}
      <div className="absolute inset-0 bg-black/90" />

      {/* Gradient accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(249,35,44,0.45),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.08),transparent_50%)]" />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[40px_40px]" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto w-full px-10 md:px-0 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            <span className="uppercase tracking-[0.3em] text-sm text-[#f9232c] mb-5">
              BloodLink Platform
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-base-200 leading-[1.1]">
              A Smarter Way
              <span className="block text-[#f9232c] mt-3">To Save Lives</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-base-200/80 max-w-xl leading-relaxed">
              A centralized blood donation ecosystem designed to connect donors,
              recipients, and organizations with speed, trust, and transparency.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">
              <button
                onClick={() => navigate("/register")}
                disabled={!!user}
                className={`relative group px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300
                  ${user
                    ? "bg-[#f9232c]/40 text-white/60 cursor-not-allowed"
                    : "bg-[#f9232c] text-white hover:scale-105 hover:shadow-[0_0_40px_rgba(249,35,44,0.5)]"
                  }`}
              >
                Join as a Donor
                <span className="absolute inset-0 rounded-xl border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={() => navigate("/search")}
                className="px-8 py-4 rounded-xl text-lg font-semibold
                  border border-white/30 text-base-200
                  hover:border-[#f9232c]
                  hover:text-[#f9232c]
                  hover:scale-105
                  transition-all duration-300"
              >
                Search Donors
              </button>
            </div>
          </motion.div>

          {/* Right Side – Single Image with Animated Conic Border */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-[300px] sm:w-[360px] md:w-[600px] h-[340px] sm:h-[420px] md:h-[460px]">

              {/* Spinning conic border */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 rounded-3xl conic-spin"></div>
              </div>

              {/* Glassmorphic image card */}
              <div className="absolute inset-1 rounded-3xl overflow-hidden border border-white/10 shadow-2xl backdrop-blur-xl bg-white/5">
                <img
                  src={banner}
                  alt="Blood Donation"
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>

              {/* Floating Stats */}
              <div className="absolute bottom-4 left-30 sm:-bottom-5 sm:-left-20 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-3 sm:p-4 shadow-2xl w-44 sm:w-52">
                <h3 className="text-base-200 font-bold text-lg">Live Impact</h3>
                <p className="text-sm text-base-200/70 mt-1 sm:mt-2">
                  Connecting donors and recipients in real time during critical moments.
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
