import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import styles from './ContactForm.module.scss';

const ContactForm = () =>{
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
  });

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
    setFormData({...formData, [name]: value });
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
              value={formData.firstName}
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
              value={formData.lastName}
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
              value={formData.email}
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
              value={formData.address}
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
          >
            Send
          </Button>
        </Grid>
      </form>
    </Paper>
  );
};

export default ContactForm;
