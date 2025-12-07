import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

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
    <section id="connect" className="pb-40 px-6 max-w-7xl mx-auto">
      <ToastContainer />

      <motion.h2
        className="text-4xl font-bold text-center text-primary mb-16"
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
        <motion.div
          className="flex flex-col items-center gap-8 text-center md:text-left"
          variants={itemVariants}
        >
          <p className="text-black text-2xl font-black text-center max-w-sm">
            Get in Touch — We’re Here to Help You Save Lives.
          </p>

          <div className="flex gap-4">
            {socials.map((item, i) => (
              <motion.a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-primary text-primary hover:bg-primary hover:text-base-200 transition-all duration-200 shadow-sm"
                whileHover={{ scale: 1.1 }}
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className={`backdrop-blur-xl bg-white/10 p-8 rounded-xl flex flex-col gap-5 shadow-lg transition-all duration-300 ${
            shake ? "animate-[shake_0.4s_ease-in-out]" : ""
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
            className="border border-primary rounded-lg px-4 py-2 w-full bg-transparent placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            variants={itemVariants}
          />

          <motion.input
            type="email"
            name="email"
            required
            placeholder="Your Email"
            onChange={handleChange}
            value={formData.email}
            className="border border-primary rounded-lg px-4 py-2 w-full bg-transparent placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            variants={itemVariants}
          />

          <motion.textarea
            name="message"
            rows={5}
            required
            placeholder="Your Message"
            onChange={handleChange}
            value={formData.message}
            className="border border-primary rounded-lg px-4 py-2 w-full bg-transparent placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
            variants={itemVariants}
          ></motion.textarea>

          <motion.button
            type="submit"
            disabled={loading}
            className="bg-primary text-white rounded-lg py-2 w-full hover:bg-[#d71b1b] transition-all shadow-md hover:shadow-lg"
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
