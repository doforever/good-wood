/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

const Cart = require('../cart.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Cart', () => {
  after(() => {
    mongoose.models = {};
  });
  it('should throw an error if products is missing', () => {
    const cart = new Cart({});
    cart.validate(err => {
      expect(err.errors.products).to.exist;
    });
  });

  it('should throw an error if "products" is not a non-empty array', () => {
    const cases = ['test', 6, []];
    for (let products of cases) {
      const cart = new Cart({products});

      cart.validate(err => {
        expect(err.errors.products).to.exist;
      });
    }
  });

  it('should not throw an error when properties are correct', () => {
    const cart = new Cart({
      products: [{ amount: 1, product: '5d9f1140f10a81216cfd4408', comment: 'test' }],
    });

    cart.validate(err => {
      expect(err).to.not.exist;
    });
  });
});
