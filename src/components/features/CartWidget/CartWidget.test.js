import React from 'react';
import { shallow } from 'enzyme';
import CartWidget from './CartWidget';

jest.mock('../../../redux/cartRedux', () => ({
  ...jest.requireActual('../../../redux/cartRedux'),
  getCartId: () => ('id'),
  getCount: () => 2,
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => null,
  useSelector: cb => cb(),
}));

describe('Component CartWidget', () => {
  it('should render without crashing', () => {
    const component = shallow(<CartWidget />);
    expect(component).toBeTruthy();
  });
});
