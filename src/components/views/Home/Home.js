import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAll } from '../../../redux/productsRedux';
import { getAll, getRequest } from '../../../redux/productsRedux';

import ProductList from '../../features/ProductList/ProductList';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';

import styles from './Home.module.scss';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(getAll);
  const request = useSelector(getRequest);

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  if (request.type === 'GET_ALL' && request.error) {
    return <Alert severity='error' variant='outlined'>Connection error, please try again</Alert >;
  }
  if (request.type === 'GET_ALL' && request.active) return <LinearProgress />;

  return (
    <div className={styles.root}>
      <ProductList products={products} />
    </div>
  );
};

export default Home;
