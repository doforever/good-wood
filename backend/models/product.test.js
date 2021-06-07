/* eslint-disable no-unused-expressions */
const Product = require('./product.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Product', () => {
  it('should throw an error if any required arg is missing', () => {
    const cases = [
      {
        name: 'test',
        description: 'Lorem ipsum',
      },
      {
        name: 'test',
        defaultPrice: 50,
      },
      {
        description: 'Lorem ipsum',
        defaultPrice: 50,
      },
    ];

    for (let prop of cases) {
      const product = new Product(prop);

      product.validate(err => {
        expect(err.errors).to.exist;
      });
    }
  });

  it('should throw an error if "name" is not a string', () => {

    const cases = [{}, []];
    for (let name of cases) {
      const product = new Product({
        name,
        description: 'Lorem ipsum',
        defaultPrice: 50,
      });

      product.validate(err => {
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('should throw an error if "description" is not a string', () => {

    const cases = [{}, []];
    for (let description of cases) {
      const product = new Product({
        description,
        name: 'test',
        defaultPrice: 50,
      });

      product.validate(err => {
        expect(err.errors.description).to.exist;
      });
    }
  });

  it('should throw an error if "defaultPrice" is not a number', () => {

    const cases = [{}, [], 'test'];
    for (let defaultPrice of cases) {
      const product = new Product({
        defaultPrice,
        name: 'test',
        description: 'Lorem ipsum',
      });

      product.validate(err => {
        expect(err.errors.defaultPrice).to.exist;
      });
    }
  });

  it('should not throw an error when properties are correct', () => {
    const product = new Product({
      name: 'test',
      description: 'Lorem ipsum',
      defaultPrice: 50,
    });

    product.validate(err => {
      expect(err).to.not.exist;
    });
  });
});
