const express = require('express');
const cors = require('cors');
const productsRoute = require('./src/routes/productsRouter')
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use('/api/products', productsRoute);
app.use('/images', express.static(path.join(__dirname, 'uploads/img')));




app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(400).json({ error: err.message });
});