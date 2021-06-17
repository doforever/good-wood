import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import { store } from './redux/store';

import MainLayout from './components/layout/MainLayout/MainLayout';
import ShoppingStepper from './components/layout/ShoppingStepper/ShoppingStepper';
import Home from './components/views/Home/Home';
import Product from './components/views/Product/Product';
import Cart from './components/views/Cart/Cart';
import Order from './components/views/Order/Order';

const theme = createMuiTheme({
  palette: {
    common: { white: '#F9F6F0', black: '#0A0A0A'},
    secondary: { main: '#595959', contrastText: '#F9F6F0'},
    primary: { main: '#91C499'},
    info: { main: '#808F85'},
    success: { main: '#91C499'},
    background: { paper: '#F9F6F0', default: '#F3EDE2' },
  },
});

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainLayout>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/products/:id' component={Product} />
              <ShoppingStepper>
                <Route exact path='/cart' component={Cart} />
                <Route exact path='/order' component={Order} />
              </ShoppingStepper>
            </Switch>
          </MainLayout>
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  </Provider>
);

export default App;

