import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import styles from './ProductOptions.module.scss';

const ProductOptions = ({options}) => {
  const [productOptions, setProductOptions]
    = useState(Object.assign({}, ...options.map(opt => ({[opt.name]: opt.values[0].name}))));
  console.log(productOptions);

  const handleChange = ({target}) => {
    setProductOptions({...productOptions, [target.name]: target.value});
  };

  return (
    <div className={styles.root}>
      <Typography variant='h5' component='h2'>Choose from available options</Typography>
      { options.map(({name, values}) => (
        <FormControl key={name} component="fieldset" margin='dense' fullWidth>
          <FormLabel component="legend">{name}</FormLabel>
          <RadioGroup
            aria-label={name}
            name={name}
            value={productOptions[name]}
            onChange={handleChange}
            row
          >
            {values.map(({name}) => (
              <FormControlLabel
                key={name}
                value={name}
                control={<Radio size='small'/>}
                label={name}
              />
            ))}
          </RadioGroup>
        </FormControl>
      ))}
    </div>
  );
};

ProductOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.object),
  })),
};

export default ProductOptions;
