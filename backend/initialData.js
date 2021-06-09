const Product = require('./models/product.model');

const loadInitialData = async () => {

  const data = [
    {
      name: 'Simple Chair',
      description: 'In bibendum tincidunt sem, ut gravida elit. Proin non tristique arcu. Nunc elit orci, blandit eget mauris quis, lacinia laoreet neque. Nullam aliquet purus sed metus scelerisque semper. Sed aliquam.',
      defaultPrice: 20,
      photos: [{
        name: 'Chair close-up',
        src: 'https://images.pexels.com/photos/7402621/pexels-photo-7402621.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      },{
        name: 'Back of the chair',
        src: 'https://images.pexels.com/photos/7402624/pexels-photo-7402624.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      }],
    },
    {
      name: 'Vintage Chair',
      description: 'In bibendum tincidunt sem, ut gravida elit. Proin non tristique arcu. Nunc elit orci, blandit eget mauris quis, lacinia laoreet neque. Nullam aliquet purus sed metus scelerisque semper. Sed aliquam.',
      defaultPrice: 50,
      photos: [{
        name: 'Chair close-up',
        src: 'https://images.pexels.com/photos/116907/pexels-photo-116907.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      }, {
        name: 'Side-view',
        src: 'https://images.pexels.com/photos/116915/pexels-photo-116915.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      }],
    },
    {
      name: 'Wooden Table',
      description: 'In bibendum tincidunt sem, ut gravida elit. Proin non tristique arcu. Nunc elit orci, blandit eget mauris quis, lacinia laoreet neque. Nullam aliquet purus sed metus scelerisque semper. Sed aliquam.',
      defaultPrice: 60,
      photos: [{
        name: 'Top of the table',
        src: 'https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      }, {
        name: 'In use',
        src: 'https://images.pexels.com/photos/3183172/pexels-photo-3183172.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      }, {
        name: 'Home office',
        src: 'https://images.pexels.com/photos/1297611/pexels-photo-1297611.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      }],
    },
    {
      name: 'Coffee Table',
      description: 'In bibendum tincidunt sem, ut gravida elit. Proin non tristique arcu. Nunc elit orci, blandit eget mauris quis, lacinia laoreet neque. Nullam aliquet purus sed metus scelerisque semper. Sed aliquam.',
      defaultPrice: 50,
      photos: [{
        name: 'Top of the table',
        src: 'https://images.pexels.com/photos/3230010/pexels-photo-3230010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      }, {
        name: 'Detail',
        src: 'https://images.pexels.com/photos/3371220/pexels-photo-3371220.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      }],
    },
    {
      name: 'Comfortable double bed',
      description: 'In bibendum tincidunt sem, ut gravida elit. Proin non tristique arcu. Nunc elit orci, blandit eget mauris quis, lacinia laoreet neque. Nullam aliquet purus sed metus scelerisque semper. Sed aliquam.',
      defaultPrice: 50,
      photos: [{
        name: 'Seen from the distance',
        src: 'https://images.pexels.com/photos/6480210/pexels-photo-6480210.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      }, {
        name: 'Detail',
        src: 'https://images.pexels.com/photos/6480209/pexels-photo-6480209.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      }],
    },
    {
      name: 'Lovely bed for kids',
      description: 'In bibendum tincidunt sem, ut gravida elit. Proin non tristique arcu. Nunc elit orci, blandit eget mauris quis, lacinia laoreet neque. Nullam aliquet purus sed metus scelerisque semper. Sed aliquam.',
      defaultPrice: 50,
      photos: [{
        name: 'Side-view',
        src: 'https://images.pexels.com/photos/3661202/pexels-photo-3661202.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      }, {
        name: 'Detail',
        src: 'https://images.pexels.com/photos/3661198/pexels-photo-3661198.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      }],
    },
    {
      name: 'Simple bookshelf',
      description: 'In bibendum tincidunt sem, ut gravida elit. Proin non tristique arcu. Nunc elit orci, blandit eget mauris quis, lacinia laoreet neque. Nullam aliquet purus sed metus scelerisque semper. Sed aliquam.',
      defaultPrice: 30,
      photos: [{
        name: 'Close-up',
        src: 'https://images.pexels.com/photos/4857781/pexels-photo-4857781.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      }, {
        name: 'In a room',
        src: 'https://images.pexels.com/photos/4846114/pexels-photo-4846114.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      }],
    },
  ];

  const multiplyData = (data, factor) => {
    const result = [];
    for (let i=1; i <= factor; i++) {
      result.push(...(data.map(item => ({...item, name: item.name + ' ' + i}))));
    }
    return result;
  };

  try {
    let counter = await Product.countDocuments();
    if (counter === 0) {
      console.log('No products. Loading example data...');
      await Product.create(multiplyData(data, 5));
      console.log('Test data has been successfully loaded');
    }
  } catch (err) {
    console.log(`Couldn't load test data`, err);
  }

};

module.exports = loadInitialData;
