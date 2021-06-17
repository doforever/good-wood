import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, plusOne, minusOne, removeProduct, commentProduct } from '../../../redux/orderRedux';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCommentIcon from '@material-ui/icons/AddComment';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import {Link as RouterLink} from 'react-router-dom';

import styles from './Cart.module.scss';

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector(getProducts);
  const [visibleComments, setVisibleComments] = useState([]);
  const matchesSm = useMediaQuery(theme => theme.breakpoints.up('sm'));

  const toggleVisibility = id => {
    if (visibleComments.includes(id)) {
      setVisibleComments(visibleComments.filter(item => item !== id ));
    } else {
      setVisibleComments([...visibleComments, id]);
    }
  };

  const handleCommentChange = (e) => {
    const {value: comment, id} = e.target;
    dispatch(commentProduct({ id, comment }));
  };

  const emptyCart = <Alert severity='warning' variant='outlined'>
    <strong>Your cart is empty!</strong> You must do something about it ;-)
  </Alert>;

  return (
    <Paper component='section' className={styles.root}>
      <Container maxWidth='md'>
        <Typography component='h1' variant='h4' align='center' paragraph>Cart</Typography>
        {!products || products.length === 0 ? emptyCart : <div>
          <TableContainer >
            <Table className={styles.table}>
              {matchesSm && <TableHead>
                <TableRow>
                  <TableCell >Product</TableCell>
                  <TableCell align="center" >Amount</TableCell>
                  <TableCell align="center" >Total price</TableCell>
                  <TableCell align="center" >Actions</TableCell>
                </TableRow>
              </TableHead>}
              {products.map(({id, name, defaultPrice, amount, comment}) => (
                <TableBody key={id}>
                  { !matchesSm && <TableRow className={styles.name_row}>
                    <TableCell colSpan={4}>
                      <Typography
                        variant='h6'
                        component={RouterLink}
                        to={`/products/${id}`}
                        className={styles.product_name}
                      >
                        {name}
                      </Typography></TableCell>
                  </TableRow> }
                  <TableRow className={styles.product_row}>
                    { matchesSm && <TableCell>
                      <Typography
                        variant='subtitle2'
                        component={RouterLink}
                        to={`/products/${id}`}
                        className={styles.product_name}
                      >
                        {name}
                      </Typography></TableCell>}
                    <TableCell align="center" colSpan={matchesSm ? 1 : 2}>
                      <div className={styles.amount}>
                        <IconButton size='small' onClick={() => dispatch(minusOne(id))}>
                          <RemoveIcon />
                        </IconButton>
                        {` ${amount} `}
                        <IconButton size='small' onClick={() => dispatch(plusOne(id))}>
                          <AddIcon />
                        </IconButton>
                      </div>
                    </TableCell>
                    <TableCell align="center">$ {amount*defaultPrice}</TableCell>
                    <TableCell align="right">
                      {!comment && <IconButton aria-label="expand row" onClick={() => toggleVisibility(id)}>
                        {visibleComments.includes(id) ? <KeyboardArrowUpIcon /> : <AddCommentIcon />}
                      </IconButton>}
                      <IconButton onClick={() => dispatch(removeProduct(id))}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow >
                    <TableCell className={styles.collapsible_cell} colSpan={4}>
                      <Collapse in={comment || visibleComments.includes(id)} timeout="auto">
                        <TextField
                          autoComplete='off'
                          id={id}
                          name={`${id}-comment`}
                          placeholder='Add comment'
                          fullWidth
                          multiline
                          variant='outlined'
                          inputProps={{ maxlength: 200 }}
                          value={comment}
                          onChange={handleCommentChange}
                        >
                        </TextField>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </Table>
          </TableContainer>
          <Button
            variant='contained'
            color='primary'
            size='large'
            className={styles.button}
            component={RouterLink}
            to='/order'
          >
              Order
          </Button>
        </div>}
      </Container>
    </Paper>
  );
};

export default Cart;
