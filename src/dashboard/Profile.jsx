import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [isEditing, setIsEditing] = useState(false);

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
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user?.email, axiosSecure]);

  const handleChange = (e) => {
    if (!isEditing) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => setIsEditing(true);

  const handleSave = async () => {
    try {
      const res = await axiosSecure.put(`/users/${user.email}`, formData);
      if (res.data) {
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          role: res.data.role || "",
          district: res.data.district || "",
          upazila: res.data.upazila || "",
          bloodGroup: res.data.bloodGroup || "",
        });
      }
      setIsEditing(false);
      Swal.fire({
        title: "Profile Updated!",
        text: "Your profile information has been successfully saved.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
          <img
            src={user?.photoURL}
            alt="User Avatar"
            className="w-28 h-28 rounded-xl object-cover"
          />

          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold">{formData.name}</h2>

              <Button
                variant="outlined"
                color={isEditing ? "success" : "[#f9232c]"}
                onClick={isEditing ? handleSave : handleEditToggle}
              >
                {isEditing ? "Save" : "Edit"}
              </Button>
            </div>

            <p className="text-lg text-gray-600 mb-1">
              <strong>Email:</strong> {formData.email}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Role:</strong> {formData.role}
            </p>
          </div>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              disabled
              className="border border-gray-300 p-2 rounded outline-none bg-gray-100"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="border border-gray-300 p-2 rounded outline-none bg-gray-100"
            />
          </div>

          {/* District */}
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">District</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              disabled={!isEditing}
              onChange={handleChange}
              className={`border p-2 rounded outline-none ${isEditing ? "border-[#f9232c]" : "border-gray-300"
                }`}
            />
          </div>

          {/* Upazila */}
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Upazila</label>
            <input
              type="text"
              name="upazila"
              value={formData.upazila}
              disabled={!isEditing}
              onChange={handleChange}
              className={`border p-2 rounded outline-none ${isEditing ? "border-[#f9232c]" : "border-gray-300"
                }`}
            />
          </div>

          {/* Blood Group */}
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Blood Group</label>
            <input
              type="text"
              name="bloodGroup"
              value={formData.bloodGroup}
              disabled={!isEditing}
              onChange={handleChange}
              className={`border p-2 rounded outline-none ${isEditing ? "border-[#f9232c]" : "border-gray-300"
                }`}
            />
          </div>

          {/* Role */}
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              disabled
              className="border border-gray-300 p-2 rounded outline-none bg-gray-100"
            />
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Profile;
