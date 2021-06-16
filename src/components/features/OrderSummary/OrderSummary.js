import React from 'react';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';

import styles from './OrderSummary.module.scss';

const OrderSummary = ({products}) => {
  const noProducts = <Alert severity='warning' variant='outlined'>
    There are <strong>no products</strong> in your cart
  </Alert>;

  const totalPrice = products => {
    let total = 0;
    for (let p of products) {
      total += (p.amount * p.defaultPrice);
    }
    return total;
  };

  return (
    <Paper className={styles.root}>
      <Typography component='h2' variant='h4' paragraph>Your order</Typography>
      {!products || products.length === 0 ? noProducts :
        <TableContainer >
          <Table>
            <TableBody>
              {products.map(({ id, name, defaultPrice, amount, comment }) => (
                <TableRow key={id}>
                  <TableCell component="th" scope="row">
                    {name}
                  </TableCell>
                  <TableCell>
                    <Typography noWrap className={styles.comment}>{comment}</Typography>
                  </TableCell>
                  <TableCell align="right" className={styles.amount}>x {amount}</TableCell>
                  <TableCell align="right" className={styles.price}>$ {amount * defaultPrice}</TableCell>
                </TableRow>
              ))}
              <TableRow >
                <TableCell align="right" colSpan={3} className={styles.total}>Total</TableCell>
                <TableCell align="right" className={styles.total}>$ {totalPrice(products)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>}
    </Paper>
  );
};

OrderSummary.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
};

export default OrderSummary;
