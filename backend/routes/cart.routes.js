const express = require('express');
const Cart = require('../models/cart.model');
const sanitize = require('mongo-sanitize');

const router = express.Router();

router.get('/carts/stored', async (req, res) => {
  const cartId = !!req.session && req.session.cartId;

  if (cartId) {
    try {
      const storedCart = await Cart.findById(cartId).populate({path: 'products.product', select: 'name'});
      if (!storedCart) res.status(404).json({ message: 'Not found' });
      else {
        res.json(storedCart);
      }
    }
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else res.status(404).json({ message: 'Not found'});
});

router.post('/carts', async (req, res) => {
  const { products } = req.body;
  const session = req.session;

  if (products && products.length > 0 && session) {
    try {
      const newCart = new Cart({ products: sanitize(products) });
      const saved = await newCart.save();
      req.session.cartId = saved._id;
      res.status(201).json(saved);
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Cart saving error' });
    }
  } else {
    res.status(400).json({ message: 'Bad request' });
  }
});

router.put('/carts/stored', async (req, res) => {
  const { products } = req.body;
  const cartId = !!req.session && req.session.cartId;

  if (products && cartId) {
    try {
      const storedCart = await Cart.findById(cartId);
      if (!storedCart) res.status(404).json({ message: 'Not found' });
      else {
        storedCart.products = products;
        const updatedCart = await storedCart.save();
        res.json(updatedCart);
      }
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Cart update error' });
    }
  } else {
    res.status(400).json({ message: 'Bad request' });
  }
});

router.delete('/carts/stored', async (req, res) => {
  const cartId = !!req.session && req.session.cartId;

  if (cartId) {
    try {
      const storedCart = await Cart.findById(cartId);
      if (storedCart) {
        await storedCart.remove();
        req.session.cartId = null;
        res.json(storedCart);
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch (err) {
      res.status(500).json({ message: 'Remove cart error' });
    }
  } else res.status(404).json({ message: 'Not found' });
});

module.exports = router;
