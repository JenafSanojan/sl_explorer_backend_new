const express = require("express");
const router = express.Router();
const hotelsController = require("../../controllers/hotels/hotels.controller");

router.post("/", hotelsController.createHotel);
router.get("/", hotelsController.getHotels);
router.get("/:hotelId", hotelsController.getHotel); 
router.delete("/:hotelId", hotelsController.deleteHotel);
router.patch("/:hotelId", hotelsController.updateHotel);

module.exports = router;
