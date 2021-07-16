import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getCount } from '../../../redux/cartRedux';

import ProductOptions from '../ProductOptions/ProductOptions';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import styles from './ProductOrderForm.module.scss';

const ProductOrderForm = ({defaultPrice, options, add}) => {
  const cartCount = useSelector(getCount);
  const [amount, setAmount] = useState(1);

  const canAdd = () => (amount + cartCount <= 50);

  const [optionsState, setOptionsState]
    = useState(options.map(({ name, values }) => {
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

  return (
    <div className={styles.root}>
      <Typography variant='h5' component='h2'>Choose from available options</Typography>
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
            onClick={() => add(amount, calculatePrice(), optionsState)}
            size='large'
            disabled={!canAdd()}
          >Add to cart</Button>
        </Grid>
      </Grid>
    </div>
  );
};

ProductOrderForm.propTypes = {
  defaultPrice: PropTypes.number,
  options: PropTypes.arrayOf(PropTypes.object),
  add: PropTypes.func,
};

export default ProductOrderForm;
