import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import clxs from 'clsx';

import Grid from '@material-ui/core/Grid';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import ButtonBase from '@material-ui/core/ButtonBase';

import styles from './Gallery.module.scss';

const Gallery = ({ pictures }) => {
  const [current, setCurrent] = useState(0);
  const [incoming, setIncoming] = useState(-1);
  const [isChanging, setIsChanging] = useState(false);
  const matchesSm = useMediaQuery(theme => theme.breakpoints.up('sm'));

  const changePic = (i) => {
    setIncoming(i);
    setIsChanging(true);
    setTimeout(() => {
      setCurrent(i);
      setIsChanging(false);
    }, 1000);
  };

  const thumbnails = pictures.map(({src, name}, i) => i < 5 && (
    <Grid
      key={i}
      item xs
      className={clxs(styles.thumbnail, (incoming >= 0 ? i === incoming : i === current) && styles.active)}
    >
      <ButtonBase onClick={() => changePic(i)}>
        <img src={src} alt={name}/>
      </ButtonBase>
    </Grid>)
  );

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

  const controls = matchesSm ? thumbnails : dots;

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
        {controls}
      </Grid>}
    </Grid>
  );
};

Gallery.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Gallery;
