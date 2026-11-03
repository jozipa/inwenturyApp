const receiptService  = require('../services/receiptService');

exports.handleReceipt = (req, res)=>{
    try {
        const receiptId = receiptService.createReceipt(req.body);
        res.status(200).json({id: receiptId, message: "Pomyślnie przeprwadzono transakcję"})
    } catch (error){
        res.status(500).json({ error: error.message });
    }
}

exports.getReceipt = (req, res) => {
    try {
        console.log("geteer");
        const receiptsGrouped = receiptService.fetchReceipts();
        console.log(receiptsGrouped);
        res.status(200).json(receiptsGrouped);
    }   catch (error) {
        res.status(500).json({error: error.message})
    }
}
