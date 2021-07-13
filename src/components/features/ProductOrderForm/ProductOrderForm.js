import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, canAddProducts } from '../../../redux/cartRedux';

import ProductOptions from '../ProductOptions/ProductOptions';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { Link as RouterLink } from 'react-router-dom';

import styles from './ProductOrderForm.module.scss';

const ProductOrderForm = ({id, name, defaultPrice, options}) => {
  const [amount, setAmount] = useState(1);
  const canAdd = useSelector(state => canAddProducts(state, id, amount));
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useDispatch();

  const [optionsState, setOptionsState]
    = useState(options.map(({name, values}) => {
      return ({
        name,
        values,
        chosen: values[0].name,
      });
    }));

  const calculatePrice = () => {
    let price = defaultPrice;
    for (let opt of optionsState) {
      price += opt.values.find(val => val.name === opt.chosen).price;
    }
    return price;
  };

  const handleAdd = () => {
    setIsAdded(true);
    dispatch(addProduct({
      id,
      name,
      amount,
      comment: '',
      options: optionsState.map(({name, chosen}) => ({name, value: chosen})),
      itemPrice: calculatePrice(),
    }));
  };

  return (
    <div className={styles.root}>
      <ProductOptions options={optionsState} setOptions={setOptionsState}/>
      <Typography variant='h6' component='h3' paragraph>
        Price for this option: <strong>${calculatePrice()}</strong>
      </Typography>
      <Grid container alignItems='stretch' spacing={2}>
        <Grid item>
          <TextField
            variant='outlined'
            type='number'
            size='small'
            className={styles.input}
            value={amount}
            onChange={({ target }) => setAmount(parseInt(target.value))}
            inputProps={{ min: 1, max: 50 }} />
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

ProductOrderForm.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  defaultPrice: PropTypes.number,
  options: PropTypes.arrayOf(PropTypes.object),
};

export default ProductOrderForm;
