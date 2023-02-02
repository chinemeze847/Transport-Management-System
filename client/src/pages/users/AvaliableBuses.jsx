import React, { useEffect, useState } from "react";
import CustomHeader from "../../components/CustomHeader";
import { TbLocation } from "react-icons/tb";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import SearchInput from "../../components/SearchInput";
import AvialableBusList from "../../components/users/AvialableBusList";
import { useAppContext } from "../../context/AppContext";

const AvaliableBuses = () => {
  const { selectedDirection, getDirection } = useAppContext();
  const [direction, setDirection] = useState(selectedDirection);

  useEffect(() => {
    getDirection(direction, setDirection);
  }, []);
  return (
    <div>
      <CustomHeader title="Avialable Buses" />

      <div className="py-8 px-8 min-h-screen">
        <div className="border border-violet-100 h-12 rounded-lg overflow-hidden bg-white flex  ">
          <div className="bg-violet-400 w-20 flex items-center justify-center">
            <TbLocation size={23} className="text-white" />
          </div>

          <div className="flex gap-3 px-6 justify-center items-center ">
            {direction}
          </div>
        </div>

        <div className="my-6">
          <SearchInput value="searchDriver"/>
        </div>

        <AvialableBusList />
      </div>
    </div>
  );
};

export default AvaliableBuses;
