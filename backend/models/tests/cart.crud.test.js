/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');
const Cart = require('../cart.model');
const expect = require('chai').expect;

describe('Cart', () => {
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
      await Cart.deleteMany();
    });

    it('should insert new document with "save" method', async () => {
      const cart = new Cart({
        products: [{ amount: 1, product: '5d9f1140f10a81216cfd4408', comment: 'test' }],
      });
      await cart.save();
      expect(cart.isNew).to.be.false;
    });
  });
});
