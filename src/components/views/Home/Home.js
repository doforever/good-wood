import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAll } from '../../../redux/productsRedux';

import ProductList from '../../features/ProductList/ProductList';

import styles from './Home.module.scss';

const Home = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  return (
    <div className={styles.root}>
      <ProductList />
    </div>
  );
};

export default Home;
