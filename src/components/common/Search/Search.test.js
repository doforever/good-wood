import React from 'react';
import { shallow } from 'enzyme';
import Search from './Search';

describe('Component Search', () => {
  it('should render without crashing', () => {
    const component = shallow(<Search />);
    expect(component).toBeTruthy();
  });
});
