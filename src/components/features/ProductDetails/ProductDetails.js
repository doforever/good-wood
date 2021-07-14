import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Gallery from '../Gallery/Gallery';
import ProductOrderForm from '../ProductOrderForm/ProductOrderForm.js';

import styles from './ProductDetails.module.scss';

const ProductDetails = ({ id, name, description, defaultPrice, photos, options }) => {

  return (
    <Paper component='article' className={styles.root}>
      <Grid container spacing={4} justify='center'>
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
            <ProductOrderForm {...{id, name, defaultPrice, options}}/>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

ProductDetails.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  defaultPrice: PropTypes.number,
  photos: PropTypes.arrayOf(PropTypes.object),
  options: PropTypes.arrayOf(PropTypes.object),
};

export default ProductDetails;
