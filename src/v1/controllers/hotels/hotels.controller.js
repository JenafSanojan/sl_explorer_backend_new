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

const getHotels = async (req, res) =>{
    try{
        const hotels = await HotelsModel.find({});
        return res.status(200).send({status: 'success', data: hotels});
    } catch(err){
        res.status(500).json({message: err.message});
    }
}

const getHotel = async (req, res) =>{
    try{
        const hotel = await HotelsModel.findById(req.params.hotelId);
        if(!hotel){
            return res.status(404).send({message: "Hotel not found!"});
        }
        return res.status(200).send({status: 'success', body: hotel});
    } catch(err){
        res.status(500).json({message: err.message}); 
    } 
}

const deleteHotel = async (req, res) =>{
    try{
        const hotel = await HotelsModel.findByIdAndDelete(req.params.hotelId);
        if(!hotel){
            return res.status(404).send({message: "Hotel not found!"});
        }
        return res.status(200).send({status: 'success', message: 'Hotel deleted successfully!'});
    } catch(err){
        res.status(500).json({message: err.message});
    }
}


module.exports = {
    createHotel,
    getHotels,
    getHotel,
    deleteHotel
};   