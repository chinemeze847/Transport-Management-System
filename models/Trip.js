import mongoose from "mongoose";

const TripSchema = new mongoose.Schema(
  {
    driver: {
      fullname: "String",
      driverId: {
        type: mongoose.Types.ObjectId,
        ref: "Driver",
      },
    },
    passengers: [
      {
        fullname: String,
        passengerId: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    departureTime: {
      type: Date,
      required: [true, "Please provide a Departure Time"],
    },
    direction: {
      type: String,
      required: [true, "Please provide a Direction"],
    },
    status: {
      type: String,
      enum: ["booking", "transit", "finished"],
      default: "booking",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Trip", TripSchema);
