import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import ProductBox from '../ProductBox/ProductBox';

import styles from './ProductList.module.scss';

const ProductList = ({className, products}) => {

  if (!products || products.length < 1) {
    return (< Alert severity="info" variant='outlined'> No products</Alert >);
  } else {
    return (
      <Grid component='section' container spacing={2} className={clsx(className, styles.root)}>
        { products.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4} xl={3}>
            <ProductBox product={product}/>
          </Grid>
        ))}
      </Grid>
    );
  }
};

ProductList.propTypes = {
  className: PropTypes.string,
  products: PropTypes.arrayOf(PropTypes.object),
};

export default ProductList;
