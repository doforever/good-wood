import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import MobileStepper from '@material-ui/core/MobileStepper';
import SwipeableViews from 'react-swipeable-views';
import ImageLoader from '../../common/ImageLoader/ImageLoader';

import styles from './MobileGallery.module.scss';

const MobileGallery = ({ pictures, current = 0, setCurrent }) => {

  return (
    <Grid container direction='column' className={styles.root}>
      <Grid item xs className={styles.photo_wrapper}>
        <SwipeableViews
          index={current}
          onChangeIndex={setCurrent}
          enableMouseEvents
          slideStyle={{ overflow: 'hidden' }}
          containerStyle={{ height: '100%' }}
        >
          { pictures.map((picture, index) => (
            <ImageLoader key={index}>
              <img src={picture.src} alt={picture.name} />
            </ImageLoader>
          ))}
        </SwipeableViews>
      </Grid>
      { pictures.length > 0 && <Grid item>
        <MobileStepper
          variant="dots"
          steps={pictures.length}
          activeStep={current}
          className={styles.dots}
        />
      </Grid>}
    </Grid>
  );
};

MobileGallery.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.object).isRequired,
  current: PropTypes.number,
  setCurrent: PropTypes.func,
};

export default MobileGallery;
