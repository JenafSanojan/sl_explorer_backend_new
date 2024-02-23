const express = require('express');
const router = express.Router();
const cruiseShipsController = require('../../controllers/cruiseShip/cruiseShips.controller'); 

router.post("/", cruiseShipsController.createCruiseShip);
router.get("/", cruiseShipsController.getCruiseShip); 
router.get("/:id", cruiseShipsController.getCruiseShipPackage);


module.exports = router;