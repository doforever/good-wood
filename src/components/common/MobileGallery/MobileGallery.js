import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clxs from 'clsx';

import Grid from '@material-ui/core/Grid';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import styles from './MobileGallery.module.scss';

const MobileGallery = ({ pictures, current = 0, setCurrent }) => {
  const [incoming, setIncoming] = useState(-1);
  const [isChanging, setIsChanging] = useState(false);

  const changePic = (i) => {
    setIncoming(i);
    setIsChanging(true);
    setTimeout(() => {
      setCurrent(i);
      setIsChanging(false);
    }, 1000);
  };

  const handleNext = () => {
    changePic(current + 1);
  };

  const handleBack = () => {
    changePic(current - 1);
  };

  const dots = (<MobileStepper
    variant="dots"
    steps={pictures.length}
    position="static"
    activeStep={current}
    className={styles.dots}
    nextButton={
      <Button size="small" onClick={handleNext} disabled={current === pictures.length - 1}>
        Next
        <KeyboardArrowRight />
      </Button>
    }
    backButton={
      <Button size="small" onClick={handleBack} disabled={current === 0}>
        <KeyboardArrowLeft />
          Back
      </Button>
    }
  />);

  return (
    <Grid container direction='column' className={styles.root}>
      <Grid item xs className={clxs(styles.photo_wrapper, isChanging && styles.changing)}>
        {incoming >= 0
            && <img className={styles.incoming_img} src={pictures[incoming].src} alt={pictures[incoming].name} />}
        <img
          className={styles.current_img}
          src={pictures[current].src}
          alt={pictures[current].name}
        />
      </Grid>
      { pictures.length > 0 && <Grid item container direction='row'>
        {dots}
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
