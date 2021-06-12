import React from 'react';
import { useSelector } from 'react-redux';
import { getOrder } from '../../../redux/orderRedux';

import OrderSummary from '../../features/OrderSummary/OrderSummary';
import ContactForm from '../../features/ContactForm/ContactForm';

import styles from './Order.module.scss';

const Order = () => {
  const order = useSelector(getOrder);

  return (
    <div className={styles.root}>
      <OrderSummary products={order.products}/>
      <ContactForm/>
    </div>
  );
};

export default Order;
