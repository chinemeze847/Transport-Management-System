import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import SearchInput from "../../components/SearchInput";
import { useAppContext } from "../../context/AppContext";

const AllDrivers = () => {
  const {
    getDrivers,
    deleteDrivers,
    searchDriver,
    allDrivers,
  } = useAppContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      await getDrivers();
    };

    getData();
  }, [searchDriver]);

  const handleDelete = async (id) => {
    setLoading(true);
    const response = prompt(" Are you sure you want to delete?");
    if (response) {
      await deleteDrivers(id);
    }
    setLoading(false);
  };
  return (
    <div className="sm:p-10">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">All Drivers</h1>
        <h2 className="text-gray-600 ml-0.5">
          List of all current registered Drivers
        </h2>
      </div>

      <div className="mt-0 py-4 overflow-x-auto relative shadow-md sm:rounded-lg bg-white  flex-1">
        <div className="w-1/2 px-6">
          <SearchInput value="searchDriver" />
        </div>
        {allDrivers ? (
          <div className="my-0  px-2 py-4">
            <div className="flex items-center justify-between mb-5"></div>
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-sm text-blue-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="py-5 px-3">
                    S/N
                  </th>
                  <th scope="col" className="py-5 px-3">
                    First Name
                  </th>

                  <th scope="col" className="py-5 px-3">
                    Last Name
                  </th>

                  <th scope="col" className="py-5 px-3">
                    Email
                  </th>

                  <th scope="col" className="py-5 px-3">
                    Phone
                  </th>
                  <th scope="col" className="py-5 px-3">
                    Car Model
                  </th>
                  <th scope="col" className="py-5 px-3">
                    Car Capacity
                  </th>
                  <th scope="col" className="py-5 px-3">
                    Car Image
                  </th>

                  <th scope="col" className="py-5 px-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {allDrivers.drivers.length === 0 ? (
                  <tr className="text-center font-bold text-xl py-4 px-3">
                    <td className="py-4 px-3">No Drivers Yet</td>
                  </tr>
                ) : (
                  allDrivers.drivers.map((item, index) => (
                    <tr key={item._id} className="bg-white border-b">
                      <td className="py-4 px-3">{index + 1}</td>

                      <td className="py-4 px-3">{item.firstname}</td>
                      <td className="py-4 px-3">{item.lastname}</td>

                      <td className="py-4 px-3">{item.email}</td>
                      <td className="py-4 px-3">{item.phone}</td>
                      <td className="py-4 px-3">{item.car.carModelName}</td>
                      <td className="py-4 px-3">{item.car.carCapacity}</td>
                      <td className="py-4 px-3">
                        <img
                          src={item.car.carImage}
                          alt={item.car.carModelName}
                          className="h-12 rounded overflow-hidden"
                        />
                      </td>
                      <td className="py-4 px-3">
                        <button
                          type="button"
                          disabled={loading}
                          onClick={() => handleDelete(item._id)}
                          className="mr-2 flex disabled:bg-rose-100 gap-1 font-medium bg-white text-rose-900 p-1 rounded border border-rose-900 hover:underline"
                        >
                          Delete
                          {loading && <TailSpin height={20} width={20} />}
                        </button>
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

export default AllDrivers;
