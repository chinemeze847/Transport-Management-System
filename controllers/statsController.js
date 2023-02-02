import User from "../models/User.js";
import { UnAuthorizedError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import moment from "moment/moment.js";
import Driver from "../models/Driver.js";
import Trip from "../models/Trip.js";

const getStats = async (req, res) => {
  if (req.user.role !== "admin") {
    throw new UnAuthorizedError(
      "You are not permitted to access this resource"
    );
  }

  const numOfDriver = await Driver.countDocuments({ role: { $ne: "admin" } });
  const numOfUsers = await User.countDocuments();
  const numOfTrips = await Trip.countDocuments();
  let numCurrentTrips = await Trip.find({ status: "booking" });
 
  numCurrentTrips = await Promise.all(
    numCurrentTrips.map(async (trip) => {
      const tripInfo = await Promise.all(
        trip.passengers.map(async (item) => {
          const passengerInfo = await User.findById(item.passengerId);
          return passengerInfo;
        })
      );

      const { car } = await Driver.findById(trip.driver.driverId, "car");

      const ticketsInfo = `${tripInfo.length}/${car.carCapacity} tickets sold `;

      return {
        ...trip._doc,
        passengers: tripInfo,
        carInfo: car,
        ticketsInfo,
      };
    })
  );

  res.status(StatusCodes.OK).json([
    {
      title: "Driver",
      total: numOfDriver,
    },
    {
      title: "User",
      total: numOfUsers,
    },
    {
      title: "Trip",
      total: numOfTrips,
    },
    {
      title: "Current Trip",
      total: numCurrentTrips.length,
      trips: numCurrentTrips,
    },
  ]);
};

const getMonthlyStats = async (req, res) => {
  let monthlyApplications = await Trip.aggregate([
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");

      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json(monthlyApplications);
};

export { getStats, getMonthlyStats };
