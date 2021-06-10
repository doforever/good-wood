import React from 'react';
import { shallow } from 'enzyme';
import Gallery from './Gallery';

describe('Component Gallery', () => {
  it('should render without crashing', () => {
    const pictures = [{
      name: 'Side-view',
      src: 'https://images.pexels.com/photos/3661202/pexels-photo-3661202.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    }, {
      name: 'Detail',
      src: 'https://images.pexels.com/photos/3661198/pexels-photo-3661198.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    }, {
      name: 'Side-view',
      src: 'https://images.pexels.com/photos/3661202/pexels-photo-3661202.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    }];

    const component = shallow(<Gallery pictures={pictures}/>);
    expect(component).toBeTruthy();
  });
});
