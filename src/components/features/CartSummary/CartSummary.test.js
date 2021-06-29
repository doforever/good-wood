import React from 'react';
import { shallow } from 'enzyme';
import CartSummary from './CartSummary';

describe('Component CartSummary', () => {
  it('should render without crashing', () => {
    const component = shallow(<CartSummary />);
    expect(component).toBeTruthy();
  });
});
