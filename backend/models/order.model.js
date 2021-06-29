const { Schema, model } = require('mongoose');
const { cartItemSchema } = require('./cartItem.model');

const orderSchema = new Schema({
  products: {
    type: [cartItemSchema],
    validate: {
      validator: v => Array.isArray(v) && v.length > 0,
    },
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 15,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    match: new RegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.([a-z]{1,6}))$/i),
  },
  address: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 60,
  },
});

module.exports = model('Order', orderSchema);
