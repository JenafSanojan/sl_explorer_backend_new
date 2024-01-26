const HotelsModel = require('../../models/hotels.model');

const createHotel = async (req, res) =>{
    try{

        if(!req.body.hotelName ||
            !req.body.hotelDistrict ||
            !req.body.hotelImage){
            return res.status(400).send({message: "Request body is missing!"});
        } 

        const newHotel = {
            hotelName: req.body.hotelName,
            hotelDistrict: req.body.hotelDistrict,
            hotelImage: req.body.hotelImage,
        }

        const hotel = await HotelsModel.create(newHotel);
        return res.status(201).send({status: 'success', data: hotel});
 
    } catch(err){
        res.status(500).json({message: err.message});
    }
}


module.exports = {
    createHotel
}; 