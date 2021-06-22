import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import Nav from '../../features/Nav/Nav';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.root}>
      <AppBar component='div' position='fixed' color='secondary'>
        <Toolbar className={styles.toolbar}>
          <Link
            component={RouterLink}
            to='/'
            variant="h3"
            className={styles.title}
            color='inherit'
            underline='none'
          >
            Good-Wood
          </Link>
          <Nav className={styles.nav}/>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </header>
  );
};

export default Header;
