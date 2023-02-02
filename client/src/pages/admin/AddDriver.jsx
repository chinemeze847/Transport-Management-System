import axios from "axios";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as ACTIONS from "../../context/actions";
import { AiFillFolderAdd, AiOutlineCar } from "react-icons/ai";
import { addDriverValidator } from "../../lib/formValidator";
import { useAppContext } from "../../context/AppContext";
import { TailSpin } from "react-loader-spinner";

const initState = {
  firstname: "",
  lastname: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  carModelName: "",
  carCapacity: "",
};

const AddDriver = () => {
  const [carImage, setCarImage] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch, addDriver } = useAppContext();

  const handleSubmit = async (values, { resetForm }) => {
    if (!carImage) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: "Please specify an image",
      });
    }
    setLoading(true);
    const carImageData = new FormData();
    carImageData.append("file", carImage);
    carImageData.append("upload_preset", "upload");

    try {
      const carUploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/counselokpabi/image/upload",
        carImageData
      );

      const { url: carImageUrl } = carUploadRes.data;

      const {
        firstname,
        lastname,
        phone,
        email,
        password,
        carModelName,
        carCapacity,
      } = values;

      const newDriver = {
        firstname,
        lastname,
        phone,
        email,
        password,
        car: {
          carImage: carImageUrl,
          carModelName,
          carCapacity,
        },
      };

      const res = await addDriver(newDriver);

      if (res) {
        resetForm();
        setCarImage("");
        dispatch({
          type: ACTIONS.SUCCESS_MSG,
          payload: { msg: "Student Created Successfully" },
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: { msg: error.message },
      });

      setCarImage("");
    }
  };

  const formik = useFormik({
    initialValues: initState,
    validate: addDriverValidator,
    onSubmit: handleSubmit,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-xl font-semibold leading-6 text-gray-900">
                Driver Information
              </h3>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      id="firstname"
                      {...formik.getFieldProps("firstname")}
                      autoComplete="given-name"
                      className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-violet-500 focus:outline-none focus:ring-violet-500 sm:text-sm"
                    />
                    {formik.errors.firstname && formik.touched.firstname ? (
                      <span className="text-sm text-rose-500">
                        {formik.errors.firstname}
                      </span>
                    ) : null}
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="lastname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last name
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      id="lastname"
                      {...formik.getFieldProps("lastname")}
                      autoComplete="family-name"
                      className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-violet-500 focus:outline-none focus:ring-violet-500 sm:text-sm"
                    />
                    {formik.errors.lastname && formik.touched.lastname ? (
                      <span className="text-sm text-rose-500">
                        {formik.errors.lastname}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className=" grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      {...formik.getFieldProps("email")}
                      autoComplete="email"
                      className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-violet-500 focus:outline-none focus:ring-violet-500 sm:text-sm"
                    />
                    {formik.errors.email && formik.touched.email ? (
                      <span className="text-sm text-rose-500">
                        {formik.errors.email}
                      </span>
                    ) : null}
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      {...formik.getFieldProps("phone")}
                      name="phone"
                      id="phone"
                      className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-violet-500 focus:outline-none focus:ring-violet-500 sm:text-sm"
                    />
                    {formik.errors.phone && formik.touched.phone ? (
                      <span className="text-sm text-rose-500">
                        {formik.errors.phone}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      {...formik.getFieldProps("password")}
                      id="password"
                      autoComplete="password"
                      className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-violet-500 focus:outline-none focus:ring-violet-500 sm:text-sm"
                    />
                    {formik.errors.password && formik.touched.password ? (
                      <span className="text-sm text-rose-500">
                        {formik.errors.password}
                      </span>
                    ) : null}
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      {...formik.getFieldProps("confirmPassword")}
                      autoComplete="confirmPassword"
                      className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-violet-500 focus:outline-none focus:ring-violet-500 sm:text-sm"
                    />
                    {formik.errors.confirmPassword &&
                    formik.touched.confirmPassword ? (
                      <span className="text-sm text-rose-500">
                        {formik.errors.confirmPassword}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>

        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4  sm:px-0">
              <h3 className="text-xl font-semibold leading-6 text-gray-900">
                Car Information
              </h3>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="carModelName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Car Model Name
                    </label>
                    <input
                      type="text"
                      name="carModelName"
                      id="carModelName"
                      {...formik.getFieldProps("carModelName")}
                      autoComplete="carModelName"
                      className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-violet-500 focus:outline-none focus:ring-violet-500 sm:text-sm"
                    />
                    {formik.errors.carModelName &&
                    formik.touched.carModelName ? (
                      <span className="text-sm text-rose-500">
                        {formik.errors.carModelName}
                      </span>
                    ) : null}
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="carCapacity"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Car Capacity
                    </label>
                    <input
                      type="number"
                      name="carCapacity"
                      {...formik.getFieldProps("carCapacity")}
                      id="carCapacity"
                      autoComplete="carCapacity"
                      className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-violet-500 focus:outline-none focus:ring-violet-500 sm:text-sm"
                    />
                    {formik.errors.carCapacity && formik.touched.carCapacity ? (
                      <span className="text-sm text-rose-500">
                        {formik.errors.carCapacity}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Car Image
                  </label>
                  {!carImage ? (
                    <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="carImage"
                            className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload an Image</span>
                            <input
                              id="carImage"
                              name="carImage"
                              type="file"
                              onChange={(e) => setCarImage(e.target.files[0])}
                              className="sr-only"
                            />
                          </label>
                        </div>

                        <p className="text-xs text-gray-500">
                          JPG, JPEG up to 1MB
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className=" w-full mt-3 flex-1 relative">
                      <div>
                        <img
                          className="flex-1 w-full object-cover "
                          src={URL.createObjectURL(carImage)}
                        />
                      </div>
                      <svg
                        className="fill-current h-10 w-10 text-red-500 absolute top-4 right-4"
                        role="button"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        onClick={() => setCarImage("")}
                      >
                        <title>Remove</title>
                        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:grid md:grid-cols-3 md:gap-6 mt-5 ">
          <div className="md:col-span-1"></div>
          <div className="bg-gray-50 px-4 py-3 md:col-span-2 md:mt-0 flex items-center justify-center sm:px-6">
            <button
              disabled={loading}
              type="submit"
              className="flex gap-3 w-3/4 disabled:bg-violet-300  justify-center py-2 rounded-md border border-transparent bg-violet-600 px-4 text-sm font-medium text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            >
              Save
              {loading && <TailSpin width={20} height={20} />}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddDriver;
