import React from 'react';
import { shallow } from 'enzyme';
import ProductList from './ProductList';

describe('Component ProductList', () => {
  it('should render without crashing', () => {
    const component = shallow(<ProductList />);
    expect(component).toBeTruthy();
  });
});
