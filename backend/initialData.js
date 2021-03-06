const Product = require('./models/product.model');

const loadInitialData = async () => {

  const data = [
    {
      name: 'Simple Chair',
      description: 'In bibendum tincidunt sem, ut gravida elit. Proin non tristique arcu. Nunc elit orci, blandit eget mauris quis, lacinia laoreet neque. Nullam aliquet purus sed metus scelerisque semper. Sed aliquam.',
      defaultPrice: 20,
      category: 'chairs',
      photos: [{
        name: 'Chair close-up',
        src: '/images/pexels-photo-7402621.jpeg',
      },{
        name: 'Back of the chair',
        src: '/images/pexels-photo-7402624.jpeg',
      }, {
        name: 'Chair close-up',
        src: '/images/pexels-photo-7402621.jpeg',
      }, {
        name: 'Back of the chair',
        src: '/images/pexels-photo-7402624.jpeg',
      }],
    },
    {
      name: 'Vintage Chair',
      description: 'In bibendum tincidunt sem, ut gravida elit. Proin non tristique arcu. Nunc elit orci, blandit eget mauris quis, lacinia laoreet neque. Nullam aliquet purus sed metus scelerisque semper. Sed aliquam.',
      defaultPrice: 50,
      category: 'chairs',
      photos: [{
        name: 'Chair close-up',
        src: '/images/pexels-photo-116907.jpeg',
      }, {
        name: 'Side-view',
        src: '/images/pexels-photo-116915.jpeg',
      }, {
        name: 'Side-view',
        src: '/images/pexels-photo-116915.jpeg',
      }],
    },
    {
      name: 'Wooden Table',
      description: 'In bibendum tincidunt sem, ut gravida elit. Proin non tristique arcu. Nunc elit orci, blandit eget mauris quis, lacinia laoreet neque. Nullam aliquet purus sed metus scelerisque semper. Sed aliquam.',
      defaultPrice: 60,
      category: 'tables',
      photos: [{
        name: 'Top of the table',
        src: '/images/pexels-photo-3184430.jpeg',
      }, {
        name: 'In use',
        src: '/images/pexels-photo-3183172.jpeg',
      }, {
        name: 'Home office',
        src: '/images/pexels-photo-1297611.jpeg',
      }],
    },
    {
      name: 'Coffee Table',
      description: 'In bibendum tincidunt sem, ut gravida elit. Proin non tristique arcu. Nunc elit orci, blandit eget mauris quis, lacinia laoreet neque. Nullam aliquet purus sed metus scelerisque semper. Sed aliquam.',
      defaultPrice: 50,
      category: 'tables',
      photos: [{
        name: 'Top of the table',
        src: '/images/pexels-photo-3230010.jpeg',
      }, {
        name: 'Detail',
        src: '/images/pexels-photo-3371220.jpeg',
      }],
    },
    {
      name: 'Comfortable double bed',
      description: 'In bibendum tincidunt sem, ut gravida elit. Proin non tristique arcu. Nunc elit orci, blandit eget mauris quis, lacinia laoreet neque. Nullam aliquet purus sed metus scelerisque semper. Sed aliquam.',
      defaultPrice: 50,
      category: 'beds',
      photos: [{
        name: 'Seen from the distance',
        src: '/images/pexels-photo-6480210.jpeg',
      }, {
        name: 'Detail',
        src: '/images/pexels-photo-6480209.jpeg',
      }, {
        name: 'Seen from the distance',
        src: '/images/pexels-photo-6480210.jpeg',
      }, {
        name: 'Detail',
        src: '/images/pexels-photo-6480209.jpeg',
      }],
    },
    {
      name: 'Lovely bed for kids',
      description: 'In bibendum tincidunt sem, ut gravida elit. Proin non tristique arcu. Nunc elit orci, blandit eget mauris quis, lacinia laoreet neque. Nullam aliquet purus sed metus scelerisque semper. Sed aliquam.',
      defaultPrice: 50,
      category: 'beds',
      photos: [{
        name: 'Side-view',
        src: '/images/pexels-photo-3661202.jpeg',
      }, {
        name: 'Detail',
        src: '/images/pexels-photo-3661198.jpeg',
      }, {
        name: 'Side-view',
        src: '/images/pexels-photo-3661202.jpeg',
      }],
    },
    {
      name: 'Simple bookshelf',
      description: 'In bibendum tincidunt sem, ut gravida elit. Proin non tristique arcu. Nunc elit orci, blandit eget mauris quis, lacinia laoreet neque. Nullam aliquet purus sed metus scelerisque semper. Sed aliquam.',
      defaultPrice: 30,
      category: 'storage',
      photos: [{
        name: 'Close-up',
        src: '/images/pexels-photo-4857781.jpeg',
      }, {
        name: 'In a room',
        src: '/images/pexels-photo-4846114.jpeg',
      }, {
        name: 'Close-up',
        src: '/images/pexels-photo-4857781.jpeg',
      }, {
        name: 'In a room',
        src: '/images/pexels-photo-4846114.jpeg',
      }],
    },
  ];

  const getOptions = category => {
    const option = (name, price) => ({name, price});

    const colors = [{ name: 'natural', price: 0 }, {name: 'white', price: 0}, {name: 'black', price: 0}];
    const woods = [{ name: 'birch', price: 0 }, {name: 'oak', price: 20}];
    const defaultOptions = [{name: 'colors', values: colors}, {name: 'woods', values: woods}];

    switch (category) {
      case 'tables':
        return [
          ...defaultOptions,
          {
            name: 'sizes',
            values: [option('75 x 105', 0), option('80 x 160', 10), option('90 x 180', 20), option('100 x 200', 30)],
          },
        ];
      case 'beds':
        return [
          ...defaultOptions,
          {
            name: 'sizes',
            values: [option('90 x 200', 0), option('140 x 200', 10), option('160 x 200', 20), option('200 x 200', 30)],
          },
        ];
      case 'storage':
        return [
          ...defaultOptions,
          {
            name: 'widths',
            values: [option('120', 0), option('160', 20)],
          },
        ];
      default:
        return defaultOptions;
    }
  };

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
      await Product.create(multiplyData(data.map(p => ({...p, options: getOptions(p.category)})), 5));
      console.log('Test data has been successfully loaded');
    }
  } catch (err) {
    console.log(`Couldn't load test data`, err);
  }

};

module.exports = loadInitialData;
