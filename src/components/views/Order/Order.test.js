import React from 'react';
import { shallow } from 'enzyme';
import Order from './Order';

describe('Component Order', () => {
  it('should render without crashing', () => {
    const component = shallow(<Order />);
    expect(component).toBeTruthy();
  });
});
