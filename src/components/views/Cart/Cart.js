import React from 'react';
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
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
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

  const emptyCart = <Alert severity='info' variant='outlined'>
    <strong>Your cart is empty!</strong> You must do something about it ;-)
  </Alert>;

  return (
    <Paper component='section' className={styles.root}>
      <Container maxWidth='md'>
        <Typography component='h1' variant='h4' align='center' paragraph>Cart</Typography>
        {!products || products.length === 0 ? emptyCart : <div>
          <TableContainer className={styles.table}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="center">Amount</TableCell>
                  <TableCell align="center">Total price</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map(({id, name, defaultPrice, amount}) => (
                  <TableRow key={id}>
                    <TableCell component="th" scope="row">
                      {name}
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
                      <IconButton onClick={() => dispatch(removeProduct(id))}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
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
