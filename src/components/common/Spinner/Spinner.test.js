import React from 'react';
import { shallow } from 'enzyme';
import Spinner from './Spinner';

describe('Component Spinner', () => {
  it('should render without crashing', () => {
    const component = shallow(<Spinner />);
    expect(component).toBeTruthy();
  });
});
