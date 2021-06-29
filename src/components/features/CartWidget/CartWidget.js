import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCount, getCartId, fetchCart } from '../../../redux/cartRedux';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { NavLink } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';

import styles from './CartWidget.module.scss';

const CartWidget = ({className}) => {
  const dispatch = useDispatch();
  const count = useSelector(getCount);
  const id = useSelector(getCartId);

  useEffect(() => {
    if (!id) dispatch(fetchCart());
  }, [id]);


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

CartWidget.propTypes = {
  className: PropTypes.string,
};

export default CartWidget;

