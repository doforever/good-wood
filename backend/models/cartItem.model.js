const { Schema, model } = require('mongoose');

const cartItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  amount: {
    type: Number,
    default: 1,
    max: 50,
    min: 1,
  },
  comment: {
    type: String,
    maxLength: 200,
  },
  options: {
    type: [{ name: String, value: String }],
  },
  itemPrice: {
    type: Number,
    min: 0,
    required: true,
  },
});

module.exports = {
  CartItem: model('CartItem', cartItemSchema),
  cartItemSchema,
};
