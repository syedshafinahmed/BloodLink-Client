import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Skeleton = ({ className }) => (
  <div
    className={`animate-pulse rounded-lg bg-base-300/60 dark:bg-base-700/50 ${className}`}
  />
);

const ProfileSkeleton = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-0 py-10 space-y-10">
      <div className="flex justify-center">
        <Skeleton className="h-6 w-44 rounded-full" />
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        <Skeleton className="w-28 h-28 rounded-xl" />
        <div className="flex-1 space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-5 w-80" />
          <Skeleton className="h-5 w-40" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-12 rounded-md" />
        ))}
      </div>
    </section>
  );
};

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    district: "",
    upazila: "",
    bloodGroup: "",
  });

  const fetchUserData = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      const res = await axiosSecure.get("/users", {
        params: { email: user.email },
      });

      const backendUser = res.data?.[0];
      if (backendUser) {
        setFormData({
          name: backendUser.name || user.displayName || "",
          email: backendUser.email || user.email || "",
          role: backendUser.role || "",
          district: backendUser.district || "",
          upazila: backendUser.upazila || "",
          bloodGroup: backendUser.bloodGroup || "",
        });
      }
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user?.email, axiosSecure]);

  const handleChange = (e) => {
    if (!isEditing) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await axiosSecure.put(`/users/${user.email}`, formData);
      if (res.data) setFormData(res.data);
      setIsEditing(false);

      Swal.fire({
        title: "Profile Updated!",
        text: "Your profile information has been successfully saved.",
        icon: "success",
        confirmButtonColor: "#f9232c",
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <ProfileSkeleton />;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-0 py-10">
        <span className="px-4 py-1.5 rounded-full bg-[#f9232c]/10 text-[#f9232c]
          text-xs font-extrabold uppercase tracking-[0.3em]
          border border-[#f9232c]/30">
          Profile
        </span>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row items-center md:items-start mt-8 gap-8 mb-10">
          <img
            src={user?.photoURL}
            alt="User Avatar"
            className="w-28 h-28 rounded-xl object-cover"
          />

          <div className="flex-1 w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold text-base-content">
                {formData.name}
              </h2>

              <Button
                variant="outlined"
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                sx={{
                  borderColor: "#f9232c",
                  color: "#f9232c",
                }}
              >
                {isEditing ? "Save" : "Edit"}
              </Button>
            </div>

            <p className="text-lg text-base-content/70 mb-1">
              <strong>Email:</strong> {formData.email}
            </p>
            <p className="text-lg text-base-content/70">
              <strong>Role:</strong> {formData.role}
            </p>
          </div>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Name", name: "name", disabled: true },
            { label: "Email", name: "email", disabled: true },
            { label: "District", name: "district" },
            { label: "Upazila", name: "upazila" },
            { label: "Blood Group", name: "bloodGroup" },
            { label: "Role", name: "role", disabled: true },
          ].map(({ label, name, disabled }) => (
            <div key={name} className="flex flex-col">
              <label className="font-medium text-sm mb-1 text-base-content">
                {label}
              </label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                disabled={disabled || !isEditing}
                onChange={handleChange}
                className={`border p-2 rounded outline-none
                  bg-base-100 dark:bg-base-900 text-base-content
                  ${disabled || !isEditing
                    ? "border-base-300"
                    : "border-[#f9232c]"}`}
              />
            </div>
          ))}
        </form>
      </motion.div>
    </div>
  );
};

export default Profile;
