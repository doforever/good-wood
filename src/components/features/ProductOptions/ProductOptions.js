import React from 'react';
import PropTypes from 'prop-types';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import styles from './ProductOptions.module.scss';

const ProductOptions = ({options, setOptions}) => {

  const handleChange = ({ target }) => {
    setOptions(options.map(opt => opt.name === target.name ? {...opt, chosen: target.value} : opt ));
  };

  return (
    <div className={styles.root}>
      { options.map(({name, values, chosen}) => (
        <FormControl key={name} component="fieldset" margin='dense' fullWidth>
          <FormLabel component="legend" className={styles.legend} color='secondary'>{name}</FormLabel>
          <RadioGroup
            aria-label={name}
            name={name}
            value={chosen}
            onChange={handleChange}
            row
          >
            {values.map(({name}) => (
              <FormControlLabel
                key={name}
                value={name}
                control={<Radio size='small'/>}
                label={name}
                className={styles.label}
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
    chosen: PropTypes.string,
  })),
  setOptions: PropTypes.func,
};

export default ProductOptions;
