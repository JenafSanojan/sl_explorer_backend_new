const DayTripsModel = require('../../models/dayTrips/dayTrip.model');

const createDayTrip = async (req, res) =>{
   try{

       if(!req.body.packageCategoryName||
        !req.body.packageDays||
        !req.body.packageName ||
           !req.body.packageShortDescription ||
           !req.body.packageCoverDescription || 
           !req.body.packageCoverImage ||
           !req.body.packageImageLinks ||
           !req.body.packageTitle ||
           !req.body.packageSubTitle ||
           !req.body.avaliableDates ||
           !req.body.hotels ||
           !req.body.services ||
           !req.body.price){
           return res.status(400).send({message: "Request body is missing!"});
       }  

       const newDayTrip = {
        packageCategoryName: req.body.packageCategoryName,
        packageDays: req.body.packageDays,
        packageName: req.body.packageName,
        packageShortDescription: req.body.packageShortDescription,
        packageCoverDescription: req.body.packageCoverDescription,
        packageCoverImage: req.body.packageCoverImage,
        packageImageLinks: req.body.packageImageLinks,
        packageTitle:req.body.packageTitle,
        packageSubTitle: req.body.packageSubTitle,
        avaliableDates: req.body.avaliableDates,
        hotels: req.body.hotels,
        services: req.body.services,
        price: req.body.price
       }

       const dayTrip = await DayTripsModel.create(newDayTrip);
       return res.status(201).send({status: 'success', data: dayTrip});

   } catch(err){
       res.status(500).json({message: err.message});
   }
}


const getDayTrips = async (req, res) =>{
   try{
       const data = await DayTripsModel.find();
       res.json(data);
   } catch(err){
       res.status(500).json({message: err.message});
   }
}

const getDayTripsByPackageDays = async (req, res) => {
  try {
    const data = await DayTripsModel.find({
      packageDays:req.params.packageDays,
    });

    if (!data) {
      return res.status(404).json({ message: "Day trips not found" });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" + error });
  }
};

module.exports = {
   createDayTrip,
   getDayTrips,
   getDayTripsByPackageDays,

};