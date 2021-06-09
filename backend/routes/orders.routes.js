const express = require('express');
const Order = require('../models/order.model');
const sanitize = require('mongo-sanitize');

const router = express.Router();

router.get('/orders', async (req, res) => {
  try {
    const result = await Order.find();
    if (!result) res.status(404).json({ post: 'Not found' });
    else {
      res.json(result);
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/orders/:id', async (req, res) => {
  try {
    const result = await Order.findById(req.params.id).populate('products.product');
    if (!result) res.status(404).json({ product: 'Not found' });
    else res.json(result);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/orders', async (req, res) => {
  const { firstName, lastName, email, address, products, status} = req.body;

  if (firstName && lastName && email && address && products && products.length > 0 && status) {
    try {
      const newOrder = new Order({
        firstName: sanitize(firstName),
        lastName: sanitize(lastName),
        email,
        address: sanitize(address),
        products: sanitize(products),
        status,
      });
      const saved = await newOrder.save();
      res.status(201).json(saved);
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Order saving error' });
    }
  } else {
    res.status(400).json({ message: 'Bad request' });
  }
});

module.exports = router;
