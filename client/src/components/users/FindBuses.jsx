import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const FindBuses = () => {
  const navigate = useNavigate();
  const { findBuses, selectedDirection, handleInputChange } = useAppContext();
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const res = await findBuses(selectedDirection);
    if (res) {
      navigate("/users/avialable");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded p-4 my-12 flex flex-col items-center justify-center">
      <span className="font-semibold text-base text-violet-400 text-center">
        Order Bus
      </span>
      <select
        value={selectedDirection}
        onChange={(e) => handleInputChange("selectedDirection", e.target.value)}
        className="w-full p-4 text-gray-500  rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
      >
        <option value="">Select Direction </option>
        <option value="front-to-back">Front Gate to Back Gate </option>
        <option value="back-to-front">Back Gate to Front Gate </option>
      </select>
      <button
        type="submit"
        disabled={loading}
        onClick={handleSearch}
        className="mt-5 disabled:bg-violet-200 tracking-wide font-semibold bg-violet-500 text-gray-100 w-full py-4 rounded-lg hover:bg-violet-700 transition-all duration-300 ease-in-out flex gap-4 items-center justify-center focus:shadow-outline focus:outline-none"
      >
        <IoSearch size={22} />
        <span className="ml-3">Find Free Buses</span>
        {loading && <TailSpin height="30" width="30" />}
      </button>
    </div>
  );
};

export default FindBuses;
