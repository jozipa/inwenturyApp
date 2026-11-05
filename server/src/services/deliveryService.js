const db = require('../config/db.js');

exports.fetchDeliveries = () => {
    const getDeliveriesGrouped = db.prepare(`
        SELECT 
            d.id as delivery_id,
            d.created_at,
            d.delivered_at,
            d.description
            json_group_array(
                json_object(
                    'productId', dp.product_id,
                    'ordered_quantity', dp.ordered_quantity
                    'recieved_quantity', dp.recieved_quantity,

                )
            ) AS items
        FROM deliveries d
        JOIN delivery_products dp on d.id = dp.delivery_id
        JOIN products p ON dp.product_id = p.id
        JOIN product_models pm ON p.podel_id = pm.id
        GROUP BY d.id
        ORDER BY d.created_at DESC;`)
    const response = getDeliveriesGrouped.all();
    return response;
}

exports.createDelivery = (data) => {
    const deliveryTransaction = db.transaction((deliveryData) => {
        const insertDeliveryStmt = db.prepare(`
            INSERT INTO deliveries (description) VALUES (?)
        `);
        const insertDeliveryProductStmt = db.prepare(`
            INSERT INTO delivery_products (product_id, delivery_id, ordered_quantity) VALUES (?,?,?)`
        );
        const delivery = insertDeliveryStmt.run(deliveryData.description);
        const deliveryId = delivery.lastInsertRowid;

        for (product of deliveryData.products){
            insertDeliveryProductStmt(product.id, deliveryId, product.orderedQuantity);
        }

        return deliveryId
    });
    return deliveryTransaction(data);
}

exports.addNewDeliveryProduct = (product) => {
    const insertDeliveryProductStmt = db.prepare(`
        INSERT INTO delivery_products (product_id, delivery_id, ordered_quantity, recieved_quantity) VALUES (?,?,?,?)`
    ).run(product.id, product.deliveryId, product.orderedQuantity, product.recievedQuantity);
}

