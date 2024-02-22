const express = require('express');
const router = express.Router();
const festivalsController = require('../../controllers/festivals/festivals.controller'); 

router.post("/", festivalsController.createFestival);
router.get("/", festivalsController.getFestival); 
router.get("/:festivalId", festivalsController.getFestivalById);
router.delete("/:festivalId", festivalsController.deleteFestival);
router.patch("/:festivalId", festivalsController.updateFestival);

module.exports = router; 