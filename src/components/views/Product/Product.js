import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrent, getAll, fetchOne, getRequest, fetchAll } from '../../../redux/productsRedux';
import { useParams } from 'react-router-dom';

import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import ProductDetails from '../../features/ProductDetails/ProductDetails';
import ProductNav from '../../features/ProductNav/ProductNav';
import Hidden from '@material-ui/core/Hidden';

import styles from './Product.module.scss';

const Product = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  const product = useSelector(state => getCurrent(state, id));
  const allProducts = useSelector(getAll);
  const request = useSelector(getRequest);
  const [currentCategory, setCurrentCategory] = useState('');

  useEffect(() => {
    dispatch(fetchOne(id));
    dispatch(fetchAll());
  }, [dispatch, id]);

  useEffect(() => {
    if (product) setCurrentCategory(product.category);
  }, [product]);

  let productView;
  if (request.type === 'GET_ONE' && request.error) {
    productView = <Alert severity='error' variant='outlined'>Connection error, please try again</Alert >;
  } else if (!product) productView = <LinearProgress />;
  else productView = <ProductDetails {...product} />;

  return (
    <Grid container spacing={2} className={styles.root} alignItems='stretch' >
      <Hidden smDown>
        <Grid item className={styles.sidebar}>
          <ProductNav open={currentCategory} products={allProducts}/>
        </Grid>
      </Hidden>
      <Grid key={id} className={styles.rollOut} item xs>
        {productView}
      </Grid>
    </Grid>
  );
};

export default Product;
