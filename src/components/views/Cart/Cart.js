import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, plusOne, minusOne, removeProduct } from '../../../redux/orderRedux';

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
  const [open, setOpen] = useState([]);

  const toggleOpen = id => {
    if (open.includes(id)) {
      setOpen(open.filter(item => item !== id ));
    } else {
      setOpen([...open, id]);
    }
  };

  const emptyCart = <Alert severity='info' variant='outlined'>
    <strong>Your cart is empty!</strong> You must do something about it ;-)
  </Alert>;

  return (
    <Paper component='section' className={styles.root}>
      <Container maxWidth='md'>
        <Typography component='h1' variant='h4' align='center' paragraph>Cart</Typography>
        {!products || products.length === 0 ? emptyCart : <div>
          <TableContainer className={styles.table}>
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="center">Amount</TableCell>
                  <TableCell align="center">Total price</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              {products.map(({id, name, defaultPrice, amount}) => (
                <TableBody key={id}>
                  <TableRow className={styles.row}>
                    <TableCell>
                      <Typography variant='h6' component='h2'>{name}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton size='small' onClick={() => dispatch(minusOne(id))}>
                        <RemoveIcon />
                      </IconButton>
                      {` ${amount} `}
                      <IconButton size='small' onClick={() => dispatch(plusOne(id))}>
                        <AddIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">$ {amount*defaultPrice}</TableCell>
                    <TableCell align="center">
                      <IconButton aria-label="expand row" onClick={() => toggleOpen(id)}>
                        {open.includes(id) ? <KeyboardArrowUpIcon /> : <AddCommentIcon />}
                      </IconButton>
                      <IconButton onClick={() => dispatch(removeProduct(id))}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow >
                    <TableCell className={styles.collapsible} colSpan={4}>
                      <Collapse in={open.includes(id)} timeout="auto">
                        <TextField
                          autoComplete='off'
                          id={`${id}-comment`}
                          name={`${id}-comment`}
                          label='Add comment'
                          fullWidth
                          variant='outlined'
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
            color='secondary'
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
