import React from 'react';
import { useSelector } from 'react-redux';
import { getCount } from '../../../redux/orderRedux';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { NavLink } from 'react-router-dom';

import styles from './Nav.module.scss';

const Nav = ({className}) => {
  const count = useSelector(getCount);

  return (
    <nav className={clsx(className, styles.root)}>
      <IconButton
        component={NavLink}
        to='/cart'
        aria-label="add to shopping cart"
        color='inherit'
      >
        <Badge badgeContent={count} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </nav>
  );};

Nav.propTypes = {
  className: PropTypes.string,
};

export default Nav;

