const mongoose = require('mongoose');

const cruiseShipSchema = new mongoose.Schema({
cruiseShipName: {
    type: String,
    required: true,
  },
  cruiseShipDescription: {
    type: String,
    required: true,
  },
  cruiseShipCoverImage: {
    type: String,
    required: true,
  },
  cruiseShipImageLinks: {
    type: Array,
    required: true,
  },
  cruiseArrivalDay:{
    type: String,
    required: true,
  },
    packageDays: {
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
    packageStepsDescription: {
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
    adultPrice: {
      type: Number,
      required: true,
    },
    childPrice: {
        type: Number,
        required: true,
      },
      hotels: [{ 
        hotel : {type: mongoose.Schema.Types.ObjectId, ref: 'Hotels'},
        hotelRoomDesc : String,
        hotelLocationDesc : String
    }],
});

module.exports = mongoose.model('cruiseShip', cruiseShipSchema);
