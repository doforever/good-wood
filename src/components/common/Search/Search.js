import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InputAdornment from '@material-ui/core/InputAdornment';

import styles from './Search.module.scss';

const Search = ({searchString, setSearchString, close, className}) => {

  const handleChange = ({target}) => {
    setSearchString(target.value);
  };

  const handleClose = () => {
    setSearchString('');
    if (close) close();
  };

  return (
    <OutlinedInput
      className={clsx(styles.root, className)}
      id="search"
      value={searchString}
      onChange={handleChange}
      autoComplete='off'
      margin='dense'
      placeholder='Search...'
      name='search'
      endAdornment={(close || searchString) && <InputAdornment position="end">
        <IconButton onClick={handleClose} size='small'>
          <CloseIcon />
        </IconButton>
      </InputAdornment>}
    />
  );
};

Search.propTypes = {
  className: PropTypes.string,
  searchString: PropTypes.string,
  setSearchString: PropTypes.func,
  close: PropTypes.func,
};

export default Search;
