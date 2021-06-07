/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

const Order = require('../order.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Order', () => {
  after(() => {
    mongoose.models = {};
  });
  it('should throw an error if any required arg is missing', () => {
    const cases = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@gmail.com',
        address: 'Home',
      },
      {
        products: [{ amount: 1, product: '5d9f1140f10a81216cfd4408', comment: 'test' }],
        lastName: 'Doe',
        email: 'john@gmail.com',
        address: 'Home',
      },
      {
        products: [{ amount: 1, product: '5d9f1140f10a81216cfd4408', comment: 'test' }],
        firstName: 'John',
        email: 'john@gmail.com',
        address: 'Home',
      },
      {
        products: [{ amount: 1, product: '5d9f1140f10a81216cfd4408', comment: 'test' }],
        firstName: 'John',
        lastName: 'Doe',
        address: 'Home',
      },
      {
        products: [{ amount: 1, product: '5d9f1140f10a81216cfd4408', comment: 'test' }],
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@gmail.com',
      },
    ];

    for (let prop of cases) {
      const order = new Order(prop);

      order.validate(err => {
        expect(err.errors).to.exist;
      });
    }
  });

  it('should throw an error if "firstName" is not a string', () => {

    const cases = [{}, []];
    for (let firstName of cases) {
      const order = new Order({
        firstName,
        products: [{ amount: 1, product: '5d9f1140f10a81216cfd4408', comment: 'test' }],
        lastName: 'Doe',
        email: 'john@gmail.com',
        address: 'Home',
      });

      order.validate(err => {
        expect(err.errors.firstName).to.exist;
      });
    }
  });

  it('should throw an error if "lastName" is not a string', () => {

    const cases = [{}, []];
    for (let lastName of cases) {
      const order = new Order({
        lastName,
        products: [{ amount: 1, product: '5d9f1140f10a81216cfd4408', comment: 'test' }],
        firstName: 'John',
        email: 'john@gmail.com',
        address: 'Home',
      });

      order.validate(err => {
        expect(err.errors.lastName).to.exist;
      });
    }
  });

  it('should throw an error if "address" is not a string', () => {

    const cases = [{}, []];
    for (let address of cases) {
      const order = new Order({
        address,
        products: [{ amount: 1, product: '5d9f1140f10a81216cfd4408', comment: 'test' }],
        firstName: 'John',
        email: 'john@gmail.com',
        lastName: 'Doe',
      });

      order.validate(err => {
        expect(err.errors.address).to.exist;
      });
    }
  });

  it('should throw an error if "email" is not valid email', () => {

    const cases = ['doro', '@mgaa.d', 'fdsfd@'];
    for (let email of cases) {
      const order = new Order({
        address: 'Home',
        products: [{ amount: 1, product: '5d9f1140f10a81216cfd4408', comment: 'test' }],
        firstName: 'John',
        email,
        lastName: 'Doe',
      });

      order.validate(err => {
        expect(err.errors.email).to.exist;
      });
    }
  });

  it('should throw an error if "products" is not a non-empty array', () => {

    const cases = ['test', 6, []];
    for (let products of cases) {
      const order = new Order({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@gmail.com',
        address: 'Home',
        products,
      });

      order.validate(err => {
        expect(err.errors.products).to.exist;
      });
    }
  });

  it('should not throw an error when properties are correct', () => {
    const order = new Order({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@gmail.com',
      address: 'Home',
      products: [{ amount: 1, product: '5d9f1140f10a81216cfd4408', comment: 'test' }],
    });

    order.validate(err => {
      expect(err).to.not.exist;
    });
  });
});
