import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAll } from '../../../redux/productsRedux';
import { useLocation } from 'react-router-dom';
import { getAll, getRequest } from '../../../redux/productsRedux';

import ProductList from '../../features/ProductList/ProductList';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import Intro from '../../features/Intro/Intro';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Link as RouterLink} from 'react-router-dom';

import styles from './Home.module.scss';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(getAll);
  const request = useSelector(getRequest);
  const location = useLocation();

  const categories = ['chairs', 'tables', 'beds', 'storage'];
  const [category, setCategory] = useState('');

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  useEffect(() => {
    if (location.search.includes('?category=')) {
      const category = location.search.replace('?category=', '');
      setCategory(category);
    } else setCategory('');
  }, [location]);

  const [searchString, setSearchString] = useState('');

  const handleSearchChange = (event) => {
    setSearchString(event.target.value);
  };

  let productsList = '';
  if (request.type === 'GET_ALL' && request.error) {
    productsList = <Alert severity='error' variant='outlined'>Connection error, please try again</Alert >;
  } else if (request.type === 'GET_ALL' && request.active) {
    productsList = <LinearProgress />;
  } else productsList = <ProductList products={products} />;

  return (
    <div className={styles.root}>
      <Intro/>
      <Divider/>
      <Toolbar className={styles.filters}>
        <OutlinedInput
          className={styles.search}
          id="search"
          value={searchString}
          onChange={handleSearchChange}
          autoComplete='off'
          margin='dense'
          placeholder='Search...'
          name='search'
          type='search'
          startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
        />
        <Tabs
          value={categories.indexOf(category)+1}
          aria-label="choose-category"
          indicatorColor="primary"
          className={styles.tabs}
          variant="scrollable"
          TabIndicatorProps={{
            style: {
              height: '4px',
            },
          }}
        >
          <Tab component={RouterLink} to={{ search: '' }} className={styles.tab} label="All" id="all" />
          { categories.map((category, i) => (
            <Tab
              key={i}
              component={RouterLink}
              to={{ search: `category=${category}` }}
              className={styles.tab}
              label={category}
            />
          ))}
        </Tabs>
      </Toolbar>
      <Divider/>
      {productsList}
    </div>
  );
};

export default Home;
