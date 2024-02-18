const express = require('express');
const router = express.Router();
const dayTripsController = require('../../controllers/dayTrips/dayTrips.controller'); 

router.post("/", dayTripsController.createDayTrip);
router.get("/", dayTripsController.getDayTrips); 
router.get("/:packageDays", dayTripsController.getDayTripsByPackageDays);



module.exports = router; 