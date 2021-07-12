import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';
import { getRequest, getAll } from '../../../redux/productsRedux';
import { getSearchString } from '../../../redux/searchStringRedux';
import useMediaQuery from '@material-ui/core/useMediaQuery';

jest.mock('@material-ui/core/useMediaQuery', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({search: ''}),
}));

jest.mock('../../../redux/productsRedux', () => ({
  ...jest.requireActual('../../../redux/productsRedux'),
  getAll: jest.fn(),
  getRequest: jest.fn(),
}));

jest.mock('../../../redux/searchStringRedux', () => ({
  ...jest.requireActual('../../../redux/searchStringRedux'),
  getSearchString: () => '',
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => null,
  useSelector: cb => cb(),
}));

const products = [{
  name: 'Comfortable double bed',
  description: 'In bibendum tincidunt sem, ut gravida elit. Proin non tristique arcu. Nunc elit orci, blandit eget mauris quis, lacinia laoreet neque. Nullam aliquet purus sed metus scelerisque semper. Sed aliquam.',
  defaultPrice: 50,
  category: 'beds',
  photos: [{
    name: 'Seen from the distance',
    src: 'https://images.pexels.com/photos/6480210/pexels-photo-6480210.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  }, {
    name: 'Detail',
    src: 'https://images.pexels.com/photos/6480209/pexels-photo-6480209.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  }, {
    name: 'Seen from the distance',
    src: 'https://images.pexels.com/photos/6480210/pexels-photo-6480210.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  }, {
    name: 'Detail',
    src: 'https://images.pexels.com/photos/6480209/pexels-photo-6480209.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  }],
},
{
  name: 'Lovely bed for kids',
  description: 'In bibendum tincidunt sem, ut gravida elit. Proin non tristique arcu. Nunc elit orci, blandit eget mauris quis, lacinia laoreet neque. Nullam aliquet purus sed metus scelerisque semper. Sed aliquam.',
  defaultPrice: 50,
  category: 'beds',
  photos: [{
    name: 'Side-view',
    src: 'https://images.pexels.com/photos/3661202/pexels-photo-3661202.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  }, {
    name: 'Detail',
    src: 'https://images.pexels.com/photos/3661198/pexels-photo-3661198.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  }, {
    name: 'Side-view',
    src: 'https://images.pexels.com/photos/3661202/pexels-photo-3661202.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  }],
}];

describe('Component Home', () => {

  it('should render without crashing with data ready', () => {
    useMediaQuery.mockReturnValueOnce(true);
    getRequest.mockReturnValueOnce({ active: false, error: false, type: 'GET_ALL'});
    getAll.mockReturnValue(products);
    const component = shallow(<Home />);
    expect(component).toBeTruthy();
  });

  it('should render without crashing with data loading', () => {
    getRequest.mockReturnValueOnce({ active: true, error: false, type: 'GET_ALL' });
    const component = shallow(<Home />);
    expect(component).toBeTruthy();
  });

  it('should render without crashing when loading error', () => {
    getRequest.mockReturnValueOnce({ active: false, error: true, type: 'GET_ALL' });
    const component = shallow(<Home />);
    expect(component).toBeTruthy();
  });
});
