import React from 'react';
import { shallow } from 'enzyme';
import ShoppingStepper from './ShoppingStepper';

describe('Component ShoppingStepper', () => {
  beforeAll(() => {
    const ReactRedux = jest.requireActual('react-redux');
    ReactRedux.useSelector = jest.fn(() => []);
  });

  it('should render without crashing', () => {
    const component = shallow(<ShoppingStepper />);
    expect(component).toBeTruthy();
  });
});
