import React from "react";
import { FaTint, FaHospital, FaUserShield, FaHandsHelping } from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "framer-motion";

const services = [
  {
    title: "Blood Donation",
    description:
      "Register as a donor and help save lives by donating blood safely and responsibly through verified requests.",
    icon: FaTint,
  },
  {
    title: "Emergency Blood Requests",
    description:
      "Post urgent blood requests and instantly connect with nearby donors during critical situations.",
    icon: FaHospital,
  },
  {
    title: "Verified Donor Network",
    description:
      "All donors are verified to ensure trust, safety, and reliable blood matching when it matters most.",
    icon: FaUserShield,
  },
  {
    title: "Community Support",
    description:
      "BloodLink connects donors, recipients, and volunteers to build a strong, life-saving community.",
    icon: FaHandsHelping,
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
    },
  },
};

const Services = () => {
  return (
    <section className="relative py-28 bg-base-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#f9232c]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f9232c]/5 rounded-full blur-3xl" />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative text-center mb-20"
        >
          <span className="inline-flex px-4 py-1.5 rounded-full bg-[#f9232c]/10 text-[#f9232c] text-xs font-extrabold uppercase tracking-[0.3em] border border-[#f9232c]/30">
            What We Offer
          </span>

          <h1 className="mt-6 text-4xl md:text-5xl font-black text-base-content">
            Our <span className="text-[#f9232c]">Services</span>
          </h1>

          <p className="mt-5 max-w-2xl mx-auto text-base-content/70">
            BloodLink is designed to make blood donation and emergency access
            faster, safer, and more reliable—when every second matters.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -10 }}
                className="
                  group relative
                  rounded-2xl p-8
                  bg-base-200/70 backdrop-blur-xl
                  border border-base-content/10
                  shadow-xl
                  transition-all duration-300
                "
              >
                {/* Hover glow */}
                <div className="
                  absolute inset-0 rounded-2xl
                  opacity-0 group-hover:opacity-100
                  bg-linear-to-br from-[#f9232c]/20 via-[#f9232c]/10 to-transparent
                  transition
                " />

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="
                    relative z-10
                    w-16 h-16 mb-6
                    rounded-xl
                    bg-[#f9232c]/10
                    flex items-center justify-center
                    text-[#f9232c]
                    group-hover:bg-[#f9232c]
                    group-hover:text-white
                    transition
                  "
                >
                  <Icon size={28} />
                </motion.div>

                {/* Content */}
                <h3 className="relative z-10 text-xl font-bold text-base-content mb-3">
                  {service.title}
                </h3>

                <p className="relative z-10 text-sm leading-relaxed text-base-content/70">
                  {service.description}
                </p>

                {/* Focus ring */}
                <div className="
                  absolute inset-0 rounded-2xl
                  ring-1 ring-transparent
                  group-hover:ring-[#f9232c]/30
                  transition
                " />
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false }}
          className="
            relative mt-24
            rounded-3xl p-12 md:p-20
            bg-linear-to-br from-[#f9232c] to-[#d71b1b]
            text-white text-center
            shadow-2xl
          "
        >
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Together, We Save Lives
          </h2>

          <p className="max-w-2xl mx-auto mb-8 text-white/90">
            Become part of a trusted platform that connects donors and patients
            when every moment counts.
          </p>

          <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/register"
              className="
                inline-flex items-center justify-center
                bg-base-100 text-[#f9232c]
                font-bold px-10 py-4
                rounded-xl
                shadow-xl
                hover:bg-base-200
                transition
              "
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
