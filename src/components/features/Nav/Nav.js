import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { NavLink } from 'react-router-dom';

import styles from './Nav.module.scss';

const Nav = ({className}) => (
  <nav className={clsx(className, styles.root)}>
    <IconButton
      component={NavLink}
      to='/cart'
      aria-label="add to shopping cart"
      color='inherit'
    >
      <ShoppingCartIcon />
    </IconButton>
  </nav>
);

Nav.propTypes = {
  className: PropTypes.string,
};

export default Nav;

