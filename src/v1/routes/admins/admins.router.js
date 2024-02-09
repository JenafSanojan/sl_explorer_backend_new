const express = require("express");
const router = express.Router();
const adminsController = require("../../controllers/admins/admins.controller");


router.post("/", adminsController.setAdmin);

module.exports = router; 