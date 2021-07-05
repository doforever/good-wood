const { Schema, model } = require('mongoose');
const { photoSchema } = require('./photo.model');

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  description: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 2000,
  },
  defaultPrice: {
    type: Number,
    required: true,
    min: 1,
    max: 10000,
  },
  category: {
    type: String,
    required: true,
    enum: ['beds', 'tables', 'chairs', 'storage'],
  },
  photos: {
    type: [photoSchema],
    validate: {
      validator: v => Array.isArray(v) && v.length > 0,
    },
    required: true,
  },
});

module.exports = model('Product', productSchema);
