import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getCart } from '../../../redux/cartRedux';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import { Link as RouterLink } from 'react-router-dom';

import styles from './ShoppingStepper.module.scss';

const ShoppingStepper = ({children}) => {
  let location = useLocation();
  const cart = useSelector(getCart);
  const [completed, setCompleted] = useState();

  const steps = [
    {label: 'Shopping', to: '/'},
    {label: 'Edit cart', to: '/cart'},
    {label: 'Complete order', to: '/order'},
  ];

  useEffect(() => {
    if (cart.products.length > 0 ) {
      if (location.pathname === '/cart') setCompleted(0);
      else setCompleted(1);
    } else setCompleted(-1);
  }, [location, cart]);

  const getPosition = () => {
    if (location.pathname ==='/order') return 2;
    else return 1;
  };

  return (
    <div>
      <Stepper nonLinear activeStep={getPosition()} className={styles.root}>
        {steps.map(({label, to}, index) => {
          return (
            <Step key={index}>
              <StepButton component={RouterLink} to={to} completed={index <= completed}>{label}</StepButton>
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
