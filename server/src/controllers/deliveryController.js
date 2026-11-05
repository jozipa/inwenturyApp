const deliveryService = require('../services/deliveryService.js');

exports.getDeliveries = (req, res ) => {
    try {
        const response = deliveryService.fetchDeliveries();
        res.status(200).json(response)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
}

exports.handleDelivery = (req, res) => {
    try {
        const data = req.body
        console.log(data, "data, czyli inaczej dane ktore przesylam do funkcji createDelivery (zapisalem na kartce jak byc powinno)");
        const response = deliveryService.createDelivery(data);
        res.status(200).json({message: `pomyślnie utworzono dostawę o id ${response}`});
    } catch (error){
        res.status(500).json({message: error.message});
    }
}

exports.addProductToDelivery = (req, res) => {
    try {
        const product = req.body;
        console.log(product, "powinno to wygladac tak {productId, deliveryId, orderedQuantity, recievedQuantity}");
        deliveryService.addNewDeliveryProduct(product);
        res.status(200).json({message: `pomyślnie dodano produkt o id ${product.productId} do dostawy o id ${product.delveryId}`})
    } catch (error){
        res.status(500).json({message: error.message});
    }
}

