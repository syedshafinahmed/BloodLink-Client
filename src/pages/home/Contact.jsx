import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { FiClock } from "react-icons/fi";

const socials = [
  {
    name: "Facebook",
    icon: <TiSocialFacebook size={24} />,
    link: "https://www.facebook.com/share/1D5Tt4jQW8/",
  },
  {
    name: "Instagram",
    icon: <FaInstagram size={22} />,
    link: "https://www.instagram.com/__shafin__ahmed",
  },
  {
    name: "WhatsApp",
    icon: <FaWhatsapp size={22} />,
    link: "https://wa.me/+8801630216932",
  },
];

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send("_shafin_ahmed", "template_ganv7yr", formData, "grJOfmcREmwlm0GQl")
      .then(() => {
        setLoading(false);
        setFormData({ name: "", email: "", message: "" });
        toast.success("Message sent successfully", {
          position: "bottom-right",
          autoClose: 2000,
          theme: "colored",
        });
      })
      .catch(() => {
        setLoading(false);
        setShake(true);
        setTimeout(() => setShake(false), 500);
        toast.error("Failed to send message", {
          position: "bottom-right",
          autoClose: 2000,
          theme: "colored",
        });
      });
  };

  return (
    <section id="connect" className="relative py-24 px-6">
      <ToastContainer />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#f9232c]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f9232c]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-black text-base-content">
            Contact <span className="text-[#f9232c]">BloodLink</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base-content/70">
            Reach out to support life-saving donations and community impact.
          </p>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-14 items-stretch">
          {/* LEFT CARD */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="
              relative h-full rounded-2xl p-8
              bg-base-200/70 backdrop-blur-xl
              border border-base-content/10
              shadow-xl
              flex flex-col justify-between
              overflow-hidden
            "
          >
            {/* Accent strip */}
            <div className="absolute left-0 top-0 h-full w-1 bg-linear-to-b from-[#f9232c]/60 via-[#f9232c]/20 to-transparent" />

            {/* Soft inner glow */}
            <div className="absolute inset-0 bg-linear-to-br from-[#f9232c]/5 via-transparent to-transparent pointer-events-none" />

            <div className="relative space-y-5">
              <span className="inline-flex w-fit px-4 py-1.5 rounded-full bg-[#f9232c]/10 text-[#f9232c] text-xs font-extrabold uppercase tracking-[0.3em] mb-4">
                Get In Touch
              </span>

              <div>
                <h3 className="text-3xl font-black text-base-content mb-4 leading-tight">
                  Make Someone’s Life Better
                </h3>
                <p className="text-sm leading-6 text-justify text-base-content/80">
                  Your donation can save a life and give someone a chance to recover.
                  Every contribution brings hope to patients and their families during
                  critical times. By reaching out, you become part of a meaningful and
                  life-saving mission.
                </p>
              </div>

              <div>
                <p className="text-[#f9232c] font-black text-xl mb-1">
                  Opening Hours
                </p>
                <div className="flex items-center gap-2 text-sm text-base-content">
                  <FiClock className="text-[#f9232c]" />
                  Sunday – Saturday · 00:00 – 23:59
                </div>
              </div>
            </div>

            <div className="relative flex gap-4">
              {socials.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="
                    w-12 h-12 flex items-center justify-center
                    rounded-full border border-[#f9232c]/40
                    text-[#f9232c]
                    hover:bg-[#f9232c] hover:text-white
                    transition-all shadow-sm
                  "
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* DIVIDER */}
          <div className="hidden md:flex items-center">
            <div className="w-px h-full bg-linear-to-b from-transparent via-[#f9232c]/40 to-transparent" />
          </div>

          {/* RIGHT CARD (UNCHANGED) */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`
              h-full rounded-2xl p-8
              bg-base-200/70 backdrop-blur-xl
              border border-base-content/10
              shadow-xl
              flex flex-col justify-between
              ${shake ? "animate-[shake_0.4s_ease-in-out]" : ""}
            `}
          >
            <div className="space-y-5">
              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                onChange={handleChange}
                value={formData.name}
                className="w-full rounded-xl px-4 py-3 bg-base-100 text-base-content border border-base-content/20 focus:ring-2 focus:ring-[#f9232c] outline-none"
              />

              <input
                type="email"
                name="email"
                required
                placeholder="Your Email"
                onChange={handleChange}
                value={formData.email}
                className="w-full rounded-xl px-4 py-3 bg-base-100 text-base-content border border-base-content/20 focus:ring-2 focus:ring-[#f9232c] outline-none"
              />

              <textarea
                name="message"
                rows={3}
                required
                placeholder="Your Message"
                onChange={handleChange}
                value={formData.message}
                className="w-full rounded-xl px-4 py-3 bg-base-100 text-base-content border border-base-content/20 focus:ring-2 focus:ring-[#f9232c] outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                mt-6 w-full py-3 rounded-xl
                bg-[#f9232c] text-white font-bold
                hover:bg-[#d71b1b]
                transition-all shadow-md
                disabled:opacity-70
              "
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Send Message"
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
