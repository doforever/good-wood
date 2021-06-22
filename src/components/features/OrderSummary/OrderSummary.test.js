import React from 'react';
import { shallow } from 'enzyme';
import OrderSummary from './OrderSummary';

describe('Component OrderSummary', () => {
  it('should render without crashing', () => {
    const component = shallow(<OrderSummary />);
    expect(component).toBeTruthy();
  });
});
