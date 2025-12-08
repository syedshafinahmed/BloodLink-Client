import { useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router";
import { motion } from "framer-motion";
import Select from "react-select";
import locations from "../../../public/location.json";
import { useForm } from "react-hook-form";

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedUpazila, setSelectedUpazila] = useState(null);

  const districtOptions = [
    ...new Set(locations.map((loc) => loc.district)),
  ].map((dist) => ({
    value: dist,
    label: dist,
  }));

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
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div>
      <motion.h1
        className="text-2xl font-black text-center p-10"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Create Donor Account
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-8 rounded-xl bg-base-200 shadow"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Email */}
        <motion.div className="flex flex-col" variants={itemVariants}>
          <label className="font-medium text-xs mb-1">Email</label>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="border border-primary p-2 rounded outline-none"
          />
          {errors.email && (
            <p className="text-[#f9232c] text-xs">{errors.email.message}</p>
          )}
        </motion.div>

        {/* Name */}
        <motion.div className="flex flex-col" variants={itemVariants}>
          <label className="font-medium text-xs mb-1">Name</label>
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
            className="border border-primary p-2 rounded outline-none"
          />
          {errors.name && (
            <p className="text-[#f9232c] text-xs">{errors.name.message}</p>
          )}
        </motion.div>

        {/* Avatar */}
        <motion.div className="flex flex-col" variants={itemVariants}>
          <label className="font-medium text-xs mb-1">Avatar</label>
          <input
            type="file"
            {...register("avatar", { required: "Avatar is required" })}
            className="border border-primary p-2 rounded outline-none"
          />
          {errors.avatar && (
            <p className="text-[#f9232c] text-xs">{errors.avatar.message}</p>
          )}
        </motion.div>

        {/* Blood Group */}
        <motion.div className="flex flex-col" variants={itemVariants}>
          <label className="font-medium text-xs mb-1">Blood Group</label>
          <select
            {...register("bloodGroup", { required: "Blood group is required" })}
            className="border border-primary p-2 rounded outline-none"
          >
            <option value="">Select blood group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>
          {errors.bloodGroup && (
            <p className="text-[#f9232c] text-xs">{errors.bloodGroup.message}</p>
          )}
        </motion.div>

        {/* District */}
        <motion.div className="flex flex-col" variants={itemVariants}>
          <label className="font-medium text-xs mb-1">District</label>
          <Select
            options={districtOptions}
            value={selectedDistrict}
            onChange={(value) => {
              setSelectedDistrict(value);
              setSelectedUpazila(null);
              setValue("district", value.value, { shouldValidate: true });
            }}
            placeholder="Select district"
            isSearchable
            styles={customSelectStyles}
          />
          <input type="hidden" {...register("district", { required: "District is required" })} />
          {errors.district && (
            <p className="text-[#f9232c] text-xs">{errors.district.message}</p>
          )}
        </motion.div>

        {/* Upazila */}
        <motion.div className="flex flex-col" variants={itemVariants}>
          <label className="font-medium text-xs mb-1">Upazila</label>
          <Select
            options={upazilaOptions}
            value={selectedUpazila}
            onChange={(value) => {
              setSelectedUpazila(value);
              setValue("upazila", value.value, { shouldValidate: true });
            }}
            placeholder={
              selectedDistrict ? "Select upazila" : "Select district first"
            }
            isDisabled={!selectedDistrict}
            isSearchable
            styles={customSelectStyles}
          />
          <input type="hidden" {...register("upazila", { required: "Upazila is required" })} />
          {errors.upazila && (
            <p className="text-[#f9232c] text-xs">{errors.upazila.message}</p>
          )}
        </motion.div>

        {/* Password */}
        <motion.div className="flex flex-col" variants={itemVariants}>
          <label className="font-medium text-xs mb-1">Password</label>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                message:
                  "Weak Password"
              }
            })}
            className="border p-2 rounded border-primary outline-none"
          />
          {errors.password && (
            <p className="text-[#f9232c] text-xs">{errors.password.message}</p>
          )}
        </motion.div>

        {/* Confirm Password */}
        <motion.div className="flex flex-col" variants={itemVariants}>
          <label className="font-medium text-xs mb-1">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            className="border p-2 rounded border-primary outline-none"
          />
          {errors.confirmPassword && (
            <p className="text-[#f9232c] text-xs">
              {errors.confirmPassword.message}
            </p>
          )}
        </motion.div>

        {/* Submit */}
        <motion.div
          className="w-full flex flex-col col-span-1 md:col-span-2"
          variants={itemVariants}
        >
          <Button
            type="submit"
            variant="outlined"
            sx={{ borderColor: "#f9232c", color: "#f9232c" }}
          >
            Register
          </Button>

          <span className="text-sm py-5 border-none text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-[#f9232c] font-black">
              Login
            </Link>
          </span>
        </motion.div>
      </motion.form>
    </div>
  );
}
