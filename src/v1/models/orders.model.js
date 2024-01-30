const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
  },
  package: {
    roundTrip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoundTrips",
    },
    dayTrip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DayTrips",
    },
  },
  orderDate: {
    type: Date,
    required: true,
  },
  noOfPeople: {
    adults: { type: Number },
    children: { type: Number },
  },
  option: [
    {
      type: String,
    },
  ],
  // Add more properties as needed
});

const Order = mongoose.model("Order", ordersSchema);

module.exports = Order;

// const mongoose = require("mongoose");

// const ordersSchema = new mongoose.Schema({
//   customerId: {
//     type: String,
//     required: true,
//   },
//   packageId: {
//     roundTrip: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "RoundTrips",
//     },
//     // dayTrip: {
//     //   type: mongoose.Schema.Types.ObjectId,
//     //   ref: "DayTrips",
//     // },
//   },
//   orderDate: {
//     type: Date,
//     required: true,
//   },
//   noOfPeople: {
//     adults: { type: Number },
//     children: { type: Number },
//   },
//   option: [
//     {
//       type: String,
//     },
//   ],
//   // Add more properties as needed
// });

// const Order = mongoose.model("Order", ordersSchema);

// module.exports = Order;
