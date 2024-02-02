const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
  },

  packageId: {
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

  tripDate: {
    type: Date,
    required: true,
  },

  noOfPeople: {
    adults: {
      type: Number,
      required: true,
    },
    children: {
      type: Number,
      required: true,
    },
  },

  rooms: {
    single: {
      type: Number,
      required: true,
    },
    double: {
      type: Number,
      required: true,
    },
    triple: {
      type: Number,
      required: true,
    },
    Quadruple: {
      type: Number,
      required: true,
    },
  },

  status: {
    type: String,
    options: ["Pending", "Accepted", "Confirmed", "Cancelled"],
    required: true,
  },

  price: {
    shownPrice: {
      //calculated
      type: Number,
      required: true,
    },
    exactPrice: {
      type: Number,
      required: false,
    },
    discount: {
      type: Number,
      required: false,
    },
    finalPrice: {
      type: Number,
      required: false,
    },
  },
  option: [
    {
      type: String,
    },
  ],
  // Add more properties as needed
});

const Order = mongoose.model("Order", ordersSchema); //collection name will be orders by default

module.exports = Order;
