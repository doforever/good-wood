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
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant='h4' component='h1' align='center'>
            { name }
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Gallery pictures={photos}></Gallery>
        </Grid>
        <Grid item xs={12} md={6} container spacing={4} direction='column' justify='flex-end'>
          <Grid item>
            <Typography paragraph>
              { description }
            </Typography>
          </Grid>
          <Grid item xs>
            <ProductOrderForm {...{id, name, defaultPrice, options}}/>
          </Grid>
          <Grid item>
            <Typography variant='h5' component='h2' align='right'>...or make an enquiry and get an individual offer.</Typography>
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
