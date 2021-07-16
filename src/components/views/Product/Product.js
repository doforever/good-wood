import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrent, getAll, fetchOne, getRequest, fetchAll } from '../../../redux/productsRedux';
import { addProduct } from '../../../redux/cartRedux';
import { useParams } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import ProductDetails from '../../features/ProductDetails/ProductDetails';
import ProductNav from '../../features/ProductNav/ProductNav';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';

import styles from './Product.module.scss';

const Product = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  const product = useSelector(state => getCurrent(state, id));
  const allProducts = useSelector(getAll);
  const request = useSelector(getRequest);
  const [currentCategory, setCurrentCategory] = useState('');
  const [isAdded, setIsAdded] = useState(false);
  const matchesMd = useMediaQuery(theme => theme.breakpoints.up('md'));

  useEffect(() => {
    dispatch(fetchOne(id));
    dispatch(fetchAll());
  }, [dispatch, id]);

  useEffect(() => {
    if (product) setCurrentCategory(product.category);
  }, [product]);

  const addToCart = (amount, itemPrice, optionsState) => {
    const {id, name} = product;
    setIsAdded(true);
    dispatch(addProduct({
      productId: id,
      name,
      amount,
      itemPrice,
      comment: '',
      options: optionsState.map(({ name, chosen }) => ({ name, value: chosen })),
    }));
  };

  let productView;
  if (request.type === 'GET_ONE' && request.error) {
    productView = <Alert severity='error' variant='outlined'>Connection error, please try again</Alert >;
  } else if (!product) productView = <LinearProgress />;
  else productView = <ProductDetails {...product} className={styles.rollOut} add={addToCart}/>;

  return (
    <div className={styles.root}>
      {  matchesMd
        ? <Grid container spacing={2} className={styles.grid} alignItems='stretch' >
          <Grid item >
            <ProductNav open={currentCategory} products={allProducts}/>
          </Grid>
          <Grid key={id} item xs>
            {productView}
          </Grid>
        </Grid>
        : productView
      }
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
    </div>
  );
};

export default Product;
