import React from 'react';
import { useDispatch } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import styles from './ContactForm.module.scss';

const ContactForm = () =>{
  const dispatch = useDispatch();

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
            />
            <TextField
              id='lastName'
              name='lastName'
              label="Last Name"
              variant='outlined'
              fullWidth
              margin='normal'
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
            />
            <TextField
              id='address'
              name='address'
              label="Delivery address"
              multiline rows={2}
              variant='outlined'
              fullWidth
              margin='normal'
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
