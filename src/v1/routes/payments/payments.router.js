const express = require("express");
const router = express.Router();
const paymentsController = require("../../controllers/payments/payments.controller");

router.post('/makePayment', paymentsController.createPayment);


module.exports = router;
