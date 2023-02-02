import Trip from "../models/Trip.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";
import User from "../models/User.js";
import Driver from "../models/Driver.js";

const createTrip = async (req, res) => {
  const { departureTime, direction } = req.body;

  if (!departureTime || !direction) {
    throw new BadRequestError("Please provide all Fields");
  }

  const anyActiveTrip = await Trip.findOne({
    status: "booking",
    "driver.driverId": req.user.userId,
  });

  if (anyActiveTrip) {
    throw new BadRequestError("You already have an Active trip");
  }

  const driverInfo = await Driver.findById(req.user.userId);

  if (!driverInfo) {
    throw new BadRequestError("No Driver with Id");
  }

  const driver = {
    fullname: `${driverInfo.firstname} ${driverInfo.lastname}`,
    driverId: driverInfo._id,
  };

  let transaction = await Trip.create({ ...req.body, driver });

  res.status(StatusCodes.CREATED).json(transaction);
};

const getSingleTrip = async (req, res) => {
  const { tripId } = req.params;
  let singleTrip;
  const { userId } = req.user;
  let hasBeenBook = false;

  singleTrip = await Trip.findOne({ _id: tripId });

  const passengersInfo = await Promise.all(
    singleTrip.passengers.map(async (item) => {
      if (JSON.stringify(item.passengerId).slice(1, -1) === userId) {
        hasBeenBook = true;
      }
      const passengerInfo = await User.findById(item.passengerId);
      return passengerInfo;
    })
  );

  const driver = await Driver.findById(singleTrip.driver.driverId);

  const ticketsInfo = `${singleTrip.passengers.length}/${driver.car.carCapacity} tickets sold `;

  res.status(StatusCodes.OK).json({
    ...singleTrip._doc,
    passengers: passengersInfo,
    driver,
    hasBeenBook,
    ticketsInfo,
  });
};

const getAllTrips = async (req, res) => {
  const { status, sort, search } = req.query;
  let queryObject = {};

  // ADD BASED ON CONDITIONS
  if (status && status !== "all") {
    queryObject.status = status;
  }

  if (search) {
    const stringSearchFields = ["driver.fullname"];

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
  let result = Trip.find(queryObject);

  // CHAIN CONNDITIONS
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("driver.fullname");
  }
  if (sort === "z-a") {
    result = result.sort("-driver.fullname");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  let trips = await result;

  trips = await Promise.all(
    trips.map(async (trip) => {
      const {
        car,
        phone,
        email,
        status: driverStatus,
      } = await Driver.findById(trip.driver.driverId);
      const ticketsInfo = `${trip.passengers.length}/${car.carCapacity}`;
      console.log(phone, email, driverStatus);
      return {
        ...trip._doc,
        driver: {
          driverId: trip.driver.driverId,
          fullname: trip.driver.fullname,
          phone: phone,
          email: email,
          driverStatus: driverStatus,
        },

        carInfo: car,
        ticketsInfo,
      };
    })
  );

  const totalTrips = await Trip.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalTrips / limit);

  res.status(StatusCodes.OK).json({
    trips,
    totalTrips,
    numOfPages,
  });
};

const getDriverTrips = async (req, res) => {
  const { userId, role } = req.user;
  const { search, id } = req.query;

  let driverTrips;
  let driverCurrentTrip;
  let queryObject;

  if (role === "driver") {
    queryObject = {
      "driver.driverId": userId,
    };
  } else if (role === "admin") {
    queryObject = {
      "driver.driverId": id,
    };
  }

  if (search) {
    const stringSearchFields = ["driver.fullname"];

    const query = {
      $or: [
        ...stringSearchFields.map((field) => ({
          [field]: new RegExp("^" + search, "i"),
        })),
      ],
    };
    queryObject = { ...queryObject, ...query };
  }

  driverTrips = await Trip.find(queryObject).sort("-createdAt");

  driverTrips = await Promise.all(
    driverTrips.map(async (trip) => {
      const tripInfo = await Promise.all(
        trip.passengers.map(async (item) => {
          const passengerInfo = await User.findById(item.passengerId);
          return passengerInfo;
        })
      );
      const { car } = await Driver.findById(trip.driver.driverId, "car");

      const ticketsInfo = `${tripInfo.length}/${car.carCapacity} tickets sold `;

      if (trip.status === "booking" || trip.status === "transit") {
        driverCurrentTrip = {
          ...trip._doc,
          carInfo: car,
          tripInfo,
          ticketsInfo,
        };
      }

      return { ...trip._doc, tripInfo, carInfo: car, ticketsInfo };
    })
  );

  res.status(StatusCodes.OK).json({ driverTrips, driverCurrentTrip });
};

const getPassengerTrips = async (req, res) => {
  const { userId, role } = req.user;
  const { search } = req.query;
  const { id } = req.params;
  let passengerTrips;
  let queryObject;

  const doesPassengerExist = await User.findById(userId);
  if (!doesPassengerExist) {
    throw new BadRequestError("User Not a Passenger");
  }

  if (role === "passenger") {
    queryObject = {
      "passengers.passengerId": userId,
    };
  } else if (role === "admin") {
    queryObject = {
      "passengers.passengerId": id,
    };
  }

  if (search) {
    const stringSearchFields = ["driver.fullname"];

    const query = {
      $or: [
        ...stringSearchFields.map((field) => ({
          [field]: new RegExp("^" + search, "i"),
        })),
      ],
    };
    queryObject = { ...queryObject, ...query };
  }

  passengerTrips = await Trip.find(queryObject).sort("-createdAt");

  passengerTrips = await Promise.all(
    passengerTrips.map(async (trip) => {
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

  res.status(StatusCodes.OK).json(passengerTrips);
};

const getCurrentTrips = async (req, res) => {
  const { search, direction } = req.query;

  let currentTrips;
  let directionQuery;

  if (direction === "back-to-front") {
    directionQuery = "Back gate to Front gate";
  } else if (direction === "front-to-back") {
    directionQuery = "Front gate to Back gate";
  }

  let queryObject = { status: "booking", direction: directionQuery };

  if (search) {
    const stringSearchFields = ["driver.fullname"];

    const query = {
      $or: [
        ...stringSearchFields.map((field) => ({
          [field]: new RegExp("^" + search, "i"),
        })),
      ],
    };
    queryObject = { ...queryObject, ...query };
  }

  currentTrips = await Trip.find(queryObject).sort("-createdAt");

  currentTrips = await Promise.all(
    currentTrips.map(async (trip) => {
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

  res.status(StatusCodes.OK).json(currentTrips);
};

const updateTrip = async (req, res) => {
  const { tripId } = req.params;

  if (!req.body) {
    throw new BadRequestError("Please provide Details");
  }

  const trip = await Trip.findById(tripId);

  if (!trip) {
    throw new BadRequestError("No Trip with specified ID");
  }

  let updatedTrip = await Trip.findOneAndUpdate({ _id: tripId }, req.body, {
    new: true,
    runValidators: true,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ updatedTrip, msg: "Trip Updated Successfully" });
};

const bookTrip = async (req, res) => {
  const { tripId } = req.params;

  const { passengerId, fullname, action } = req.body;

  if (!passengerId || !fullname) {
    throw new BadRequestError("Please provide Details");
  }

  let trip = await Trip.findById(tripId);

  if (!trip) {
    throw new BadRequestError("No Trip with specified ID");
  }
  if (trip.status !== "booking") {
    throw new BadRequestError("You cannot Book this trip!");
  }

  const alreadyBooked = await Trip.findOne({
    "passengers.passengerId": passengerId,
  });

  if (action) {
    if (!alreadyBooked) {
      throw new BadRequestError("Trip Has not been Booked");
    }
    await Trip.findOneAndUpdate(
      { _id: tripId },
      {
        $pull: {
          passengers: {
            passengerId: passengerId,
          },
        },
      }
    );

    res.status(StatusCodes.CREATED).json({ msg: "Trip Unbooked Successfully" });
  } else {
    if (alreadyBooked) {
      throw new BadRequestError("You have already Book a trip");
    }

    trip.passengers.push({ passengerId, fullname });
    trip.save();

    res.status(StatusCodes.CREATED).json({ msg: "Trip Booked Successfully" });
  }
};
export {
  createTrip,
  getAllTrips,
  getDriverTrips,
  getCurrentTrips,
  getSingleTrip,
  getPassengerTrips,
  updateTrip,
  bookTrip,
};
