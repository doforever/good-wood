import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import ImageLoader from '../../common/ImageLoader/ImageLoader';

import styles from './DesktopGallery.module.scss';

const DesktopGallery = ({ pictures, current = 0, setCurrent, className }) => {
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

  const thumbnails = pictures.map(({ src, name }, i) => i < 5 && (
    <Grid
      key={i}
      item xs
      className={clsx(styles.thumbnail, (incoming >= 0 ? i === incoming : i === current) && styles.active)}
    >
      <ButtonBase onClick={() => changePic(i)}>
        <img src={src} alt={name} />
      </ButtonBase>
    </Grid>)
  );

  return (
    <Grid container direction='column' className={clsx(styles.root, className)}>
      <Grid item xs className={clsx(styles.photo_wrapper, isChanging && styles.changing)}>
        {incoming >= 0
          && <img className={styles.incoming_img} src={pictures[incoming].src} alt={pictures[incoming].name} />}
        <ImageLoader className={styles.current_img}>
          <img
            src={pictures[current].src}
            alt={pictures[current].name}
          />
        </ImageLoader>
      </Grid>
      { pictures.length > 0 && <Grid item container direction='row'>
        {thumbnails}
      </Grid>}
    </Grid>
  );
};

DesktopGallery.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.object).isRequired,
  current: PropTypes.number,
  setCurrent: PropTypes.func,
  className: PropTypes.string,
};

export default DesktopGallery;
