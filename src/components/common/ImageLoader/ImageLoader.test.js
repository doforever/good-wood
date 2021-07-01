import React from 'react';
import { shallow } from 'enzyme';
import ImageLoader from './ImageLoader';

describe('Component ImageLoader', () => {
  it('should render without crashing', () => {
    const component = shallow(<ImageLoader />);
    expect(component).toBeTruthy();
  });
});
