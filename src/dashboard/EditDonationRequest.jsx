import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const EditDonationRequest = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    axiosSecure
      .get(`/donation-requests/${id}`)
      .then((res) => setFormData(res.data))
      .catch(() => {
        Swal.fire("Error!", "Failed to load donation request.", "error");
      });
  }, [id, axiosSecure]);

  if (!formData) {
    return (
      <motion.p
        className="text-gray-500 text-center mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Loading...
      </motion.p>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosSecure
      .patch(`/donation-requests/${id}`, formData)
      .then(() => {
        Swal.fire(
          "Updated!",
          "Donation request updated successfully.",
          "success"
        );
        navigate("/dashboard/donation-requests");
      })
      .catch(() => {
        Swal.fire("Error!", "Failed to update.", "error");
      });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <motion.h2
        className="text-3xl font-bold text-center mb-8 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Edit Donation Request
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        className="bg-base-200 shadow-2xl rounded-3xl p-8 grid grid-cols-1 gap-6 border border-gray-100"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Recipient Name */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Recipient Name</label>
          <input
            type="text"
            name="recipientName"
            value={formData.recipientName || ""}
            onChange={handleChange}
            placeholder="Recipient Name"
            className="input input-bordered w-full outline-none focus:border-primary"
          />
        </motion.div>

        {/* Blood Group */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Blood Group</label>
          <input
            type="text"
            name="bloodGroup"
            value={formData.bloodGroup || ""}
            onChange={handleChange}
            placeholder="Blood Group"
            className="input input-bordered w-full outline-none focus:border-primary"
          />
        </motion.div>

        {/* Hospital Name */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Hospital Name</label>
          <input
            type="text"
            name="hospitalName"
            value={formData.hospitalName || ""}
            onChange={handleChange}
            placeholder="Hospital Name"
            className="input input-bordered w-full outline-none focus:border-primary"
          />
        </motion.div>

        {/* District */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">District</label>
          <input
            type="text"
            name="recipientDistrict"
            value={formData.recipientDistrict || ""}
            onChange={handleChange}
            placeholder="District"
            className="input input-bordered w-full outline-none focus:border-primary"
          />
        </motion.div>

        {/* Upazila */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Upazila</label>
          <input
            type="text"
            name="recipientUpazila"
            value={formData.recipientUpazila || ""}
            onChange={handleChange}
            placeholder="Upazila"
            className="input input-bordered w-full outline-none focus:border-primary"
          />
        </motion.div>

        {/* Donation Date */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Donation Date</label>
          <input
            type="date"
            name="donationDate"
            value={formData.donationDate ? formData.donationDate.split("T")[0] : ""}
            onChange={handleChange}
            className="input input-bordered w-full outline-none focus:border-primary"
          />
        </motion.div>

        {/* Request Message */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Request Message</label>
          <textarea
            name="requestMessage"
            value={formData.requestMessage || ""}
            onChange={handleChange}
            placeholder="Request Message"
            className="textarea textarea-bordered w-full outline-none focus:border-primary"
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div variants={itemVariants}>
          <button type="submit" className="btn btn-primary w-full py-3 text-lg font-semibold">
            Update Request
          </button>
        </motion.div>
      </motion.form>
    </div>
  );
};

export default EditDonationRequest;
