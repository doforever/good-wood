import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrent, fetchOne } from '../../../redux/productsRedux';
import { useParams } from 'react-router-dom';
import { addProduct } from '../../../redux/cartRedux';

import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Gallery from '../../features/Gallery/Gallery';

import styles from './Product.module.scss';

const Product = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  const product = useSelector(state => getCurrent(state, id));

  useEffect(() => {
    dispatch(fetchOne(id));
  }, [dispatch, id]);

  if (!product) return <LinearProgress />;
  const {name, description, defaultPrice, photos} = product;

  const handleAdd = () => {
    dispatch(addProduct({id, name, defaultPrice, amount: 1}));
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
        <Grid item xs={12} md={6}>
          <Typography paragraph>
            { description }
          </Typography>
          <Typography paragraph>
            Price starting from ${defaultPrice}.
            To get individual offer, please make an enquiry.
          </Typography>
          <Button variant='outlined' onClick={handleAdd}>Add to cart</Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Product;
