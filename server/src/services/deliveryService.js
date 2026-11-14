const db = require('../config/db.js');
const productService = require('./productService.js');

const getDeliveriesGroupedStmt = db.prepare(`
    SELECT 
        d.id AS delivery_id,
        d.status,
        d.created_at,
        d.recieved_at,
        d.description,
        json_group_array(
            json_object(
                'productId', dp.product_id,
                'name', pm.name,
                'size', p.size,
                'orderedQuantity', dp.ordered_quantity,
                'recievedQuantity', dp.recieved_quantity,
                'imageUrl', pm.imageUrl
            )
        ) AS items
    FROM deliveries d
    JOIN delivery_products dp ON d.id = dp.delivery_id
    JOIN products p ON dp.product_id = p.id
    JOIN product_models pm ON p.model_id = pm.id
    GROUP BY d.id
    ORDER BY d.created_at DESC;
`);

const getDeliveryStmt = db.prepare(`
    SELECT 
        d.id AS delivery_id,
        d.status,
        d.created_at as createdAt,
        d.recieved_at as recievedAt,
        d.description,
        json_group_array(
            json_object(
                'productId', dp.product_id,
                'name', pm.name,
                'size', p.size,
                'orderedQuantity', dp.ordered_quantity,
                'recievedQuantity', dp.recieved_quantity,
                'imageUrl', pm.imageUrl
            )
        ) AS items
    FROM deliveries d
    JOIN delivery_products dp ON d.id = dp.delivery_id
    JOIN products p ON dp.product_id = p.id
    JOIN product_models pm ON p.model_id = pm.id
    WHERE d.id=?
    `);

const insertDeliveryStmt = db.prepare(`
    INSERT INTO deliveries (description, status) VALUES (?, 'pending')
`);

const insertDeliveryProductStmt = db.prepare(`
    INSERT INTO delivery_products (product_id, delivery_id, ordered_quantity)
    VALUES (?, ?, ?)
`);

const insertSingleDeliveryProductStmt = db.prepare(`
    INSERT INTO delivery_products (product_id, delivery_id, ordered_quantity, recieved_quantity)
    VALUES (?, ?, ?, ?)
`);

const updateStatusStmt = db.prepare(`
    UPDATE deliveries
    SET status = 'delivered',
        recieved_at = CURRENT_TIMESTAMP
    WHERE id = ? AND status != 'delivered'
`);

const updateDeliveryProductStmt = db.prepare(`
    UPDATE delivery_products
    SET recieved_quantity = ?
    WHERE product_id = ? AND delivery_id = ?
`);

const getDeliveryStockStmt = db.prepare(`
    SELECT 
        p.id, 
        pm.name, 
        p.size, 
        pm.imageUrl, 
        p.count AS currentQuantity, 
        p.expected_quantity AS expectedQuantity,
        COALESCE(pending.total_ordered, 0) AS pendingQuantity,
        (p.expected_quantity - p.count - COALESCE(pending.total_ordered, 0)) AS deliveryQuantity 
    FROM products p
    JOIN product_models pm ON p.model_id = pm.id
    LEFT JOIN (
        SELECT dp.product_id, SUM(dp.ordered_quantity) AS total_ordered
        FROM delivery_products dp
        JOIN deliveries d ON dp.delivery_id = d.id
        WHERE d.status = 'pending'
        GROUP BY dp.product_id
    ) pending ON pending.product_id = p.id
    WHERE (p.expected_quantity - p.count - COALESCE(pending.total_ordered, 0)) > 0
`);

const createDeliveryTransaction = db.transaction((deliveryData) => {
    const delivery = insertDeliveryStmt.run(deliveryData.description);
    const deliveryId = delivery.lastInsertRowid;

    for (const product of deliveryData.products) {
        insertDeliveryProductStmt.run(product.id, deliveryId, product.orderedQuantity);
    }
    
    return deliveryId;
});

const recieveDeliveryTransactionStmt = db.transaction((data) => {
    const result = updateStatusStmt.run(data.deliveryId);

    if (result.changes === 0) {
        throw new Error('Dostawa nie istnieje lub została już wcześniej odebrana.');
    }

    for (const product of data.products) {
        productService.updateStock(product.id, product.quantity);
        updateDeliveryProductStmt.run(product.quantity, product.id, data.deliveryId);
    }

    return { success: true };
});

exports.getDeliveryFromId = (deliveryId) => {
    const row = getDeliveryStmt.get(deliveryId);
    return {...row, 
        items: JSON.parse(row.items)
    };
}

exports.fetchDeliveries = () => {
    const rows = getDeliveriesGroupedStmt.all();
    return rows.map((row) => ({
        ...row,
        items: JSON.parse(row.items)
    }));
};

exports.createDelivery = (data) => {
    return createDeliveryTransaction(data);
};

exports.addNewDeliveryProduct = (product) => {
    return insertSingleDeliveryProductStmt.run(
        product.id,
        product.deliveryId,
        product.orderedQuantity,
        product.recievedQuantity
    );
};

exports.recieveDelivery = (data) => {
    return recieveDeliveryTransactionStmt(data);
};

exports.generateDelivery = () => {
    return getDeliveryStockStmt.all();
}