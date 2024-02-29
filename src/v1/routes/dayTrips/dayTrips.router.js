const express = require("express");
const router = express.Router();
const dayTripsController = require("../../controllers/dayTrips/dayTrips.controller");

router.post("/", dayTripsController.createDayTrip);
router.get("/", dayTripsController.getDayTrips);
router.put("/:packageId", dayTripsController.updateDayTrip);
router.delete("/:packageId", dayTripsController.deleteDayTrip);
router.get("/package/:packageId", dayTripsController.getDayTripById);
router.get("/:packageDays", dayTripsController.getDayTripsByPackageDays);
router.get("/:category", dayTripsController.getDayTripsByCategory);
router.get(
  "/:category/:duration",
  dayTripsController.getDayTripsByCategoryAndDuration
);

module.exports = router;
