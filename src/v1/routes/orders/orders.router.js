const express = require("express");
const router = express.Router();
const ordersController = require("../../controllers/orders/orders.controller");

// POST method
router.post("/", ordersController.createOrder);
//GET method
router.get("/", ordersController.getOrders);

router.get("/:customerId", ordersController.getOrderByCustomerId);

router.post("/status", ordersController.updateStatus);

router.put("/:orderId", ordersController.updateOrder);

module.exports = router;
