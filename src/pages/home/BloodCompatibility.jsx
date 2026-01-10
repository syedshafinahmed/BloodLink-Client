import { useState } from "react";
import { FaTint, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { MdBloodtype } from "react-icons/md";
import { BiSolidDonateBlood } from "react-icons/bi";

const BLOOD_COMPATIBILITY = {
  "O-": { give: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"], take: ["O-"] },
  "O+": { give: ["O+", "A+", "B+", "AB+"], take: ["O-", "O+"] },
  "A-": { give: ["A-", "A+", "AB-", "AB+"], take: ["O-", "A-"] },
  "A+": { give: ["A+", "AB+"], take: ["O-", "O+", "A-", "A+"] },
  "B-": { give: ["B-", "B+", "AB-", "AB+"], take: ["O-", "B-"] },
  "B+": { give: ["B+", "AB+"], take: ["O-", "O+", "B-", "B+"] },
  "AB-": { give: ["AB-", "AB+"], take: ["O-", "A-", "B-", "AB-"] },
  "AB+": { give: ["AB+"], take: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"] }
};

const UNIVERSAL_DONOR = "O-";
const UNIVERSAL_RECEIVER = "AB+";

const getStrength = (count) => {
  if (count >= 6) return { label: "High", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" };
  if (count >= 3) return { label: "Medium", color: "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20" };
  return { label: "Low", color: "text-red-600 bg-red-50 dark:bg-red-900/20" };
};

const BloodGroupSelect = ({ value, onChange }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="
      w-full sm:w-60 rounded-xl border
      border-gray-300 dark:border-base-300
      bg-white dark:bg-base-100
      px-4 py-2 text-sm sm:text-base font-semibold
      text-gray-900 dark:text-gray-100
      focus:outline-none focus:ring-2 focus:ring-[#f9232c]
    "
  >
    <option value="">Select Blood Group</option>
    {Object.keys(BLOOD_COMPATIBILITY).map((g) => (
      <option key={g} value={g}>{g}</option>
    ))}
  </select>
);

const SelectHint = ({ text }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
    className="
      relative overflow-hidden
      mt-8 mb-6 text-center
      rounded-2xl border border-dashed
      border-[#f9232c]/50
      bg-[#f9232c]/5 dark:bg-[#f9232c]/10
      px-6 py-5
    "
  >
    <motion.span
      className="absolute inset-0 rounded-2xl border border-[#f9232c]/40"
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />

    <motion.div
      className="mx-auto mb-3 h-[3px] w-24 rounded-full bg-[#f9232c]"
      animate={{ scaleX: [0.6, 1, 0.6] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
    />

    <p className="relative text-lg font-extrabold text-[#f9232c] tracking-wide">
      {text}
    </p>
    <p className="relative mt-1 text-sm text-gray-700 dark:text-gray-300">
      Select a blood group to instantly view compatibility
    </p>
  </motion.div>
);

const ResultCard = ({ group, note }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: false, amount: 0.3 }}
    transition={{ duration: 0.3 }}
    className="
      group w-full sm:w-43
      rounded-2xl border border-[#f9232c]/60
      bg-white dark:bg-base-100
      p-5 shadow-sm
      transition-all duration-300
      hover:-translate-y-1
      hover:shadow-lg hover:shadow-[#f9232c]/20
      text-left cursor-default
    "
  >
    <div className="flex items-center justify-between mb-3">
      <span className="text-3xl font-black text-gray-900 dark:text-gray-100">
        {group}
      </span>
      <FaTint size={20} className="text-[#f9232c]/30 group-hover:text-[#f9232c]/60 transition" />
    </div>
    <p className="text-xs text-gray-700 dark:text-gray-300 leading-snug">
      {note}
    </p>
  </motion.div>
);

const BloodCompatibility = () => {
  const [donateGroup, setDonateGroup] = useState("");
  const [receiveGroup, setReceiveGroup] = useState("");

  return (
    <section className="py-20">


      <div className="relative max-w-7xl mx-auto px-6 sm:px-0">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#f9232c]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f9232c]/5 rounded-full blur-3xl" />
        </div>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-black text-gray-900 dark:text-gray-100">
            Blood <span className="text-[#f9232c]">Compatibility</span>
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Clear, reliable guidance on blood donation and receiving compatibility.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Donate Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white dark:bg-base-100 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-[#f9232c]/20"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 text-[#f9232c]"
            >
              <div className="flex items-center gap-3">
                <MdBloodtype size={24} />
                <h3 className="text-2xl font-bold">Donate Blood To</h3>
              </div>
              <BloodGroupSelect value={donateGroup} onChange={setDonateGroup} />
            </motion.div>
            {!donateGroup && (
              <SelectHint text="Choose a Blood Group to Donate" />
            )}

            {donateGroup && (
              <>
                <div className="flex items-center gap-3 mt-4 mb-6 flex-wrap">
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full ${getStrength(BLOOD_COMPATIBILITY[donateGroup].give.length).color}`}>
                    Compatibility: {getStrength(BLOOD_COMPATIBILITY[donateGroup].give.length).label}
                  </span>

                  {donateGroup === UNIVERSAL_DONOR && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-[#f9232c]">
                      <FaShieldAlt /> Universal Donor
                    </span>
                  )}
                </div>

                <motion.div
                  className="flex flex-wrap gap-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.3 }}
                  variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
                >
                  {BLOOD_COMPATIBILITY[donateGroup].give.map((g) => (
                    <ResultCard key={g} group={g} note="Eligible Recipient Group" />
                  ))}
                </motion.div>
              </>
            )}
          </motion.div>

          {/* Receive Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white dark:bg-base-100 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-[#f9232c]/20"
          >
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 text-[#f9232c]"
            >
              <div className="flex items-center gap-3">
                <BiSolidDonateBlood size={22} />
                <h3 className="text-2xl font-bold">Receive Blood From</h3>
              </div>
              <BloodGroupSelect value={receiveGroup} onChange={setReceiveGroup} />
            </motion.div>
            {!receiveGroup && (
              <SelectHint text="Choose a Blood Group to Receive" />
            )}

            {receiveGroup && (
              <>
                <div className="flex items-center gap-3 mt-4 mb-6 flex-wrap">
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full ${getStrength(BLOOD_COMPATIBILITY[receiveGroup].take.length).color}`}>
                    Compatibility: {getStrength(BLOOD_COMPATIBILITY[receiveGroup].take.length).label}
                  </span>

                  {receiveGroup === UNIVERSAL_RECEIVER && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-[#f9232c]">
                      <FaShieldAlt /> Universal Receiver
                    </span>
                  )}
                </div>

                <motion.div
                  className="flex flex-wrap gap-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.3 }}
                  variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
                >
                  {BLOOD_COMPATIBILITY[receiveGroup].take.map((g) => (
                    <ResultCard key={g} group={g} note="Eligible Donor Group" />
                  ))}
                </motion.div>
              </>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default BloodCompatibility;
