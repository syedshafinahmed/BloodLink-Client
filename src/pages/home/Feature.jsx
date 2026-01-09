import { motion } from "framer-motion";
import { Heart, Droplets, Users, MapPin } from "lucide-react";

const features = [
  {
    title: "Find Donors Easily",
    desc: "Search by blood group, district, upazila to locate nearby donors instantly.",
    icon: Users,
  },
  {
    title: "Fast Emergency Response",
    desc: "Create urgent blood requests and notify compatible donors in real time.",
    icon: Droplets,
  },
  {
    title: "Verified Donor Profiles",
    desc: "Every donor is reviewed with detailed history for safety and reliability.",
    icon: Heart,
  },
  {
    title: "Location Based Matching",
    desc: "Smart location-based matching ensures faster blood delivery.",
    icon: MapPin,
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Feature = () => {
  return (
    <section className="relative bg-base-100 py-20">
      {/* Subtle background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#f9232c]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f9232c]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-black text-base-content">
            Why Choose <span className="text-[#f9232c]">BloodLink?</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base-content/70">
            A modern blood donation platform designed for speed, trust, and
            real-world impact.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                variants={item}
                className="
                  group relative rounded-2xl p-6
                  bg-base-200/70 backdrop-blur-xl
                  border border-base-content/10
                  shadow-xl hover:shadow-2xl
                  transition-all duration-300
                  hover:-translate-y-1
                "
              >
                {/* Accent border on hover */}
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#f9232c]/40 transition-colors" />

                <div className="relative flex gap-5">
                  {/* Icon */}
                  <div
                    className="
                      flex items-center justify-center
                      w-14 h-14 rounded-xl
                      bg-[#f9232c]/10
                      text-[#f9232c]
                    "
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-bold text-base-content">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-base-content/70">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Feature;
