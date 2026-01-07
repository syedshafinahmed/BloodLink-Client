import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTint, FaMapMarkerAlt } from "react-icons/fa";
import donors from "../../../public/donors.json";

const DAYS_120 = 120;
const isAvailable = (date) => {
  const last = new Date(date);
  const now = new Date();
  const diff = Math.floor((now - last) / (1000 * 60 * 60 * 24));
  return diff >= DAYS_120;
};

const SelectField = ({ value, onChange, options, placeholder, disabled }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    disabled={disabled}
    className="
      w-full sm:w-56
      rounded-xl border border-gray-300 bg-white
      px-4 py-2
      text-sm font-semibold text-gray-900
      focus:outline-none focus:ring-2 focus:ring-primary
      disabled:opacity-50
    "
  >
    <option value="">{placeholder}</option>
    {options.map((o) => (
      <option key={o.value ?? o} value={o.value ?? o}>
        {o.label ?? o}
      </option>
    ))}
  </select>
);

const DonorSkeleton = () => (
  <div className="rounded-2xl border border-gray-200 bg-white p-6 animate-pulse">
    <div className="h-4 w-2/3 bg-gray-200 rounded mb-3" />
    <div className="h-3 w-1/3 bg-gray-200 rounded mb-5" />
    <div className="space-y-3">
      <div className="h-3 w-full bg-gray-200 rounded" />
      <div className="h-3 w-5/6 bg-gray-200 rounded" />
      <div className="h-3 w-4/6 bg-gray-200 rounded" />
    </div>
  </div>
);

const cardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

const DonorCard = ({ donor }) => {
  const available = isAvailable(donor.lastDonation);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.25 }}
      className="
        relative group overflow-hidden
        rounded-2xl bg-white
        border border-red-200
        p-6
        shadow-sm
        hover:shadow-xl hover:shadow-primary/15
        transition-all
      "
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-primary/15" />

      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xs font-black text-gray-900">
            {donor.name}
          </h3>

          <span
            className={`
              inline-block mt-2 px-3 py-1 rounded-full
              text-xs font-bold
              ${available
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-700"}
            `}
          >
            {available ? "Available" : "Not Available"}
          </span>
        </div>

        <div className="
          h-12 w-12 rounded-2xl
          flex items-center justify-center
          bg-primary/15 text-primary
          text-xl font-black
        ">
          {donor.bloodgroup}
        </div>
      </div>

      {/* Info */}
      <div className="space-y-2 text-xs text-gray-600">
        <p className="flex items-center gap-3">
          <FaMapMarkerAlt className="text-primary/60" />
          {donor.upazila}, {donor.district}
        </p>

        <p className="flex items-center gap-3">
          <FaTint className="text-primary/60" />
          Last Donated:
          <strong className="text-gray-700 ml-1">
            {new Date(donor.lastDonation).toLocaleDateString()}
          </strong>
        </p>
      </div>

      {/* CTA */}
      <div
        className={`
          absolute inset-x-0 bottom-0
          translate-y-full group-hover:translate-y-0
          transition-transform duration-300
          bg-white border-t border-gray-200
          p-4 flex gap-3
          ${!available && "pointer-events-none opacity-60"}
        `}
      >
        <a
          href={available ? `tel:${donor.phone}` : undefined}
          className="
            flex-1 flex items-center justify-center gap-1
            rounded-xl bg-primary text-white
            py-2 text-xs font-semibold
          "
        >
          Call
        </a>

        <a
          href={available ? `https://wa.me/88${donor.phone}` : undefined}
          target="_blank"
          rel="noreferrer"
          className="
            flex-1 flex items-center justify-center gap-1
            rounded-xl bg-emerald-500 text-white
            py-2 text-xs font-semibold
          "
        >
          WhatsApp
        </a>
      </div>
    </motion.div>
  );
};

const Donors = () => {
  const [loading, setLoading] = useState(true);
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [bloodgroup, setBloodgroup] = useState("");
  const [availability, setAvailability] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const districts = useMemo(
    () => [...new Set(donors.map(d => d.district))],
    []
  );

  const upazilas = useMemo(() => {
    if (!district) return [];
    return [...new Set(
      donors.filter(d => d.district === district).map(d => d.upazila)
    )];
  }, [district]);

  const bloodGroups = useMemo(
    () => [...new Set(donors.map(d => d.bloodgroup))],
    []
  );

  const filteredDonors = useMemo(() => {
    return donors.filter(d => {
      const donorAvailable = isAvailable(d.lastDonation);
      return (
        (!district || d.district === district) &&
        (!upazila || d.upazila === upazila) &&
        (!bloodgroup || d.bloodgroup === bloodgroup) &&
        (
          availability === "" ||
          (availability === "available" && donorAvailable) ||
          (availability === "not" && !donorAvailable)
        )
      );
    });
  }, [district, upazila, bloodgroup, availability]);

  return (
    <section className="py-40 bg-base-200">
      <div className="max-w-7xl mx-auto px-6 md:px-0">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-black text-gray-900">
            Blood <span className="text-primary">Donors</span>
          </h2>
          <p className="mt-3 text-gray-600">
            Find verified and available donors near you.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <SelectField value={district} onChange={(v) => { setDistrict(v); setUpazila(""); }} options={districts} placeholder="District" />
          <SelectField value={upazila} onChange={setUpazila} options={upazilas} placeholder="Upazila" disabled={!district} />
          <SelectField value={bloodgroup} onChange={setBloodgroup} options={bloodGroups} placeholder="Blood Group" />
          <SelectField
            value={availability}
            onChange={setAvailability}
            placeholder="Availability"
            options={[
              { label: "Available", value: "available" },
              { label: "Not Available", value: "not" }
            ]}
          />
        </div>

        {/* Count Badge */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm">
            {filteredDonors.length} donor{filteredDonors.length !== 1 && "s"} found
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <DonorSkeleton key={i} />)
            : (
              <AnimatePresence>
                {filteredDonors.map(d => (
                  <DonorCard key={d.id} donor={d} />
                ))}
              </AnimatePresence>
            )
          }
        </div>
      </div>
    </section>
  );
};

export default Donors;
