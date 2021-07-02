import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link as RouterLink } from 'react-router-dom';

import styles from './ProductNav.module.scss';

const ProductNav = ({ className, products }) => {

  return (
    <Paper component='aside' className={clsx(className, styles.root)}>
      <List>
        { products.map(({id, name}) => (
          <ListItem key={id} button component={RouterLink} to={`/products/${id}`}>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );

};

ProductNav.propTypes = {
  className: PropTypes.string,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProductNav;
