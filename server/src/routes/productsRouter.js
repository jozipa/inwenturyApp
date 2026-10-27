const express = require('express');
const product_controler = require('../controllers/productController')
const router = express.Router();
const upload = require('../middleWare/uploadMiddleWare');

router.get("/", product_controler.getProducts);
router.post("/", upload.single('image'), product_controler.createProductModel);
router.patch("/", product_controler.updateProduct);
router.patch("/receipt", product_controler.updateProductsFromReceipt);

router.get("/size_templates", product_controler.getSizes);


module.exports = router;

