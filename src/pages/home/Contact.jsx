import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { FaClock } from "react-icons/fa6";
import { FiClock } from "react-icons/fi";

const socials = [
  {
    name: "Facebook",
    icon: <TiSocialFacebook size={25} />,
    link: "https://www.facebook.com/share/1D5Tt4jQW8/",
  },
  {
    name: "Instagram",
    icon: <FaInstagram size={25} />,
    link: "https://www.instagram.com/__shafin__ahmed?igsh=mta0agj0odbqawv2yq==",
  },
  {
    name: "WhatsApp",
    icon: <FaWhatsapp size={25} />,
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

        toast.success("Message Sent!", {
          position: "bottom-right",
          autoClose: 2000,
          theme: "colored",
        });
      })
      .catch(() => {
        setLoading(false);
        setShake(true);
        setTimeout(() => setShake(false), 600);
        toast.error("Failed to send message.", { position: "bottom-right", autoClose: 2000, theme: "colored" });
      });
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="connect" className="pb-20 px-6 md:px-0 max-w-7xl mx-auto">
      <ToastContainer />

      <motion.h2
        className="text-2xl md:text-4xl font-bold text-center text-[#f9232c] mb-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
        }}
      >
        Contact Us
      </motion.h2>

      <motion.div
        className="grid md:grid-cols-2 gap-12 items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <motion.div className="flex flex-col gap-8" variants={itemVariants}>
          <div className="text-right">
            <p className="text-gray-900 mb-5 text-3xl font-black text-left">Make Someone’s Life Better</p>
            <p className="text-xs text-justify pr-5 text-gray-900">Your donation can save a life and give someone a chance to recover. Every contribution brings hope to patients and their families during critical times. By reaching out, you become part of a meaningful and life-saving mission. A small step from you can create a lasting impact for someone in need. Contact us today and help make a difference when it matters most.</p>
          </div>
          <div className="text-left">
            <p className="text-[#f9232c] text-xl font-black">Opening Hours</p>
            <div className="font-medium text-sm text-gray-900">
              <p>Sunday - Saturday</p>
              <span className="flex justify-start gap-2 items-center"><FiClock className="text-[#f9232c]" /> 00:00 – 23:59</span>
            </div>
          </div>

          <div className="flex items-center justify-start gap-4">
            {socials.map((item, i) => (
              <motion.a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-[#f9232c] text-[#f9232c] hover:bg-[#f9232c] hover:text-base-200 transition-all duration-200 shadow-sm"
                whileHover={{ scale: 1.1 }}
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className={`backdrop-blur-xl bg-white/10 p-8 rounded-xl flex flex-col gap-5 shadow-lg transition-all duration-300 ${shake ? "animate-[shake_0.4s_ease-in-out]" : ""
            }`}
          variants={itemVariants}
        >
          <motion.input
            type="text"
            name="name"
            required
            placeholder="Your Name"
            onChange={handleChange}
            value={formData.name}
            className="border border-[#f9232c] rounded-lg px-4 py-2 w-full bg-transparent placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f9232c] transition-all"
            variants={itemVariants}
          />

          <motion.input
            type="email"
            name="email"
            required
            placeholder="Your Email"
            onChange={handleChange}
            value={formData.email}
            className="border border-[#f9232c] rounded-lg px-4 py-2 w-full bg-transparent placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f9232c] transition-all"
            variants={itemVariants}
          />

          <motion.textarea
            name="message"
            rows={5}
            required
            placeholder="Your Message"
            onChange={handleChange}
            value={formData.message}
            className="border border-[#f9232c] rounded-lg px-4 py-2 w-full bg-transparent placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f9232c] transition-all resize-none"
            variants={itemVariants}
          ></motion.textarea>

          <motion.button
            type="submit"
            disabled={loading}
            className="bg-[#f9232c] text-white rounded-lg py-2 w-full hover:bg-[#d71b1b] transition-all shadow-md hover:shadow-lg"
            variants={itemVariants}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Send Message"
            )}
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  );
}
