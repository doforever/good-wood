import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';

describe('Component Home', () => {
  it('should render without crashing', () => {
    const component = shallow(<Home />);
    expect(component).toBeTruthy();
  });
});
