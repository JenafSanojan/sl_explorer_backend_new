const express = require('express');
const router = express.Router();
const roundTripsController = require('../../controllers/roundTrips/roundTrips.controller'); 

router.post("/", roundTripsController.createRoundTrip);
router.get("/", roundTripsController.getRoundTrips); 
router.get("/:id", roundTripsController.getRoundTripPackage);


module.exports = router;