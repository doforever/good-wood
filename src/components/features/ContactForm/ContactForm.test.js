import React from 'react';
import { shallow } from 'enzyme';
import ContactForm from './ContactForm';

jest.mock('../../../redux/orderRedux', () => ({
  ...jest.requireActual('../../../redux/orderRedux'),
  getOrder: () => ({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
  }),
  getRequest: () => ({ active: false, type: 'GET', error: false }),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => null,
  useSelector: cb => cb(),
}));

describe('Component ContactForm', () => {

  it('should render without crashing', () => {
    const component = shallow(<ContactForm />);
    expect(component).toBeTruthy();
  });
});
