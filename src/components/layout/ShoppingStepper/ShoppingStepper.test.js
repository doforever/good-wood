import React from 'react';
import { shallow } from 'enzyme';
import ShoppingStepper from './ShoppingStepper';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useLocation } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

jest.mock('@material-ui/core/useMediaQuery', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Component ShoppingStepper', () => {
  beforeAll(() => {
    const ReactRedux = jest.requireActual('react-redux');
    ReactRedux.useSelector = jest.fn(() => {});
  });

  it('should render without crashing when in cart', () => {
    useMediaQuery.mockReturnValueOnce(true);
    useLocation.mockReturnValueOnce({pathname: '/cart'});
    const component = shallow(<ShoppingStepper />);
    expect(component).toBeTruthy();
  });

  it('should render without crashing when in order', () => {
    useMediaQuery.mockReturnValueOnce(true);
    useLocation.mockReturnValueOnce({ pathname: '/order' });
    const component = shallow(<ShoppingStepper />);
    expect(component).toBeTruthy();
  });

  it('should render without crashing on mobile', () => {
    useMediaQuery.mockReturnValueOnce(false);
    useLocation.mockReturnValueOnce({ pathname: '/cart' });
    const component = shallow(<ShoppingStepper />);
    expect(component).toBeTruthy();
  });
});
