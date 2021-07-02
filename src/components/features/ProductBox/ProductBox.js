import React from 'react';
import PropTypes from 'prop-types';
import LazyLoader from 'react-lazy-load';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';
import ImageLoader from '../../common/ImageLoader/ImageLoader';

import styles from './ProductBox.module.scss';

const ProductBox = ({ product: {id, name, mainPhoto, defaultPrice} }) => (
  <Card className={styles.root}>
    <CardActionArea component={RouterLink} to={`/products/${id}`}>
      <LazyLoader
        height={270}
        debounce={false}
        offsetVertical={400}
        offsetHorizontal={1600}
      >
        <ImageLoader className={styles.media}>
          <CardMedia
            src={mainPhoto.src}
            component='img'
            alt={mainPhoto.name}
          />
        </ImageLoader>
      </LazyLoader>
      <CardContent className={styles.content}>
        <Typography variant="h5" component="h2" noWrap>
          {name}
        </Typography>
        <Typography
          align='right'
          display='block'
          variant='overline'
        >from ${defaultPrice}</Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

ProductBox.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    mainPhoto: PropTypes.shape({
      src: PropTypes.string,
      name: PropTypes.string,
    }),
    defaultPrice: PropTypes.number,
  }).isRequired,
};

export default ProductBox;
