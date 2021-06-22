import React from 'react';
import { shallow } from 'enzyme';
import Cart from './Cart';
import useMediaQuery from '@material-ui/core/useMediaQuery';

jest.mock('@material-ui/core/useMediaQuery', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Component Cart', () => {
  beforeAll(() => {
    const ReactRedux = jest.requireActual('react-redux');
    ReactRedux.useDispatch = jest.fn(() => null);
    ReactRedux.useSelector = jest.fn(() => []);
  });

  it('should render without crashing', () => {
    useMediaQuery.mockReturnValueOnce(true);
    const component = shallow(<Cart />);
    expect(component).toBeTruthy();
  });

  it('should render without crashing on mobile', () => {
    useMediaQuery.mockReturnValueOnce(false);
    const component = shallow(<Cart />);
    expect(component).toBeTruthy();
  });
});
