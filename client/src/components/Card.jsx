import React from "react";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Card = () => {
  const { driverTrips } = useAppContext();
  return (
    <div className="flex justify-between items-center px-16 py-6 text-white rounded-xl bg-violet-500">
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-sm">Trips Made</span>
        <h3 className="font-bold text-4xl">{driverTrips.length}</h3>
      </div>
      <Link to="/drivers/add-trip" className="bg-white px-2 py-1 rounded">
        <MdAdd size={28} className="text-violet-500" />
      </Link>
    </div>
  );
};

export default Card;
