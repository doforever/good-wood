import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { sendOrder, storeInput, getOrder, getRequest } from '../../../redux/orderRedux';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import styles from './OrderForm.module.scss';

const OrderForm = ({products}) => {
  const dispatch = useDispatch();
  const order = useSelector(getOrder);
  const request = useSelector(getRequest);

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
  });

  const [isWarning, setIsWarning] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isSending && request.type === 'POST' && !request.error && !request.active) {
      setIsSuccess(true);
      setIsSending(false);
    }
    if (isSending && request.type === 'POST' && request.error) {
      setIsError(true);
      setIsSending(false);
    }
  }, [request]);

  const validators = {
    firstName: {
      validator: value => value && 3 <= value.length,
      message: 'Too short',
    },
    lastName: {
      validator: value => value && 3 <= value.length,
      message: 'Too short',
    },
    email: {
      validator: value => value && value.match(new RegExp(/^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.([a-z]{1,6}))$/i)),
      message: 'Invalid email',
    },
    address: {
      validator: value => value && 5 <= value.length,
      message: 'Too short',
    },
  };

  const validate = (name, value) => {
    const {validator, message} = validators[name];

    if (!validator(value)){
      setErrors({...errors, [name]: message});
    } else setErrors({...errors, [name]: ''});
  };

  const handleChange = ({target: {name, value}}) => {
    validate(name, value);
    dispatch(storeInput({[name]: value }));
  };

  const validateOrder = () => {
    let isComplete = true;
    let hasErrors = false;

    for (let key in order) {
      if (!order[key]) isComplete = false;
    }
    if (isComplete) {
      for (let error in errors) {
        if (errors[error]) hasErrors = true;
      }
    }
    return isComplete && !hasErrors && products.length > 0;
  };

  const submit = () => {
    if (validateOrder()) {
      setIsWarning(false);
      setIsSending(true);
      const orderProducts = products
        .map(({productId, amount, comment, itemPrice, options}) => comment
          ? ({ product: productId, amount, comment, itemPrice, options })
          : ({ product: productId, amount, itemPrice, options }));
      dispatch(sendOrder({ ...order, products: orderProducts}));
    } else setIsWarning(true);
  };

  return (
    <Paper className={styles.root}>
      <Typography component='h2' variant='h4' paragraph>Delivery</Typography>
      <form noValidate autoComplete="off" className={styles.form}>
        <Grid container spacing={2}>
          <Grid item container xs={12} sm={6} direction='column' justify='flex-start'>
            <TextField
              id='firstName'
              name='firstName'
              label="First Name"
              variant='outlined'
              fullWidth
              margin='normal'
              inputProps={{ maxLength: 15 }}
              value={order.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
              required
            />
            <TextField
              id='lastName'
              name='lastName'
              label="Last Name"
              variant='outlined'
              fullWidth
              margin='normal'
              inputProps={{ maxLength: 30 }}
              value={order.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
              required
            />
          </Grid>
          <Grid item container xs={12} sm={6} direction='column' justify='flex-start'>
            <TextField
              id='email'
              name='email'
              label="Email"
              variant='outlined'
              fullWidth
              margin='normal'
              value={order.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              required
            />
            <TextField
              id='address'
              name='address'
              label="Delivery address"
              multiline rows={3}
              variant='outlined'
              fullWidth
              margin='normal'
              value={order.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
              required
              inputProps={{
                autoComplete: 'new-password',
                maxLength: 60,
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs container justify='flex-end'>
          <Button
            variant='contained'
            size='large'
            className={styles.button}
            color='primary'
            onClick={submit}
          >
            Send
          </Button>
        </Grid>
      </form>
      <Snackbar
        open={isWarning}
        autoHideDuration={3000}
        onClose={() => setIsWarning(false)}
      >
        <Alert severity='warning' variant='filled'>Some fields are missing or incorrect</Alert>
      </Snackbar>
      <Snackbar
        open={isSuccess}
        autoHideDuration={3000}
        onClose={() => setIsSuccess(false)}
      >
        <Alert severity='success' variant='filled'><strong>Congratulations!</strong> Your order has been send</Alert>
      </Snackbar>
      <Snackbar
        open={isError}
        autoHideDuration={3000}
        onClose={() => setIsError(false)}
      >
        <Alert severity='error' variant='filled'>Connection error. <strong>Please try again</strong></Alert>
      </Snackbar>
    </Paper>
  );
};

OrderForm.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
};

export default OrderForm;
