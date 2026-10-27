const express = require('express');
const cors = require('cors');
const itemsRoute = require('./src/routes/dbController');
const categoriesRoute = require('./src/routes/categoriesController')
const productsRoute = require('./src/routes/productsRouter')
const path = require('path');



const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use('/api/products', productsRoute);
app.use('/api/categories', categoriesRoute)
app.use('/images', express.static(path.join(__dirname, 'uploads/img')));




app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});