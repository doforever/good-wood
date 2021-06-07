/* eslint-disable no-undef */
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');
const Product = require('../product.model');
const expect = require('chai').expect;

describe('Product', () => {
  before(async () => {

    try {
      const fakeDB = new MongoMemoryServer();
      const uri = await fakeDB.getUri();
      mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (err) {
      console.log(err);
    }

  });

  describe('Reading data', () => {
    before(async () => {
      const testProduct1 = new Product({
        name: 'Product1',
        description: 'Test',
        defaultPrice: 5,
        photos: [{
          name: 'Close-up',
          src: 'https://images.pexels.com/photos/4857781/pexels-photo-4857781.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        }],
      });
      await testProduct1.save();

      const testProduct2 = new Product({
        name: 'Product2',
        description: 'Test',
        defaultPrice: 5,
        photos: [{
          name: 'Close-up',
          src: 'https://images.pexels.com/photos/4857781/pexels-photo-4857781.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        }],
      });
      await testProduct2.save();
    });

    after(async () => {
      await Product.deleteMany();
    });

    it('should return all the data with "find" method', async () => {
      const products = await Product.find();
      const expectedLength = 2;
      expect(products.length).to.be.equal(expectedLength);
    });

    it('should return proper document by various params with "findOne" method', async () => {
      const expectedProduct = {
        name: 'Product1',
        description: 'Test',
        defaultPrice: 5,
      };
      for (let key in expectedProduct) {
        const value = expectedProduct[key];
        const product = await Product.findOne({ [key]: value });
        expect(product.performer).to.be.equal(expectedProduct.performer);
      }
    });
  });

});
