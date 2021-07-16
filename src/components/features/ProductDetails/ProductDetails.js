import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Gallery from '../Gallery/Gallery';
import ProductOrderForm from '../ProductOrderForm/ProductOrderForm.js';

import styles from './ProductDetails.module.scss';

const ProductDetails = ({ description, className, name, photos, ...otherProps }) => {

  return (
    <Paper component='article' className={clsx(styles.root, className)}>
      <Grid container spacing={4} justify='center' alignContent='stretch'>
        <Grid item xs={12}>
          <Typography variant='h4' component='h1' align='center'>
            { name }
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Gallery pictures={photos}></Gallery>
        </Grid>
        <Grid item xs={12} md={6} container spacing={2} direction='column' justify='space-between'>
          <Grid item component='section'>
            <Typography paragraph>
              { description }
            </Typography>
          </Grid>
          <Grid item component='section'>
            <ProductOrderForm {...otherProps}/>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

ProductDetails.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  photos: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
};

export default ProductDetails;
