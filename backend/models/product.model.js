const mongoose = require('mongoose');
const { photoSchema } = require('./photo.model');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  defaultPrice: { type: Number, required: true },
  photos: {
    type: [photoSchema],
    validate: {
      validator: v => Array.isArray(v) && v.length > 0,
    },
    required: true,
  },
});

module.exports = mongoose.model('Product', productSchema);
