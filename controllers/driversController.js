import Driver from "../models/Driver.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthorizedError,
} from "../errors/index.js";
import Trip from "../models/Trip.js";

const createDriver = async (req, res) => {
  const { role, userId } = req.user;

  if (role !== "admin") {
    throw new UnAuthorizedError("You cannot perform this action!");
  }

  const { firstname, lastname, email, password, phone, car } = req.body;

  if (!firstname || !lastname || !email || !password || !phone || !car) {
    throw new BadRequestError("You must provide all Fields");
  }

  const foundDriver = await Driver.findOne({ firstname, lastname, email });

  if (foundDriver) {
    throw new BadRequestError(" Driver already exists");
  }

  let driver = await Driver.create(req.body);

  res
    .status(StatusCodes.CREATED)
    .json({ driver, msg: "Driver Created Successfully" });
};

const getAllDrivers = async (req, res) => {
  const { status, sort, search } = req.query;
  let queryObject = {};

  // ADD BASED ON CONDITIONS
  if (status && status !== "all") {
    queryObject.status = status;
  }

  if (search) {
    const stringSearchFields = ["firstname", "lastname", "email", "car.carModelName"];

    const query = {
      $or: [
        ...stringSearchFields.map((field) => ({
          [field]: new RegExp("^" + search, "i"),
        })),
      ],
    };
    queryObject = { ...queryObject, ...query };
  }

  // No AWAIT
  let result = Driver.find(queryObject);

  // CHAIN CONNDITIONS
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("firstname");
  }
  if (sort === "z-a") {
    result = result.sort("-firstname");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  let drivers = await result;

  drivers = await Promise.all(
    drivers.map(async (driver) => {
      const driverTrips= await Trip.find({
        "driver.driverId": driver._id,
      });

      const numOfTrips = driverTrips.length;
    
      return {
        ...driver._doc,
        numOfTrips,
      };
    })
  );

  const totalDrivers = await Driver.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalDrivers / limit);

  res.status(StatusCodes.OK).json({
    drivers,
    totalDrivers,
    numOfPages,
  });
};


const getSingleDriver = async (req, res) => {
  const { id: driverId } = req.params;

  const singleDriver = await Driver.findOne({ _id: driverId });

  if (!singleDriver) {
    throw new NotFoundError(`No driver with Id: ${driverId}`);
  }
  const driverTrips = await Trip.find({
    "driver.driverId": singleDriver._id,
  }).sort("-createdAt");

  let numOfTrips = driverTrips.length;
 
  res.status(StatusCodes.OK).json({
    ...singleDriver._doc,
    numOfTrips,
  });
};

const updateDriver = async (req, res) => {
  const { id: driverId } = req.params;

  const driver = await Driver.findOne({ _id: driverId });

  if (!driver) {
    throw new NotFoundError(`No driver with Id: ${driverId}`);
  }

  await Driver.findOneAndUpdate({ _id: driverId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ msg: "Success: Driver Updated!" });
};

const deleteDriver = async (req, res) => {
  const { id: driverId } = req.params;

  const driver = await Driver.findOne({ _id: driverId });

  if (!driver) {
    throw new NotFoundError(`No driver with Id: ${driverId}`);
  }
  
  await Trip.updateMany({ _id: driver._id }, {
    $pull: {
      drivers: {
        driverId: driverId,
      },
    }
  })

  await driver.remove();
  res.status(StatusCodes.OK).json({ msg: "Success: Driver Deleted" });
};

export {
  createDriver,
  getAllDrivers,
  updateDriver,
  getSingleDriver,
  deleteDriver,
};
