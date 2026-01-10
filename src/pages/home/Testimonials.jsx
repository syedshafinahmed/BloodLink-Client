import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ayesha Rahman",
    role: "Blood Recipient",
    quote:
      "BloodLink helped us find a donor within minutes during an emergency. It truly saved my brother’s life.",
  },
  {
    name: "Tanvir Ahmed",
    role: "Regular Donor",
    quote:
      "The platform makes donating blood simple and meaningful. I feel proud to be part of this community.",
  },
  {
    name: "Dr. Mahmud Hasan",
    role: "Medical Volunteer",
    quote:
      "A well-structured platform that bridges the gap between donors and patients efficiently.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-base-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-base-content">
            Community <span className="text-[#f9232c]">Voices</span>
          </h2>
          <p className="mt-4 text-base-content/70 max-w-2xl mx-auto">
            Real experiences from people whose lives were impacted by BloodLink.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl bg-base-200 p-6 shadow-xl border border-base-content/10"
            >
              <Quote className="w-6 h-6 text-[#f9232c]" />
              <p className="text-sm text-base-content/80 mt-4 leading-relaxed">
                “{t.quote}”
              </p>
              <div className="mt-6">
                <p className="font-bold text-base-content">{t.name}</p>
                <p className="text-xs text-base-content/60">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
