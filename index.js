const express = require('express');
const products = require('./data')

// Init server
const app = express();

// Conver to JSON
app.use(express.json());

app.get('/api/products', (req, res) => {
  res.send(products)
})

app.listen(4000, () => console.log('server running'));
