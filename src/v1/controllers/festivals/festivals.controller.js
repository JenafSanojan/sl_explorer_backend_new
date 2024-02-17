const festivalsModel = require('../../models/festivals/festivals.model');

const createFestival = async (req, res) =>{
   try{

       if(!req.body.festivalName||
        !req.body.festivalDate||
           !req.body.festivalDescription ||
           !req.body.festivalCoverImage ||
           !req.body.festivalImageLinks ||
           !req.body.festivalTitle){
           return res.status(400).send({message: "Request body is missing!"});
       }  

       const newFestival = {
        festivalName: req.body.festivalName,
        festivalDate: req.body.festivalDate,
        festivalDescription: req.body.festivalDescription,
        festivalCoverImage: req.body.festivalCoverImage,
        festivalImageLinks: req.body.festivalImageLinks,
        festivalTitle:req.body.festivalTitle,
       }

       const festival = await festivalsModel.create(newFestival);
       return res.status(201).send({status: 'success', data: festival});

   } catch(err){
       res.status(500).json({message: err.message});
   }
}


const getFestival = async (req, res) =>{
   try{
       const data = await festivalsModel.find();
       res.json(data);
   } catch(err){
       res.status(500).json({message: err.message});
   }
}

module.exports = {
   createFestival,
   getFestival
}