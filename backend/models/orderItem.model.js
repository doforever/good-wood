const { Schema, model } = require('mongoose');

const orderItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  amount: { type: Number, default: 1 },
  comment: { type: String },
});

module.exports = {
  OrderItem: model('OrderItem', orderItemSchema),
  orderItemSchema,
};
