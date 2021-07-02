import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Spinner from '../Spinner/Spinner';

import styles from './ImageLoader.module.scss';

const ImageLoader = ({children, className}) => {

  const [isLoaded, setIsLoaded] = useState(false);

  const loaderClass = isLoaded ? styles.loaded : styles.loading ;

  const onLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={styles.root}>
      { !isLoaded && <Spinner/> }
      { React.Children.map(children, (child) =>
        React.cloneElement(child, {onLoad, className: clsx(className, loaderClass)})) }
    </div>
  );
};

ImageLoader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default ImageLoader;
