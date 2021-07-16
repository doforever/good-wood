import React from 'react';
import PropTypes from 'prop-types';

import MobileStepper from '@material-ui/core/MobileStepper';
import SwipeableViews from 'react-swipeable-views';
import ImageLoader from '../../common/ImageLoader/ImageLoader';

import styles from './MobileGallery.module.scss';

const MobileGallery = ({ pictures, current = 0, setCurrent }) => {

  return (
    <div className={styles.root}>
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
      { pictures.length > 0 &&
        <MobileStepper
          variant="dots"
          steps={pictures.length}
          activeStep={current}
          className={styles.dots}
        />}
    </div>
  );
};

MobileGallery.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.object).isRequired,
  current: PropTypes.number,
  setCurrent: PropTypes.func,
};

export default MobileGallery;
