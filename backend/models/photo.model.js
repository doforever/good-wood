const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  src: { type: String, required: true },
});

module.exports = {
  Photo: mongoose.model('Photo', photoSchema),
  photoSchema,
};
