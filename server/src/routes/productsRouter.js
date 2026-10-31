const express = require('express');
const product_controler = require('../controllers/productController')
const router = express.Router();
const upload = require('../middleWare/uploadMiddleWare');

router.get("/", product_controler.getProducts);
router.post("/", upload.single('image'), product_controler.createProductModel);
router.patch("/", product_controler.updateProducts);
router.patch("/cart", product_controler.updateProductsFromCart);

router.get("/size_templates", product_controler.getSizes);


module.exports = router;

