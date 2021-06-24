const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const connectToDB = require('./db');
const { dbURI } = require('./config');
const productsRoutes = require('./routes/products.routes');
const ordersRoutes = require('./routes/orders.routes');
const cartRoutes = require('./routes/cart.routes');
const MongoStore = require('connect-mongo');

const app = express();

/* CONNECT TO DB */
connectToDB(dbURI);

/* ADD MIDDLEWARE */
app.use(session({
  secret: 'kkdmerjwi94rslmflksdmr43',
  store: MongoStore.create({ mongoUrl: dbURI }),
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 48, secure: false, httpOnly: true },
  resave: false,
  proxy: false,
}));
app.use(cors({
  origin: [
    'http://localhost:3000',
  ],
  credentials: true,
  exposedHeaders: ['set-cookie'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

/* API ENDPOINTS */
app.use('/api', productsRoutes);
app.use('/api', ordersRoutes);
app.use('/api', cartRoutes);

/* API ERROR PAGES */
app.use('/api', (req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

/* REACT WEBSITE BUILD */
app.use(express.static(path.join(__dirname, '../build')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

/* START SERVER */
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});

module.exports = server;
