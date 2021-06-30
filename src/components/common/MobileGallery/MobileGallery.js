import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';


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
            <img key={index} src={picture.src} alt={picture.name} />
          ))}
        </SwipeableViews>
      </Grid>
      { pictures.length > 0 && <Grid item>
        <MobileStepper
          variant="dots"
          steps={pictures.length}
          position="static"
          activeStep={current}
          className={styles.dots}
          nextButton={
            <Button size="small" onClick={() => setCurrent(current + 1)} disabled={current === pictures.length - 1}>
              Next
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size="small" onClick={() => setCurrent(current - 1)} disabled={current === 0}>
              <KeyboardArrowLeft />
              Back
            </Button>
          }
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
