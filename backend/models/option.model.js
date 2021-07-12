const { Schema } = require('mongoose');

const optionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
});

module.exports = {
  optionSchema,
};
