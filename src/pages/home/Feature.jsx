import { motion } from "framer-motion";
import { div } from "framer-motion/client";
import { Heart, Droplets, Users, MapPin } from "lucide-react";

const features = [
  {
    title: "Find Donors Easily",
    desc: "Search by blood group, district, and upazila to get the closest donors instantly.",
    icon: <Users className="w-8 h-8 text-[#f9232c]" />,
  },
  {
    title: "Fast Emergency Response",
    desc: "Request blood in emergencies and immediately notify potential donors nearby.",
    icon: <Droplets className="w-8 h-8 text-[#f9232c]" />,
  },
  {
    title: "Verified Donor Profiles",
    desc: "Every donor has a detailed profile to ensure authenticity and reliability.",
    icon: <Heart className="w-8 h-8 text-[#f9232c]" />,
  },
  {
    title: "Location Based Matching",
    desc: "BloodLink smartly matches donors by location for faster blood delivery.",
    icon: <MapPin className="w-8 h-8 text-[#f9232c]" />,
  },
];

const Feature = () => {
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className='max-w-7xl mx-auto'>
      <section className="p-10 mt-15 mb-15">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-[#f9232c]">Why Choose BloodLink?</h2>
          <p className="text-gray-600 mt-2">
            We make blood donation and receiving easier, faster, and more reliable.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={item}
              className="p-6 rounded-xl shadow-2xl hover:shadow-3xl
                       bg-base-200 flex gap-4 items-start transition-all"
            >
              <div>{f.icon}</div>
              <div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>

  );
};

export default Feature;
