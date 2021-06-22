import React from 'react';
import { shallow } from 'enzyme';
import Nav from './Nav';

describe('Component Nav', () => {
  beforeAll(() => {
    const ReactRedux = jest.requireActual('react-redux');
    ReactRedux.useSelector = jest.fn(() => 0);
  });
  it('should render without crashing', () => {
    const component = shallow(<Nav />);
    expect(component).toBeTruthy();
  });
});
