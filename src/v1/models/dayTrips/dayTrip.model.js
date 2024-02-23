const mongoose = require('mongoose');

const dayTripsSchema = new mongoose.Schema({
  packageCategoryName: {
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
    avaliableDates: [{
        dayName: String,
        avaliability:Boolean,
      }],
    hotels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotels'
      }],
    services: {
      type: Array,
    },
    price: {
      type: Number,
      required: true,
    },
});

module.exports = mongoose.model('DayTrips', dayTripsSchema);
