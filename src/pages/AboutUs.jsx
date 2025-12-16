import React from "react";
import { motion } from "framer-motion";
import img1 from '../assets/1.jpg';
import img2 from '../assets/2.avif';
import img3 from '../assets/3.avif';
import img4 from '../assets/4.avif';

const slideFrom = (direction) => ({
  hidden: { opacity: 0, x: direction === "left" ? -80 : 80 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
});

const AboutUs = () => {
  return (
    <section className="mt-20 py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-black text-gray-900">
            About <span className="text-primary">BloodLink</span>
          </h1>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            A technology-driven platform connecting blood donors and patients
            quickly, safely, and reliably.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div className="overflow-hidden rounded-xl shadow-2xl h-[360px] w-full">
            <motion.img
              src={img3}
              alt="Blood donation"
              variants={slideFrom("left")}
              initial="hidden"
              whileInView="show"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false }}
              className="h-full w-full object-cover"
            />
          </motion.div>

          <motion.div
            variants={slideFrom("right")}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
              Saving Lives Through Technology
            </h2>
            <p className="text-gray-600 leading-7 mb-4 text-justify">
              Blood shortages during emergencies remain a serious challenge.
              BloodLink removes delays by instantly connecting verified donors
              with patients in urgent need.
            </p>
            <p className="text-gray-600 leading-7 text-justify">
              Our platform transforms compassion into immediate, life-saving
              action.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            variants={slideFrom("left")}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
              A Trusted Donor Network
            </h2>
            <p className="text-gray-600 leading-7 mb-4 text-justify">
              Every donor and request on BloodLink is verified to maintain trust,
              safety, and authenticity across the platform.
            </p>
            <p className="text-gray-600 leading-7 text-justify">
              Reliability and transparency are at the core of everything we do.
            </p>
          </motion.div>

          <motion.div className="overflow-hidden rounded-xl shadow-2xl h-[360px] w-full">
            <motion.img
              src={img4}
              alt="Verified donors"
              variants={slideFrom("right")}
              initial="hidden"
              whileInView="show"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false }}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-32"
        >
          {[ 
            { label: "Registered Donors", value: "12,000+" },
            { label: "Successful Donations", value: "8,500+" },
            { label: "Emergency Requests Fulfilled", value: "6,200+" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-base-200 rounded-2xl p-8 text-center shadow-2xl border border-red-200"
            >
              <h3 className="text-4xl font-black text-primary mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div className="overflow-hidden rounded-xl shadow-2xl h-[360px] w-full">
            <motion.img
              src={img1}
              alt="Community support"
              variants={slideFrom("left")}
              initial="hidden"
              whileInView="show"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false }}
              className="h-full w-full object-cover"
            />
          </motion.div>

          <motion.div
            variants={slideFrom("right")}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
              Community Driven Impact
            </h2>
            <p className="text-gray-600 leading-7 mb-4 text-justify">
              BloodLink is powered by volunteers, donors, and healthcare
              providers working together to save lives.
            </p>
            <p className="text-gray-600 leading-7 text-justify">
              Community participation is the strongest force behind sustainable
              impact.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={slideFrom("left")}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
              Building a Safer Tomorrow
            </h2>
            <p className="text-gray-600 leading-7 mb-4 text-justify">
              By combining technology, trust, and compassion, BloodLink is
              shaping a future where access to blood is never a barrier.
            </p>
            <p className="text-gray-600 leading-7 text-justify">
              Every connection made through BloodLink brings hope to someone in
              need.
            </p>
          </motion.div>

          <motion.div className="overflow-hidden rounded-xl shadow-2xl h-[360px] w-full">
            <motion.img
              src={img2}
              alt="Future healthcare"
              variants={slideFrom("right")}
              initial="hidden"
              whileInView="show"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false }}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
