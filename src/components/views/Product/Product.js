import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrent, fetchOne, getRequest } from '../../../redux/productsRedux';
import { useParams } from 'react-router-dom';
import { addProduct, canAddProducts } from '../../../redux/cartRedux';

import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Gallery from '../../features/Gallery/Gallery';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { Link as RouterLink } from 'react-router-dom';

import styles from './Product.module.scss';

const Product = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  const product = useSelector(state => getCurrent(state, id));
  const request = useSelector(getRequest);
  const [amount, setAmount] = useState(1);
  const canAdd = useSelector(state => canAddProducts(state, id, amount));
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    dispatch(fetchOne(id));
  }, [dispatch, id]);

  if (request.type === 'GET_ONE' && request.error) {
    return <Alert severity='error' variant='outlined'>Connection error, please try again</Alert >;
  }
  if (!product) return <LinearProgress />;
  const {name, description, defaultPrice, photos} = product;

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

export default Product;
