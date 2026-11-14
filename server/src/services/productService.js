const db = require("../config/db.js")

exports.getAllProducts = () => {
    const modelsData = db.prepare("SELECT * FROM product_models").all();
    const productsData = db.prepare("SELECT * FROM products").all();

    return {models: modelsData, products: productsData}
}

exports.getSizeTemplates = () => {
    const sizesData = db.prepare("SELECT * FROM size_templates").all()
    const productTypesData = db.prepare("SELECT * FROM product_types").all()
    return {size_templates: sizesData, product_types: productTypesData};
}

exports.createProductModel = (body) => {
    const insertModel = db.prepare(`
        INSERT INTO product_models (name, description, type, imageUrl, categories)
        VALUES (?,?,?,?,?)
        `);

    const insertProduct = db.prepare(`
        INSERT INTO products (model_id, size,count, barcode)
        VALUES (?,?,?,?)`);
    
    
    const createTransaction = db.transaction(()=> {

        const info = insertModel.run(
            body.name,
            body.description,
            body.type,
            body.imageUrl,
            body.categories,
        );
        const newModelId = info.lastInsertRowid;
        

        for (const [size,barcode] of Object.entries(body.sizesBarcode)){ 
            insertProduct.run(newModelId, size, 0, barcode);
            console.log(size, barcode);
            
        }
        return newModelId;
    });
    
    return createTransaction();
};

exports.updateProducts = async (body) => {
    
    const updateProduct = db.prepare(`UPDATE products
        SET count = MAX(0, count + ?)
        WHERE id = ?
        `)
    
    const receiptTransaction = db.transaction((items) => {
        for (const [id,count] of Object.entries(items)){
            updateProduct.run(count, id);
        }
    })
    
    receiptTransaction(body.scannedItems);
}

function setExpectedQuantity(productId, quantity){
    const result = db.prepare(`
    UPDATE products 
    SET expected_quantity = ?
    WHERE id = ?
  `).run(quantity, productId);
}
exports.setExpectedQuantity = setExpectedQuantity;

function decreaseStock(productId, quantity) {

  const result = db.prepare(`
    UPDATE products 
    SET count = count - ? 
    WHERE id = ? AND count >= ?
  `).run(quantity, productId, quantity);

  if (result.changes === 0) {
    throw new Error(`Za mało towaru na stanie (ID: ${productId})`);
  }
}
exports.decreaseStock = decreaseStock;

function updateStock(productId, quantity) {

  const result = db.prepare(`
    UPDATE products 
    SET count = count + ? 
    WHERE id = ? AND count + ? >= 0
  `).run(quantity, productId, quantity);

  if (result.changes === 0) {
    throw new Error(`Za mało towaru na stanie (ID: ${productId})`);
  }
}
exports.updateStock = updateStock;

exports.updateProductsExpectedQuantity = async (body) => {

    const updateProductsTransaction = db.transaction((items) => {
        for (const product of items){
            setExpectedQuantity(product.id, product.count);
        }
    })
    
    updateProductsTransaction(body.products);
}


