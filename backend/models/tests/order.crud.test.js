/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');
const Order = require('../order.model');
const expect = require('chai').expect;

describe('Order', () => {
  before(async () => {
    try {
      const fakeDB = new MongoMemoryServer();
      const uri = await fakeDB.getUri();
      mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (err) {
      console.log(err);
    }
  });

  after(async () => {
    await mongoose.disconnect();
  });

  describe('Creating data', () => {
    after(async () => {
      await Order.deleteMany();
    });

    it('should insert new document with "save" method', async () => {
      const order = new Order({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@gmail.com',
        address: 'Home 5',
        products: [{ amount: 1, product: '5d9f1140f10a81216cfd4408', comment: 'test' }],
      });
      await order.save();
      expect(order.isNew).to.be.false;
    });
  });
});
