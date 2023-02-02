import express from "express";
const router = express.Router();

import {
  createTrip,
  getAllTrips,
  getCurrentTrips,
  getPassengerTrips,
  getSingleTrip,
  getDriverTrips,
  bookTrip,
  updateTrip,
} from "../controllers/tripController.js";

router.route("/").get(getAllTrips).post(createTrip);
router.route("/current").get(getCurrentTrips);
router.route("/passenger").get(getPassengerTrips);
router.route("/driver").get(getDriverTrips);
router.route("/book/:tripId").patch(bookTrip);
router.route("/:tripId").get(getSingleTrip).patch(updateTrip);

export default router;
