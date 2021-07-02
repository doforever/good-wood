const express = require('express');
const Product = require('../models/product.model');

const router = express.Router();

router.get('/products', async (req, res) => {
  try {
    await Product.find({}, (err, products) => {
      if(err) res.status(500).json(err);
      if (products) {
        res.header('Cache-Control', 'max-age=720, stale-while-revalidate=7200')
          .json(products.map(({_id, name, defaultPrice, photos}) => (
            {
              _id,
              name,
              defaultPrice,
              mainPhoto: {
                name: photos[0].name,
                src: photos[0].src,
              },
            }
          )));
      } else res.status(404).json({ product: 'Not found' });
    });
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const result = await Product.findById(req.params.id);
    if (!result) res.status(404).json({ product: 'Not found' });
    else res.header('Cache-Control', 'stale-while-revalidate=7200').json(result);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
