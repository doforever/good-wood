import React from 'react';

import ProductList from '../../features/ProductList/ProductList';

import styles from './Home.module.scss';

const Home = () => (
  <div className={styles.root}>
    <ProductList />
  </div>
);

export default Home;
