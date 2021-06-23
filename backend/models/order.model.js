const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'Cart',
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
