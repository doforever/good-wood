/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const server = require('../../server');
// const Product = require('../../models/product.model');

// chai.use(chaiHttp);

// const expect = chai.expect;
// const request = chai.request;

// describe('GET /api/products', () => {
//   before(async () => {
//     const testProduct = new Product({
//       _id: '5d9f1140f10a81216cfd4408',
//       name: 'test',
//       description: 'Lorem ipsum',
//       defaultPrice: 50,
//       photos: [{ name: 'abc', src: 'abc.jpg' }],
//     });
//     await testProduct.save();
//   });

//   after(async () => {
//     await Product.deleteOne({ _id: '5d9f1140f10a81216cfd4408'});
//   });

//   // it('/ should return all products', async () => {
//   //   const res = await request(server).get('/api/products');
//   //   expect(res.status).to.be.equal(200);
//   //   expect(res.body).to.be.an('array');
//   // });

//   // it('/ should return selected product properties', async () => {
//   //   const res = await request(server).get('/api/products');
//   //   for (let p of res.body) {
//   //     expect(p).to.include('photo');
//   //     expect(p).not.to.include('description');
//   //   }
//   // });

//   // it('/:id should return one product by :id ', async () => {
//   //   const res = await request(server).get('/api/products/5d9f1140f10a81216cfd4408');
//   //   expect(res.status).to.be.equal(200);
//   //   expect(res.body).to.be.an('object');
//   //   expect(res.body).to.not.be.null;
//   // });
// });
