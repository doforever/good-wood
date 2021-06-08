const dbURI = process.env.NODE_ENV === 'test'
  ? 'mongodb://localhost:27017/goodWoodTest'
  : 'mongodb://localhost:27017/goodWood062020';

module.exports = {dbURI};
