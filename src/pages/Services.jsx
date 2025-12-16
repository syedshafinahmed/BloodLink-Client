import React from "react";
import { FaTint, FaHospital, FaUserShield, FaHandsHelping } from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "framer-motion";

const services = [
  {
    title: "Blood Donation",
    description:
      "Register as a donor and help save lives by donating blood safely and responsibly through verified requests.",
    icon: <FaTint size={30} />,
  },
  {
    title: "Emergency Blood Requests",
    description:
      "Post urgent blood requests and instantly connect with nearby donors during critical situations.",
    icon: <FaHospital size={30} />,
  },
  {
    title: "Verified Donor Network",
    description:
      "All donors are verified to ensure trust, safety, and reliable blood matching when it matters most.",
    icon: <FaUserShield size={30} />,
  },
  {
    title: "Community Support",
    description:
      "BloodLink connects donors, recipients, and volunteers to build a strong, life-saving community.",
    icon: <FaHandsHelping size={30} />,
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Services = () => {
  return (
    <section className="mt-20 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-black text-gray-900">
            Our <span className="text-primary">Services</span>
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            BloodLink is dedicated to making blood donation and emergency
            access faster, safer, and more reliable for everyone.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -8 }}
              className="group bg-base-200 rounded-2xl p-8 shadow-2xl border border-red-200 hover:shadow-3xl transition duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="w-20 h-20 flex items-center justify-center rounded-xl bg-red-50 text-primary text-2xl mb-6 group-hover:bg-red-600 group-hover:text-base-200 transition"
              >
                {service.icon}
              </motion.div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm text-justify leading-5">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: false }}
          className="mt-20 bg-primary rounded-xl px-10 py-20 text-center text-base-200"
        >
          <h2 className="text-3xl font-bold mb-4">
            Together, We Save Lives
          </h2>
          <p className="max-w-2xl mx-auto mb-6 text-red-100">
            Join BloodLink today and become part of a trusted platform that
            connects donors and patients when every second counts.
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/register"
              className="bg-base-200 text-primary font-bold px-8 py-3 rounded-xl shadow-xl hover:bg-red-50 transition inline-block"
            >
              Become a Donor
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
