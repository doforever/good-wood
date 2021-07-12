import React from 'react';
import { shallow } from 'enzyme';
import ProductOptions from './ProductOptions';

describe('Component ProductOptions', () => {
  it('should render without crashing', () => {
    const options = [{name: 'colors', values: [{name: 'white', price: '0'}]}];
    const component = shallow(<ProductOptions options={options} />);
    expect(component).toBeTruthy();
  });
});
