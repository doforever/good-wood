const { Schema, model } = require('mongoose');

const photoSchema = new Schema({
  name: { type: String, required: true },
  src: { type: String, required: true },
});

module.exports = {
  Photo: model('Photo', photoSchema),
  photoSchema,
};
