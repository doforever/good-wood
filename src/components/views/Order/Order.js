import React from 'react';
import { useSelector } from 'react-redux';
import { getProducts } from '../../../redux/cartRedux';

import CartSummary from '../../features/CartSummary/CartSummary';
import OrderForm from '../../features/OrderForm/OrderForm';
import Grid from '@material-ui/core/Grid';

import styles from './Order.module.scss';

const Order = () => {
  const products = useSelector(getProducts);

  return (
    <Grid container spacing={2} className={styles.root}>
      <Grid item component='section' xs={12} md={5}>
        <CartSummary products={products}/>
      </Grid>
      <Grid item component='section' xs={12} md={7}>
        <OrderForm products={products}/>
      </Grid>
    </Grid>
  );
};

export default Order;
