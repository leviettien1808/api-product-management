const express = require('express');
const products = require('./data');
const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');

// Init server
const app = express();

// Conver to JSON
app.use(express.json());

app.get('/api/products', (req, res) => {
  const status = req.query.status;
  if (status) {
    const filterProduct = products.find((product) => product.Status === status);
    res.send(filterProduct || {});
  }
  res.send(products);
});

app.post('/api/products', (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) {
    return res.status(404).send({
      message: error.details[0].message,
    });
  }
  const { name, description, price, status } = req.body;
  const product = {
    id: uuidv4(),
    name,
    description: description ? description : null,
    price,
    status: status ? status : 'active',
    createdDate: new Date(),
  };
  products.push(product);
  return res.send(product);
});

app.put('/api/products/:id', (req, res) => {
  const product = products.find((product) => product.id === req.params.id);
  if (!product) {
    return res.status(400).send({
      message: 'Product not found',
    });
  }
  const { error } = validateProduct(req.body);
  if (error) {
    return res.status(400).send({
      message: error.details[0].message,
    });
  }
  const { name, description, price, status } = req.body;
  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.status = status || product.status;

  res.send(product);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((product) => (product.id = req.params.id));
  if (!product) {
    return res.status(400).send({
      message: 'Product not found',
    });
  }
  return res.send(product);
});

app.delete('/api/products/:id', (req, res) => {
  const product = products.find((product) => (product.id = req.params.id));
  if (!product) {
    return res.status(400).send({
      message: 'Product not found',
    });
  }
  const index = products.indexOf(product);
  products.splice(index, 1);
  res.send(product);
});

const validateProduct = (product) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    description: Joi.string().max(200),
    price: Joi.number().required(),
    status: Joi.string().valid('active', 'inactive'),
  });
  return schema.validate(product);
};

app.listen(4000, () => console.log('server running'));
