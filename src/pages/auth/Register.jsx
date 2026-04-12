import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import Select from "react-select";
import locations from "../../../public/location.json";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import logo from '../../assets/BloodLink.png'
import axios from "axios";
import Loading from "../../loading/Loading";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
export default function Register() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { registerUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedUpazila, setSelectedUpazila] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || "light");

  useEffect(() => {
    const html = document.querySelector('html');
    const currentTheme = html.getAttribute('data-theme') || "light";
    setTheme(currentTheme);
  }, []);

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
      backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
      borderColor: "#f9232c",
      color: theme === 'dark' ? '#ffffff' : '#000000',
      boxShadow: "none",
      "&:hover": { borderColor: "#f9232c" },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused 
        ? (theme === 'dark' ? '#374151' : '#f3f4f6')
        : (theme === 'dark' ? '#1f2937' : '#ffffff'),
      color: theme === 'dark' ? '#ffffff' : '#000000',
      "&:hover": {
        backgroundColor: theme === 'dark' ? '#374151' : '#f3f4f6',
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: theme === 'dark' ? '#ffffff' : '#000000',
    }),
    placeholder: (base) => ({
      ...base,
      color: theme === 'dark' ? '#9ca3af' : '#6b7280',
    }),
    input: (base) => ({
      ...base,
      color: theme === 'dark' ? '#ffffff' : '#000000',
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

  const handleRegistration = (data) => {
    setLoading(true);
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append('image', profileImg);
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`
        axios.post(image_API_URL, formData)
          .then(res => {
            const imageURL = res.data.data.url;

            const userProfile = {
              displayName: data.name,
              photoURL: imageURL,
            }
            updateUserProfile(userProfile)
              .then(() => {

                const savedUser = {
                  name: data.name,
                  email: data.email,
                  photo: imageURL,
                  bloodGroup: data.bloodGroup,
                  district: data.district,
                  upazila: data.upazila,
                  role: "donor",
                  status: "active",
                  createdAt: new Date(),
                };

                axiosSecure.post('/users', savedUser)
                  .then(dbRes => {
                    setLoading(false);
                    Swal.fire({
                      icon: "success",
                      title: "Registration Successful!",
                      text: "Welcome to BloodLink",
                      timer: 1800,
                      showConfirmButton: false
                    });
                    navigate(location.state || "/");
                  })
                  .catch(error => {
                    console.log(error);
                    setLoading(false);
                  })

              })
              .catch(error => {
                console.log(error);
                setLoading(false);
              })

          })
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      })
  };

  if (loading) {
    return <Loading></Loading>
  }

  return (
    <div className="w-80 md:w-full bg-white/10 dark:bg-gray-800/10 backdrop-blur-2xl border border-white/20 dark:border-gray-700/20 rounded-2xl shadow-2xl px-10">
      <motion.h1
        className="text-center mb-5 flex flex-col items-center justify-center"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src={logo} className="w-15 md:w-30 mt-5" alt="BloodLink Logo" />
        <span className="text-xs font-black mt-2 text-base-content">Create Donor Account</span>
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit(handleRegistration)}
        className="w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 pt-0 md:pt-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Email */}
        <motion.div className="flex flex-col" variants={itemVariants}>
          <label className="font-medium text-xs mb-1 text-base-content">Email</label>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="border border-[#f9232c] p-2 rounded outline-none bg-base-100 text-base-content placeholder:text-base-content/50"
          />
          {errors.email && (
            <p className="text-[#f9232c] text-xs">{errors.email.message}</p>
          )}
        </motion.div>

        {/* Name */}
        <motion.div className="flex flex-col" variants={itemVariants}>
          <label className="font-medium text-xs mb-1 text-base-content">Name</label>
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
            className="border border-[#f9232c] p-2 rounded outline-none bg-base-100 text-base-content placeholder:text-base-content/50"
          />
          {errors.name && (
            <p className="text-[#f9232c] text-xs">{errors.name.message}</p>
          )}
        </motion.div>

        {/* Photo */}
        <motion.div className="flex flex-col" variants={itemVariants}>
          <label className="font-medium text-xs mb-1 text-base-content">Photo</label>
          <input
            type="file"
            {...register("photo", { required: "photo is required" })}
            className="border border-[#f9232c] p-2 rounded outline-none bg-base-100 text-base-content file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#f9232c] file:text-white hover:file:bg-[#e31b24]"
          />
          {errors.photo && (
            <p className="text-[#f9232c] text-xs">{errors.photo.message}</p>
          )}
        </motion.div>

        {/* Blood Group */}
        <motion.div className="flex flex-col" variants={itemVariants}>
          <label className="font-medium text-xs mb-1 text-base-content">Blood Group</label>
          <select
            {...register("bloodGroup", { required: "Blood group is required" })}
            className="border border-[#f9232c] p-2 rounded outline-none bg-base-100 text-base-content"
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
          <label className="font-medium text-xs mb-1 text-base-content">District</label>
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
          <label className="font-medium text-xs mb-1 text-base-content">Upazila</label>
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
          <label className="font-medium text-xs mb-1 text-base-content">Password</label>
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
            className="border p-2 rounded border-[#f9232c] outline-none bg-base-100 text-base-content placeholder:text-base-content/50"
          />
          {errors.password && (
            <p className="text-[#f9232c] text-xs">{errors.password.message}</p>
          )}
        </motion.div>

        {/* Confirm Password */}
        <motion.div className="flex flex-col" variants={itemVariants}>
          <label className="font-medium text-xs mb-1 text-base-content">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            className="border p-2 rounded border-[#f9232c] outline-none bg-base-100 text-base-content placeholder:text-base-content/50"
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
            sx={{
              borderColor: "#f9232c", 
              backgroundColor: '#f9232c',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#e31b24',
                borderColor: "#e31b24",
              },
            }}
          >
            Register
          </Button>

          <span className="text-md font-medium py-5 border-none text-center text-base-content">
            Already have an account?{" "}
            <Link state={location.state} to="/login" className="text-[#f9232c] uppercase font-black">
              Login
            </Link>
          </span>
        </motion.div>
      </motion.form>
    </div>
  );
}