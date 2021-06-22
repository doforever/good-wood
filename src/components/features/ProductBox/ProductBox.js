import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';

import styles from './ProductBox.module.scss';

const ProductBox = ({ product: {id, name, mainPhoto, defaultPrice} }) => (
  <Card className={styles.root}>
    <CardActionArea component={RouterLink} to={`/products/${id}`}>
      <CardMedia
        className={styles.media}
        src={mainPhoto.src}
        component='img'
      />
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
