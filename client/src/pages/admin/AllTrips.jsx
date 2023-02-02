import { format } from "date-fns";
import React, { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import SearchInput from "../../components/SearchInput";
import { useAppContext } from "../../context/AppContext";

const AllTrips = () => {
  const { getTrips, searchDriver, allTrips } = useAppContext();

  useEffect(() => {
    const getData = async () => {
      await getTrips();
    };

    getData();
  }, [searchDriver]);

  return (
    <div className="sm:p-10">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">All Trips</h1>
        <h2 className="text-gray-600 ml-0.5">List of all Trips</h2>
      </div>

      <div className="mt-0 py-4 overflow-x-auto relative shadow-md sm:rounded-lg bg-white  flex-1">
        <div className="w-1/2 px-6">
          <SearchInput value="searchDriver" />
        </div>
        {allTrips ? (
          <div className="my-0  px-2 py-4">
            <div className="flex items-center justify-between mb-5"></div>
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-sm text-blue-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="py-5 px-3">
                    S/N
                  </th>
                  <th scope="col" className="py-5 px-3">
                    Car Image
                  </th>
                  <th scope="col" className="py-5 px-3">
                    Car Model
                  </th>
                  <th scope="col" className="py-5 px-3">
                    Full Name
                  </th>

                  <th scope="col" className="py-5 px-3">
                    Driver Email
                  </th>

                  <th scope="col" className="py-5 px-3">
                    Driver Phone
                  </th>
                  <th scope="col" className="py-5 px-3">
                    Ticket
                  </th>

                  <th scope="col" className="py-5 px-3">
                    Depature Time
                  </th>
                  <th scope="col" className="py-5 px-3">
                    Status
                  </th>

                  <th scope="col" className="py-5 px-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {allTrips.trips.length === 0 ? (
                  <tr className="text-center font-bold text-xl py-4 px-3">
                    <td className="py-4 px-3">No Trips Yet</td>
                  </tr>
                ) : (
                  allTrips.trips.map((item, index) => (
                    <tr key={item._id} className="bg-white border-b">
                      <td className="py-4 px-3">{index + 1}</td>

                      <td className="py-4 px-3">
                        <img
                          src={item.carInfo.carImage}
                          alt={item.carInfo.carModel}
                          className="h-12  rounded-md object-cover overflow-hidden"
                        />
                      </td>
                      <td className="py-4 px-3">{item.carInfo.carModelName}</td>
                      <td className="py-4 px-3">{item.driver.fullname}</td>

                      <td className="py-4 px-3">{item.driver.email}</td>
                      <td className="py-4 px-3">{item.driver.phone}</td>
                      <td className="py-4 px-3">{item.ticketsInfo}</td>
                      <td className="py-4 px-3">
                        {format(new Date(item.departureTime), "EEEE do HH:mm")}
                      </td>
                      <td className="py-4 px-3">{item.status}</td>

                      <td className="py-4 px-3">
                        <Link
                          to={`/admin/trips/${item._id}`}
                          className="mr-2 font-medium bg-white text-blue-900 p-1 rounded border border-blue-900 hover:underline"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <TailSpin />
        )}
      </div>
    </div>
  );
};

export default AllTrips;
