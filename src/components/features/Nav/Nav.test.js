import React from 'react';
import { shallow } from 'enzyme';
import Nav from './Nav';

describe('Component Nav', () => {
  it('should render without crashing', () => {
    const component = shallow(<Nav />);
    expect(component).toBeTruthy();
  });
});
