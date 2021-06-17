import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getOrder } from '../../../redux/orderRedux';
import { ThemeProvider, createMuiTheme, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import { Link as RouterLink } from 'react-router-dom';

import styles from './ShoppingStepper.module.scss';

const ShoppingStepper = ({children}) => {
  let location = useLocation();
  const order = useSelector(getOrder);
  const [completed, setCompleted] = useState();
  const matchesSm = useMediaQuery(theme => theme.breakpoints.up('sm'));
  const mainTheme = useTheme();

  const theme = createMuiTheme({
    palette: {
      primary: mainTheme.palette.secondary,
      secondary: mainTheme.palette.primary,
    },
  });

  const steps = [
    {label: 'Shopping', to: '/'},
    {label: 'Edit cart', to: '/cart'},
    {label: 'Complete order', to: '/order'},
  ];

  useEffect(() => {
    if (order.products.length > 0 ) {
      if (location.pathname === '/cart') setCompleted(0);
      else setCompleted(1);
    } else setCompleted(-1);
  }, [location, order]);

  const getPosition = () => {
    if (location.pathname ==='/order') return 2;
    else return 1;
  };

  return (
    <div className={styles.root}>
      <ThemeProvider theme={theme}>
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
                >{label}</StepButton>
              </Step>
            );
          })}
        </Stepper>
      </ThemeProvider>
      { children }
    </div>
  );
};

ShoppingStepper.propTypes = {
  children: PropTypes.node,
};

export default ShoppingStepper;
