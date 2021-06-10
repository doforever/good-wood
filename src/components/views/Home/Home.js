import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAll } from '../../../redux/productsRedux';
import { getAll } from '../../../redux/productsRedux';

import ProductList from '../../features/ProductList/ProductList';

import styles from './Home.module.scss';

const Home = () => {

  const dispatch = useDispatch();
  const products = useSelector(getAll);

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  return (
    <div className={styles.root}>
      <ProductList products={products} />
    </div>
  );
};

export default Home;
