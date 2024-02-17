const express = require('express');
const router = express.Router();
const dayTripsController = require('../../controllers/dayTrips/dayTrips.controller'); 

router.post("/", dayTripsController.createDayTrip);
router.get("/", dayTripsController.getDayTrips); 


module.exports = router; 