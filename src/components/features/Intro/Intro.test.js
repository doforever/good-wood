import React from 'react';
import { shallow } from 'enzyme';
import Intro from './Intro';

describe('Component Intro', () => {
  it('should render without crashing', () => {
    const component = shallow(<Intro />);
    expect(component).toBeTruthy();
  });
});
