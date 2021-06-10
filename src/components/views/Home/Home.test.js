import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';

describe('Component Home', () => {
  beforeAll(() => {
    const ReactRedux = jest.requireActual('react-redux');
    ReactRedux.useDispatch = jest.fn(() => null);
    ReactRedux.useSelector = jest.fn(() => []);
  });

  it('should render without crashing', () => {
    const component = shallow(<Home />);
    expect(component).toBeTruthy();
  });

});
