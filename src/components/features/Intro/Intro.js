import React from 'react';

import Typography from '@material-ui/core/Typography';

import styles from './Intro.module.scss';

const Intro = () => (
  <section className={styles.root}>
    <Typography component='h1' variant='h4' align='center' paragraph>
      Welcome to our store with custom crafted furniture
    </Typography>
    <Typography align='center' paragraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum elit at ante vestibulum sollicitudin.
      Curabitur ultricies tellus nunc. Pellentesque vitae massa sodales, fringilla augue id, consectetur tellus.
      Praesent in nunc leo. Donec condimentum ante tortor, nec fermentum justo mollis id. Curabitur eget scelerisque ex.
      Nulla consequat, mi vel feugiat pellentesque, eros magna finibus lacus, sit amet hendrerit odio sapien et ligula.
    </Typography>
  </section>
);

export default Intro;

