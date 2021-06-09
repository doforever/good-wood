import React from 'react';
import { shallow } from 'enzyme';
import ContactForm from './ContactForm';

describe('Component ContactForm', () => {
  it('should render without crashing', () => {
    const component = shallow(<ContactForm />);
    expect(component).toBeTruthy();
  });
});
