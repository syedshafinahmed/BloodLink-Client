import { motion } from "framer-motion";
import { Users, Droplets, MapPin, HeartHandshake } from "lucide-react";

const stats = [
  { label: "Registered Donors", value: "12,000+", icon: Users },
  { label: "Successful Donations", value: "8,500+", icon: Droplets },
  { label: "Districts Covered", value: "64", icon: MapPin },
  { label: "Lives Saved", value: "9,000+", icon: HeartHandshake },
];

export default function ImpactStats() {
  return (
    <section className="py-24 bg-base-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl bg-base-100 p-8 text-center shadow-xl border border-base-content/10"
              >
                <Icon className="w-8 h-8 mx-auto text-[#f9232c]" />
                <h3 className="text-3xl font-black text-base-content mt-4">
                  {stat.value}
                </h3>
                <p className="text-sm text-base-content/70 mt-1">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
