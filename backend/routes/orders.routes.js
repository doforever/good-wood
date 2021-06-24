const express = require('express');
const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
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
    const result = await Order.findById(req.params.id).populate('cart');
    if (!result) res.status(404).json({ product: 'Not found' });
    else res.json(result);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/orders', async (req, res) => {
  const { firstName, lastName, email, address, products } = req.body;
  const cartId = !!req.session && req.session.cartId;

  if (firstName && lastName && email && address && products && products.length > 0) {
    try {
      const newOrder = new Order({
        firstName: sanitize(firstName),
        lastName: sanitize(lastName),
        email,
        address: sanitize(address),
        products: sanitize(products),
      });
      const saved = await newOrder.save();
      if (cartId) {
        await Cart.findByIdAndRemove(cartId);
        req.session.cartId = null;
      }
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
