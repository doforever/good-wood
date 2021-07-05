import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, canAddProducts } from '../../../redux/cartRedux';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Gallery from '../Gallery/Gallery';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { Link as RouterLink } from 'react-router-dom';

import styles from './ProductDetails.module.scss';

const ProductDetails = ({ id, name, description, defaultPrice, photos }) => {
  const [amount, setAmount] = useState(1);
  const canAdd = useSelector(state => canAddProducts(state, id, amount));
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useDispatch();

  const handleAdd = () => {
    setIsAdded(true);
    dispatch(addProduct({id, name, defaultPrice, amount, comment: ''}));
  };

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
        <Grid item xs={12} md={6} container spacing={2} direction='column' justify='flex-end'>
          <Grid item xs>
            <Typography paragraph>
              { description }
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='h5' component='h2'>
              Price starting from <strong>${defaultPrice}</strong>.
            </Typography>
            <Typography paragraph>To get individual offer, please make an enquiry.</Typography>
          </Grid>
          <Grid item container alignItems='stretch' spacing={2}>
            <Grid item>
              <TextField
                variant='outlined'
                type='number'
                size='small'
                className={styles.input}
                value={amount}
                onChange={({target}) => setAmount(parseInt(target.value))}
                inputProps={{min: 1, max: 50}}
              />
            </Grid>
            <Grid item>
              <Button
                variant='outlined'
                onClick={handleAdd}
                size='large'
                disabled={!canAdd}
              >Add to cart</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        open={isAdded}
        autoHideDuration={3000}
        onClose={() => setIsAdded(false)}
      >
        <Alert
          severity='success'
          variant='filled'
          action={
            <Button
              component={RouterLink}
              to='/cart'
              color='inherit'
              size='small'
            >
              VIEW CART
            </Button>
          }
        >Added to cart</Alert>
      </Snackbar>
    </Paper>
  );
};

ProductDetails.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  defaultPrice: PropTypes.number,
  photos: PropTypes.arrayOf(PropTypes.object),
};

export default ProductDetails;
