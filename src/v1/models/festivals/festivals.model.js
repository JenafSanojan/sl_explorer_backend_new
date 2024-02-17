const mongoose = require('mongoose');

const festivalsSchema = new mongoose.Schema({
    festivalName: {
      type: String,
      required: true,
    },
    festivalDate:{
        type:String,
    },
    festivalDescription: {
      type: String,
      required: true,
    },
    festivalCoverImage: {
      type: String,
      required: true,
    },
    festivalImageLinks: {
      type: Array,
      required: true,
    },
    festivalTitle: {
      type: String,
      required: true,
    },
});

module.exports = mongoose.model('Festivals', festivalsSchema);
