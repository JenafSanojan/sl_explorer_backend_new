const express = require('express');
const router = express.Router();
const a_zController = require('../../controllers/slA_Z/slA_Z.controller'); 

router.post("/", a_zController.createTopic);
router.get("/", a_zController.getTopic); 
router.get("/:a_zId", a_zController.getTopicById);
router.delete("/:a_zId", a_zController.deleteTopic);
router.patch("/:a_zId", a_zController.updateTopic);

module.exports = router; 