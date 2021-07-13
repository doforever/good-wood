import React from 'react';
import { shallow } from 'enzyme';
import ProductOrderForm from './ProductOrderForm';

describe('Component ProductOrderForm', () => {
  it('should render without crashing', () => {
    const component = shallow(<ProductOrderForm />);
    expect(component).toBeTruthy();
  });
});
