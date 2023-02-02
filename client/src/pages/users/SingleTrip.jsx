import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import CustomHeader from "../../components/CustomHeader";
import TripInfo from "../../components/TripInfo";
import { useAppContext } from "../../context/AppContext";

const SingleTrip = () => {
  const { singleTrip, getSingleTrip, bookBus, unbookBus } = useAppContext();
  const [loading, setLoading] = useState();
  const { tripId } = useParams();

  useEffect(() => {
    const getData = async () => {
      await getSingleTrip(tripId);
    };

    getData();
  }, [tripId]);

  const handleBookBus = async () => {
    setLoading(true);

    await bookBus(singleTrip._id);

    setLoading(false);
  };
  const handleUnbookBus = async () => {
    setLoading(true);

    await unbookBus(singleTrip._id);

    setLoading(false);
  };

  return (
    <div className="min-h-screen pb-4">
      <CustomHeader title="Single Trip" />

      {singleTrip ? (
        <div className=" px-8">
          <div className="flex flex-col items-center gap-1 my-8">
            <span className="text-sm text-gray-400 font-semibold">
              Driver Infomation
            </span>
            <div className="rounded-full h-20 w-20  border-2 border-violet-600 bg-white text-violet-600 flex items-center justify-center text-3xl font-bold">
              <span>{singleTrip.driver.firstname.slice(0, 1)}</span>
              <span>{singleTrip.driver.lastname.slice(0, 1)}</span>
            </div>
            <h3 className="font-semibold text-lg">
              {singleTrip.driver.firstname} {singleTrip.driver.lastname}
            </h3>
            <span>{singleTrip.driver.phone}</span>
          </div>

          <img
            src={singleTrip.driver.car.carImage}
            alt="car"
            className="rounded-md my-4 "
          />

          <TripInfo singleTrip={singleTrip} />

          <button
            type="submit"
            disabled={loading || singleTrip.status !== "booking"}
            onClick={singleTrip.hasBeenBook ? handleUnbookBus : handleBookBus}
            className={`mt-5 disabled:bg-violet-200 disabled:cursor-not-allowed tracking-wide font-semibold ${
              singleTrip.hasBeenBook ? "bg-rose-400" : " bg-violet-500"
            } text-gray-100 w-full py-4 rounded-lg hover:bg-violet-700 transition-all duration-300 ease-in-out flex gap-4 items-center justify-center focus:shadow-outline focus:outline-none`}
          >
            <IoMdCheckmarkCircleOutline size={22} />
            <span className="ml-3">
              {singleTrip.hasBeenBook ? "Unbook Bus" : "Book Bus"}
            </span>
            {loading && <TailSpin height="30" width="30" />}
          </button>
        </div>
      ) : (
        <TailSpin />
      )}
    </div>
  );
};

export default SingleTrip;
