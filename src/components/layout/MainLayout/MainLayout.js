import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Container from '@material-ui/core/Container';

import styles from './MainLayout.module.scss';

const MainLayout = ({ children }) => (
  <div className={styles.root}>
    <Header />
    <Container component='main' className={styles.container}>
      {children}
    </Container>
    <Footer />
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
