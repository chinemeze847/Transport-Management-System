import express from "express";
const router = express.Router();

import {
  createDriver,
  getAllDrivers,
  updateDriver,
  getSingleDriver,
  deleteDriver
} from "../controllers/driversController.js";

router.route("/").post(createDriver).get(getAllDrivers);
router.route("/:id").get(getSingleDriver).patch(updateDriver).delete(deleteDriver);
export default router;
