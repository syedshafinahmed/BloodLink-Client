import { useState } from "react";
import { FaTint, FaExchangeAlt, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";

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
  if (count >= 6) return { label: "High", color: "text-emerald-600 bg-emerald-50" };
  if (count >= 3) return { label: "Medium", color: "text-yellow-600 bg-yellow-50" };
  return { label: "Low", color: "text-red-600 bg-red-50" };
};

const BloodGroupSelect = ({ value, onChange }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full sm:w-60 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm sm:text-base font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
  >
    <option value="">Select Blood Group</option>
    {Object.keys(BLOOD_COMPATIBILITY).map((g) => (
      <option key={g} value={g}>{g}</option>
    ))}
  </select>
);

const ResultCard = ({ group, note }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: false, amount: 0.3 }}
    transition={{ duration: 0.3 }}
    className="
      group w-full sm:w-40
      rounded-2xl border border-primary/60
      bg-white p-5
      shadow-sm
      transition-all duration-300
      hover:-translate-y-1
      hover:shadow-lg hover:shadow-primary/20
      text-left cursor-default
    "
  >
    <div className="flex items-center justify-between mb-3">
      <span className="text-2xl font-black text-gray-900">{group}</span>
      <FaTint className="text-primary/30 group-hover:text-primary/60 transition" />
    </div>
    <p className="text-xs text-gray-500 leading-snug">{note}</p>
  </motion.div>
);

const BloodCompatibility = () => {
  const [donateGroup, setDonateGroup] = useState("");
  const [receiveGroup, setReceiveGroup] = useState("");

  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-black text-gray-900">
            Blood <span className="text-primary">Compatibility</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
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
            className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 text-primary"
            >
              <div className="flex items-center gap-3">
                <FaTint size={24} />
                <h3 className="text-2xl font-bold">Donate Blood To</h3>
              </div>
              <BloodGroupSelect value={donateGroup} onChange={setDonateGroup} />
            </motion.div>

            {donateGroup && (
              <>
                <div className="flex items-center gap-3 mt-4 mb-6 flex-wrap">
                  <span
                    className={`text-sm font-semibold px-3 py-1 rounded-full ${
                      getStrength(BLOOD_COMPATIBILITY[donateGroup].give.length).color
                    }`}
                  >
                    Compatibility: {getStrength(BLOOD_COMPATIBILITY[donateGroup].give.length).label}
                  </span>
                  {donateGroup === UNIVERSAL_DONOR && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-primary">
                      <FaShieldAlt /> Universal Donor
                    </span>
                  )}
                </div>

                <motion.div
                  className="flex flex-wrap gap-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.3 }}
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } },
                    hidden: {}
                  }}
                >
                  {BLOOD_COMPATIBILITY[donateGroup].give.map((g) => (
                    <ResultCard key={g} group={g} note="Eligible Recipient" />
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
            className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
          >
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 text-primary"
            >
              <div className="flex items-center gap-3">
                <FaExchangeAlt size={22} />
                <h3 className="text-2xl font-bold">Receive Blood From</h3>
              </div>
              <BloodGroupSelect value={receiveGroup} onChange={setReceiveGroup} />
            </motion.div>

            {receiveGroup && (
              <>
                <div className="flex items-center gap-3 mt-4 mb-6 flex-wrap">
                  <span
                    className={`text-sm font-semibold px-3 py-1 rounded-full ${
                      getStrength(BLOOD_COMPATIBILITY[receiveGroup].take.length).color
                    }`}
                  >
                    Compatibility: {getStrength(BLOOD_COMPATIBILITY[receiveGroup].take.length).label}
                  </span>

                  {receiveGroup === UNIVERSAL_RECEIVER && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-primary">
                      <FaShieldAlt /> Universal Receiver
                    </span>
                  )}
                </div>

                <motion.div
                  className="flex flex-wrap gap-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.3 }}
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } },
                    hidden: {}
                  }}
                >
                  {BLOOD_COMPATIBILITY[receiveGroup].take.map((g) => (
                    <ResultCard key={g} group={g} note="Compatible Donor" />
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
