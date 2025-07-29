const express = require('express');
const cors = require('cors');
const itemsRoute = require('./routes/dbController');
const categoriesRoute = require('./routes/categoriesController')
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/api/items', itemsRoute);
app.use('/api/categories', categoriesRoute)
app.use('/images', express.static(path.join(__dirname, 'data/img')));



app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});