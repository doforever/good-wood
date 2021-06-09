import React from 'react';
import { shallow } from 'enzyme';
import Product from './Product';

describe('Component Product', () => {
  it('should render without crashing', () => {
    const component = shallow(<Product />);
    expect(component).toBeTruthy();
  });
});
