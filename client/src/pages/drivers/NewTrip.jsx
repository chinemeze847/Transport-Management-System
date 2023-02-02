import React from "react";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { TailSpin } from "react-loader-spinner";
import CustomHeader from "../../components/CustomHeader";
import { useAppContext } from "../../context/AppContext";

const init = {
  departureTime: "",
  direction: "",
};
const NewTrip = () => {
  const [input, setInput] = useState(init);
  const [loading, setLoading] = useState(false);
  const { createTrip } = useAppContext();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput({ ...input, [name]: value });
  };

  const handleCreateTrip = async (e) => {
    e.preventDefault();
    setLoading(true);

    await createTrip(input);

    setInput(init);
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      <CustomHeader title="Create New Trip" />
      <form className="px-8 py-8" onSubmit={handleCreateTrip}>
        <label htmlFor="direction" className="mb-2 text-gray-500 flex">
          Choose Direction
        </label>
        <select
          id="direction"
          name="direction"
          onChange={handleChange}
          className="w-full p-4 text-gray-500  rounded-lg bg-white border border-violet-300 focus:outline-none focus:border-violet-400 focus:bg-white mb-5 "
        >
          <option>Select Direction</option>
          <option value="Front gate to Back gate">Front gate to Back gate</option>
          <option value="Back gate to Front gate">Back gate to Front gate</option>
        </select>

        <label htmlFor="departureTime" className="mb-2 text-gray-500 flex">
          Date/Time
        </label>
        <input
          onChange={handleChange}
          className="w-full p-4 text-gray-500  rounded-lg bg-white border border-violet-300 focus:outline-none focus:border-violet-400 focus:bg-white "
          type="datetime-local"
          name="departureTime"
          id="departureTime"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-5 disabled:bg-violet-200 tracking-wide font-semibold bg-violet-500 text-gray-100 w-full py-4 rounded-lg hover:bg-violet-700 transition-all duration-300 ease-in-out flex gap-2 items-center justify-center focus:shadow-outline focus:outline-none"
        >
          <IoAdd size={22} />
          <span className="ml-1">Create Trip</span>
          {loading && <TailSpin height="30" width="30" />}
        </button>
      </form>
    </div>
  );
};

export default NewTrip;
