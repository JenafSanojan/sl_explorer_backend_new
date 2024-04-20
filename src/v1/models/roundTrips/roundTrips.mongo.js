const mongoose = require("mongoose");

const roundTripsSchema = new mongoose.Schema({
  order: {
    type: Number,
    required: true,
  },
  packageName: {
    type: String,
    required: true,
  },
  packageShortDescription: {
    type: String,
    required: true,
  },
  packageCoverDescription: {
    type: String,
    required: true,
  },
  packageCoverImage: {
    type: String,
    required: true,
  },
  packageImageLinks: {
    type: Array,
    required: true,
  },
  packageTitle: {
    type: String,
    required: true,
  },
  packageSubTitle: {
    type: String,
    required: true,
  },
  packageTotalSeats: {
    type: Number,
    required: true,
  },
  itenary: [
    {
      dayNumber: Number,
      dayName: String,
      location: { type: Array },
      description: String,
      optionalDescription: String,
    },
  ],
  hotels: [
    {
      hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotels" },
      hotelRoomDesc: String,
      hotelLocationDesc: String,
    },
  ],
  prices: {
    group: {
      single: { type: Number, required: true },
      double: { type: Number, required: true },
      triple: { type: Number, required: true },
    },
    private: {
      single: { type: Number, required: true },
      double: { type: Number, required: true },
      triple: { type: Number, required: true },
    },
  },
  dates: {
    type: {
      day: { type: Number, options: [1, 2, 3, 4, 5, 6, 7], default: 1 }, // 1 = every sunday ----- 7 = every saturday
      details: {
        type: [
          //Array of details, each having three entries
          {
            date: { type: Date, required: true },
            availability: { type: Boolean, default: true },
            filledSeats: { type: Number, default: 0 }, //
          },
        ],
      },
      bookableUntil: {
        // until when it can be booked
        type: Date,
        default: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // 1 year later
      },
    },
    default: {},
  },
});

module.exports = mongoose.model("RoundTrips", roundTripsSchema);
