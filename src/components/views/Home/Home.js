import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAll } from '../../../redux/productsRedux';
import { useLocation } from 'react-router-dom';
import { getAll, getRequest } from '../../../redux/productsRedux';
import { getSearchString, setSearchString } from '../../../redux/searchStringRedux';
import { withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import ProductList from '../../features/ProductList/ProductList';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import Intro from '../../features/Intro/Intro';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Link as RouterLink} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Search from '../../common/Search/Search';

import styles from './Home.module.scss';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(getAll);
  const request = useSelector(getRequest);
  const location = useLocation();
  const matchesMd = useMediaQuery(theme => theme.breakpoints.up('md'));
  const searchString = useSelector(getSearchString);

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

  const [searchOpen, setSearchOpen] = useState(false);

  const NavTabs = withStyles({
    root: {
      flex: '1 0 auto',
      'max-width': '100%',
      margin: '0 16px',
    },
    indicator: {
      height: '4px',
    },
    flexContainer: {
      height: '100%',
    },
  })(Tabs);

  const applyFilters = products => {
    const regExp = new RegExp(searchString, 'gi');
    return products
      .filter(p => regExp.test(p.name) && (category ? p.category === category : p));
  };

  let productsList = '';
  if (request.type === 'GET_ALL' && request.error) {
    productsList = <Alert severity='error' variant='outlined'>Connection error, please try again</Alert >;
  } else if (request.type === 'GET_ALL' && request.active) {
    productsList = <LinearProgress />;
  } else {
    productsList = <ProductList products={applyFilters(products)} />;
  }

  return (
    <div className={styles.root}>
      <Intro/>
      <Divider/>
      <Toolbar className={styles.filters}>
        { (matchesMd || searchOpen || searchString) &&
        <Search
          className={styles.search}
          searchString={searchString}
          setSearchString={v => dispatch(setSearchString(v))}
          close={!matchesMd ? (() => setSearchOpen(false)) : undefined}
        />}
        <NavTabs
          value={categories.indexOf(category)+1}
          aria-label="choose-category"
          indicatorColor="primary"
          className={styles.tabs}
          variant="scrollable"
          scrollButtons="off"
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
          { !matchesMd && !searchOpen && <IconButton onClick={() => setSearchOpen(true)} className={styles.searchButton}>
            <SearchIcon />
          </IconButton>}
        </NavTabs>
      </Toolbar>
      <Divider/>
      {productsList}
    </div>
  );
};

export default Home;
