import { useState } from "react";
import { motion } from "framer-motion";
import Select from "react-select";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import locations from "../../public/location.json";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

export default function CreateDonationRequest() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedUpazila, setSelectedUpazila] = useState(null);

  // District options
  const districtOptions = [
    ...new Set(locations.map((loc) => loc.district)),
  ].map((dist) => ({
    value: dist,
    label: dist,
  }));

  // Upazila options
  const upazilaOptions = selectedDistrict
    ? locations
      .filter((loc) => loc.district === selectedDistrict.value)
      .map((loc) => ({
        value: loc.upazila,
        label: loc.upazila,
      }))
    : [];

  const customSelectStyles = {
    control: (base) => ({
      ...base,
      borderColor: "#f9232c",
      boxShadow: "none",
      "&:hover": { borderColor: "#f9232c" },
    }),
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  // Submit Handler
  const onSubmit = (data) => {
    const donationRequest = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      recipientName: data.recipientName,
      recipientDistrict: data.recipientDistrict,
      recipientUpazila: data.recipientUpazila,
      hospitalName: data.hospitalName,
      fullAddress: data.fullAddress,
      bloodGroup: data.bloodGroup,
      donationDate: data.donationDate,
      donationTime: data.donationTime,
      requestMessage: data.requestMessage,
      donationStatus: "pending",
      createdAt: new Date(),
    };

    axiosSecure.post("/donation-requests", donationRequest).then(() => {
      Swal.fire({
        icon: "success",
        title: "Donation Request Sent!",
        text: "We will notify donors in your area.",
        timer: 1800,
        showConfirmButton: false,
      });
    });
  };

  return (
    <div className="bg-white/10 pb-10">
      <motion.h1
        className="text-center font-black mb-5 text-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Create Donation Request
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-8 bg-white/10 p-6 rounded"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Requester Name */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <label className="font-medium text-xs mb-1">Requester Name</label>
          <input
            type="text"
            value={user?.displayName}
            readOnly
            className="border border-primary p-2 rounded bg-gray-100"
          />
        </motion.div>

        {/* Requester Email */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <label className="font-medium text-xs mb-1">Requester Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="border border-primary p-2 rounded bg-gray-100"
          />
        </motion.div>

        {/* Recipient Name */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <label className="font-medium text-xs mb-1">Recipient Name</label>
          <input
            {...register("recipientName", { required: "Recipient name is required" })}
            className="border border-primary p-2 rounded"
            placeholder="Recipient Name"
          />
        </motion.div>

        {/* Recipient District */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <label className="font-medium text-xs mb-1">Recipient District</label>
          <Select
            options={districtOptions}
            value={selectedDistrict}
            onChange={(value) => {
              setSelectedDistrict(value);
              setSelectedUpazila(null);
              setValue("recipientDistrict", value.value, { shouldValidate: true });
            }}
            placeholder="Select district"
            styles={customSelectStyles}
          />
          <input type="hidden" {...register("recipientDistrict", { required: true })} />
        </motion.div>

        {/* Recipient Upazila */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <label className="font-medium text-xs mb-1">Recipient Upazila</label>
          <Select
            options={upazilaOptions}
            value={selectedUpazila}
            onChange={(value) => {
              setSelectedUpazila(value);
              setValue("recipientUpazila", value.value, { shouldValidate: true });
            }}
            placeholder="Select upazila"
            isDisabled={!selectedDistrict}
            styles={customSelectStyles}
          />
          <input type="hidden" {...register("recipientUpazila", { required: true })} />
        </motion.div>

        {/* Hospital Name */}
        <motion.div variants={itemVariants} className="flex flex-col md:col-span-2">
          <label className="font-medium text-xs mb-1">Hospital Name</label>
          <input
            {...register("hospitalName", { required: true })}
            className="border border-primary p-2 rounded"
            placeholder="Dhaka Medical College Hospital"
          />
        </motion.div>

        {/* Full Address */}
        <motion.div variants={itemVariants} className="flex flex-col md:col-span-2">
          <label className="font-medium text-xs mb-1">Full Address</label>
          <input
            {...register("fullAddress", { required: true })}
            className="border border-primary p-2 rounded"
            placeholder="Zahir Raihan Rd, Dhaka"
          />
        </motion.div>

        {/* Blood Group */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <label className="font-medium text-xs mb-1">Blood Group</label>
          <select
            {...register("bloodGroup", { required: true })}
            className="border border-primary p-2 rounded"
          >
            <option value="">Select Blood Group</option>
            <option>A+</option><option>A-</option>
            <option>B+</option><option>B-</option>
            <option>AB+</option><option>AB-</option>
            <option>O+</option><option>O-</option>
          </select>
        </motion.div>

        {/* Donation Date */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <label className="font-medium text-xs mb-1">Donation Date</label>
          <input
            type="date"
            {...register("donationDate", { required: true })}
            className="border border-primary p-2 rounded"
          />
        </motion.div>

        {/* Donation Time */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <label className="font-medium text-xs mb-1">Donation Time</label>
          <input
            type="time"
            {...register("donationTime", { required: true })}
            className="border border-primary p-2 rounded"
          />
        </motion.div>

        {/* Request Message */}
        <motion.div variants={itemVariants} className="flex flex-col md:col-span-2">
          <label className="font-medium text-xs mb-1">Request Message</label>
          <textarea
            {...register("requestMessage", { required: true })}
            className="border border-primary p-2 rounded h-28"
            placeholder="Explain why you need the blood..."
          ></textarea>
        </motion.div>

        {/* Submit Button */}
        <motion.div variants={itemVariants} className="md:col-span-2">
          <button
            type="submit"
            className="w-full py-2 border border-primary text-primary rounded"
          >
            Submit Request
          </button>
        </motion.div>
      </motion.form>
    </div>
  );
}
