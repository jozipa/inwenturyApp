const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

cat_path = path.join(__dirname, "../data/categories.json")

const readData = () => JSON.parse(fs.readFileSync(cat_path));

router.get("/", (req,res) => {
    data = readData()
    res.json(data)
})

module.exports = router;