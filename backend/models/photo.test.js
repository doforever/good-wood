/* eslint-disable no-unused-expressions */
const { Photo } = require('./photo.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Photo', () => {
  it('should throw an error if any arg is missing', () => {
    const cases = [
      {
        name: 'test',
      },
      {
        src: 'test',
      },
    ];

    for (let prop of cases) {
      const photo = new Photo(prop);

      photo.validate(err => {
        expect(err.errors).to.exist;
      });
    }
  });

  it('should throw an error if "name" is not a string', () => {

    const cases = [{}, []];
    for (let name of cases) {
      const photo = new Photo({ name, src: 'test'});

      photo.validate(err => {
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('should throw an error if "src" is not a string', () => {

    const cases = [{}, []];
    for (let src of cases) {
      const photo = new Photo({ src, name: 'test'});

      photo.validate(err => {
        expect(err.errors.src).to.exist;
      });
    }
  });

  it('should not throw an error when properties are correct', () => {
    const photo = new Photo({ name: 'test', src: 'test'});

    photo.validate(err => {
      expect(err).to.not.exist;
    });
  });
});
