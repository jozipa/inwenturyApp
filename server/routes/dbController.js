const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const multer = require('multer');


const dbPath = path.join(__dirname, '../data/db.json');


const readData = () => JSON.parse(fs.readFileSync(dbPath));


const uploadDir = path.join(__dirname, '../data/img');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + ext;
    cb(null, uniqueName);0
  }
});
const upload = multer({ storage });


// GET all shirts
router.get('/', (req, res) => {
  const data = readData();
  res.json(data);
});

router.post('/', upload.single('image'), (req, res) => {
  const data = JSON.parse(fs.readFileSync(dbPath));
  const body = req.body;

  const catArr = body.categories.split(",")
  
  const newItem = {
    id: Date.now(),
    name: body.name,
    description: body.description,
    type: body.type,
    categories: catArr,
    count: JSON.parse(body.count),
    imageUrl: req.file ? `/images/${req.file.filename}` : '', 
  };

  data.push(newItem);
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  res.status(201).json({ message: 'Dodano koszulkę!', item: newItem });
});

router.patch('/', (req, res) => {
  const data = readData();
  const newItem = req.body;

  const index = data.findIndex(item => item.id == newItem.id);

  if (index === -1) {
    return res.status(404).json({ message: 'Nie znaleziono produktu o takim id' });
  }

  data[index].count = newItem.count;

  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  res.status(201).json({ message: 'Zaktualizowano koszulkę!', item: newItem });
});



module.exports = router;