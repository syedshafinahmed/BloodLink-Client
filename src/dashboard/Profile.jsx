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

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.displayName || "",
        email: user.email || "",
        role: user.role || "donor",
        district: user.district || "",
        upazila: user.upazila || "",
        bloodGroup: user.bloodGroup || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    if (!isEditing) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => setIsEditing(true);

  const handleSave = () => {
    axiosSecure
      .put(`/users/${user.email}`, formData)
      .then((res) => {
        console.log("Updated:", res.data);
        setIsEditing(false);
        Swal.fire({
          title: "Profile Updated!",
          text: "Your profile information has been successfully saved.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
      })
      .catch((err) => console.log(err));
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
                color={isEditing ? "success" : "primary"}
                onClick={isEditing ? handleSave : handleEditToggle}
              >
                {isEditing ? "Save" : "Edit"}
              </Button>
            </div>

            {/* <p className="text-lg text-gray-600 mb-1">
              <strong>Name:</strong> {formData.name}
            </p> */}
            <p className="text-lg text-gray-600 mb-1">
              <strong>Email:</strong> {formData.email}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Role:</strong> {formData.role}
            </p>
          </div>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              disabled={!isEditing}
              onChange={handleChange}
              className={`border p-2 rounded outline-none ${isEditing ? "border-primary" : "border-gray-300"
                }`}
            />
          </div>

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

          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">District</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              disabled={!isEditing}
              onChange={handleChange}
              className={`border p-2 rounded outline-none ${isEditing ? "border-primary" : "border-gray-300"
                }`}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Upazila</label>
            <input
              type="text"
              name="upazila"
              value={formData.upazila}
              disabled={!isEditing}
              onChange={handleChange}
              className={`border p-2 rounded outline-none ${isEditing ? "border-primary" : "border-gray-300"
                }`}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Blood Group</label>
            <input
              type="text"
              name="bloodGroup"
              value={formData.bloodGroup}
              disabled={!isEditing}
              onChange={handleChange}
              className={`border p-2 rounded outline-none ${isEditing ? "border-primary" : "border-gray-300"
                }`}
            />
          </div>

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
