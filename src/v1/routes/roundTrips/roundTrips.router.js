const express = require("express");
const router = express.Router();
const roundTripsController = require("../../controllers/roundTrips/roundTrips.controller");

router.post("/", roundTripsController.createRoundTrip);
router.get("/", roundTripsController.getRoundTrips);
router.get("/:id", roundTripsController.getRoundTripPackage);
router.put("/", roundTripsController.updateRoundTrip);
router.delete("/:id", roundTripsController.deleteRoundTrip);

module.exports = router;
