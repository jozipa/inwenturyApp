const { fetchReceipts } = require('../../../client/src/api/productsApi');
const db = require('../config/db');
const productService = require('./productService');

function getTotalPrice(productsArray){
    let totalPrice = 0;
    for (product of productsArray){
        totalPrice += product.price * product.count;
    }
    return totalPrice;
}

exports.createReceipt = (data)=>{    
    const executeTransaction = db.transaction((items) => {

        const insertReceiptStmt = db.prepare(`
            INSERT INTO receipts (price) VALUES (?)
        `);

        const insertReceiptProductStmt = db.prepare(`
            INSERT INTO receipt_products (receipt_id, product_id, quantity, unit_price)
            VALUES (?, ?, ?, ?)
        `);
        
        const receipt = insertReceiptStmt.run(items.price);
        const receiptId = receipt.lastInsertRowid;

        for (product of items.scannedProducts){
            productService.decreaseStock(product.id, product.count);
            insertReceiptProductStmt.run(receiptId, product.id, product.count, product.price);            
        }
        
        return receiptId
    });

    return executeTransaction({price: getTotalPrice(data), scannedProducts: data })
}

    
exports.fetchReceipts = () => {
    
    const getReceiptsGroupedStmt = db.prepare(`
SELECT 
    r.id AS receipt_id,
    r.price,
    r.created_at,
    json_group_array(
        json_object(
            'productId', rp.product_id,
            'name', pm.name,
            'size', p.size,
            'imageUrl', pm.imageUrl,
            'count', rp.quantity,
            'unitPrice', rp.unit_price
        )
    ) AS items
FROM receipts r
JOIN receipt_products rp ON r.id = rp.receipt_id
JOIN products p ON rp.product_id = p.id
JOIN product_models pm ON p.model_id = pm.id
WHERE r.created_at >= date('now', '-7 days')
GROUP BY r.id
ORDER BY r.created_at DESC;`)
    const response = getReceiptsGroupedStmt.all()
        
    return response;
}