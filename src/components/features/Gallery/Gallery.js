import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import DesktopGallery from '../../common/DesktopGallery/DesktopGallery';
import MobileGallery from '../../common/MobileGallery/MobileGallery';

const Gallery = ({ pictures }) => {
  const [current, setCurrent] = useState(0);
  const matchesSm = useMediaQuery(theme => theme.breakpoints.up('sm'));

  const Component = matchesSm ? DesktopGallery : MobileGallery;

  return <Component pictures={pictures} current={current} setCurrent={setCurrent} />;
};

Gallery.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Gallery;
