import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const [users, setUsers] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  // all users
  const fetchUsers = async () => {
    try {
      const res = await axiosSecure.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch users", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // update user 
  const updateUser = async (email, updatedData, successMsg) => {
    try {
      await axiosSecure.put(`/users/${email}`, updatedData);
      await fetchUsers();
      Swal.fire("Success", successMsg, "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Operation failed", "error");
    }
  };

  const confirmAndUpdate = (email, updatedData, message, successMsg) => {
    Swal.fire({
      title: "Are you sure?",
      text: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#111827",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed",
    }).then((result) => {
      if (result.isConfirmed) {
        updateUser(email, updatedData, successMsg);
      }
    });
  };

  // filtering
  const filteredUsers =
    filterStatus === "all"
      ? users
      : users.filter((u) => u.status === filterStatus);

  if (loading) {
    return <div className="text-center py-10">Loading users...</div>;
  }

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black mb-6">All Users: {users.length}</h2>
        <div className="mb-4 flex gap-3">
          <select
            className="border p-2 rounded"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="table w-full text-center">
          <thead className="bg-gray-900 text-base-200">
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Blood Group</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="border-b hover:bg-gray-300 transition-colors duration-200"
              >
                <td>
                  <img
                    src={user.photo || "https://i.ibb.co/4pDNDk1/avatar.png"}
                    alt="avatar"
                    className="w-10 h-10 object-cover rounded-lg mx-auto"
                  />
                </td>

                <td>{user.name || "N/A"}</td>
                <td>{user.email}</td>
                <td>{user.bloodGroup}</td>

                <td className="capitalize font-semibold">{user.role}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-base-200 text-xs ${user.status === "blocked"
                      ? "bg-primary"
                      : "bg-green-600"
                      }`}
                  >
                    {user.status || "active"}
                  </span>
                </td>

                <td className="space-x-2 border-none shadow-none space-y-3 md:space-y-0 mt-3 flex flex-col md:flex-row justify-center">
                  {/* Block / Unblock */}
                  {user.status !== "blocked" ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        confirmAndUpdate(
                          user.email,
                          { status: "blocked" },
                          "This user will be blocked",
                          "User blocked successfully"
                        )
                      }
                      className="btn btn-xs bg-primary text-base-200"
                    >
                      Block
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        confirmAndUpdate(
                          user.email,
                          { status: "active" },
                          "This user will be unblocked",
                          "User unblocked successfully"
                        )
                      }
                      className="btn btn-xs bg-green-600 text-base-200"
                    >
                      Unblock
                    </motion.button>
                  )}

                  {/* Volunteer */}
                  {user.role === "donor" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        confirmAndUpdate(
                          user.email,
                          { role: "volunteer" },
                          "This user will become a volunteer",
                          "User is now a volunteer"
                        )
                      }
                      className="btn btn-sm md:btn-xs bg-blue-600 text-base-200"
                    >
                      Make Volunteer
                    </motion.button>
                  )}

                  {/* Admin Toggle */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      confirmAndUpdate(
                        user.email,
                        { role: user.role === "admin" ? "donor" : "admin" },
                        user.role === "admin"
                          ? "Admin role will be removed"
                          : "This user will become an admin",
                        user.role === "admin"
                          ? "Admin role removed. User is now a donor"
                          : "User is now an admin"
                      )
                    }
                    className={`btn btn-sm md:btn-xs text-base-200 ${user.role === "admin"
                      ? "bg-yellow-600"
                      : "bg-gray-900"
                      }`}
                  >
                    {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                  </motion.button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <p className="text-center py-6 text-gray-500">No users found</p>
        )}
      </div>
    </motion.div>
  );
};

export default AllUsers;
