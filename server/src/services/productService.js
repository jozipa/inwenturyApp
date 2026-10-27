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
    console.log('ostatni etap');
    
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
        console.log(info);
        

        for (const [size,barcode] of Object.entries(body.sizesBarcode)){ 
            insertProduct.run(newModelId, size, 0, barcode);
            console.log(size, barcode);
            
        }
        return newModelId;
    });
    
    return createTransaction();
};

exports.updateProduct = async (body)=> {
    db.prepare(`
        UPDATE products
        SET count = MAX(0, count - ?)
        WHERE id = ?
        `).run(body.count, body.id);
}

exports.updateProducts = async (body) => {
    const updateProduct = db.prepare(`UPDATE products
        SET count = MAX(0, count + ?)
        WHERE id = ?
        `)
    
    const receiptTransaction = db.transaction((items) => {
        for (const [id,count] of Object.entries(items)){
            updateProduct.run(count, id);
            console.log(count,id);
            
        }
    })
    
    receiptTransaction(body.scannedItems);
}

