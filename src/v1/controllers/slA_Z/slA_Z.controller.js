const slA_ZModel = require('../../models/slA_Z/slA_Z.model');

const createTopic = async (req, res) =>{
   try{

       if(!req.body.mainTopic||
           !req.body.description ||
           !req.body.topicCoverImage ){
           return res.status(400).send({message: "Request body is missing!"});
       }  

       const newFTopic = {
        mainTopic: req.body.mainTopic,
        description: req.body.description,
        topicCoverImage: req.body.topicCoverImage,
       }

       const a_z = await slA_ZModel.create(newFTopic);
       return res.status(201).send({status: 'success', data: a_z});

   } catch(err){
       res.status(500).json({message: err.message});
   }
};


const getTopic = async (req, res) =>{
   try{
       const data = await slA_ZModel.find();
       res.json(data);
   } catch(err){
       res.status(500).json({message: err.message});
   }
};

const getTopicById = async (req, res) =>{
    try{
        const data = await slA_ZModel.findById(req.params.a_zId);
        if(!data){
            return res.status(404).send({message: "Topic not found!"});
        }
        return res.status(200).send({status: 'success', body: data});
    } catch(err){
        res.status(500).json({message: err.message}); 
    } 
};

const deleteTopic = async (req, res) =>{
    try{
        const data = await slA_ZModel.findByIdAndDelete(req.params.a_zId);
        if(!data){
            return res.status(404).send({message: "Topic not found!"});
        }
        return res.status(200).send({status: 'success', message: 'Topic deleted successfully!'});
    } catch(err){
        res.status(500).json({message: err.message});
    }
};

const updateTopic = async (req, res) =>{
    try{
        const data = await slA_ZModel.findByIdAndUpdate(req.params.a_zId, req.body, {new: true});
        if(!data){
            return res.status(404).send({message: "Topic not found!"});
        }
        return res.status(200).send({status: 'success', message: 'Topic details updated successfully!'});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};





module.exports = {
   createTopic,
   getTopic,
   getTopicById,
   deleteTopic,
   updateTopic
}