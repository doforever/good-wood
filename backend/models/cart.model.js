const { Schema, model } = require('mongoose');
const { cartItemSchema } = require('./cartItem.model');

const cartSchema = new Schema({
  products: {
    type: [cartItemSchema],
    validate: {
      validator: v => Array.isArray(v) && v.length > 0,
    },
    required: true,
  },
});

module.exports = model('Cart', cartSchema);
