import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrent, fetchOne } from '../../../redux/productsRedux';
import { useParams } from 'react-router-dom';
import { addProduct } from '../../../redux/orderRedux';

import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Gallery from '../../features/Gallery/Gallery';
import TextField from '@material-ui/core/TextField';

import styles from './Product.module.scss';

const Product = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  const product = useSelector(state => getCurrent(state, id));
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    dispatch(fetchOne(id));
  }, [dispatch, id]);

  if (!product) return <LinearProgress />;
  const {name, description, defaultPrice, photos} = product;

  const handleAdd = () => {
    dispatch(addProduct({id, name, defaultPrice, amount}));
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
                inputProps={{min: 1, max: 10}}
              />
            </Grid>
            <Grid item>
              <Button variant='outlined' onClick={handleAdd} size='large'>Add to cart</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Product;
