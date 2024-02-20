const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/dayTrips/category.controller');

router.get('/', categoryController.getCategories);

module.exports = router;