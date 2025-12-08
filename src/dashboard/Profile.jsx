import React, { useState } from "react";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "",
    district: user?.district || "",
    upazila: user?.upazila || "",
    bloodGroup: user?.bloodGroup || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    console.log("Updated data:", formData);
    setIsEditing(false);
    
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
            className="w-36 h-36 rounded-xl object-cover"
          />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold">{formData.name}</h2>
              <Button
                variant="outlined"
                color={isEditing ? "success" : "primary"}
                onClick={isEditing ? handleSave : handleEditToggle}
              >
                {isEditing ? "Save" : "Edit"}
              </Button>
            </div>
            <p className="text-lg text-gray-600 mb-1">
              <strong>Name:</strong> {user.displayName}
            </p>
            <p className="text-lg text-gray-600 mb-1">
              <strong>Email:</strong> {formData.email}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Role:</strong> {formData.role}
            </p>
          </div>
        </div>

        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Name</label>
            <input
              type="text"
              name="name"
              defaultValue={user.displayName} onChange={handleChange}
              disabled={!isEditing}
              className={`border p-2 rounded outline-none ${isEditing ? "border-primary" : "border-gray-300"
                }`}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={user.email}
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
              defaultValue={user.district}
              onChange={handleChange}
              disabled={!isEditing}
              className={`border p-2 rounded outline-none ${isEditing ? "border-primary" : "border-gray-300"
                }`}
            />
          </div>

          {/* Upazila */}
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Upazila</label>
            <input
              type="text"
              name="upazila"
              defaultValue={user.upazila}
              onChange={handleChange}
              disabled={!isEditing}
              className={`border p-2 rounded outline-none ${isEditing ? "border-primary" : "border-gray-300"
                }`}
            />
          </div>

          {/* Blood Group */}
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Blood Group</label>
            <input
              type="text"
              name="bloodGroup"
              defaultValue={user.bloodGroup}
              onChange={handleChange}
              disabled={!isEditing}
              className={`border p-2 rounded outline-none ${isEditing ? "border-primary" : "border-gray-300"
                }`}
            />
          </div>

          {/* Role */}
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Role</label>
            <input
              type="text"
              name="role"
              defaultValue={user.role}
              onChange={handleChange}
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