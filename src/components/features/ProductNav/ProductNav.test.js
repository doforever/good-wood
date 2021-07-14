import React from 'react';
import { shallow } from 'enzyme';
import ProductNav from './ProductNav';

const mockProducts = [{
  id: '60ec3d9f7f4e25f913f77c1c',
  name: 'Simple Chair 1',
  defaultPrice: 20,
  category: 'chairs',
  mainPhoto: {name: 'Chair close-up', src: '/images/pexels-photo-7402621.jpeg'},
}];

describe('Component ProductNav', () => {
  it('should render without crashing', () => {
    const component = shallow(<ProductNav products={mockProducts}/>);
    expect(component).toBeTruthy();
  });
});
