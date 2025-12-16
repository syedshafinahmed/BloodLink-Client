import React from "react";
import { motion } from "framer-motion";
import { FaHeart, FaShieldAlt } from "react-icons/fa";
import { RiCommunityFill } from "react-icons/ri";

const features = [
  {
    title: "Our Mission",
    description:
      "To ensure no life is lost due to the unavailability of blood by creating a fast, reliable, and transparent donation network.",
    icon: <FaHeart size={30} />,
  },
  {
    title: "Our Community",
    description:
      "BloodLink connects donors, patients, hospitals, and volunteers into one trusted life-saving ecosystem.",
    icon: <RiCommunityFill size={30} />,
  },
  {
    title: "Trust & Safety",
    description:
      "We verify donors and requests to maintain safety, authenticity, and confidence across the platform.",
    icon: <FaShieldAlt size={30} />,
  },
];

const AboutUs = () => {
  return (
    <section className="mt-20 py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl font-black text-gray-900">
            About <span className="text-primary">BloodLink</span>
          </h1>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            BloodLink is a technology-driven platform dedicated to bridging the
            gap between blood donors and those in urgent need — quickly,
            safely, and reliably.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Saving Lives Through Technology
            </h2>
            <p className="text-gray-600 leading-7 mb-4 text-justify">
              Blood shortages during emergencies remain a critical challenge.
              BloodLink was created to solve this by enabling instant access to
              verified donors and real-time blood requests.
            </p>
            <p className="text-gray-600 leading-7 text-justify">
              By leveraging modern technology and a strong community network,
              we aim to make blood donation more accessible, transparent, and
              impactful across Bangladesh.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              show: { transition: { staggerChildren: 0.15 } },
            }}
            className="space-y-6"
          >
            {features.map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6 },
                  },
                }}
                whileHover={{ y: -5 }}
                className="group flex gap-5 bg-base-200 p-6 rounded-2xl shadow-2xl border border-red-200"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className="w-30 h-20 flex items-center justify-center rounded-xl bg-red-50 text-primary group-hover:bg-red-600 group-hover:text-base-200 transition"
                >
                  {item.icon}
                </motion.div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-6">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-24 bg-primary rounded-3xl px-10 py-16 text-center text-base-200"
        >
          <h2 className="text-3xl font-bold mb-4">
            Every Drop Counts
          </h2>
          <p className="max-w-3xl mx-auto text-red-100">
            BloodLink is more than a platform — it’s a movement driven by
            compassion, responsibility, and the belief that saving lives should
            be just one connection away.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
