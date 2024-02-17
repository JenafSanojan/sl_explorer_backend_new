const express = require('express');
const router = express.Router();
const festivalsController = require('../../controllers/festivals/festivals.controller'); 

router.post("/", festivalsController.createFestival);
router.get("/", festivalsController.getFestival); 

module.exports = router; 