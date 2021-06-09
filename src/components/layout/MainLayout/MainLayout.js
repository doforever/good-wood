import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header/Header';
import Container from '@material-ui/core/Container';

const MainLayout = ({ children }) => (
  <div>
    <Header />
    <Container>
      {children}
    </Container>
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
