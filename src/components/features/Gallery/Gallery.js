import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import styles from './Gallery.module.scss';

const Gallery = ({ pictures }) => {
  const [current, setCurrent] = useState(pictures[0]);

  const thumbnails = pictures.map(({src, name}, i) => (
    <Grid key={i} item xs>
      <img src={src} alt={name} className={styles.thumbnail}/>
    </Grid>)
  );

  return (
    <Grid container direction='column' className={styles.root}>
      <Grid item xs className={styles.currentPhoto}>
        <img src={current.src} alt={current.name} />
      </Grid>
      { pictures.length > 0 && <Grid item container direction='row'>
        {thumbnails}
      </Grid>}
    </Grid>
  );
};

Gallery.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Gallery;
