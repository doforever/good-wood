const { Schema, model } = require('mongoose');

const photoSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  src: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 150,
  },
});

module.exports = {
  Photo: model('Photo', photoSchema),
  photoSchema,
};
