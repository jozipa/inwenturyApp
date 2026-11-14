const deliveryService = require('../services/deliveryService.js');

exports.getDeliveries = (req, res ) => {
    try {
        const response = deliveryService.fetchDeliveries();
        res.status(200).json(response)
    } catch(error) {
        res.status(500).json({message: error.message});
    }
}

exports.getDelivery = (req, res) => {
    try {
        const response = deliveryService.getDeliveryFromId(req.params.id);
        if (response.delivery_id == null) {
            res.status(404).json({message: "No such delivery"})
        } else {
            res.status(200).json(response);
        }
    } catch (error){
        res.status(404).json({message: error.message});
    }
}

exports.generateDelivery = (req, res) => {
    try {
        
        const response = deliveryService.generateDelivery();
        res.status(200).json(response);
    } catch (error){
        res.status(500).json({message: error.message});
    }
}

exports.handleDelivery = (req, res) => {
    try {
        const data = req.body
        const response = deliveryService.createDelivery(data);
        res.status(200).json({message: `pomyślnie utworzono dostawę o id ${response}`});
    } catch (error){
        res.status(500).json({message: error.message});
    }
}

exports.recieveDelivery = (req, res) => {
    try {
        const products = req.body
        const response = deliveryService.recieveDelivery(req.params.id,products);

        res.status(200).json({success: true,message: `pomyślnie zaksiegowano dostawę o id ${response}`});
    } catch(error){
        res.status(500).json({success: false, message: error.message})
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

