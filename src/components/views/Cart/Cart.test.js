import React from 'react';
import { shallow } from 'enzyme';
import Cart from './Cart';

describe('Component Cart', () => {
  it('should render without crashing', () => {
    const component = shallow(<Cart />);
    expect(component).toBeTruthy();
  });
});
