
const productService = require('../services/productService');

exports.getProducts = (req, res) => {
    try {
        const products = productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getSizes = (req, res) => {
  try {
    const size_templates = productService.getSizeTemplates();
    res.status(200).json(size_templates);
  } catch (error){
    res.status(500).json({error: error.message});
  }
}

exports.createProductModel = (req, res) => {
    try {
      const imageUrl = req.file ? `/images/${req.file.filename}` : '';
      console.log(req.file, "zdjecie kurwa", imageUrl);
      console.log('zyje', req.body);

      const productData = {
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        categories: req.body.categories,
        sizesBarcode: JSON.parse(req.body.sizesBarcode || '{}'),
        imageUrl
      };
      console.log(productData);
      
      const newId = productService.createProductModel(productData);
      res.status(201).json({id: newId, message: 'Dodano produkt' });
    } catch (error){
      res.status(500).json({ error: error.message });
    }
}

exports.updateProducts = (req, res) => {
    try {
      const updatedId = productService.updateProducts(req.body);
      res.status(201).json({id: updatedId, message: "Pomyślnie zaktualizowano produkt"});
    } catch (error){
      res.status(500).json({error: error.message})
    }
}

exports.updateProductsFromCart = (req, res) => {
  try {
    productService.updateProductsFromCart(req.body);
    res.status(201).json({message: "Pomyślnie zaktualizowano produkty z paragonu"});
  } catch (error){
    res.status(500).json({error: error.message});
  }
}