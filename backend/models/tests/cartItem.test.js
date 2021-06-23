/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

const { CartItem } = require('../cartItem.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');


describe('CartItem', () => {
  after(() => {
    mongoose.models = {};
  });

  it('should throw an error if product is missing', () => {
    const cartItem = new CartItem({amount: 1, comment: 'test comment'});
    cartItem.validate(err => {
      expect(err.errors).to.exist;
    });

  });

  it('should throw an error if "product" is not a ObjectId', () => {

    const cases = [{}, [], 11, 'test'];
    for (let product of cases) {
      const cartItem = new CartItem({ product, amount: 1, comment: 'test' });

      cartItem.validate(err => {
        expect(err.errors.product).to.exist;
      });
    }
  });

  it('should throw an error if "amount" is not a number', () => {

    const cases = [{}, [], 'test'];
    for (let amount of cases) {
      const cartItem = new CartItem({ amount, product: '5d9f1140f10a81216cfd4408', comment: 'test' });

      cartItem.validate(err => {
        expect(err.errors.amount).to.exist;
      });
    }
  });

  it('should throw an error if "comment" is not a string', () => {

    const cases = [{}, []];
    for (let comment of cases) {
      const cartItem = new CartItem({ amount: 1, product: '5d9f1140f10a81216cfd4408', comment });

      cartItem.validate(err => {
        expect(err.errors.comment).to.exist;
      });
    }
  });

  it('should not throw an error when properties are correct', () => {
    const cartItem = new CartItem({ amount: 1, product: '5d9f1140f10a81216cfd4408', comment: 'test' });

    cartItem.validate(err => {
      expect(err).to.not.exist;
    });
  });
});
