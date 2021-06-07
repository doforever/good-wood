/* eslint-disable no-unused-expressions */
const { OrderItem } = require('../orderItem.model.js');
const expect = require('chai').expect;

describe('OrderItem', () => {
  it('should throw an error if product is missing', () => {
    const orderItem = new OrderItem({amount: 1, comment: 'test comment'});
    orderItem.validate(err => {
      expect(err.errors).to.exist;
    });

  });

  it('should throw an error if "product" is not a ObjectId', () => {

    const cases = [{}, [], 11, 'test'];
    for (let product of cases) {
      const orderItem = new OrderItem({ product, amount: 1, comment: 'test' });

      orderItem.validate(err => {
        expect(err.errors.product).to.exist;
      });
    }
  });

  it('should throw an error if "amount" is not a number', () => {

    const cases = [{}, [], 'test'];
    for (let amount of cases) {
      const orderItem = new OrderItem({ amount, product: '5d9f1140f10a81216cfd4408', comment: 'test' });

      orderItem.validate(err => {
        expect(err.errors.amount).to.exist;
      });
    }
  });

  it('should throw an error if "comment" is not a string', () => {

    const cases = [{}, []];
    for (let comment of cases) {
      const orderItem = new OrderItem({ amount: 1, product: '5d9f1140f10a81216cfd4408', comment });

      orderItem.validate(err => {
        expect(err.errors.comment).to.exist;
      });
    }
  });

  it('should not throw an error when properties are correct', () => {
    const orderItem = new OrderItem({ amount: 1, product: '5d9f1140f10a81216cfd4408', comment: 'test' });

    orderItem.validate(err => {
      expect(err).to.not.exist;
    });
  });
});
