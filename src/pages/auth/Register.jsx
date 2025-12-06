import { Button } from "@mui/material";
import { Link } from "react-router";
import { motion } from "framer-motion";

export default function Register() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1, 
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="">
      <motion.h1 className="text-2xl font-semibold text-center p-10" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} >
        Create Donor Account
      </motion.h1>

      <motion.form className="w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-8 rounded-xl bg-base-200 shadow" variants={containerVariants} initial="hidden" animate="visible">
        {/* Email */}
        <motion.div className="flex flex-col" variants={itemVariants}>
          <label className="font-medium text-xs mb-1">Email</label>
          <input type="email" className="border border-primary p-2 rounded outline-none" />
        </motion.div>

        {/* Name */}
        <motion.div className="flex flex-col" variants={itemVariants}>
          <label className="font-medium text-xs mb-1">Name</label>
          <input type="text" className="border border-primary p-2 rounded outline-none" />
        </motion.div>

        {/* Avatar */}
        <motion.div className="flex flex-col" variants={itemVariants}>
          <label className="font-medium text-xs mb-1">Avatar</label>
          <input type="file" className="border border-primary p-2 rounded outline-none" />
        </motion.div>

        {/* Blood Group */}
        <motion.div className="flex flex-col" variants={itemVariants}>
          <label className="font-medium text-xs mb-1">Blood Group</label>
          <select className="border border-primary p-2 rounded outline-none">
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>
        </motion.div>

        {/* District */}
        <motion.div className="flex flex-col" variants={itemVariants}>
          <label className="font-medium text-xs mb-1">District</label>
          <select className="border border-primary p-2 rounded outline-none" style={{ borderColor: "#f9232c" }}>
            <option>Select district</option>
            <option>Dhaka</option>
            <option>Chattogram</option>
            <option>Rajshahi</option>
          </select>
        </motion.div>

        {/* Upazila */}
        <motion.div className="flex flex-col" variants={itemVariants}>
          <label className="font-medium text-xs mb-1">Upazila</label>
          <select className="border border-primary p-2 rounded outline-none">
            <option>Select upazila</option>
            <option>Mirpur</option>
            <option>Uttara</option>
            <option>Gulshan</option>
          </select>
        </motion.div>

        {/* Password */}
        <motion.div className="flex flex-col" variants={itemVariants}>
          <label className="font-medium text-xs mb-1">Password</label>
          <input type="password" className="border p-2 rounded border-primary outline-none" />
        </motion.div>

        {/* Confirm Password */}
        <motion.div className="flex flex-col" variants={itemVariants}>
          <label className="font-medium text-xs mb-1">Confirm Password</label>
          <input type="password" className="border p-2 rounded outline-none border-primary" />
        </motion.div>

        {/* Submit Button */}
        <motion.div className="w-full flex flex-col col-span-1 md:col-span-2" variants={itemVariants}>
          <Button variant="outlined" sx={{ borderColor: "#f9232c", color: "#f9232c" }} >Register</Button>
          <span className="text-sm py-5 text-center">Don’t have an account?{" "}<Link to="/login" className="text-[#f9232c] font-black">Login</Link></span>
        </motion.div>
      </motion.form>
    </div>
  );
}
