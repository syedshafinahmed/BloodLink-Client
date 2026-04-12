import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          className="fixed bottom-6 right-6 z-50 group"
        >
          {/* BUTTON */}
          <button
            onClick={scrollToTop}
            className="
              relative w-12 h-12
              flex items-center justify-center
              rounded-xl
              bg-[#f9232c]
              shadow-lg shadow-[#f9232c]/30
              hover:bg-[#e31b24]
              transition-all duration-300
            "
          >
            {/* ICON */}
            <FaArrowUp
              className="
                text-white dark:text-gray-800
                transition-transform duration-300
                group-hover:-translate-y-1
              "
              size={16}
            />
          </button>

          {/* TOOLTIP */}
          <span
            className="
              absolute -top-10 right-1/2 translate-x-1/2
              px-2 py-1 text-xs
              rounded-md
              bg-base-300 text-base-content
              opacity-0 scale-95
              group-hover:opacity-100 group-hover:scale-100
              transition-all duration-200
              pointer-events-none
              whitespace-nowrap
            "
          >
            Back to top
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;