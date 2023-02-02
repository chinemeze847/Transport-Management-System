import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import SearchInput from "../../components/SearchInput";
import { useAppContext } from "../../context/AppContext";

const AllUsers = () => {
  const { getUsers, deleteUsers, searchUser, allUsers } = useAppContext();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      await getUsers();
    };

    getData();
  }, [searchUser]);

  const handleDelete = async (id) => {
    setLoading(true);
    const response = prompt(" Are you sure you want to delete?");
    if (response) {
      await deleteUsers(id);
    }
    setLoading(false);
  };

  return (
    <div className="sm:p-10">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">All Users</h1>
        <h2 className="text-gray-600 ml-0.5">
          List of all current registered Users
        </h2>
      </div>

      <div className="mt-0 py-4 overflow-x-auto relative shadow-md sm:rounded-lg bg-white  flex-1">
        <div className="w-1/2 px-6">
          <SearchInput value="searchUser" />
        </div>
        {allUsers ? (
          <div className="my-0  px-2 py-4">
            <div className="flex items-center justify-between mb-5"></div>
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-sm text-blue-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="py-5 px-3">
                    S/N
                  </th>
                  <th scope="col" className="py-5 px-3">
                    Avatar
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
                    Gender
                  </th>
                  <th scope="col" className="py-5 px-3">
                    Trips Taken
                  </th>

                  <th scope="col" className="py-5 px-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {allUsers.users.length === 0 ? (
                  <tr className="text-center font-bold text-xl py-4 px-3">
                    <td className="py-4 px-3">No Users Yet</td>
                  </tr>
                ) : (
                  allUsers.users.map((item, index) => (
                    <tr key={item._id} className="bg-white border-b">
                      <td className="py-4 px-3">{index + 1}</td>

                      <td className="py-4 px-3">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyWLjkYKGswBE2f9mynFkd8oPT1W4Gx8RpDQ&usqp=CAU"
                          alt={item.firstname}
                          className="h-10 w-10 rounded-full object-cover overflow-hidden"
                        />
                      </td>
                      <td className="py-4 px-3">{item.firstname}</td>
                      <td className="py-4 px-3">{item.lastname}</td>

                      <td className="py-4 px-3">{item.email}</td>
                      <td className="py-4 px-3">{item.phone}</td>
                      <td className="py-4 px-3">{item.gender}</td>
                      <td className="py-4 px-3">{item.numOfTrips}</td>

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

export default AllUsers;
