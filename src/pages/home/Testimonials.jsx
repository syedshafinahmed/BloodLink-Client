import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { Quote } from "lucide-react";
import { useRef } from "react";

const testimonials = [
  {
    name: "Ayesha Rahman",
    role: "Blood Recipient",
    image: "https://i.pravatar.cc/150?img=47",
    quote:
      "BloodLink helped us find a donor within minutes during an emergency. It truly saved my brother’s life.",
  },
  {
    name: "Tanvir Ahmed",
    role: "Regular Donor",
    image: "https://i.pravatar.cc/150?img=12",
    quote:
      "The platform makes donating blood simple and meaningful. I feel proud to be part of this community.",
  },
  {
    name: "Dr. Mahmud Hasan",
    role: "Medical Volunteer",
    image: "https://i.pravatar.cc/150?img=32",
    quote:
      "A well-structured platform that bridges the gap between donors and patients efficiently.",
  },
  {
    name: "Nusrat Jahan",
    role: "Donor",
    image: "https://i.pravatar.cc/150?img=5",
    quote:
      "I never imagined donating blood could be this organized and impactful.",
  },
  {
    name: "Rafiul Islam",
    role: "Recipient’s Family",
    image: "https://i.pravatar.cc/150?img=19",
    quote:
      "During our darkest hour, BloodLink connected us to hope.",
  },
  {
    name: "Dr. Farzana Kabir",
    role: "Hospital Partner",
    image: "https://i.pravatar.cc/150?img=45",
    quote:
      "This platform significantly reduces response time for emergency cases.",
  },
  {
    name: "Imran Hossain",
    role: "Volunteer",
    image: "https://i.pravatar.cc/150?img=8",
    quote:
      "BloodLink turns goodwill into real-world impact.",
  },
  {
    name: "Sadia Noor",
    role: "First-time Donor",
    image: "https://i.pravatar.cc/150?img=21",
    quote:
      "The experience was smooth, reassuring, and deeply fulfilling.",
  },
];

const items = [...testimonials, ...testimonials];

export default function Testimonials() {
  const x = useMotionValue(0);
  const containerRef = useRef(null);

  useAnimationFrame((t, delta) => {
    const speed = 0.04 * delta;
    const current = x.get();

    if (current <= -1600) {
      x.set(0);
    } else {
      x.set(current - speed);
    }
  });

  return (
    <section className="py-20">
      {/* Header */}
      <div className="relative max-w-7xl mx-auto px-6 text-center mb-10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#f9232c]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f9232c]/5 rounded-full blur-3xl" />
        </div>
        <span className="inline-flex px-4 py-1.5 rounded-full bg-[#f9232c]/10 text-[#f9232c] text-xs font-extrabold uppercase tracking-[0.3em] border border-[#f9232c]/30">
          Testimonials
        </span>

        <h2 className="mt-6 text-4xl md:text-5xl font-black text-base-content">
          Community <span className="text-[#f9232c]">Voices</span>
        </h2>

        <p className="mt-4 text-base-content max-w-2xl mx-auto">
          Real stories from donors, recipients, and healthcare professionals.
        </p>
      </div>

      {/* Slider */}
      <div className="relative">
        <motion.div
          ref={containerRef}
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -1600, right: 0 }}
          dragElastic={0.05}
          whileTap={{ cursor: "grabbing" }}
          className="flex gap-8 px-6"
        >
          {items.map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="
                group
                min-w-[300px] max-w-[320px]
                rounded-2xl
                bg-base-200/70 backdrop-blur
                border border-base-content/10
                p-6
                shadow-md
                hover:shadow-xl hover:shadow-[#f9232c]/20
                transition-all
                relative overflow-hidden
              "
            >
              <div
                className="
                  absolute inset-0 rounded-2xl
                  opacity-0 group-hover:opacity-100
                  bg-linear-to-br from-[#f9232c]/20 via-[#f9232c]/10 to-transparent
                  transition-opacity duration-300
                  pointer-events-none
                "
              />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-14 h-14 rounded-full border-2 border-[#f9232c]/30 object-cover"
                  />
                  <div>
                    <p className="font-bold text-base-content">{t.name}</p>
                    <p className="text-xs text-base-content/60">{t.role}</p>
                  </div>
                </div>

                <Quote className="w-6 h-6 text-[#f9232c] mb-3" />

                <p className="text-sm text-base-content/80 leading-relaxed">
                  “{t.quote}”
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <p className="text-center mt-10 text-xs text-base-content/70">
        Auto-scrolling — drag to explore manually
      </p>
    </section>
  );
}
