import { motion } from "framer-motion";
import { Search, UserCheck, Droplets, Bell } from "lucide-react";

const steps = [
  {
    title: "Search or Request",
    desc: "Find donors by blood group and location or create an emergency request.",
    icon: Search,
  },
  {
    title: "Verified Donors",
    desc: "Only verified donor profiles are shown to ensure safety and trust.",
    icon: UserCheck,
  },
  {
    title: "Instant Notification",
    desc: "Nearby donors get notified instantly for faster response.",
    icon: Bell,
  },
  {
    title: "Save Lives",
    desc: "Coordinate directly and help save lives when it matters most.",
    icon: Droplets,
  },
];

export default function HowItWorks() {
  const lineVariants = {
    hidden: { pathLength: 0 },
    visible: (i) => ({
      pathLength: 1,
      transition: { duration: 0.8, delay: i * 0.3, ease: "easeInOut" },
    }),
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 15 },
    },
  };

  return (
    <section className="py-28 relative px-15">
      <div className="relative max-w-7xl mx-auto px-6 md:px-0">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#f9232c]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f9232c]/5 rounded-full blur-3xl" />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20 relative z-10"
        >
          <span className="inline-flex w-fit items-center px-4 py-1.5 rounded-full bg-[#f9232c]/10 font-extrabold uppercase tracking-[0.3em] border border-[#f9232c]/30 shadow-sm text-[#f9232c] text-xs mb-2">
            Simple Process
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-black text-base-content">
            How <span className="text-[#f9232c]">BloodLink</span> Works
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-base-content/70">
            A clear, transparent workflow that connects donors and recipients quickly, safely, and reliably.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative z-10 grid md:grid-cols-4 gap-10 items-center">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                className="group relative rounded-2xl p-7 bg-base-200/70 backdrop-blur-xl border border-base-content/10 shadow-xl hover:-translate-y-1 hover:scale-105 transition-all duration-300"
              >
                {/* Step number */}
                <span className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#f9232c] text-white text-sm font-black flex items-center justify-center shadow-lg">
                  {i + 1}
                </span>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-[#f9232c]/10 flex items-center justify-center mb-6 group-hover:bg-[#f9232c]/20 transition">
                  <Icon className="w-8 h-8 text-[#f9232c]" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-base-content">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-base-content/70">{step.desc}</p>

                {/* Hover accent */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-[#f9232c]/30 transition" />

                {/* Connector Line */}
                {i < steps.length - 1 && (
                  <svg
                    className="hidden md:block absolute top-1/2 -right-24 w-24 h-0.5"
                    viewBox="0 0 100 1"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.line
                      x1="0"
                      y1="0.5"
                      x2="100"
                      y2="0.5"
                      stroke="#f9232c"
                      strokeWidth="2"
                      custom={i}
                      variants={lineVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false, amount: 0.5 }}
                    />
                  </svg>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
