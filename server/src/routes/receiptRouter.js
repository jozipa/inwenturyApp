const express = require('express');
const receipt_controler = require('../controllers/receiptController')
const router = express.Router();

router.get("/", receipt_controler.getReceipt);
router.post("/", receipt_controler.handleReceipt);



module.exports = router;
