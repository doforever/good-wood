import React from 'react';
import { shallow } from 'enzyme';
import ProductBox from './ProductBox';

describe('Component ProductBox', () => {
  it('should render without crashing', () => {
    const product = {
      id: '123',
      name: 'table',
      defaultPrice: 20,
      mainPhoto: {
        src:'jrn.jpg',
        name: 'photo',
      },
    };
    const component = shallow(<ProductBox product={product}/>);
    expect(component).toBeTruthy();
  });
});
