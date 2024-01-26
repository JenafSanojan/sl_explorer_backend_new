const mongoose = require('mongoose');

const hotelsSchema = new mongoose.Schema({
    hotelName : {
        type: String,
        required: true
    },
    hotelDistrict : { 
        type: String,
        required: true
    },
    hotelImage : {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Hotels', hotelsSchema);