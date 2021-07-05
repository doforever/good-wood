import React from 'react';
import { shallow } from 'enzyme';
import ProductDetails from './ProductDetails';
import { Route, MemoryRouter } from 'react-router-dom';

describe('Component ProductDetails', () => {
  beforeAll(() => {
    const ReactRedux = jest.requireActual('react-redux');
    ReactRedux.useDispatch = jest.fn(() => null);
    ReactRedux.useSelector = jest.fn(() => []);
  });

  it('should render without crashing', () => {

    const component = shallow(
      <MemoryRouter initialEntries={['products/123']}>
        <Route path='products/:id'>
          <ProductDetails />
        </Route>
      </MemoryRouter>
    );
    expect(component).toBeTruthy();
  });
});
