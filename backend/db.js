const mongoose = require('mongoose');
const { dbUri } = require('./config');

const loadInitialData = require('./initialData');

const connectToDB = () => {
  console.log('Trying to connect to ', dbUri );
  mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;

  db.once('open', () => {
    console.log('Connected to the database');
    loadInitialData();
  });

  db.on('error', (err) => console.log('DB connection error: ' + err));
};

module.exports = connectToDB;
