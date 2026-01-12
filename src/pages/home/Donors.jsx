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
      rounded-xl
      border border-base-content/20
      bg-base-100
      px-4 py-2
      text-sm font-semibold text-base-content
      focus:outline-none focus:ring-2 focus:ring-[#f9232c]
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
  <div className="rounded-2xl border border-base-content/10 bg-base-100 p-6 animate-pulse">
    <div className="h-4 w-2/3 bg-base-300 rounded mb-3" />
    <div className="h-3 w-1/3 bg-base-300 rounded mb-5" />
    <div className="space-y-3">
      <div className="h-3 w-full bg-base-300 rounded" />
      <div className="h-3 w-5/6 bg-base-300 rounded" />
      <div className="h-3 w-4/6 bg-base-300 rounded" />
    </div>
  </div>
);

const cardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
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
        rounded-2xl
        bg-base-100
        border border-[#f9232c]/30
        p-6
        shadow-sm
        hover:shadow-xl hover:shadow-[#f9232c]/20
        transition-all
      "
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-[#f9232c]/20" />

      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xs font-black text-base-content">
            {donor.name}
          </h3>

          <span
            className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold
              ${
                available
                  ? "bg-emerald-500/15 text-emerald-500"
                  : "bg-error/15 text-error"
              }`}
          >
            {available ? "Available" : "Not Available"}
          </span>
        </div>

        <div className="h-12 w-12 rounded-2xl flex items-center justify-center bg-[#f9232c]/15 text-[#f9232c] text-xl font-black">
          {donor.bloodgroup}
        </div>
      </div>

      <div className="space-y-2 text-xs text-base-content/70">
        <p className="flex items-center gap-3">
          <FaMapMarkerAlt className="text-[#f9232c]/60" />
          {donor.upazila}, {donor.district}
        </p>
        <p className="flex items-center gap-3">
          <FaTint className="text-[#f9232c]/60" />
          Last Donated:
          <strong className="text-base-content ml-1">
            {new Date(donor.lastDonation).toLocaleDateString()}
          </strong>
        </p>
      </div>

      <div
        className={`
          absolute inset-x-0 bottom-0
          translate-y-full group-hover:translate-y-0
          transition-transform duration-300
          bg-base-100
          border-t border-base-content/10
          p-4 flex gap-3
          ${!available && "pointer-events-none opacity-60"}
        `}
      >
        <a
          href={available ? `tel:${donor.phone}` : undefined}
          className="flex-1 flex items-center justify-center rounded-xl bg-[#f9232c] text-white py-2 text-xs font-semibold"
        >
          Call
        </a>
        <a
          href={available ? `https://wa.me/88${donor.phone}` : undefined}
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex items-center justify-center rounded-xl bg-emerald-500 text-white py-2 text-xs font-semibold"
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
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 20;

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const districts = useMemo(
    () => [...new Set(donors.map((d) => d.district))],
    []
  );

  const upazilas = useMemo(() => {
    if (!district) return [];
    return [
      ...new Set(
        donors.filter((d) => d.district === district).map((d) => d.upazila)
      ),
    ];
  }, [district]);

  const bloodGroups = useMemo(
    () => [...new Set(donors.map((d) => d.bloodgroup))],
    []
  );

  const filteredDonors = useMemo(() => {
    return donors.filter((d) => {
      const donorAvailable = isAvailable(d.lastDonation);
      return (
        (!district || d.district === district) &&
        (!upazila || d.upazila === upazila) &&
        (!bloodgroup || d.bloodgroup === bloodgroup) &&
        (availability === "" ||
          (availability === "available" && donorAvailable) ||
          (availability === "not" && !donorAvailable))
      );
    });
  }, [district, upazila, bloodgroup, availability]);

  const totalPages = Math.ceil(filteredDonors.length / itemsPerPage);
  const currentDonors = filteredDonors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [district, upazila, bloodgroup, availability]);

  return (
    <section className="py-30 bg-base-200">
      <div className="max-w-7xl mx-auto px-6 md:px-0">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-black text-base-content">
            Blood <span className="text-[#f9232c]">Donors</span>
          </h2>
          <p className="mt-3 text-base-content/70">
            Find verified and available donors near you.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <SelectField
            value={district}
            onChange={(v) => {
              setDistrict(v);
              setUpazila("");
            }}
            options={districts}
            placeholder="District"
          />
          <SelectField
            value={upazila}
            onChange={setUpazila}
            options={upazilas}
            placeholder="Upazila"
            disabled={!district}
          />
          <SelectField
            value={bloodgroup}
            onChange={setBloodgroup}
            options={bloodGroups}
            placeholder="Blood Group"
          />
          <SelectField
            value={availability}
            onChange={setAvailability}
            placeholder="Availability"
            options={[
              { label: "Available", value: "available" },
              { label: "Not Available", value: "not" },
            ]}
          />
        </div>

        <div className="text-center mb-10">
          <span className="inline-flex px-4 py-1.5 rounded-full bg-[#f9232c]/10 text-[#f9232c] text-xs font-extrabold uppercase tracking-[0.3em] border border-[#f9232c]/30 mb-4">
            {filteredDonors.length} donor
            {filteredDonors.length !== 1 && "s"} found
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <DonorSkeleton key={i} />
              ))
            : (
              <AnimatePresence>
                {currentDonors.map((d) => (
                  <DonorCard key={d.id} donor={d} />
                ))}
              </AnimatePresence>
            )}
        </div>

        {!loading && totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded border font-semibold
                  ${
                    currentPage === page
                      ? "bg-[#f9232c] text-white border-[#f9232c]"
                      : "bg-base-100 text-base-content border-base-content/20"
                  }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Donors;
