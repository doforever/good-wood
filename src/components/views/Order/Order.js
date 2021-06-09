import React from 'react';

import OrderSummary from '../../features/OrderSummary/OrderSummary';
import ContactForm from '../../features/ContactForm/ContactForm';

import styles from './Order.module.scss';

const Order = () => (
  <div className={styles.root}>
    <OrderSummary/>
    <ContactForm/>
  </div>
);

export default Order;
