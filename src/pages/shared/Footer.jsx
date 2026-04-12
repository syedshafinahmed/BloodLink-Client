import React from "react";
import logo from "../../assets/BloodLink.png";
import { NavLink } from "react-router";
import { FaCaretRight, FaGithub, FaGlobe, FaLinkedin } from "react-icons/fa";
import { PiPhoneCallFill } from "react-icons/pi";
import { IoMdMail } from "react-icons/io";
import { FaMapLocationDot } from "react-icons/fa6";
import locationimage from "../../assets/location.png";

const Footer = () => {
  return (
    <footer className="w-full border-t border-[#f9232c]/60 bg-base-200 text-base-content">
      <div className="relative max-w-7xl mx-auto px-6 md:px-0">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#f9232c]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f9232c]/5 rounded-full blur-3xl" />
        </div>
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-14">
          {/* BRAND */}
          <div className="flex flex-col items-start">
            <img src={logo} className="w-20 mb-4" alt="BloodLink Logo" />
            <p className="text-sm leading-relaxed text-justify text-base-content/70">
              BloodLink connects blood donors with recipients in need, ensuring
              fast access to verified donors and making the donation process
              simple, safe, and dependable.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="font-black text-[#f9232c] text-xl mb-4">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: "/", label: "Home" },
                { to: "/about-us", label: "About Us" },
                { to: "/services", label: "Services" },
                { to: "/donation-requests", label: "Donation Requests" },
                { to: "/fundings", label: "Funding" },
              ].map((item, i) => (
                <NavLink
                  key={i}
                  to={item.to}
                  className="flex items-center gap-2 text-base-content/70 hover:text-[#f9232c] transition"
                >
                  <FaCaretRight className="text-[#f9232c]" />
                  {item.label}
                </NavLink>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="font-black text-[#f9232c] text-xl mb-4">
              Support
            </h3>
            <ul className="space-y-3 text-sm text-base-content/70">
              <li className="flex items-center gap-3">
                <PiPhoneCallFill className="text-[#f9232c]" size={20} />
                +8801630216932
              </li>
              <li className="flex items-center gap-3">
                <IoMdMail className="text-[#f9232c]" size={20} />
                shafinahmed.cse@gmail.com
              </li>
              <li className="relative flex items-center gap-3 group cursor-pointer">
                <FaMapLocationDot className="text-[#f9232c]" size={20} />
                Mirpur, Dhaka

                {/* IMAGE POPUP */}
                <img
                  src={locationimage}
                  alt="location"
                  className="
                  absolute left-10 bottom-10
                  w-40 h-56
                  object-cover
                  rounded-lg shadow-lg
                  opacity-0 scale-95 translate-y-2
                  group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0
                  transition-all duration-300 pointer-events-none
                  z-50
                "
                />
              </li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div className="relative p-px rounded-xl bg-linear-to-r from-[#f9232c]/40 to-transparent">
            <div className="rounded-xl bg-base-200/80 backdrop-blur-md p-5 space-y-8.5">

              {/* HEADER */}
              <div>
                <h3 className="font-black text-[#f9232c] text-xl mb-2">
                  Newsletter
                </h3>
                <p className="text-xs text-base-content/70">
                  Subscribe to receive updates and platform news.
                </p>
              </div>

              {/* INPUT + BUTTON */}
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="
                    w-full px-4 py-2 rounded-lg
                    bg-base-100 text-base-content
                    border border-base-content/20
                    focus:outline-none focus:ring-2 focus:ring-[#f9232c]
                  "
                />

                <button
                  className="
                    px-4 py-2 rounded-lg
                    bg-[#f9232c] text-white font-semibold
                    hover:bg-[#d71b1b]
                    transition
                  "
                >
                  Subscribe
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-linear-to-r from-transparent via-[#f9232c]/40 to-transparent" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-6">
          <p className="text-xs md:text-sm text-base-content/70">
            © {new Date().getFullYear()}{" "}
            <strong className="text-[#f9232c]">BloodLink</strong> — All Rights
            Reserved
          </p>

          <div className="flex gap-5 text-base-content/70">
            <a
              href="https://github.com/syedshafinahmed"
              className="hover:text-[#f9232c] hover:scale-110 transition"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/syed-shafin-ahmed/"
              className="hover:text-[#f9232c] hover:scale-110 transition"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://syedshafinahmed.pages.dev/"
              className="hover:text-[#f9232c] hover:scale-110 transition"
            >
              <FaGlobe size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;