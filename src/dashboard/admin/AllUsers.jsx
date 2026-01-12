import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Skeleton = ({ className }) => (
  <div
    className={`animate-pulse rounded bg-base-300/60 dark:bg-base-700/50 ${className}`}
  />
);

const TableSkeleton = () => {
  return (
    <div className="p-6 space-y-6">
      <Skeleton className="h-6 w-40 rounded-full" />

      <div className="flex justify-between">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-10 w-40 rounded-md" />
      </div>

      <div className="rounded-lg overflow-hidden">
        <div className="grid grid-cols-7 gap-4 p-4 bg-base-200">
          {[...Array(7)].map((_, i) => (
            <Skeleton key={i} className="h-4" />
          ))}
        </div>

        {[...Array(6)].map((_, row) => (
          <div
            key={row}
            className="grid grid-cols-7 gap-4 p-4"
          >
            {[...Array(7)].map((_, col) => (
              <Skeleton key={col} className="h-6" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const [users, setUsers] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
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

  const filteredUsers =
    filterStatus === "all"
      ? users
      : users.filter((u) => u.status === filterStatus);

  if (loading) return <TableSkeleton />;

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <span
        className="inline-block mb-4 px-4 py-1.5 rounded-full
        bg-[#f9232c]/10 text-[#f9232c]
        text-xs font-extrabold uppercase tracking-[0.3em]
        border border-[#f9232c]/30"
      >
        User Management
      </span>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-3xl font-black text-base-content">
          All Users: {filteredUsers.length}
        </h2>

        <select
          className="border border-base-300 bg-base-100 dark:bg-base-900
          p-2 rounded text-base-content outline-none"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-base-300 rounded-lg">
        <table className="table w-full text-center text-base-content">
          <thead className="bg-base-200 dark:bg-base-800">
            <tr>
              <th className="align-middle">Avatar</th>
              <th className="align-middle">Name</th>
              <th className="align-middle">Email</th>
              <th className="align-middle">Blood Group</th>
              <th className="align-middle">Role</th>
              <th className="align-middle">Status</th>
              <th className="align-middle">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="border-b border-base-300 hover:bg-base-200/60
                dark:hover:bg-base-800 transition-colors"
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
                    className={`px-2 py-1 rounded text-xs text-base-200
                    ${user.status === "blocked"
                      ? "bg-[#f9232c]"
                      : "bg-green-600"}`}
                  >
                    {user.status || "active"}
                  </span>
                </td>

                <td className="space-y-2 md:space-y-0 md:space-x-2 flex flex-col md:flex-row justify-center h-17 items-center">
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
                      className="btn btn-xs bg-[#f9232c] text-base-200"
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
                      className="btn btn-xs bg-blue-600 text-base-200"
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
                          ? "Admin removed"
                          : "User is now an admin"
                      )
                    }
                    className={`btn btn-xs text-base-200
                    ${user.role === "admin"
                      ? "bg-yellow-600"
                      : "bg-base-content"}`}
                  >
                    {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                  </motion.button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <p className="text-center py-6 text-base-content/60">
            No users found
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default AllUsers;
