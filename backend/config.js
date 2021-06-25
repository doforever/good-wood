let dbURI;
switch (process.env.NODE_ENV) {
  case 'test':
    dbURI = 'mongodb://localhost:27017/goodWoodTest';
    break;
  case 'production':
    dbURI = `mongodb+srv://doforever:${process.env.dbpass}@goodwooddb.sa1od.mongodb.net/GoodWoodDB?retryWrites=true&w=majority`;
    break;
  default:
    dbURI = 'mongodb://localhost:27017/goodWood062020';
}

module.exports = {dbURI};
