import React from 'react';
import { useSelector } from 'react-redux';
import { getProducts } from '../../../redux/cartRedux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import {Link as RouterLink} from 'react-router-dom';

import styles from './Cart.module.scss';

const Cart = () => {
  const products = useSelector(getProducts);
  const emptyCart = <Alert severity="info" variant='outlined'>
    <strong>Your cart is empty!</strong> You must do something about it ;-)
  </Alert>;

  return (
    <Paper className={styles.root}>
      <Container maxWidth='md'>
        <Typography component='h1' variant='h4' align='center' paragraph>Cart</Typography>
        {!products || products.length === 0 ? emptyCart : <div>
          <TableContainer className={styles.table}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right">Total price</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map(({id, name, defaultPrice, amount}) => (
                  <TableRow key={id}>
                    <TableCell component="th" scope="row">
                      {name}
                    </TableCell>
                    <TableCell align="right">{amount}</TableCell>
                    <TableCell align="right">{amount*defaultPrice}</TableCell>
                    <TableCell align="right"> </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant='outlined'
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
