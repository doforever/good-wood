const { Schema, model } = require('mongoose');

const orderItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  amount: {
    type: Number,
    default: 1,
    max: 50,
    min: 1,
  },
  comment: {
    type: String,
    minLength: 3,
    maxLength: 200,
  },
});

module.exports = {
  OrderItem: model('OrderItem', orderItemSchema),
  orderItemSchema,
};
