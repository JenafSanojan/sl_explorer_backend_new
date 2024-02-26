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

  pickUpLocation: {
    type: String,
    required: false,
  },

  clientRequests: {
    type: String,
    required: false,
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
    type: {
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
    required: false,
  },

  status: {
    type: String,
    options: ["Pending", "Invoice", "Confirmed", "Cancelled"],
    required: true,
  },

  userDeviceToken:{
    type: String,
    required: false,
  },  

  price: {
    shownPrice: {
      //automatically calculated in app
      type: Number,
      required: true,
    },
    exactPrice: {
      //admin calculated
      type: Number,
      required: false,
    },
    discount: {
      type: Number,
      required: false,
    },
    finalPrice: {
      //admin calculated - discount
      type: Number,
      required: false,
    }, 
  },

  advance: {
    amount: { 
      type: Number,
      required: false,
    },
    reference: {
      type: String,
      required: false,
    },
    isPaid: {
      type: Boolean,
      required: false,
    },
  },

  paymentComments: {
    type: String,
    required: false,
  },

  option: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
    default: [],
  },
});

const Order = mongoose.model("Order", ordersSchema); //collection name will be orders by default

module.exports = Order;
