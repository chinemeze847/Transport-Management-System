import React from "react";
import { useAppContext } from "../../context/AppContext";
import "./ChangeTripStatus.css";
import { AiOutlineCar, AiOutlineHome } from "react-icons/ai";
import { BsFileEarmarkPerson } from "react-icons/bs";

const ChangeTripStatus = ({ tripStatus, _id }) => {
  const { updateTripStatus } = useAppContext();

  const statusClass = (index) => {
    if (tripStatus === "booking") {
      return index === 0 ? "completed" : null;
    }
    if (tripStatus === "transit") {
      return index <= 1 ? "completed" : null;
    }
    if (tripStatus === "finished") {
      return index <= 2 ? "completed" : null;
    }
  };

  const setOrder = async (statusValue) => {
    console.log(statusValue, "statusValue")
    await updateTripStatus(_id, { status: statusValue });
  };

  return (
    <div className="container">
      <h2 className="text-gray-400">Trip Status</h2>
      <div className={`steps flex justify-between pb-1`}>
        <div
          onClick={() => setOrder("booking")}
          className={`step ${statusClass(0)}`}
        >
          <div className="stepIconWrap">
            <div className="stepIcon">
              <BsFileEarmarkPerson />
            </div>
          </div>
          <h4 className="stepTitle">Booking</h4>
        </div>

        <div
          className={`step ${statusClass(1)}`}
          onClick={() => setOrder("transit")}
        >
          <div className="stepIconWrap">
            <div className="stepIcon">
              <AiOutlineCar />
            </div>
          </div>
          <h4 className="stepTitle">On Transit</h4>
        </div>
        <div
          className={`step ${statusClass(2)}`}
          onClick={() => setOrder("finished")}
        >
          <div className="stepIconWrap">
            <div className="stepIcon">
              <AiOutlineHome />
            </div>
          </div>
          <h4 className="stepTitle">Trip Finished</h4>
        </div>
      </div>
    </div>
  );
};

export default ChangeTripStatus;
