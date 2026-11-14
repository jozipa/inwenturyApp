const express = require('express');
const deliveryController = require('../controllers/deliveryController.js');
const router = express.Router();

router.get("/", deliveryController.getDeliveries);
router.get("/delivery/:id", deliveryController.getDelivery);
router.get("/generate", deliveryController.generateDelivery); 
router.patch("/:id", deliveryController.recieveDelivery)
router.post("/", deliveryController.handleDelivery);
router.post("/product", deliveryController.addProductToDelivery);




module.exports = router;