import React, { useState } from "react";
import Select from "react-select";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import locations from "../../public/location.json";

const bloodOptions = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
];

const SearchDonors = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedBlood, setSelectedBlood] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedUpazila, setSelectedUpazila] = useState(null);
  const [donors, setDonors] = useState([]);

  // District options
  const districtOptions = [
    ...new Set(locations.map((loc) => loc.district)),
  ].map((dist) => ({ value: dist, label: dist }));

  // Upazila options
  const upazilaOptions = selectedDistrict
    ? locations
      .filter((loc) => loc.district === selectedDistrict.value)
      .map((loc) => ({ value: loc.upazila, label: loc.upazila }))
    : [];

  const handleSearch = async () => {
    try {
      const params = {};
      if (selectedBlood) params.bloodGroup = selectedBlood.value;
      if (selectedDistrict) params.district = selectedDistrict.value;
      if (selectedUpazila) params.upazila = selectedUpazila.value;

      const res = await axiosSecure.get("/users", { params });
      setDonors(res.data);

      if (res.data.length === 0) {
        Swal.fire({
          icon: "info",
          title: "No donors found",
          text: "Try another combination of search criteria.",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Search Failed",
        text: "Could not fetch donors. Try again later.",
      });
    }
  };

  return (
    <div className="max-w-7xl min-h-screen mx-auto mt-20 p-6">
      <h2 className="text-4xl font-bold mb-10 text-center">Search Blood Donors</h2>

      {/* Search Form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Select
          options={bloodOptions}
          placeholder="Blood Group"
          value={selectedBlood}
          onChange={setSelectedBlood}
        />

        <Select
          options={districtOptions}
          placeholder="District"
          value={selectedDistrict}
          onChange={(val) => {
            setSelectedDistrict(val);
            setSelectedUpazila(null);
          }}
        />

        <Select
          options={upazilaOptions}
          placeholder="Upazila"
          value={selectedUpazila}
          onChange={setSelectedUpazila}
          isDisabled={!selectedDistrict}
        />

        <button
          onClick={handleSearch}
          className="bg-primary text-base-200 rounded px-4 py-2 font-semibold hover:bg-red-700 transition"
        >
          Search
        </button>
      </div>

      {/* Donors Table */}
      {donors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-x-auto rounded-lg border border-gray-700 bg-base-200"
        >
          <table className="w-full text-center text-gray-900">
            <thead className="bg-gray-900 text-base-200">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Blood Group</th>
                <th className="p-3">Status</th>
                <th className="p-3">District</th>
                <th className="p-3">Upazila</th>
                <th className="p-3">Contact</th>
              </tr>
            </thead>

            <tbody className="text-xs md:text-sm">
              {donors.map((donor) => (
                <tr
                  key={donor._id}
                  className="border-b border-gray-700 hover:bg-gray-300 transition"
                >
                  <td className="p-3">{donor.name}</td>
                  <td className="p-3 font-semibold">{donor.bloodGroup}</td>
                  <td className="p-3"><span className="badge badge-sm badge-success">{donor.status}</span></td>
                  <td className="p-3">{donor.district}</td>
                  <td className="p-3">{donor.upazila}</td>
                  <td className="p-3">{donor.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {donors.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No donors to display. Fill the form above and click search.
        </p>
      )}
    </div>
  );
};

export default SearchDonors;
