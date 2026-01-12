import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useLoaderData } from "react-router";
import { motion } from "framer-motion";
import { FaHeart, FaShieldAlt, FaUserCheck } from "react-icons/fa";
import { RiCommunityFill } from "react-icons/ri";
import { MapPin } from "lucide-react";
import { SiLinkedin } from "react-icons/si";


import "leaflet/dist/leaflet.css";
import { FaSquareXTwitter } from "react-icons/fa6";

const values = [
  {
    title: "Life First",
    description:
      "Every feature we build and decision we take is driven by a single priority — saving lives without delay.",
    icon: FaHeart,
  },
  {
    title: "Trust & Safety",
    description:
      "We verify donors and requests to ensure a secure, reliable, and fraud-free blood donation ecosystem.",
    icon: FaShieldAlt,
  },
  {
    title: "Community Powered",
    description:
      "BloodLink thrives on a strong network of donors, volunteers, and healthcare partners working together.",
    icon: RiCommunityFill,
  },
  {
    title: "Responsible Giving",
    description:
      "We promote ethical, informed, and medically responsible blood donation practices at every step.",
    icon: FaUserCheck,
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
    },
  },
};

const members = [
  {
    name: 'Shafin Ahmed',
    img: 'https://i.ibb.co.com/JR2YVTLG/Whats-App-Image-2026-01-03-at-12-08-30-AM.jpg',
    role: 'Platform & Operations Lead',
    linkedin: 'https://www.linkedin.com/in/syed-shafin-ahmed/',
    instagram: '#'
  },
  {
    name: 'Nafin Ahmed',
    img: 'https://i.ibb.co.com/4njtfg1N/IMG-20240908-004438-350.jpg',
    role: 'Community & Donor Relations Manager',
    linkedin: 'https://www.linkedin.com/in/syednafinahmed/',
    instagram: '#'
  },
  {
    name: 'Anik Rubayet',
    img: 'https://i.ibb.co.com/yFXsHxFs/Whats-App-Image-2026-01-02-at-11-37-26-PM-1.jpg',
    role: 'Outreach & Partnerships Coordinator',
    linkedin: 'https://www.linkedin.com/in/md-rubayet-hossain-1b17a226a/',
    instagram: '#'
  },
  {
    name: 'Tashfiq Talukder',
    img: 'https://i.ibb.co.com/rKQJJHqH/Whats-App-Image-2026-01-03-at-1-39-18-AM.jpg',
    role: 'Communications & Social Impact Lead',
    linkedin: '#',
    instagram: '#'
  },
  {
    name: 'Archo Islam',
    img: 'https://i.ibb.co.com/r2r2fKJ3/Gemini-Generated-Image-5237852378523785.png',
    role: 'Volunteer Operations Lead',
    linkedin: 'https://www.linkedin.com/in/asa-ad-mohammad-akib-411a45387/',
    instagram: '#'
  },
];


const AboutUs = () => {
  const serviceCenters = useLoaderData();
  const mapRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );
    if (district && mapRef.current) {
      mapRef.current.flyTo(
        [district.latitude, district.longitude],
        12,
        { duration: 1.2 }
      );
    }
  };

  const position = [23.685, 90.3563];

  return (
    <section className="bg-base-100 py-24">
      <div className="relative max-w-7xl mx-auto px-6 md:px-0 space-y-20 mt-5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#f9232c]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f9232c]/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex px-4 py-1.5 rounded-full bg-[#f9232c]/10 text-[#f9232c] text-xs font-extrabold uppercase tracking-[0.3em] border border-[#f9232c]/30 mb-4">
            About BloodLink
          </span>

          <h1 className="text-4xl md:text-5xl font-black text-base-content">
            Connecting Lives Through <span className="text-[#f9232c]">Blood</span>
          </h1>

          <p className="mt-6 text-base-content/70 leading-relaxed">
            BloodLink is a technology-driven blood donation platform built to
            eliminate delays, build trust, and save lives through verified,
            community-powered connections.
          </p>
        </motion.div>

        <section className="relative">
          <div className="max-w-7xl mx-auto px-6 md:px-0">


            {/* Values Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25 }}
              className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover={{ y: -10 }}
                    className="
                  group relative
                  rounded-2xl p-8
                  bg-base-200/70 backdrop-blur-xl
                  border border-base-content/10
                  shadow-xl
                  transition-all duration-300
                "
                  >
                    <div
                      className="
                    absolute inset-0 rounded-2xl
                    opacity-0 group-hover:opacity-100
                    bg-linear-to-br from-[#f9232c]/20 via-[#f9232c]/10 to-transparent
                    transition
                  "
                    />

                    <motion.div
                      whileHover={{ rotate: 8, scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="
                    relative z-10
                    w-16 h-16 mb-6
                    rounded-xl
                    bg-[#f9232c]/10
                    flex items-center justify-center
                    text-[#f9232c]
                    group-hover:bg-[#f9232c]
                    group-hover:text-white
                    transition
                  "
                    >
                      <Icon size={28} />
                    </motion.div>

                    <h3 className="relative z-10 text-xl font-bold text-base-content mb-3">
                      {value.title}
                    </h3>

                    <p className="relative z-10 text-sm leading-relaxed text-base-content/70">
                      {value.description}
                    </p>

                    <div
                      className="
                    absolute inset-0 rounded-2xl
                    ring-1 ring-transparent
                    group-hover:ring-[#f9232c]/30
                    transition
                  "
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* MAP */}
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-black text-base-content flex items-center gap-2">
              <MapPin className="w-6 h-6 text-[#f9232c]" />
              Nationwide Coverage
            </h2>
            <p className="text-base-content/70 mt-2 max-w-2xl">
              BloodLink operates across all 64 districts of Bangladesh, ensuring
              emergency blood access wherever it’s needed.
            </p>
          </div>

          <form
            onSubmit={handleSearch}
            className="relative w-full md:w-1/3"
          >
            <input
              type="text"
              name="location"
              placeholder="Search district..."
              className="input input-bordered w-full rounded-xl pr-28"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 px-6 py-2 rounded-lg bg-[#f9232c] text-white font-bold text-sm hover:bg-[#f9232c]/90 transition">
              Search
            </button>
          </form>

          <div className="relative z-0 rounded-2xl overflow-hidden border border-base-content/10 shadow-2xl">
            <MapContainer
              center={position}
              zoom={7}
              scrollWheelZoom={false}
              attributionControl={false}
              ref={mapRef}
              className="h-[420px]"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {serviceCenters.map((center, i) => (
                <Marker
                  key={i}
                  position={[center.latitude, center.longitude]}
                >
                  <Popup>
                    <strong>{center.district}</strong>
                    <br />
                    Covered: {center.covered_area.join(", ")}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* TEAM*/}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex px-4 py-1.5 rounded-full bg-[#f9232c]/10 text-[#f9232c] text-xs font-extrabold uppercase tracking-[0.3em] border border-[#f9232c]/30 mb-4">
            Our Team
          </span>

          <h1 className="text-4xl md:text-5xl font-black text-base-content">
            Meet the Team <span className="text-[#f9232c]">Saving Lives</span>
          </h1>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-8 md:gap-32">

          {members.map((member, index) => (
            <motion.div
              key={index}
              className="relative w-28 sm:w-32 md:40 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="relative rounded-full w-28 sm:w-32 md:w-50 h-28 sm:h-32 md:h-50">
                <div className="absolute inset-0 rounded-full spin-border"></div>
                <div className="absolute inset-1 rounded-full overflow-hidden">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full hover:scale-110 transition-transform duration-300 ease-in"
                  />
                </div>
              </div>

              <div className="text-center mt-3">
                <p className="font-black text-base-content text-sm">
                  {member.name}
                </p>
                <p className="text-gray-500 dark:text-gray-300 font-semibold line-clamp-2 text-xs">{member.role}</p>

                <div className="flex justify-center gap-2 mt-2">
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <SiLinkedin className="text-[#f9232c]" />
                  </a>
                  <a href={member.instagram} target="_blank" rel="noopener noreferrer">
                    <FaSquareXTwitter className="text-[#f9232c]" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
