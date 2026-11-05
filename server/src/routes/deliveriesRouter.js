const express = require('express');
const deliveryController = require('../controllers/deliveryController.js');
const router = express.Router();

router.get("/", deliveryController.getDeliveries);
router.post("/", deliveryController.handleReceipt);
router.post("/product", deliveryController.addProductToDelivery);



module.exports = router;