import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getProducts } from '../../../redux/cartRedux';
import { getRequest } from '../../../redux/orderRedux';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import { Link as RouterLink } from 'react-router-dom';

import styles from './ShoppingStepper.module.scss';

const ShoppingStepper = ({children}) => {
  let location = useLocation();
  const products = useSelector(getProducts);
  const orderRequest = useSelector(getRequest);
  const [completed, setCompleted] = useState();
  const [isSending, setIsSending] = useState(false);
  const matchesSm = useMediaQuery(theme => theme.breakpoints.up('sm'));

  const steps = [
    {label: 'Shopping', to: '/'},
    {label: 'Edit cart', to: '/cart'},
    {label: 'Complete order', to: '/order'},
  ];

  useEffect(() => {
    if (orderRequest.active) setIsSending(true);
    if (orderRequest.error) setIsSending(false);
  }, [orderRequest]);

  useEffect(() => {
    if (!isSending && products.length > 0 ) {
      if (location.pathname === '/cart') setCompleted(0);
      else setCompleted(1);
    } else setCompleted(-1);
    if (isSending && !orderRequest.active && !orderRequest.error) {
      setTimeout(() => setIsSending(false), 10000);
      setCompleted(2);
    }
  }, [location, products, orderRequest, isSending]);

  const getPosition = () => {
    if (location.pathname ==='/order') return 2;
    else return 1;
  };

  return (
    <div className={styles.root}>
      <Stepper
        component='nav'
        nonLinear
        activeStep={getPosition()}
        className={styles.stepper}
        alternativeLabel={!matchesSm}
      >
        {steps.map(({label, to}, index) => {
          return (
            <Step key={index}>
              <StepButton
                component={RouterLink}
                to={to}
                completed={index <= completed}
                disabled={index-2 > completed}
              >{label}</StepButton>
            </Step>
          );
        })}
      </Stepper>
      { children }
    </div>
  );
};

ShoppingStepper.propTypes = {
  children: PropTypes.node,
};

export default ShoppingStepper;
