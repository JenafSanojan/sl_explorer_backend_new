const mongoose = require('mongoose');

const dayTripsSchema = new mongoose.Schema({
  packageCategoryName: {
    type: String,
    required: true,
  },
  packageCategoryImage: {
    type: String,
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
    },
    locations: [{
      name: String,
      prices:Number,
      avaliableDates: [{
          dayName: String,
          avaliability: Boolean,
      }],
  }],
    hotels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotels'
      }],
      services: [{
        category: {
          type: String,
          enum: ['included', 'not included', 'recommendations'],
        },
        name: String,
      }],
    price: {
      type: Number,
    }
});

module.exports = mongoose.model('DayTrips', dayTripsSchema);
