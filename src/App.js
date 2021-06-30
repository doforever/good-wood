import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AnimatedSwitch, spring, AnimatedRoute } from 'react-router-transition';
import { Provider } from 'react-redux';
import ScrollToTop from './components/common/ScrollToTop/ScrollToTop';

import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import { store } from './redux/store';

import MainLayout from './components/layout/MainLayout/MainLayout';
import ShoppingStepper from './components/layout/ShoppingStepper/ShoppingStepper';
import Home from './components/views/Home/Home';
import Product from './components/views/Product/Product';
import Cart from './components/views/Cart/Cart';
import Order from './components/views/Order/Order';

import styles from './App.module.scss';

const theme = createMuiTheme({
  palette: {
    common: { white: '#F9F6F0', black: '#0A0A0A'},
    secondary: { main: '#595959', contrastText: '#F9F6F0'},
    primary: { main: '#91C499'},
    info: { main: '#808F85'},
    success: { main: '#91C499'},
    background: { paper: '#F9F6F0', default: '#F3EDE2' },
  },
  typography: {
    fontFamily: [
      'Poppins',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

const mapStyles = (styles) => ({
  transform: `translateX(${styles.offset}%)`,
});

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainLayout>
            <AnimatedSwitch
              atEnter={{ offset: 100 }}
              atLeave={{ offset: -120 }}
              atActive={{ offset: spring(0, { stiffness: 70, damping: 40 }) }}
              mapStyles={mapStyles}
              wrapperComponent='div'
              className={styles.transitionWrapper}
            >
              <Route exact path='/' component={Home} />
              <Route exact path='/products/:id' component={Product} />
              <ShoppingStepper>
                <AnimatedRoute
                  exact
                  path='/cart'
                  component={Cart}
                  atEnter={{ offset: 100 }}
                  atLeave={{ offset: -120 }}
                  atActive={{ offset: spring(0, { stiffness: 70, damping: 40 }) }}
                  mapStyles={mapStyles}
                  wrapperComponent='div'
                  className={styles.transitionWrapper}
                />
                <AnimatedRoute
                  exact
                  path='/order'
                  component={Order}
                  atEnter={{ offset: 100 }}
                  atLeave={{ offset: -120 }}
                  atActive={{ offset: spring(0, { stiffness: 70, damping: 40 }) }}
                  mapStyles={mapStyles}
                  wrapperComponent='div'
                  className={styles.transitionWrapper}
                />
              </ShoppingStepper>
            </AnimatedSwitch>
          </MainLayout>
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  </Provider>
);

export default App;

