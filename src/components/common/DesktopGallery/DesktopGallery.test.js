import React from 'react';
import { shallow } from 'enzyme';
import DesktopGallery from './DesktopGallery';

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

describe('Component DesktopGallery', () => {
  it('should render without crashing', () => {
    const component = shallow(<DesktopGallery pictures={pictures} />);
    expect(component).toBeTruthy();
  });
});
