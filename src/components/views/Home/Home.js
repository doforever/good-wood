import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAll } from '../../../redux/productsRedux';
import { getAll, getRequest } from '../../../redux/productsRedux';

import ProductList from '../../features/ProductList/ProductList';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import Intro from '../../features/Intro/Intro';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import styles from './Home.module.scss';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(getAll);
  const request = useSelector(getRequest);

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  const [tabIndex, setTabIndex] = useState(0);
  const [searchString, setSearchString] = useState('');

  const handleTabChange = (event, value) => {
    setTabIndex(value);
  };

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
          value={tabIndex}
          onChange={handleTabChange}
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
          <Tab className={styles.tab} label="All" id="all" />
          <Tab className={styles.tab} label="Chairs" id="chairs" />
          <Tab className={styles.tab} label="Tables" id="tables" />
          <Tab className={styles.tab} label="Beds" id="beds"  />
          <Tab className={styles.tab} label="Storage" id="storage" />
        </Tabs>
      </Toolbar>
      <Divider/>
      {productsList}
    </div>
  );
};

export default Home;
