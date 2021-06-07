const mongoose = require('mongoose');

const loadInitialData = require('./initialData');

const connectToDB = () => {

  mongoose.connect('mongodb://localhost:27017/goodWood', { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;

  db.once('open', () => {
    console.log('Connected to the database');
    loadInitialData();
  });

  db.on('error', (err) => console.log('DB connection error: ' + err));
};

module.exports = connectToDB;
