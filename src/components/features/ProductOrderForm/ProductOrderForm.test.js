import React from 'react';
import { shallow } from 'enzyme';
import ProductOrderForm from './ProductOrderForm';

const mockProduct = {
  id: '4990234',
  name: 'Product',
  defaultPrice: 38,
  options: [
    {name: 'colors', values: [{name: 'white', price: 0 }]},
  ],
};

describe('Component ProductOrderForm', () => {
  beforeAll(() => {
    const ReactRedux = jest.requireActual('react-redux');
    ReactRedux.useDispatch = jest.fn(() => null);
    ReactRedux.useSelector = jest.fn(() => []);
  });

  it('should render without crashing', () => {
    const component = shallow(<ProductOrderForm {...mockProduct}/>);
    expect(component).toBeTruthy();
  });
});
