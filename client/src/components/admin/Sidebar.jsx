import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiUsers } from "react-icons/hi";
import { IoMdPower } from "react-icons/io";
import { ImUsers } from "react-icons/im";
import { AiOutlineCar, AiOutlineHome, AiOutlineUserAdd } from "react-icons/ai";
import { useAppContext } from "../../context/AppContext";

const Sidebar = () => {
  const { logout } = useAppContext();
  const navigate = useNavigate()
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className=" h-full bg-violet-200">
      <div className=" border-b h-16 py-10 flex justify-around items-center">
        <p className="text-violet-900 font-bold text-xl">Administrator</p>
      </div>
      <div className="p-4 space-y-14">
        <div className="space-y-2">
          <h1 className="text-violet-900">Menu</h1>
          <div className="">
            <Link
              to="/admin"
              className="flex p-3 items-center text-gray-700 space-x-4 0 hover:bg-gray-50 hover:text-blue-600 cursor-pointer"
            >
              <AiOutlineHome size={24} className="text-violet-500" />
              <span className=" ">Dashboard</span>
            </Link>
          </div>
          <div className="">
            <Link
              to="/admin/users"
              className="flex p-3 text-gray-700 space-x-4 0 hover:bg-gray-50 hover:text-blue-600 cursor-pointer"
            >
              <ImUsers size={24} className="text-violet-500" />
              <span className="text-gray-600  ">Users</span>
            </Link>
          </div>
          <div className="">
            <Link
              to="/admin/drivers"
              className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  "
            >
              <HiUsers size={24} className="text-violet-500" />
              <span className="text-gray-600">Drivers</span>
            </Link>
          </div>
          <div className="">
            <Link
              to="/admin/trips"
              className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  "
            >
              <AiOutlineCar size={24} className="text-violet-500" />
              <span className="text-gray-600">Trips</span>
            </Link>
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-violet-900">Add</h1>
          <div className="">
            <Link
              to="/admin/add-driver"
              className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  "
            >
              <AiOutlineUserAdd size={24} className="text-violet-500" />
              <span className="text-gray-600  ">New Driver</span>
            </Link>
          </div>
        </div>
        <div className="space-y-6">
          <div className="">
            <div
              onClick={handleLogout}
              className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  "
            >
              <IoMdPower size={24} className="text-violet-500" />
              <span className="text-gray-600  ">Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
