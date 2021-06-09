import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import Nav from '../../features/Nav/Nav';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={styles.root}>
      <AppBar position="fixed">
        <Toolbar className={styles.toolbar}>
          <Link
            component={RouterLink}
            to='/'
            variant="h6"
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
    </div>
  );
};

export default Header;
