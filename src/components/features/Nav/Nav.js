import React from 'react';
import { useSelector } from 'react-redux';
import { getCount } from '../../../redux/orderRedux';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { NavLink } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';

import styles from './Nav.module.scss';

const Nav = ({className}) => {
  const count = useSelector(getCount);

  return (
    <nav className={clsx(className, styles.root)}>
      <Tooltip title='Go to cart'>
        <IconButton
          aria-label='cart'
          component={NavLink}
          to='/cart'
          color='inherit'
        >
          <Badge badgeContent={count} color='primary'>
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Tooltip>
    </nav>
  );};

Nav.propTypes = {
  className: PropTypes.string,
};

export default Nav;

