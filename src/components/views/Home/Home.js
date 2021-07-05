import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAll } from '../../../redux/productsRedux';
import { getAll, getRequest } from '../../../redux/productsRedux';

import ProductList from '../../features/ProductList/ProductList';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import Intro from '../../features/Intro/Intro';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

import styles from './Home.module.scss';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(getAll);
  const request = useSelector(getRequest);

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  const [state, setState] = useState({
    beds: true,
    chairs: true,
    storage: true,
    tables: true,
    search: '',
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleSearchChange = (event) => {
    setState({...state, search: event.target.value});
  };

  let productsList = '';
  if (request.type === 'GET_ALL' && request.error) {
    productsList = <Alert severity='error' variant='outlined'>Connection error, please try again</Alert >;
  } else if (request.type === 'GET_ALL' && request.active) {
    productsList = <LinearProgress />;
  } else productsList = <ProductList products={products} />;

  return (
    <div className={styles.root}>
      <Intro/>
      <Divider/>
      <Toolbar className={styles.filters}>
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox checked={state.tables} onChange={handleChange} name="tables" color="primary"/>}
            label="Tables"
          />
          <FormControlLabel
            control={
              <Checkbox checked={state.chairs} onChange={handleChange} name="chairs" color="primary"/>}
            label="Chairs"
          />
          <FormControlLabel
            control={
              <Checkbox checked={state.beds} onChange={handleChange} name="beds" color="primary"/>}
            label="Beds"
          />
          <FormControlLabel
            control={<Checkbox checked={state.storage} onChange={handleChange} name="storage" color="primary"/>}
            label="Storage"
          />
        </FormGroup>
        <OutlinedInput
          className={styles.search}
          id="search"
          value={state.search}
          onChange={handleSearchChange}
          autoComplete='off'
          margin='dense'
          placeholder='Search...'
          name='search'
          type='search'
          startAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
        />
      </Toolbar>
      <Divider/>
      { productsList }
    </div>
  );
};

export default Home;
