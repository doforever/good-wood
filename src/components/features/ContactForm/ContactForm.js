import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendOrder, storeInput, getOrder, getRequest } from '../../../redux/orderRedux';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import styles from './ContactForm.module.scss';

const ContactForm = () =>{
  const dispatch = useDispatch();
  const order = useSelector(getOrder);
  const request = useSelector(getRequest);

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
  });

  const [open, setOpen] = useState(false);

  const validators = {
    firstName: {
      validator: value => value && 3 <= value.length && value.length <= 15,
      message: 'Invalid length',
    },
    lastName: {
      validator: value => value && 3 <= value.length && value.length <= 30,
      message: 'Invalid length',
    },
    email: {
      validator: value => value && value.match(new RegExp(/^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.([a-z]{1,6}))$/i)),
      message: 'Invalid email',
    },
    address: {
      validator: value => value && 5 <= value.length && value.length <= 60,
      message: 'Invalid length',
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
    let hasErrors = false;
    for (let error in errors) {
      if (errors[error]) hasErrors = true;
    }
    return !hasErrors && order.products.length > 0;
  };

  const submit = () => {
    if (validateOrder()) {
      console.log('sending', order);
      const orderProducts = order.products.map(p => ({
        product: p.id,
        amount: p.amount,
      }));
      dispatch(sendOrder({ ...order, status: 'ordered', products: orderProducts}));
      setOpen(false);
    } else setOpen(true);
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
            />
          </Grid>
        </Grid>
        <Grid item xs container justify='flex-end'>
          <Button
            variant='contained'
            size='large'
            className={styles.button}
            color='secondary'
            onClick={submit}
          >
            Send
          </Button>
        </Grid>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert severity="warning" variant='filled'>Some fields are missing or incorrect</Alert>
      </Snackbar>
    </Paper>
  );
};

export default ContactForm;
